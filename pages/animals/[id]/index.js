import Link from 'next/link';
import {useState, useEffect, useCallback} from 'react';
import {animals as animals_data, owners as owners_data, appointments as appointmens_data} from '../../../data/DUMMYDATA';
import Animal from '../../../data/classes/Animal';
import Owner from '../../../data/classes/Owner';
import Appointment from "../../../data/classes/Appointment";
import AnimalService from "../../../functional/AnimalService";
import OwnerService from "../../../functional/OwnerService";
import {ImCross} from 'react-icons/im';
import {useData} from "../../../functional/DataContext";
import {useRouter} from "next/router";


export default function AnimalDetail(props) {
    const {fetchData} = useData();
    const router = useRouter();
    const [owner, setOwner] = useState(null);
    const [animal, setAnimal] = useState(null);
    const [appointments, setAppointments] = useState([]);

    const updateData = useCallback(async () => {
        const animalResponse = await AnimalService.getAnimalDetail(props.animalId);
        const animalData = animalResponse.data;
        const ownerResponse = await OwnerService.getOwnerDetail(animalData.user.id);
        const ownerData = ownerResponse.data;
        const newOwner = Owner.fromJSON(ownerData);
        const newAnimal = Animal.fromJSON(animalData, newOwner);
        const appointmentsResponse = appointmens_data.filter(appointment => appointment.animal.id === newAnimal.id);
        // const newAppointments = appointmentsResponse.map(appointment => Appointment.fromJSON(appointment));
        setOwner(newOwner);
        setAnimal(newAnimal);
        setAppointments(appointmentsResponse);
    }
    , [props.animalId]);

    useEffect(() => {
        updateData().then(() => {
            console.log("Data updated", new Date().getTime());
        }).catch(error => {
            console.log(error);
        }
        );
    }, [updateData]);

    const onClickDelete = async () => {
        const response = await AnimalService.deleteAnimal(props.animalId);
        if (response.status === 200) {
            console.log("Animal deleted");
            await fetchData();
            await router.push("/animals");
        } else {
            console.log("Error deleting animal");
        }
    }
    return (
        <div>
            <h1>Animal Detail</h1>
            <p>
                <Link href="/animals">
                    <a>Back to animals</a>
                </Link>
            </p>
            <h1>{!!animal ? animal.name : "Animal name data missing"}</h1>
            <p onClick={onClickDelete}><ImCross size={24}/> Delete</p>
            <div>
            {/*    Owner link*/}
            <p>{!!owner &&
                <Link href={`/owners/${owner.id}`}>
                    <a>{owner.firstName} {owner.lastName}</a>
                </Link>}
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
    return {
        props: {
            animalId: context.params.id,
        }
    }
}
