import styles from "./OwnerListItem.module.css";
import ListItem from "../../Style/ListItem";
import Owner from "../../../data/classes/Owner";
import {useState} from "react";
import Link from "next/link";
import {animals as animals_data, owners as owners_data} from "../../../data/DUMMYDATA";

export default function OwnerListItem(props) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const owner = props.item;
    const ownerAnimals = animals_data.filter(animal => animal.owner.id === owner.id);
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
