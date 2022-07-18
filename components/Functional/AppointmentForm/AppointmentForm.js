import styles from './AppointmentForm.module.css';
import {useState, useEffect, useCallback} from "react";
import {DatePicker, TimePicker} from "antd";
import moment from "moment";
import 'antd/dist/antd.css';
import AppointmentService from "../../../functional/AppointmentService";
import {useData} from "../../../functional/DataContext";
import {useRouter} from "next/router";

export default function AppointmentForm({animal}) {
    const [date, setDate] = useState(moment());
    const [time, setTime] = useState(moment().add(5 - ((moment().minute().valueOf() % 10) % 5), 'minute'));
    const {fetchAppointments} = useData();
    const router = useRouter();
    function onChangeDatePicker(value) {
        console.log(value);
        setDate(value);
    }

    function onChangeTimePicker(value) {
        console.log(value);
        setTime(value);
    }

    async function onSubmitForm(e) {
        e.preventDefault();
        const dateTime = date.format('YYYY-MM-DD') + "T" + time.format('HH:mm');
        const appointment = {appointmentDate: dateTime, animal: animal.toJSON(), user: animal.owner.toJSON()};
        console.log(appointment);
        const response = await AppointmentService.postAppointments(appointment);
        if (response.status === 201) {
            console.log("Appointment created");
            await fetchAppointments();
            await router.push('/appointments');
            setDate(moment());
            setTime(moment().add(5 - ((moment().minute().valueOf() % 10) % 5), 'minute'));
        } else {
            console.log(response);
        }
    }

    const range = (start, end) => {
        const result = [];

        for (let i = start; i < end; i++) {
            result.push(i);
        }

        return result;
    };
    const disabledDate = (current) => {
        // Can not select days before today and today
        return current && current < moment().startOf("day");
    };

    const disabledRangeTime = useCallback(() => {
        const currentHour = moment().hours();
        const currentMinute = moment().minutes();
        if (date.date() === moment().date()) {
            return {
                disabledHours: () => range(0, currentHour) + range(20, 24),
                disabledMinutes: () => range(0, currentMinute),
            };
        } else if (date.date() < moment().date()) {
            return {
                disabledHours: () => range(0, 24),
                disabledMinutes: () => range(0, 60),
            };
        }
        return {disabledHours: () => range(0, 8) + range(20, 24)};
    }, [date]);


    return (
        <div>
            <h1>Appointment Form</h1>
            <h3>Welcome to the Appointment Form page!</h3>
            <form method="post" onSubmit={onSubmitForm}>
            <DatePicker size={'large'} disabledDate={disabledDate} value={date} onChange={onChangeDatePicker} allowClear={false} inputReadOnly={true} />
            <TimePicker size={'large'} disabledTime={disabledRangeTime} value={time} onChange={onChangeTimePicker} allowClear={false} inputReadOnly={true} minuteStep={5} defaultOpenValue={moment('08:00', 'HH:mm')} format={'HH:mm'}/>
            <button type="submit">Submit</button>
            </form>
        </div>
    )
}
