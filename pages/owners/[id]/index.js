import Link from 'next/link';
import {useState} from 'react';
import {animals as animals_data, owners as owners_data, appointments as appointments_data} from '../../../data/DUMMYDATA';
import Animal from '../../../data/classes/Animal';
import Owner from '../../../data/classes/Owner';
import Appointment from '../../../data/classes/Appointment';

export default function OwnerDetail(props) {
    const [owner, setOwner] = useState(new Owner(props.owner.id, props.owner.email, props.owner.firstname, props.owner.lastname, `${props.owner.firstname} ${props.owner.lastname}`, props.owner.phone, props.owner.street, props.owner.houseNr, props.owner.apartment, props.owner.city, props.owner.zip, props.owner.county, props.owner.country));
    const [appointments, setAppointments] = useState(appointments_data.filter(appointment => appointment.owner.id === owner.id));
    const [animals, setAnimals] = useState(animals_data.filter(animal => animal.owner.id === owner.id));
    return (
        <div>
            <h1>Owner Detail</h1>
            <p>
                <Link href="/owners">
                    <a>Back to owners</a>
                </Link>
            </p>
            <p>
                <Link href={`/owners/${owner.id}/add_animal`}>
                    <a>Add Animal</a>
                </Link>
            </p>
            <div>
            {/*List of animals*/}
            <h2>Animals</h2>
            <div className="animals">
                {animals.map(animal => (
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
