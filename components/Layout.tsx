import Head from 'next/head';
import React, { FC, ReactNode } from 'react';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';

const name = 'shin code'
export const siteTitle = 'Next.js blog'

type LayoutProps = {
  children: ReactNode;
  home?: boolean;
}


const Layout: FC<LayoutProps> = ({ children, home }) => {

  return (
    <div className={styles.container}>
      <Head>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <header className={styles.header}>
        {home ? (
          <div>
            <img src='/images/profile.png' className={`${utilStyles.borderCircle} ${styles.headerHomeImage}`}/>
            <h1>{name}</h1>
          </div>
        ) : (
          <>
            <img src='/images/profile.png' className={utilStyles.borderCircle}/>
            <h1>{name}</h1>
          </>
        )}
        
      </header>
      <main>
        {children}
      </main>
      {!home && (
        <div>
          <Link href='/'>ホームに戻る</Link>
        </div>
      )}
    </div>
  )
}

export default Layout