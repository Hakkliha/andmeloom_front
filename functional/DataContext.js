import {createContext, useContext, useEffect, useState, useCallback} from "react";
import AnimalService from "./AnimalService";
import OwnerService from "./OwnerService";
import AppointmentService from "./AppointmentService";
import TokenService from "./TokenService";
import {useAuth} from "./AuthContext";

import Animal from "../data/classes/Animal";
import Appointment from "../data/classes/Appointment";
import Owner from "../data/classes/Owner";

const DataContext = createContext({
    animals: null, setAnimals: () => {
    }, owners: null, setOwners: () => {
    }, appointments: null, setAppointments: () => {
    }, fetchData: () => {

    }, fetchAnimals: () => {

    }, fetchOwners: () => {

    }, fetchAppointments: () => {

    }
});

export const useData = () => useContext(DataContext);

const DataProvider = ({children}) => {
    const {auth} = useAuth();
    const [animals, setAnimals] = useState([]);
    const [owners, setOwners] = useState([]);
    const [appointments, setAppointments] = useState([]);

    const fetchAnimals = useCallback(async () => {
        if (!!auth) {
            const animalsData = TokenService.getUserRole() === "ROLE_ADMIN" ? await AnimalService.getList() : await AnimalService.getAnimalsByUser(TokenService.getUser().id);
            let newAnimals = [];
            animalsData.data.forEach(animal => {
                // create new animal object
                const newAnimal = new Animal(animal.id, animal.name, animal.gender, animal.species, animal.breed, animal.dateOfBirth, animal.weight, animal.chipNr);
                // add animal to list of animals
                newAnimals.push(newAnimal);
            });
            setAnimals(newAnimals);
        } else {
            setAnimals([]);
        }
    }, [auth]);

    const fetchOwners = useCallback(async () => {
        if (!!auth) {
            const ownersData = TokenService.getUserRole() === "ROLE_ADMIN" ? await OwnerService.getList() : [];
            // loop through list of owners
            let newOwners = [];
            ownersData.data.forEach(owner => {
                    // create new owner object
                    const newOwner = new Owner(owner.id, owner.email, owner.firstName, owner.lastName, `${owner.firstName} ${owner.lastName}`, owner.phone, owner.street, owner.houseNr, owner.apartment, owner.city, owner.zip, owner.county, owner.country);
                    // add owner to list of owners
                    newOwners.push(newOwner);
                }
            );
            setOwners(newOwners);
        } else {
            setOwners([]);
        }

    }, [auth]);

    const fetchAppointments = useCallback(async () => {
        if (!!auth) {
            const appointmentsData = TokenService.getUserRole() === "ROLE_ADMIN" ? await AppointmentService.getList() : await AppointmentService.getAppointmentsByUser(TokenService.getUser().id);
            // loop through list of appointments
            let newAppointments = [];
            appointmentsData.data.forEach(appointment => {
                    // create new appointment object
                const newOwner = Owner.fromJSON(appointment.user);
                const newAnimal = Animal.fromJSON(appointment.animal, newOwner);
                    const newAppointment = new Appointment(appointment.id, appointment.appointmentDate, newOwner, newAnimal);
                    // add appointment to list of appointments
                    newAppointments.push(newAppointment);
                }
            );
            setAppointments(newAppointments);
        } else {
            setAppointments([]);
        }

    }, [auth]);

    const fetchData = useCallback(async () => {
        await fetchAnimals();
        await fetchOwners();
        await fetchAppointments();
    }, [fetchAnimals, fetchOwners, fetchAppointments]);
    useEffect(() => {
        fetchData().then(() => {
            console.log("Data updated");
        });
    }, [fetchData]);

    return (<DataContext.Provider
        value={{animals, setAnimals, owners, setOwners, appointments, setAppointments, fetchData, fetchAnimals, fetchOwners, fetchAppointments}}>
        {children}
    </DataContext.Provider>);
}

export default DataProvider;
