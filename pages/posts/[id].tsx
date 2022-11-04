import { GetStaticProps } from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';
import React from 'react'
import Layout from '../../components/Layout'
import { getAllPostId, getPostData, PostDetail } from '../../lib/post'
import utilStyles from '../../styles/utils.module.css'

export const getStaticPaths = () => {
  const paths = getAllPostId();
  return {
    paths,
    fallback: false,
  }
}

type Props = {
  postData: PostDetail
}

interface Params extends ParsedUrlQuery {
  id: string
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  const postData = await getPostData(params?.id ?? '')
  
  return {
    props: {
      postData,
    }
  }
}

const Post = ({postData}: {postData: PostDetail}) => {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingX1}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          {postData.date}
        </div>
        <div dangerouslySetInnerHTML={{__html: postData.blogContentHTML}}/>
      </article>
      <br/>
    </Layout>
  )
}

export default Post