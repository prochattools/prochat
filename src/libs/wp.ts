import axios from 'axios'
import WPAPI from 'wpapi'

// Expected WP_REST_ENDPOINT:
// - https://example.com/wp-json
// (If you provide https://example.com/wp-json/wp/v2, we normalize it.)
class WordpressService {
  private wp: any
  private endpoint: string

  constructor() {
    const raw = (process.env.WP_REST_ENDPOINT || '').trim()
    this.endpoint = raw.replace(/\/wp\/v2\/?$/, '')
    this.wp = this.endpoint ? new WPAPI({ endpoint: this.endpoint }) : null
  }

  public async getAllPosts() {
    if (!this.endpoint) return []

    try {
      const appPostsResp = await axios.get(
        `${this.endpoint}/wp/v2/posts?_fields=id,slug,title,featured_media,date,author`,
        { method: 'GET' }
      )

      const parsedResp: WPPost[] = appPostsResp.data
      const finalList: any[] = []

      for (const post of parsedResp) {
        let imageUrl = ''
        if (post.featured_media > 0) {
          const image = await this.getImageURLById(post.featured_media)
          imageUrl = image?.guid?.rendered
        }

        finalList.push({
          ...post,
          image_url: imageUrl,
        })
      }

      return finalList
    } catch (e) {
      console.error(e)
      return []
    }
  }

  public async getPostsForSitemap(): Promise<
    {
      slug: string
      date: string
    }[]
  > {
    if (!this.endpoint) return []

    const appPostsResp = await fetch(
      `${this.endpoint}/wp/v2/posts?_fields=slug,date`,
      { method: 'GET' }
    )
    return appPostsResp.json()
  }

  public async getImageURLById(id: number) {
    if (!this.wp) return null
    return this.wp.media().id(id)
  }

  public async getPost(slug: string): Promise<WPDetailedPost | null> {
    if (!this.wp) return null

    const resp = await this.wp.posts().slug(slug)
    return resp?.[0] || null
  }
}

export const wordpressService = new WordpressService()
