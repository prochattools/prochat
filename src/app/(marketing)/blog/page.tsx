import config from '@/config'
import { getSEOTags } from '@/libs/seo'
import { wordpressService } from '@/libs/wp'
import BlogListingNew from './_assets/components/BlogListingNew'

export const metadata = getSEOTags({
  title: `${config.appName} Blog`,
  description: `Updates, guides, and launch notes for ${config.appName}.`,
  canonicalUrlRelative: '/blog',
})

export default async function Blog() {
  const wpEndpoint = (process.env.WP_REST_ENDPOINT || '').trim()

  if (!wpEndpoint) {
    return (
      <div className="py-16">
        <div className="container mx-auto p-8 px-6 md:px-20 md:w-[80%]">
          <div className="text-center max-w-2xl mx-auto mt-14 mb-14">
            <h1 className="text-4xl font-bold text-center mb-6">
              Blog is not configured
            </h1>
            <p className="text-lg opacity-80 leading-relaxed">
              The blog is an optional SaaSKit feature. To enable it, set
              <code className="mx-2 rounded bg-black/5 px-2 py-1 text-sm dark:bg-white/10">
                WP_REST_ENDPOINT
              </code>
              to your WordPress REST API base URL.
            </p>
            <div className="mt-8 text-left max-w-xl mx-auto rounded-xl border border-black/10 dark:border-white/10 p-5">
              <p className="font-semibold mb-2">Quick setup</p>
              <ol className="list-decimal pl-5 space-y-1 opacity-90">
                <li>
                  Set <code>WP_REST_ENDPOINT</code> in <code>.env</code> (local)
                  or in your production environment.
                </li>
                <li>
                  Example:
                  <code className="ml-2">https://example.com/wp-json/wp/v2</code>
                </li>
                <li>Reload the page.</li>
              </ol>
              <p className="mt-4 text-sm opacity-80">
                See <code>docs/optional-features.md</code> for details.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const articles = (await wordpressService.getAllPosts()) || []

  return (
    <div className="py-16">
      <div className="container mx-auto p-8 px-6 md:px-20 md:w-[80%]">
        <div className="text-center max-w-xl mx-auto mt-14 mb-14">
          <h1 className="text-4xl font-bold text-center mb-6">
            The {config.appName} Blog
          </h1>
          <p className="text-lg opacity-80 leading-relaxed">
            Updates, guides, and launch notes.
          </p>
        </div>
        <BlogListingNew articles={articles as any} />
      </div>
    </div>
  )
}
