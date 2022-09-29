import HeaderSearch from '@/Components/MainPage/HeaderSearch'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'

export default function Home() {
  return (
    <>
      <Head>
        <title>Ev Arkadaşı İlanları</title>
        <meta name="description" content="Ev Arkadaşı İlanları Description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeaderSearch />
    </>
  )
}
