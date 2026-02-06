import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import { convertToReadableDate } from '@/utils/functions'

interface AuthorAvatarProps {
  post: WPDetailedPost
}

const BlogSpotlight: FC<AuthorAvatarProps> = ({ post }) => {
  const { yoast_head_json } = post

  const authorSchema = yoast_head_json?.schema?.['@graph']?.find(
    (item) => item['@type'] === 'Person'
  )

  const authorName = authorSchema?.name || 'Unknown Author'
  const avatarUrl = authorSchema?.image?.contentUrl || ''

  return (
    <div>
      <Link
        href="/blog"
        className="flex items-center gap-2 mb-4 text-black1/70 dark:text-gray-500"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to blog</span>
      </Link>

      <h1 className="text-[42px] !leading-[1.19] font-bold mb-2">
        {post?.title?.rendered}
      </h1>

      <div className="flex items-center mb-4">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            width={50}
            height={50}
            alt="Author's profile picture"
            className="w-10 h-10 rounded-full mr-2"
          />
        ) : null}

        <div>
          <div className="font-bold">{authorName}</div>
          <div className="text-gray-500">{convertToReadableDate(post.date)}</div>
        </div>
      </div>
    </div>
  )
}

export default BlogSpotlight
