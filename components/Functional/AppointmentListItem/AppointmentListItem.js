import Link from 'next/link';
import style from './AppointmentListItem.module.css';
import ListItem from '../../Style/ListItem';
import Appointment from '../../../data/classes/Appointment';
import {useEffect, useState} from "react";

export default function AppointmentListItem(props) {
    const [appointment, setAppointment] = useState(null);
    useEffect(() => {
        console.log(props.item);
        setAppointment(props.item);
    }, [props.item]);
    return (
        <ListItem>{!! appointment &&
            <div className={style.listItemContent}>
                <h3>Owner: {appointment?.owner.getFullName()} | Animal: {appointment?.animal.name}</h3>
                <p>{appointment?.getDateTimeISO()}</p>
                <Link href={"/appointments/" + props.item.id}><a>Details</a></Link>
            </div>}
        </ListItem>
    );
}
