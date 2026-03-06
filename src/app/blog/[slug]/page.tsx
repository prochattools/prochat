import { notFound } from 'next/navigation'
import { getSEOTags } from '@/libs/seo'
import {
  BlogPost,
  getAllBlogPosts,
  getBlogPostBySlug,
  getBlogPostSlugs,
} from '@/libs/blog'
import StructuredData from '@/components/StructuredData'
import { getBlogPostingSchema } from '@/libs/structured-data'
import ArticleLayout from '@/components/blog/ArticleLayout'
import { renderBlogMdx } from '@/libs/blog-mdx'

export const dynamic = 'force-static'

type PageParams = {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const slugs = await getBlogPostSlugs()
  return slugs.map((slug: string) => ({ slug }))
}

export async function generateMetadata({ params }: PageParams) {
  const post = await getBlogPostBySlug(params.slug)

  if (!post) {
    return getSEOTags({
      title: 'Article Not Found | ProChat Blog',
      description: 'The requested blog article could not be found.',
      canonicalUrlRelative: '/blog',
    })
  }

  return getSEOTags({
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.description,
    keywords: post.keywords,
    canonicalUrlRelative: `/blog/${post.slug}`,
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.description,
      images: [post.ogImage || '/og/prochat-home.png'],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.description,
      images: [post.ogImage || '/og/prochat-home.png'],
    },
  })
}

export default async function BlogArticlePage({ params }: PageParams) {
  const post = await getBlogPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = (await getAllBlogPosts())
    .filter((item: BlogPost) => item.slug !== post.slug)
    .slice(0, 2)
  const articleContent = await renderBlogMdx(post.content)

  return (
    <>
      <StructuredData
        id={`schema-blog-${post.slug}`}
        data={getBlogPostingSchema({
          title: post.title,
          description: post.description,
          slug: post.slug,
          datePublished: post.date,
          dateModified: post.updated,
        })}
      />
      <ArticleLayout post={post} relatedPosts={relatedPosts}>
        {articleContent}
      </ArticleLayout>
    </>
  )
}
