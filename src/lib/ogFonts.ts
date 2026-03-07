import fs from 'fs'
import path from 'path'

function readFont(relativePath: string) {
  return fs.readFileSync(path.join(process.cwd(), 'public', relativePath))
}

export const ogFonts = [
  {
    name: 'Golos',
    data: readFont('fonts/GolosText-Regular.ttf'),
    weight: 400 as const,
    style: 'normal' as const,
  },
  {
    name: 'Golos',
    data: readFont('fonts/GolosText-Bold.ttf'),
    weight: 700 as const,
    style: 'normal' as const,
  },
  {
    name: 'JetBrains Mono',
    data: readFont('fonts/JetBrainsMono-Regular.ttf'),
    weight: 400 as const,
    style: 'normal' as const,
  },
]
