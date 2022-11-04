import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/Layout'
import { getPostsData, Post } from '../lib/post'
import styles from '../styles/Home.module.css'
import utilStyles from '../styles/utils.module.css';

export const getStaticProps = async() => {
  const allPostsData = getPostsData();

  return {
    props: {
      allPostsData,
    }
  }
}


export default function Home({allPostsData}: {allPostsData: Post[]}) {
  return (
    <Layout home>

      <Head>
        <link rel='icon' href='/favicon.ico' />
        <title>{siteTitle}</title>
      </Head>

      <section className={utilStyles.headingMd}>
        <p>私はフルスタックエンジニアです/Udemy講師として活動しています/好きな言語はTypeScriptです</p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2>📝 エンジニアのブログ</h2>
        <div className={styles.grid}>
          {allPostsData.map((post) => (
            <article key={post.id}>
              <Link href={`posts/${post.id}`}>
                <img src={`${post.thumbnail}`} className={styles.thumbnailImage}/>
              </Link>
              <Link href={`posts/${post.id}`} className={utilStyles.boldText}>
                {post.title}
              </Link>
              <br/>
              <small className={utilStyles.lightText}>
                {post.date}
              </small>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  )
}
