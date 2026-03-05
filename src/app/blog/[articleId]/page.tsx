import BlogDetails from '@/components/BlogDetails'
import { notFound } from 'next/navigation'
import config from '@/config'
import { getSEOTags } from '@/libs/seo'

export async function generateMetadata({
	params,
}: {
	params: { articleId: string }
}) {
	const articleId = params.articleId

	return getSEOTags({
		title: `${config.appName} Blog`,
		description: config.appDescription,
		canonicalUrlRelative: articleId ? `/blog/${articleId}` : '/blog',
	})
}

export default async function Article({
	params,
}: {
	params: { articleId: string }
}) {
	const slug = params.articleId
	// No external CMS connected; render 404 for unknown slugs.
	if (!slug) {
		return notFound()
	}

	return (
		<>
			<BlogDetails postDetails={{}} allPosts={[]} />
		</>
	)
}
