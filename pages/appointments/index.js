import Link from 'next/link';
import Head from 'next/head'; // for SEO

export default function Appointments(props) {
    return (<>
        <Head>
            <title>Appointments</title>
            <meta name="description" content="Owners list"/>
        </Head>
        <div className="appointments-list">
            <h1>Appointments</h1>
        </div>
        </>
    );
}
