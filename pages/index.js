import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {DatePicker, TimePicker} from "antd";
import 'antd/dist/antd.css';
import moment from 'moment';

export default function Home() {
    function onChangeDateTimePicker(value) {
        console.log(value);
    }

    const range = (start, end) => {
        const result = [];

        for (let i = start; i < end; i++) {
            result.push(i);
        }

        return result;
    };

    const disabledDate = (current) => {
        // Can not select days before today and today
        return current && current < moment().startOf("day");
    };

    const disabledRangeTime = () => {
        const currentHour = moment().hours();
        const currentMinute = moment().minutes();
        return {
            disabledHours: () => range(0, currentHour),
            disabledMinutes: () => range(0, currentMinute),
        };
    };
    return (
    <div className={styles.container}>
      <Head>
        <title>Andmeloom</title>
        <meta name="description" content="Andmeloom lehekülg" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
          <DatePicker size={'large'} disabledDate={disabledDate} />
          <TimePicker size={'large'} disabledTime={disabledRangeTime} minuteStep={5} defaultOpenValue={moment('08:00', 'HH:mm')} format={'HH:mm'}/>

      </main>
    </div>
  )
}
