import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {DatePicker, TimePicker} from "antd";
import moment from 'moment';

export default function Home() {

    return (
    <div className={styles.container}>
      <Head>
        <title>Andmeloom</title>
        <meta name="description" content="Andmeloom lehekülg" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
          <h1>XD</h1>
      </main>
    </div>
  )
}
