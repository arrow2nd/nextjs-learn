/* eslint-disable no-undef */
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

function parseMarkdownFile(fileName) {
  // Markdownファイルを文字列として読み込む
  const fullPath = path.join(postsDirectory, fileName)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // 解析
  return matter(fileContents)
}

export function getSortedPostData() {
  // posts以下のファイル名を取得する
  const fileNames = fs.readdirSync(postsDirectory)

  const allPostData = fileNames.map((fileName) => {
    // ファイル名から拡張子を削除
    const id = fileName.replace(/\.md$/, '')

    const parseResult = parseMarkdownFile(fileName)

    return {
      id,
      ...parseResult.data
    }
  })

  // 投稿を日付順にソート
  return allPostData.sort((a, b) => (a.data < b.data ? 1 : -1))
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)

  return fileNames.map((fileNames) => {
    return {
      params: {
        id: fileNames.replace(/\.md/, '')
      }
    }
  })
}

export function getPostData(id) {
  const parseResult = parseMarkdownFile(`${id}.md`)

  return {
    id,
    ...parseResult.data
  }
}
