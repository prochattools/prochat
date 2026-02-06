import BlogDetails from '@/components/BlogDetails'
import config from '@/config'
import { wordpressService } from '@/libs/wp'
import { getSEOTags } from '@/libs/seo'
import { notFound } from 'next/navigation'

export async function generateMetadata({
  params,
}: {
  params: { articleId: string }
}) {
  const wpEndpoint = (process.env.WP_REST_ENDPOINT || '').trim()

  if (!wpEndpoint) {
    return getSEOTags({
      title: `${config.appName} Blog`,
      description: `Updates, guides, and launch notes for ${config.appName}.`,
      canonicalUrlRelative: '/blog',
    })
  }

  try {
    const post = await wordpressService.getPost(params.articleId)

    if (!post) {
      return getSEOTags({
        title: `${config.appName} Blog`,
        description: `Updates, guides, and launch notes for ${config.appName}.`,
        canonicalUrlRelative: '/blog',
      })
    }

    const yoast = (post as any).yoast_head_json

    return {
      title: yoast?.title || post.title?.rendered || `${config.appName} Blog`,
      description: yoast?.og_description || yoast?.description,
      openGraph: {
        title: yoast?.og_title || post.title?.rendered,
        description: yoast?.og_description,
        type: 'article',
        url: `${process.env.NEXT_PUBLIC_APP_URL}/blog/${post.slug}`,
      },
      twitter: {
        card: (yoast?.twitter_card as any) || 'summary_large_image',
        title: yoast?.og_title || post.title?.rendered,
        description: yoast?.og_description,
      },
    }
  } catch {
    return getSEOTags({
      title: `${config.appName} Blog`,
      description: `Updates, guides, and launch notes for ${config.appName}.`,
      canonicalUrlRelative: '/blog',
    })
  }
}

export default async function Article({
  params,
}: {
  params: { articleId: string }
}) {
  const wpEndpoint = (process.env.WP_REST_ENDPOINT || '').trim()

  if (!wpEndpoint) {
    return (
      <div className="py-16 max-w-3xl mx-auto px-6">
        <h1 className="text-3xl font-bold mb-4">Blog is not configured</h1>
        <p className="opacity-80">
          Set <code>WP_REST_ENDPOINT</code> to enable blog posts.
        </p>
        <p className="mt-4 text-sm opacity-80">
          See <code>docs/optional-features.md</code>.
        </p>
      </div>
    )
  }

  const slug = params.articleId
  const post = await wordpressService.getPost(slug)
  if (!post) {
    notFound()
  }

  const articles = (await wordpressService.getAllPosts()) || []

  return <BlogDetails postDetails={post} allPosts={articles} />
}
