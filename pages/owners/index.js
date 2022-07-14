import Link from 'next/link';
import style from '../../styles/animals/AnimalList.module.css';
import AnimalList from '../../components/Functional/AnimalList';
import {useState} from 'react';
import {owners as owner_data} from '../../data/DUMMYDATA';
import Head from 'next/head';
import Searchbar from "../../components/Style/Searchbar";
import OwnerList from "../../components/Functional/OwnerList";


export default function Owners(props) {
    const [owners, setOwners] = useState(owner_data);
    return (
        <>
            <Head>
                <title>Owners</title>
                <meta name="description" content="Owners list"/>
            </Head>
            <div>
                <div className={style.searchContainer}>
                    <h1>Owners</h1>
                    <Searchbar/>
                    <p>
                        <Link href="/owners/new">
                            <a>Create new owner</a>
                        </Link>
                    </p>
                </div>
                <div className={style.listContainer}>
                    <OwnerList items={owners}/>
                </div>
            </div>
        </>
    );
}
