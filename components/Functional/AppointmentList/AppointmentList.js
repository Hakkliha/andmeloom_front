import AppointmentListItem from '../AppointmentListItem';
import style from './AppointmentList.module.css';
import {useEffect} from "react";

export default function AppointmentList(props) {
    return (
        <div className={style.list}>
            {props.items.map(item => (
                <AppointmentListItem key={item.id} item={item} />
            ))}
        </div>
    );
}
