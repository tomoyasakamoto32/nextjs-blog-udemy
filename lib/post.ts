import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), "posts")

export type Post = {
  id: string;
  title: string;
  date: string;
  thumbnail: string;
}

// mdファイルのデータを取り出す
export const getPostsData = () => {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");

    // マークダウンを文字列として読み取る
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContents)

    // idとデータを返す
    return {
      id,
      ...matterResult.data,
    }
  })

  return allPostsData
}

// getStaticPathのreturnで使うpathを取得する
export const getAllPostId = () => {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, "")
      }
    }
  });
}

export type PostDetail = {
  id: string;
  blogContentHTML: string;
  title: string;
  date: string;
  thumbnail: string;
}

// idに基づいてブログのデータを返す
export const getPostData = async(id: string): Promise<PostDetail> => {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);

  const blogContent = await remark().use(html).process(matterResult.content);
  const blogContentHTML = blogContent.toString();

  return {
    id,
    blogContentHTML,
    title: matterResult.data.title,
    date: matterResult.data.date,
    thumbnail: matterResult.data.thumbnail,
  }
}