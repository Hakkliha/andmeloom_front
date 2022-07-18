import Link from 'next/link';
import {useState, useEffect, useCallback} from 'react';
import {animals as animals_data, owners as owners_data, appointments as appointmens_data} from '../../../data/DUMMYDATA';
import Animal from '../../../data/classes/Animal';
import Owner from '../../../data/classes/Owner';
import Appointment from "../../../data/classes/Appointment";
import AppointmentService from "../../../functional/AppointmentService";
import moment from "moment";
import {useData} from "../../../functional/DataContext";
import {useRouter} from "next/router";
import {ImCross} from "react-icons/im";
import {getStaticPathsAppointment} from "../../../functional/RouterService";

export default function AppointmentDetail(props) {
    const [appointment, setAppointment] = useState(null);
    const router = useRouter();
    const {fetchData} = useData();
    const updateData = useCallback(async () => {
        const appointmentResponse = await AppointmentService.getAppointmentsDetail(props.appointmentId);
        const appointmentData = appointmentResponse.data;
        const newOwner = Owner.fromJSON(appointmentData.user);
        const newAnimal = Animal.fromJSON(appointmentData.animal, newOwner);
        const newAppointment = Appointment.fromJSON(appointmentData, newOwner, newAnimal);
        console.log(appointmentData, newAppointment);
        setAppointment(newAppointment);
    }
    , [props.appointmentId]);

    const onClickDelete = useCallback(async () => {
        const response = await AppointmentService.deleteAppointments(props.appointmentId);
        if (response.status === 200) {
            console.log("Appointment deleted");
            await fetchData();
            await router.push("/appointments");
        } else {
            console.log("Error deleting appointment");
        }
    }
    , [props.appointmentId]);

    useEffect(() => {
        updateData().then(() => {
            console.log("Data updated", new Date().getTime());
        }
        ).catch(error => {
            console.log(error);
        }
        );
    }, [updateData]);
    return (
        <div>
            <h1>Appointment Detail</h1>
            <p>
                <Link href="/appointments">
                    <a>Back to appointments</a>
                </Link>
            </p>
            <p onClick={onClickDelete}><ImCross size={24}/> Delete</p>

            {!!appointment && <>
                <h1>{moment(appointment.getDateTimeISO()).format("DD.MM.YYYY HH:mm")}</h1>
                <div>
                    {/*    Owner link*/}
                    <h2>Owner</h2>
                    <p>
                        <Link href={`/owners/${appointment.owner.id}`}>
                            <a>{appointment.owner.firstName} {appointment.owner.lastName}</a>
                        </Link>
                    </p>

                </div>
                <div>
                    {/*    Animal link*/}
                    <h2>Animal</h2>
                    <p>
                        <Link href={`/animals/${appointment.animal.id}`}>
                            <a>{appointment.animal.name}</a>
                        </Link>
                    </p>
                </div>
            </>}
        </div>
    );
}

export async function getStaticPaths() {
    return await getStaticPathsAppointment();
}

export async function getStaticProps(context) {
    return {
        props: {
            appointmentId: context.params.id,
        },
    };
}
