import Link from 'next/link';
import {useCallback, useEffect, useState} from 'react';
import Animal from '../../../data/classes/Animal';
import Owner from '../../../data/classes/Owner';
import Appointment from "../../../data/classes/Appointment";
import AnimalService from "../../../functional/AnimalService";
import OwnerService from "../../../functional/OwnerService";
import AppointmentService from "../../../functional/AppointmentService";
import axios from "axios";

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
        const appointmentsResponse = await AppointmentService.getAppointmentsByUser(props.ownerId);
        const newAppointments = appointmentsResponse.data.map(appointment => Appointment.fromJSON(appointment));
        setOwner(newOwner);
        setAnimals(newAnimals);
        setAppointments(newAppointments);
    }, [props.ownerId]);

    useEffect(() => {
        updateData().then(() => {
            console.log("Data updated", new Date().getTime());
        }).catch(error => {
            console.log(error);
        });
    }, [updateData]);

    return (<div>
        <h1>Owner Detail</h1>
        <p>
            <Link href="/owners">
                <a>Back to owners</a>
            </Link>
        </p>
        <p>
            {!!owner && <>
                <h2>{!!owner.firstName ? owner.fullName : "No Name"}</h2>
                <Link href={`/owners/${owner.id}/add_animal`}>
                    <a>Add Animal</a>
                </Link></>}
        </p>
        <div>
            {/*List of animals*/}
            <h2>Animals</h2>
            <div className="animals">
                {!!animals && animals.map(animal => (<div key={animal.id}>
                    <Link href={`/animals/${animal.id}`}>
                        <a>{animal.name}</a>
                    </Link>
                </div>))}
            </div>
            {/*List of appointments*/}
            <h2>Appointments</h2>
            <div className="appointments">
                {!!appointments && appointments.map(appointment => (<div key={appointment.id}>
                    <Link href={`/appointments/${appointment.id}`}>
                        <a>{appointment.getDateTimeISO()}</a>
                    </Link>
                </div>))}
            </div>
        </div>
    </div>);
}

export async function getStaticPaths() {
    // const credentials = await axios.post('http://localhost:8080/api/auth/signin', {
    //     username: "irw", password: "kakajunn123"
    // });
    // const allOwners = await axios({
    //     url: 'http://localhost:8080/api/owners/owner_ids', method: 'get', headers: {
    //         "Content-Type": "application/json", "Authorization": "Bearer " + credentials.data.token
    //     }
    // });

    const allOwners = ["1", "2", "3"];
    const paths = allOwners.map(id => ({
        params: {
            id: id.toString(),
        },
    }));
    return {
        paths, fallback: 'blocking',
    };
}

export async function getStaticProps(context) {
    return {
        props: {
            ownerId: context.params.id
        }
    }
}
