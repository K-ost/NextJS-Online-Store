import React from 'react'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import { Layout } from '../components/Layout'
import Swiper from 'swiper'
import { SwiperSlide } from 'swiper/react'

const Home: React.FC = () => {
  return (
    <Layout title="Next.js | React | Home page" keywords="next.js, react, online store">
      <div className={styles.container}>

        <div className={styles.banner}></div>

        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.tsx</code>
        </p>

        <div className="row">
          <div className="col-12 col-md-6">
            <a href="https://nextjs.org/docs" className={styles.card}>
              <h2>Documentation &rarr;</h2>
              <p>Find in-depth information about Next.js features and API.</p>
            </a>
          </div>
          <div className="col-12 col-md-6">
            <a href="https://nextjs.org/learn" className={styles.card}>
              <h2>Learn &rarr;</h2>
              <p>Learn about Next.js in an interactive course with quizzes!</p>
            </a>
          </div>
          <div className="col-12 col-md-6">
            <a
              href="https://github.com/vercel/next.js/tree/canary/examples"
              className={styles.card}
            >
              <h2>Examples &rarr;</h2>
              <p>Discover and deploy boilerplate example Next.js projects.</p>
            </a>
          </div>
          <div className="col-12 col-md-6">
            <a
              href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              className={styles.card}
            >
              <h2>Deploy &rarr;</h2>
              <p>
                Instantly deploy your Next.js site to a public URL with Vercel.
              </p>
            </a>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Home
