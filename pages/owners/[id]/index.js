import Link from 'next/link';
import {useState, useCallback, useEffect} from 'react';
import {animals as animals_data, owners as owners_data, appointments as appointments_data} from '../../../data/DUMMYDATA';
import Animal from '../../../data/classes/Animal';
import Owner from '../../../data/classes/Owner';
import Appointment from "../../../data/classes/Appointment";
import AnimalService from "../../../functional/AnimalService";
import OwnerService from "../../../functional/OwnerService";

export default function OwnerDetail(props) {
    const [owner, setOwner] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [animals, setAnimals] = useState([]);

    const updateData = useCallback(async () => {
        const ownerResponse = await OwnerService.getOwnerDetail(props.ownerId);
        const ownerData = ownerResponse.data;
        const animalResponse = await AnimalService.getAnimalsByUser(props.ownerId);
        const animalData = animalResponse.data;
        const newOwner = Owner.fromJSON(ownerData);
        const newAnimals = animalData.map(animal => Animal.fromJSON(animal, newOwner));
        const appointmentsResponse = appointments_data.filter(appointment => appointment.owner.id === newOwner.id);
        // const newAppointments = appointmentsResponse.map(appointment => Appointment.fromJSON(appointment));
        setOwner(newOwner);
        setAnimals(newAnimals);
        setAppointments(appointmentsResponse);
    }
    , [props.ownerId]);

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
            <h1>Owner Detail</h1>
            <p>
                <Link href="/owners">
                    <a>Back to owners</a>
                </Link>
            </p>
            <p>
                {!!owner &&
                    <Link href={`/owners/${owner.id}/add_animal`}>
                        <a>Add Animal</a>
                    </Link>}
            </p>
            <div>
            {/*List of animals*/}
            <h2>Animals</h2>
            <div className="animals">
                {!! animals && animals.map(animal => (
                    <div key={animal.id}>
                        <Link href={`/animals/${animal.id}`}>
                            <a>{animal.name}</a>
                        </Link>
                    </div>
                ))}
            </div>
            {/*List of appointments*/}
            <h2>Appointments</h2>
            <div className="appointments">
                {!!appointments && appointments.map(appointment => (
                    <div key={appointment.id}>
                        <Link href={`/appointments/${appointment.id}`}>
                            <a>{appointment.getDateTimeISO()}</a>
                        </Link>
                    </div>
                ))}
            </div>
            </div>
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
    return {
        props: {
            ownerId: context.params.id
        }
    }
}
