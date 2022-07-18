import {useCallback, useEffect, useState} from "react";
import AnimalService from "../../../../functional/AnimalService";
import Animal from "../../../../data/classes/Animal";
import Link from "next/link";
import AppointmentForm from "../../../../components/Functional/AppointmentForm";
import OwnerService from "../../../../functional/OwnerService";
import Owner from "../../../../data/classes/Owner";

export default function AnimalAddAppointment(props) {
    const [animal, setAnimal] = useState(null);

    const updateData = useCallback(async () => {
            const animalResponse = await AnimalService.getAnimalDetail(props.animalId);
            const animalData = animalResponse.data;
            const ownerResponse = await OwnerService.getOwnerDetail(animalData.user.id);
            const ownerData = ownerResponse.data;
            const newOwner = Owner.fromJSON(ownerData);
            const newAnimal = Animal.fromJSON(animalData, newOwner);
            setAnimal(newAnimal);
        }
        , [props.animalId]);

    useEffect(() => {
            updateData().then(() => {
                console.log("Data updated", new Date().getTime());
            }).catch(error => {
                    console.log(error);
                }
            );
        }
        , [updateData]);

    return (
        <div>
            {!! animal && <>
                <h1>Animal Add Appointment</h1>
                <p>
                    <Link href="/animals">
                        <a>Back to animals</a>
                    </Link>
                </p>
                <p>Animal: {animal.name}</p>
                <p>Animal ID: {animal.id}</p>
                <AppointmentForm animal={animal}/>
            </>}
        </div>
    );

}

export async function getStaticPaths() {
    const animalsList = ["1", "2", "3"];
    const paths = animalsList.map(animal => ({
        params: {
            id: animal.toString(),
        },
    }));
    return {
        paths,
        fallback: 'blocking',
    };
}

export async function getStaticProps(context) {
    return {
        props: {
            animalId: context.params.id,
        }
    }
}
