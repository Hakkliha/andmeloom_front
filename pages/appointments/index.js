import Link from 'next/link';
import Head from 'next/head'; // for SEO
import AppointmentList from "../../components/Functional/AppointmentList";
import {useData} from "../../functional/DataContext";
import {useState} from "react";
import Searchbar from "../../components/Style/Searchbar";

export default function Appointments(props) {
    const {appointments, fetchAppointments} = useData();
    return (<>
        <Head>
            <title>Appointments</title>
            <meta name="description" content="Owners list"/>
        </Head>
        <div className="appointments-list">

            <div>
                <h1>Appointments</h1>
                <Searchbar/>
                <p>
                    <Link href="/appointments/new">
                        <a>Create new appointment</a>
                    </Link>
                </p>
            </div>
            <AppointmentList items={appointments}/>
        </div>
        </>
    );
}
