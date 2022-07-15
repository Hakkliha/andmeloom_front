import Link from 'next/link';
import style from '../../styles/animals/AnimalList.module.css';
import AnimalList from '../../components/Functional/AnimalList';
import {useEffect, useState} from 'react';
import {animals as animals_data} from '../../data/DUMMYDATA';
import Head from 'next/head';
import Searchbar from "../../components/Style/Searchbar";
import AnimalService from "../../functional/AnimalService";
import TokenService from "../../functional/TokenService";
import {useData} from "../../functional/DataContext";


export default function Animals(props) {
    const [searchParam, setSearchParam] = useState('');
    const {animals, fetchAnimals} = useData();

    return (
        <>
            <Head>
                <title>Animals</title>
                <meta name="description" content="Animals list"/>
            </Head>
            <div>
                <div className={style.searchContainer}>
                    <h1>Animals</h1>
                    <Searchbar/>
                    <p>
                        <Link href="/animals/new">
                            <a>Create new animal</a>
                        </Link>
                    </p>
                </div>
                <div className={style.listContainer}>
                    <AnimalList items={animals}/>
                </div>
            </div>
        </>
    );
}
