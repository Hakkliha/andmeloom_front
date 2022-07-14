import Link from 'next/link';
import {useState, useEffect, useCallback} from 'react';
import {animals as animals_data, owners as owners_data, appointments as appointmens_data} from '../../../data/DUMMYDATA';
import Animal from '../../../data/classes/Animal';
import Owner from '../../../data/classes/Owner';
import Appointment from "../../../data/classes/Appointment";

export default function AppointmentDetail(props) {
    const [owner, setOwner] = useState(owners_data[0]);
    const [animal, setAnimal] = useState(animals_data[0]);
    const [appointment, setAppointment] = useState(appointmens_data[0]);

    useEffect(() => {
        const owner = owners_data.find(owner => owner.id === props.appointment.owner);
        const animal = animals_data.find(animal => animal.id === props.appointment.animal);
        const appointment = appointmens_data.find(appointment => appointment.id === props.appointment.id);
        setOwner(owner);
        setAnimal(animal);
        setAppointment(appointment);
    }, [props.appointment.animal, props.appointment.owner, props.appointment.id]);
    return (
        <div>
            <h1>Appointment Detail</h1>
            <p>
                <Link href="/appointments">
                    <a>Back to appointments</a>
                </Link>
            </p>
            <h1>{appointment.getDateTimeISO()}</h1>
            <div>
            {/*    Owner link*/}
                <h2>Owner</h2>
            <p>
                <Link href={`/owners/${owner.id}`}>
                    <a>{owner.firstname} {owner.lastname}</a>
                </Link>
            </p>

            </div>
            <div>
            {/*    Animal link*/}
                <h2>Animal</h2>
            <p>
                <Link href={`/animals/${animal.id}`}>
                    <a>{animal.name}</a>
                </Link>
            </p>
            </div>
        </div>
    );
}

export async function getStaticPaths() {
    const paths = appointmens_data.map(appointment => ({
        params: {
            id: appointment.id.toString(),
        },
    }));
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({params}) {
    const appointment = appointmens_data.find(appointment => appointment.id === Number(params.id));
    return {
        props: {
            appointment: appointment.toJSON(),
        },
    };
}
