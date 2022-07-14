import Link from 'next/link';
import style from './AnimalListItem.module.css';
import ListItem from '../../Style/ListItem';
import Animal from '../../../data/classes/Animal';
import {useState} from "react";
export default function AnimalListItem(props) {
    const [animal, setAnimal] = useState(new Animal(props.id, props.name, props.gender, props.species, props.breed, props.age, props.weight, props.owner));
    return (
        <ListItem>
            <div className={style.listItemContent}>
                <h3>{animal.name}</h3>
                <p>{animal.getAge()}</p>
                <Link href={"/animals/" + props.id}><a>Details</a></Link>
            </div>
        </ListItem>
    );
}
