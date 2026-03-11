import { existsSync, watch } from 'fs'
import { spawn } from 'child_process'
import path from 'path'

const WATCH_PATHS = ['docs-public', path.join('src', 'content', 'docs')].map(relative =>
  path.resolve(process.cwd(), relative),
)
const DEBOUNCE_MS = 500

let timer: NodeJS.Timeout | null = null
let running = false
let pending = false

function log(message: string) {
  console.log(`[docs:watch] ${message}`)
}

function scheduleRebuild() {
  if (timer) {
    clearTimeout(timer)
  }
  timer = setTimeout(() => triggerRebuild(), DEBOUNCE_MS)
}

async function triggerRebuild() {
  if (running) {
    pending = true
    return
  }

  running = true
  log('Running docs:ai-build + docs:restructure...')

  try {
    await runCommand('npm', ['run', 'docs:ai-build'])
    await runCommand('npm', ['run', 'docs:restructure'])
    log('Docs sync complete.')
  } catch (error) {
    console.error(error)
  } finally {
    running = false
    if (pending) {
      pending = false
      scheduleRebuild()
    }
  }
}

function runCommand(command: string, args: string[]) {
  return new Promise<void>((resolve, reject) => {
    const child = spawn(command, args, { stdio: 'inherit' })
    child.on('close', code => {
      if (code === 0) {
        resolve()
        return
      }
      reject(new Error(`Command ${command} ${args.join(' ')} failed with exit code ${code}`))
    })
  })
}

function startWatcher() {
  for (const root of WATCH_PATHS) {
    if (!existsSync(root)) {
      continue
    }

    watch(root, { recursive: true }, (event, filename) => {
      if (!filename) {
        return
      }
      log(`Detected ${event} on ${filename}`)
      scheduleRebuild()
    })
  }

  log('Watching docs for changes...')
  scheduleRebuild()
}

process.on('SIGINT', () => {
  log('Stopping watcher...')
  process.exit(0)
})

startWatcher()
