import styles from "./OwnerListItem.module.css";
import ListItem from "../../Style/ListItem";
import Owner from "../../../data/classes/Owner";
import {useCallback, useEffect, useState} from "react";
import Link from "next/link";
import {animals as animals_data, owners as owners_data} from "../../../data/DUMMYDATA";
import AnimalService from "../../../functional/AnimalService";
import {useData} from "../../../functional/DataContext";

export default function OwnerListItem(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [ownerAnimals, setOwnerAnimals] = useState([]);
    const [owner, setOwner] = useState(new Owner());
    const {animals, fetchAnimals} = useData();
    const toggle = () => setIsOpen(!isOpen);

    const getOwnerAnimals = useCallback(async () => {
        const response = await AnimalService.getAnimalsByUser(props.item.id);
        setOwnerAnimals(response.data);
    }, [props.item.id]);

    useEffect(() => {
        setOwner(props.item);
        getOwnerAnimals().then(
            () => {
                console.log("Owner animals updated");
            }
        ).catch(
            (error) => {
                console.log(error);
            }
        );
    }
    , [props.item, getOwnerAnimals]);
    return (
        <ListItem>
            <div className={styles.owner}>
                <div className={styles.ownerName}>
                    <Link href={`/owners/${owner.id}`}>
                        <a>{owner.fullName}</a>
                    </Link>
                </div>
                <div className={styles.ownerActions}>
                    <button onClick={toggle}>{isOpen ? "Close" : "Open"}</button>
                </div>
            </div>
            {isOpen && (
                <div className={styles.ownerAnimals}>
                    {ownerAnimals.map(animal => (
                        <div key={animal.id}><Link href={`/animals/${animal.id}`}><a>{animal.name}</a></Link>&nbsp;</div>
                    ))}
                </div>
            )}
        </ListItem>
    );
}
