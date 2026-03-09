import fs from 'fs/promises'
import path from 'path'

import { getSectionEntries } from '@/lib/content'
import { renderSocialImage } from '@/lib/renderSocialImage'

async function main() {
  const outputDir = path.join(process.cwd(), 'public', 'social')
  await fs.mkdir(outputDir, { recursive: true })

  const posts = await getSectionEntries('blog')

  await Promise.all(
    posts.map(async post => {
      const png = await renderSocialImage(post.title)
      const outputPath = path.join(outputDir, `${post.slug}.png`)
      await fs.writeFile(outputPath, png)
    }),
  )

  console.info(`[social] Generated ${posts.length} static social images in public/social`)
}

main().catch(error => {
  console.error('[social] Failed to generate social images')
  console.error(error)
  process.exit(1)
})
