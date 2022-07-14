import Link from 'next/link';
import {useState, useEffect, useCallback} from 'react';
import {animals as animals_data, owners as owners_data, appointments as appointmens_data} from '../../../data/DUMMYDATA';
import Animal from '../../../data/classes/Animal';
import Owner from '../../../data/classes/Owner';
import Appointment from "../../../data/classes/Appointment";


export default function AnimalDetail(props) {
    const [owner, setOwner] = useState(owners_data[0]);
    const [animal, setAnimal] = useState(animals_data[0]);
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const owner = owners_data.find(owner => owner.id === props.owner.id);
        const animal = animals_data.find(animal => animal.id === props.animal.id);
        const appointments = appointmens_data.filter(appointment => appointment.animal.id === animal.id);
        setOwner(owner);
        setAnimal(animal);
        setAppointments(appointments);
    }, [props.animal.id, props.owner.id]);
    return (
        <div>
            <h1>Animal Detail</h1>
            <p>
                <Link href="/animals">
                    <a>Back to animals</a>
                </Link>
            </p>
            <h1>{animal.name}</h1>
            <div>
            {/*    Owner link*/}
            <p>
                <Link href={`/owners/${owner.id}`}>
                    <a>{owner.firstname} {owner.lastname}</a>
                </Link>
            </p>
            </div>
            <div>
            {/*    List of appointments*/}
            <h2>Appointments</h2>
            <div className="appointments">
                {appointments.map(appointment => (
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
    const paths = animals_data.map(animal => ({
        params: {
            id: animal.id.toString(),
        },
    }));
    return {
        paths,
        fallback: 'blocking',
    };
}

export async function getStaticProps(context) {
    const animal = animals_data.find(animal => `${animal.id}` === context.params.id);
    const owner = owners_data.find(owner => owner.id === animal.owner.id);
    console.log(owners_data[0].id, animal.owner.id, owners_data[0].id === animal.owner.id);
    return {
        props: {
            animal: animal.toJSON(),
            owner: owner.toJSON()
        }
    }
}
