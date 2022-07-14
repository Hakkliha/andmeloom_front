import Link from 'next/link';
import {useState} from 'react';
import {animals as animals_data, owners as owners_data} from '../../../../data/DUMMYDATA';
import Animal from '../../../../data/classes/Animal';
import Owner from '../../../../data/classes/Owner';
import AnimalForm from "../../../../components/Functional/AnimalForm";


export default function OwnerAnimalAdd(props) {
    const [owner, setOwner] = useState(props.owner);
    const [animal, setAnimal] = useState(new Animal());
    return (
        <div>
            <h1>Owner Add Animal for ({owner.id}) {owner.fullName}</h1>
            <AnimalForm fromOwner={true} owner={owner} />
            <p>{JSON.stringify(owner)}</p>
        </div>
    );
}

export async function getStaticPaths() {
    const paths = owners_data.map(owner => ({
        params: {
            id: owner.id.toString(),
        },
    }));
    return {
        paths,
        fallback: 'blocking',
    };
}

export async function getStaticProps(context) {
    const owner = owners_data.find(owner => `${owner.id}` === context.params.id);
    return {
        props: {
            owner: owner.toJSON()
        }
    }
}
