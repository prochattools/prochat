import fs from 'fs/promises'
import path from 'path'

import {
  getProductionGuideEntry,
  getProductionGuideSocialImage,
} from '../src/lib/learning/production-guide.ts'
import { renderSocialImage } from '../src/lib/renderSocialImage.ts'

const RESERVED_SOCIAL_FILES = new Set([
  'fb.png',
  'insta.png',
  'linkedin.png',
  'x.png',
])

async function pruneLegacySocialImages(outputDir: string, keepFiles: Set<string>) {
  const files = await fs.readdir(outputDir)

  await Promise.all(
    files
      .filter(file => file.endsWith('.png') && !keepFiles.has(file))
      .map(file => fs.unlink(path.join(outputDir, file))),
  )
}

async function main() {
  const outputDir = path.join(process.cwd(), 'public', 'social')
  await fs.mkdir(outputDir, { recursive: true })

  const entry = await getProductionGuideEntry()
  const staticImage = entry ? getProductionGuideSocialImage(entry) : null
  const keepFiles = new Set(RESERVED_SOCIAL_FILES)

  if (staticImage) {
    keepFiles.add(`${staticImage.slug}.png`)
  }

  await pruneLegacySocialImages(outputDir, keepFiles)

  if (!staticImage) {
    console.info('[social] No production guide source found; removed stale generated social images.')
    return
  }

  const png = await renderSocialImage(staticImage)
  const outputPath = path.join(outputDir, `${staticImage.slug}.png`)
  await fs.writeFile(outputPath, png)

  console.info(`[social] Generated 1 static social image in ${path.relative(process.cwd(), outputDir)}`)
}

main().catch(error => {
  console.error('[social] Failed to generate social images')
  console.error(error)
  process.exit(1)
})
