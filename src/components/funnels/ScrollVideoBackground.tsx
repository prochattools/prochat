'use client'

import { RefObject, useEffect, useRef, useState } from 'react'

import './cinematic-product-funnel.css'

const VIDEO_URL = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260729_102822_0e6c87e8-c141-4744-bf32-ad30db296371.mp4'
const BOOTSTRAP_SPRITE_URL = '/funnels/cinematic-bootstrap.jpg'
const BOOTSTRAP_FRAME_COUNT = 24
const BOOTSTRAP_COLUMNS = 6
const BOOTSTRAP_ROWS = 4

type ScrollVideoBackgroundProps = {
  containerRef?: RefObject<HTMLElement | null>
  className?: string
  onProgress?: (progress: number, isActive: boolean) => void
}

function clampProgress(value: number) {
  return Math.min(1, Math.max(0, value))
}

function getProgress(container: HTMLElement | null) {
  if (!container) {
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
    return { progress: clampProgress(window.scrollY / max), isActive: true }
  }

  const start = container.getBoundingClientRect().top + window.scrollY
  const distance = Math.max(1, container.offsetHeight - window.innerHeight)
  const rawProgress = (window.scrollY - start) / distance
  return { progress: clampProgress(rawProgress), isActive: rawProgress <= 1 }
}

export function ScrollVideoBackground({ containerRef, className = '', onProgress }: ScrollVideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const bootstrapImageRef = useRef<HTMLImageElement | null>(null)
  const framesRef = useRef<Array<ImageBitmap | undefined>>([])
  const frameCountRef = useRef(0)
  const targetRef = useRef(0)
  const smoothedRef = useRef(0)
  const onProgressRef = useRef(onProgress)
  const [bootstrapReady, setBootstrapReady] = useState(false)
  const [videoReady, setVideoReady] = useState(false)
  const [cacheReady, setCacheReady] = useState(false)

  useEffect(() => {
    onProgressRef.current = onProgress
  }, [onProgress])

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const updateTarget = () => {
      const result = reducedMotion
        ? { progress: 0, isActive: true }
        : getProgress(containerRef?.current ?? null)
      targetRef.current = result.progress
      onProgressRef.current?.(result.progress, result.isActive)
    }

    updateTarget()
    if (reducedMotion) return

    window.addEventListener('scroll', updateTarget, { passive: true })
    window.addEventListener('resize', updateTarget)
    return () => {
      window.removeEventListener('scroll', updateTarget)
      window.removeEventListener('resize', updateTarget)
    }
  }, [containerRef])

  useEffect(() => {
    const image = new Image()
    image.decoding = 'async'
    image.fetchPriority = 'high'
    image.src = BOOTSTRAP_SPRITE_URL
    image.onload = () => {
      bootstrapImageRef.current = image
      setBootstrapReady(true)
    }
    return () => {
      image.onload = null
      bootstrapImageRef.current = null
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const onReady = () => setVideoReady(true)
    video.addEventListener('loadeddata', onReady)
    if (video.readyState >= 2) onReady()
    return () => video.removeEventListener('loadeddata', onReady)
  }, [])

  useEffect(() => {
    if (!videoReady || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let cancelled = false
    const source = document.createElement('video')
    source.crossOrigin = 'anonymous'
    source.muted = true
    source.playsInline = true
    source.preload = 'auto'
    source.src = VIDEO_URL

    const seekTo = async (time: number) => {
      if (cancelled) return
      if (source.readyState >= 2 && Math.abs(source.currentTime - time) <= 0.01) return
      await new Promise<void>((resolve, reject) => {
        const cleanup = () => {
          source.removeEventListener('seeked', onSeeked)
          source.removeEventListener('error', onError)
        }
        const onSeeked = () => {
          cleanup()
          resolve()
        }
        const onError = () => {
          cleanup()
          reject(new Error('frame cache seek failed'))
        }
        source.addEventListener('seeked', onSeeked)
        source.addEventListener('error', onError)
        source.currentTime = time
      })
    }

    const buildExtractionOrder = (count: number) => {
      const order: number[] = []
      const seen = new Set<number>()
      const add = (index: number) => {
        if (index < 0 || index >= count || seen.has(index)) return
        seen.add(index)
        order.push(index)
      }

      add(0)
      add(count - 1)
      let intervals: Array<[number, number]> = [[0, count - 1]]
      while (intervals.length) {
        const next: Array<[number, number]> = []
        intervals.forEach(([start, end]) => {
          const middle = Math.round((start + end) / 2)
          if (middle <= start || middle >= end) return
          add(middle)
          next.push([start, middle], [middle, end])
        })
        intervals = next
      }
      for (let index = 0; index < count; index += 1) add(index)
      return order
    }

    const extract = async () => {
      await new Promise<void>((resolve, reject) => {
        source.onloadeddata = () => resolve()
        source.onerror = () => reject(new Error('frame cache source failed'))
        source.load()
      })
      const duration = source.duration
      if (!Number.isFinite(duration) || duration <= 0) return
      const count = Math.min(90, Math.max(24, Math.round(duration * 12)))
      const width = Math.min(960, source.videoWidth || 960)
      const height = Math.max(1, Math.round(width * ((source.videoHeight || 540) / (source.videoWidth || 960))))
      const temp = document.createElement('canvas')
      temp.width = width
      temp.height = height
      const ctx = temp.getContext('2d')
      if (!ctx) return

      frameCountRef.current = count
      framesRef.current = new Array<ImageBitmap | undefined>(count)
      let loadedCount = 0

      for (const index of buildExtractionOrder(count)) {
        if (cancelled) break
        const time = (index / Math.max(1, count - 1)) * Math.max(0, duration - 0.05)
        await seekTo(time)
        if (cancelled) break
        ctx.drawImage(source, 0, 0, width, height)
        const frame = await createImageBitmap(temp)
        if (cancelled) {
          frame.close()
          break
        }
        framesRef.current[index]?.close()
        framesRef.current[index] = frame
        loadedCount += 1
        if (loadedCount === BOOTSTRAP_FRAME_COUNT) setCacheReady(true)
      }
    }

    extract().catch(() => undefined)
    return () => {
      cancelled = true
      framesRef.current.forEach((frame) => frame?.close())
      framesRef.current = []
      frameCountRef.current = 0
    }
  }, [videoReady])

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return

    let raf = 0
    const drawCover = (
      ctx: CanvasRenderingContext2D,
      source: CanvasImageSource,
      sourceWidth: number,
      sourceHeight: number,
      width: number,
      height: number,
      sourceX = 0,
      sourceY = 0,
    ) => {
      const scale = Math.max(width / sourceWidth, height / sourceHeight)
      const drawWidth = sourceWidth * scale
      const drawHeight = sourceHeight * scale
      ctx.clearRect(0, 0, width, height)
      ctx.drawImage(
        source,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        (width - drawWidth) / 2,
        (height - drawHeight) / 2,
        drawWidth,
        drawHeight,
      )
    }

    const draw = () => {
      smoothedRef.current += (targetRef.current - smoothedRef.current) * 0.12
      const canvas = canvasRef.current
      const video = videoRef.current
      const canDrawCanvas = canvas && (cacheReady || bootstrapReady)

      if (canDrawCanvas) {
        const dpr = Math.min(window.devicePixelRatio || 1, 2)
        const width = Math.round(window.innerWidth * dpr)
        const height = Math.round(window.innerHeight * dpr)
        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width
          canvas.height = height
        }
        const ctx = canvas.getContext('2d')

        if (ctx && cacheReady && frameCountRef.current > 0) {
          const frames = framesRef.current
          const targetIndex = Math.min(frameCountRef.current - 1, Math.round(smoothedRef.current * (frameCountRef.current - 1)))
          let frame = frames[targetIndex]
          if (!frame) {
            for (let offset = 1; offset < frameCountRef.current; offset += 1) {
              frame = frames[targetIndex - offset] ?? frames[targetIndex + offset]
              if (frame) break
            }
          }
          if (frame) drawCover(ctx, frame, frame.width, frame.height, width, height)
        } else if (ctx && bootstrapReady && bootstrapImageRef.current) {
          const image = bootstrapImageRef.current
          const sourceWidth = image.naturalWidth / BOOTSTRAP_COLUMNS
          const sourceHeight = image.naturalHeight / BOOTSTRAP_ROWS
          const frameIndex = Math.min(BOOTSTRAP_FRAME_COUNT - 1, Math.round(smoothedRef.current * (BOOTSTRAP_FRAME_COUNT - 1)))
          const sourceX = (frameIndex % BOOTSTRAP_COLUMNS) * sourceWidth
          const sourceY = Math.floor(frameIndex / BOOTSTRAP_COLUMNS) * sourceHeight
          drawCover(ctx, image, sourceWidth, sourceHeight, width, height, sourceX, sourceY)
        }
      } else if (videoReady && video && Number.isFinite(video.duration)) {
        const wanted = smoothedRef.current * Math.max(0, video.duration - 0.05)
        if (!video.seeking && Math.abs(video.currentTime - wanted) > 0.04) video.currentTime = wanted
      }
      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [bootstrapReady, cacheReady, videoReady])

  const canvasVisible = bootstrapReady || cacheReady
  return <><link rel="preload" as="image" href={BOOTSTRAP_SPRITE_URL} /><div className={`cpf-video ${className}`.trim()} aria-hidden="true"><div className={`cpf-video__poster ${bootstrapReady || videoReady || cacheReady ? 'is-hidden' : ''}`} /><video ref={videoRef} className={`cpf-video__element ${canvasVisible || cacheReady ? 'is-hidden' : videoReady ? 'is-visible' : ''}`} src={VIDEO_URL} muted playsInline preload="auto" /><canvas ref={canvasRef} className={`cpf-video__canvas ${canvasVisible ? 'is-visible' : ''}`} /><div className="cpf-video__veil" /></div></>
}
