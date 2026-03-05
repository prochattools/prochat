import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getSEOTags } from '@/libs/seo'
import {
  BlogPost,
  getAllBlogPosts,
  getBlogPostBySlug,
  getBlogPostSlugs,
} from '@/libs/blog'
import StructuredData from '@/components/StructuredData'
import { getBlogPostingSchema } from '@/libs/structured-data'
import ContextualLinkCta from '@/components/ContextualLinkCta'

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

function formatDate(dateIso: string) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateIso))
}

export default async function BlogArticlePage({ params }: PageParams) {
  const post = await getBlogPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = (await getAllBlogPosts())
    .filter((item: BlogPost) => item.slug !== post.slug)
    .slice(0, 2)

  return (
    <main className="mx-auto max-w-4xl px-page pb-20 pt-28 md:pt-32">
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

      <article>
        <header className="border-b border-border pb-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            {post.cluster}
          </p>
          <h1 className="mt-3 font-brand text-4xl font-bold tracking-[-0.02em] text-foreground md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            {post.description}
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            {formatDate(post.date)} · {post.readingTimeMinutes} min read
          </p>
        </header>

        <div
          className="prose prose-slate mt-10 max-w-none prose-headings:font-brand prose-headings:text-foreground prose-a:text-primary dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      <ContextualLinkCta
        className="mt-12"
        title="Build on Stable Ground"
        description="Use a production-ready Next.js SaaS baseline while you execute on distribution and customer value."
        links={[
          { href: '/kits/saaskit', label: 'Explore SaaSKit' },
          { href: '/kits/uxkit-waitlist', label: 'Join UXKit Waitlist' },
        ]}
      />

      {relatedPosts.length > 0 && (
        <section className="mt-10">
          <h2 className="font-brand text-2xl font-bold text-foreground">
            Related Reads
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {relatedPosts.map((related: BlogPost) => (
              <Link
                key={related.slug}
                href={`/blog/${related.slug}`}
                className="rounded-2xl border border-border-subtle bg-surface p-4 shadow-surface transition-all hover:border-border-strong hover:shadow-elevated"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {related.cluster}
                </p>
                <h3 className="mt-2 font-brand text-lg font-bold text-foreground">
                  {related.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {related.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
