import Head from "next/head"
import Link from "next/link"
import { FC } from "react"

const firstPost: FC = () => {
  return (
    <div>
      <Head>
        <title>最初の投稿</title>
      </Head>
      <h1>最初の投稿</h1>
      <Link href='/'>ホームに戻る</Link>
    </div>
  )
}

export default firstPost