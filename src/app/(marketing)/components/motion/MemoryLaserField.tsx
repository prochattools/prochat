'use client'

import type { CSSProperties } from 'react'
import { useEffect, useId, useRef, useState } from 'react'

type MemoryLaserFieldVariant = 'css' | 'webgl' | 'fallback'
type MotionState = 'running' | 'paused' | 'reduced' | 'fallback'
type MotionPreference = 'checking' | 'safe' | 'reduce'

type MemoryLaserFieldProps = {
  variant?: MemoryLaserFieldVariant
  reviewLabel?: string
}

const TRACE_LINES = Array.from({ length: 13 }, (_, index) => index)
const TRACE_NODES = Array.from({ length: 11 }, (_, index) => index)
const ORBITS = [
  'M61 310 C146 208 259 198 338 266 C421 338 522 339 593 252',
  'M102 390 C207 316 335 318 438 386 C493 422 554 429 612 395',
  'M192 166 C247 107 335 99 394 148 C449 193 497 201 552 174',
] as const

const VERTEX_SHADER = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`

const FRAGMENT_SHADER = `
precision mediump float;
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_density;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float lineBand(float x, float center, float width) {
  return exp(-pow(abs(x - center) / width, 2.0));
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 p = uv - 0.5;
  float aspect = u_resolution.x / max(u_resolution.y, 1.0);
  p.x *= aspect;

  float core = lineBand(p.x, 0.0, 0.032);
  float veil = lineBand(p.x, 0.0, 0.125) * smoothstep(0.05, 0.78, uv.y);
  float upperMask = smoothstep(0.02, 0.18, uv.y) * (1.0 - smoothstep(0.96, 1.0, uv.y));

  vec2 grid = vec2(p.x * 92.0, (uv.y + u_time * 0.028) * 78.0);
  vec2 cell = floor(grid);
  vec2 f = fract(grid) - 0.5;
  float picked = step(0.88, hash(cell));
  float dotShape = smoothstep(0.13, 0.0, length(f));
  float dottedCore = dotShape * picked * core * upperMask * u_density;

  float trace = 0.0;
  for (int i = 0; i < 7; i++) {
    float fi = float(i);
    float lane = (fi - 3.0) * 0.018 + sin(u_time * 0.16 + fi) * 0.006;
    float y = fract(uv.y * (1.45 + fi * 0.045) + u_time * (0.032 + fi * 0.004) + fi * 0.137);
    float dash = smoothstep(0.09, 0.0, abs(y - 0.5));
    trace += lineBand(p.x, lane, 0.0045 + fi * 0.00045) * dash * (0.11 + fi * 0.012);
  }

  float depth = 0.0;
  for (int j = 0; j < 9; j++) {
    float fj = float(j);
    float lane = sin(fj * 9.17) * 0.18;
    float y = fract(uv.y + u_time * (0.014 + fj * 0.002) + fj * 0.111);
    float x = mix(lane, 0.0, smoothstep(0.0, 1.0, y));
    float fragment = exp(-pow((p.x - x) / 0.006, 2.0)) * exp(-pow((uv.y - y) / 0.018, 2.0));
    depth += fragment * (0.09 + 0.02 * hash(vec2(fj, fj + 4.0)));
  }

  float bloom = pow(max(0.0, 1.0 - length(vec2(p.x * 3.2, p.y - 0.12))), 3.1) * 0.18;
  float energy = clamp(dottedCore * 0.62 + trace + depth * u_density + veil * 0.1 + bloom, 0.0, 1.0);
  vec3 teal = vec3(0.28, 0.91, 0.84);
  vec3 blue = vec3(0.42, 0.62, 1.0);
  vec3 color = mix(teal, blue, smoothstep(-0.18, 0.42, p.y));
  float alpha = energy * 0.72 * upperMask;

  gl_FragColor = vec4(color * (0.62 + energy * 0.8), alpha);
}
`

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader)
    return null
  }

  return shader
}

export function MemoryLaserField({ variant = 'webgl', reviewLabel }: MemoryLaserFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const frameRef = useRef<number | null>(null)
  const frameCountRef = useRef(0)
  const webglRef = useRef<{
    gl: WebGLRenderingContext
    program: WebGLProgram
    resolution: WebGLUniformLocation | null
    time: WebGLUniformLocation | null
    density: WebGLUniformLocation | null
    buffer: WebGLBuffer | null
    startedAt: number
  } | null>(null)
  const rootRef = useRef<HTMLDivElement | null>(null)
  const id = useId().replace(/:/g, '')
  const [motionState, setMotionState] = useState<MotionState>('paused')
  const [motionPreference, setMotionPreference] = useState<MotionPreference>('checking')

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => {
      setMotionPreference(media.matches ? 'reduce' : 'safe')
      if (media.matches) setMotionState('reduced')
    }

    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (variant !== 'webgl' || motionPreference !== 'safe') {
      return
    }

    const root = rootRef.current
    const canvas = canvasRef.current
    if (!root || !canvas) return

    let inView = true
    let hidden = document.visibilityState === 'hidden'
    let disposed = false
    let contextLost = false

    const stop = (state: MotionState = 'paused') => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current)
        frameRef.current = null
      }
      setMotionState(state)
    }

    const setFrameCount = () => {
      root.dataset.frameCount = String(frameCountRef.current)
    }

    const fallback = () => {
      stop('fallback')
      root.dataset.webgl = 'fallback'
    }

    const createProgram = () => {
      const gl = canvas.getContext('webgl', {
        alpha: true,
        antialias: false,
        depth: false,
        powerPreference: 'low-power',
        premultipliedAlpha: false,
        preserveDrawingBuffer: false,
        stencil: false,
      })

      if (!gl) return null

      const vertex = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER)
      const fragment = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
      if (!vertex || !fragment) return null

      const program = gl.createProgram()
      if (!program) return null

      gl.attachShader(program, vertex)
      gl.attachShader(program, fragment)
      gl.linkProgram(program)
      gl.deleteShader(vertex)
      gl.deleteShader(fragment)

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        gl.deleteProgram(program)
        return null
      }

      const buffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
        gl.STATIC_DRAW,
      )

      const position = gl.getAttribLocation(program, 'a_position')
      gl.enableVertexAttribArray(position)
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

      return {
        gl,
        program,
        buffer,
        resolution: gl.getUniformLocation(program, 'u_resolution'),
        time: gl.getUniformLocation(program, 'u_time'),
        density: gl.getUniformLocation(program, 'u_density'),
        startedAt: performance.now(),
      }
    }

    webglRef.current = createProgram()
    if (!webglRef.current) {
      fallback()
      return
    }

    root.dataset.webgl = 'active'

    const draw = (now: number) => {
      if (disposed || hidden || !inView || !webglRef.current || contextLost) {
        frameRef.current = null
        return
      }

      const { gl, program, resolution, time, density, startedAt } = webglRef.current
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, window.innerWidth < 720 ? 1.15 : 1.55)
      const width = Math.max(1, Math.floor(rect.width * dpr))
      const height = Math.max(1, Math.floor(rect.height * dpr))

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
        gl.viewport(0, 0, width, height)
      }

      gl.useProgram(program)
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.uniform2f(resolution, width, height)
      gl.uniform1f(time, (now - startedAt) / 1000)
      gl.uniform1f(density, window.innerWidth < 720 ? 0.58 : 1)
      gl.drawArrays(gl.TRIANGLES, 0, 6)

      frameCountRef.current += 1
      if (frameCountRef.current % 12 === 0) setFrameCount()
      frameRef.current = requestAnimationFrame(draw)
    }

    const start = () => {
      if (disposed || hidden || !inView || contextLost || frameRef.current !== null) return
      setMotionState('running')
      frameRef.current = requestAnimationFrame(draw)
    }

    const sync = () => {
      hidden = document.visibilityState === 'hidden'
      if (hidden || !inView) {
        stop('paused')
        return
      }
      start()
    }

    const observer = new IntersectionObserver(
      entries => {
        inView = entries[0]?.isIntersecting ?? true
        sync()
      },
      { threshold: 0.03 },
    )

    const onLost = (event: Event) => {
      event.preventDefault()
      contextLost = true
      fallback()
    }

    const onRestored = () => {
      contextLost = false
      webglRef.current = createProgram()
      if (webglRef.current) start()
    }

    observer.observe(root)
    document.addEventListener('visibilitychange', sync)
    canvas.addEventListener('webglcontextlost', onLost)
    canvas.addEventListener('webglcontextrestored', onRestored)
    start()

    return () => {
      disposed = true
      observer.disconnect()
      document.removeEventListener('visibilitychange', sync)
      canvas.removeEventListener('webglcontextlost', onLost)
      canvas.removeEventListener('webglcontextrestored', onRestored)
      stop('paused')

      if (webglRef.current) {
        const { gl, program, buffer } = webglRef.current
        if (buffer) gl.deleteBuffer(buffer)
        gl.deleteProgram(program)
        webglRef.current = null
      }
    }
  }, [variant, motionPreference])

  const reducedMotion = motionPreference === 'reduce'
  const renderWebgl = variant === 'webgl' && motionPreference === 'safe'
  const renderCssMotion = variant === 'css' && motionPreference === 'safe'
  const staticOnly = variant === 'fallback' || motionPreference !== 'safe'
  const reportedMotionState = staticOnly
    ? reducedMotion
      ? 'reduced'
      : 'fallback'
    : renderCssMotion
      ? 'running'
      : motionState

  return (
    <div
      ref={rootRef}
      className={[
        'pm-laser-field',
        `pm-laser-field--${variant}`,
        staticOnly ? 'pm-laser-field--static' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-hidden="true"
      data-motion-state={reportedMotionState}
      data-frame-count="0"
      data-review-label={reviewLabel}
    >
      <div className="pm-laser-fallback" />
      {renderWebgl ? <canvas ref={canvasRef} className="pm-laser-canvas" /> : null}
      <svg className="pm-laser-svg" viewBox="0 0 680 620" preserveAspectRatio="xMidYMin slice">
        <defs>
          <linearGradient id={`${id}-trace`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--pm-laser-ice)" stopOpacity="0" />
            <stop offset="44%" stopColor="var(--pm-laser-teal)" stopOpacity="0.62" />
            <stop offset="100%" stopColor="var(--pm-laser-blue)" stopOpacity="0" />
          </linearGradient>
          <radialGradient id={`${id}-core`} cx="50%" cy="68%" r="45%">
            <stop offset="0%" stopColor="var(--pm-laser-ice)" stopOpacity="0.42" />
            <stop offset="55%" stopColor="var(--pm-laser-core)" stopOpacity="0.13" />
            <stop offset="100%" stopColor="var(--pm-laser-core)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse className="pm-laser-core-glow" cx="340" cy="448" rx="128" ry="146" fill={`url(#${id}-core)`} />
        {TRACE_LINES.map(index => (
          <path
            key={index}
            className="pm-laser-svg-line"
            style={{ '--line-index': index } as CSSProperties}
            d={`M${302 + index * 6} -42 C${296 + index * 5} 120 ${326 + (index % 3) * 6} 270 ${316 + index * 4} 624`}
            stroke={`url(#${id}-trace)`}
          />
        ))}
        {ORBITS.map((path, index) => (
          <path
            key={path}
            className="pm-laser-orbit"
            style={{ '--orbit-index': index } as CSSProperties}
            d={path}
          />
        ))}
      </svg>
      <div className="pm-laser-css-layer" data-active={renderCssMotion ? 'true' : undefined}>
        {TRACE_NODES.map(index => (
          <span
            key={index}
            className="pm-laser-node"
            style={{ '--node-index': index } as CSSProperties}
          />
        ))}
      </div>
    </div>
  )
}
