import DocsThemeLayout from './DocsThemeLayout'
import { NotFoundPage } from 'nextra-theme-docs'

export default async function DocsNotFound() {
  return DocsThemeLayout({
    children: <NotFoundPage content="The requested public docs page could not be found." />,
  })
}
