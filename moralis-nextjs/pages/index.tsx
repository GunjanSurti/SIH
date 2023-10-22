import Head from "next/head"
import styles from "../styles/Home.module.css"

import Header from "../components/Header"
import Hom from "../app/page"
export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>SIH2023_DigiLedgers</title>
        <meta name="description" content="Our Smart Contract Lottery" />
        <link rel="icon" href="favicon.ico" />
      </Head>
      <Header />
      <Hom />
    </div>
  )
}
