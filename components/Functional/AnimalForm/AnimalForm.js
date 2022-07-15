// create form component
// Language: javascript
import style from './AnimalForm.module.css';
import {useState} from "react";
import {useRouter} from "next/router";
import {useData} from "../../../functional/DataContext";
import AnimalService from "../../../functional/AnimalService";
import {DatePicker} from "antd";
import 'antd/dist/antd.css';
import moment from 'moment';
import OwnerService from "../../../functional/OwnerService";
import Owner from "../../../data/classes/Owner";

export default function AnimalForm(props) {
    const {fetchAnimals, owners} = useData();
    const router = useRouter();
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [species, setSpecies] = useState('');
    const [breed, setBreed] = useState('');
    const [age, setAge] = useState(moment().startOf('day'));
    const [weight, setWeight] = useState('');
    const [owner, setOwner] = useState(props.fromOwner ? String(props.owner.id) : '');
    const onChangeName = (e) => {
        setName(e.target.value);
    }
    const onChangeGender = (e) => {
        setGender(e.target.value);
    }
    const onChangeSpecies = (e) => {
        setSpecies(e.target.value);
    }
    const onChangeBreed = (e) => {
        setBreed(e.target.value);
    }
    const onChangeAge = (e) => {

        setAge(!!e ? e.utc().format('YYYY-MM-DD') : moment().startOf('day'));
    }
    const onChangeWeight = (e) => {
        setWeight(e.target.value);
    }
    const onChangeOwner = (e) => {
        setOwner(e.target.value);
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        const propsOwner = props.fromOwner ? props.owner : Owner.fromJSON((await OwnerService.getOwnerDetail(owner)).data);
        const age_date = moment(age).format('YYYY-MM-DD');
        const animal = {
            name: name,
            gender: gender,
            species: species,
            breed: breed,
            chipNr: "",
            dateOfBirth: age_date,
            weight: weight,
            user: propsOwner.toJSON()
        };
        const response = await AnimalService.postAnimal(animal);
        if (response.status === 201) {
            // Set all states back to initial state
            // Redirect to the animal list page
            await fetchAnimals();
            await router.push('/animals');
            setName('');
            setAge(moment().startOf('day'));
            setBreed('');
            setGender('');
            setSpecies('');
            setWeight('');
            setOwner('');
        } else {
            console.log("Error creating animal");
            console.log(response);
        }

    }

    const disabledDate = (current) => {
        // Can not select days before today and today
        return current && current >= moment().endOf("day");
    };

    return (
        <div className={style.form}>
            <form onSubmit={onSubmit} method="post">
                <div className={style.formControl}>
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" className={style.formField} value={name} onChange={onChangeName}/>
                </div>
                <div className={style.formControl}>
                    <label htmlFor="gender">Gender:</label>
                    <input type="text" name="gender" className={style.formField} value={gender}
                           onChange={onChangeGender}/>
                </div>
                <div className={style.formControl}>
                    <label htmlFor="species">Species:</label>
                    <input type="text" name="species" className={style.formField} value={species}
                           onChange={onChangeSpecies}/>
                </div>
                <div className={style.formControl}>
                    <label htmlFor="breed">Breed:</label>
                    <input type="text" name="breed" className={style.formField} value={breed} onChange={onChangeBreed}/>
                </div>
                <div className={style.formControl}>
                    <label htmlFor="age">Age:</label>
                    <DatePicker name="age" size={'large'} disabledDate={disabledDate} value={moment(age)}
                                onChange={onChangeAge}/>
                </div>
                <div className={style.formControl}>
                    <label htmlFor="weight">Weight:</label>
                    <input type="number" name="weight" className={style.formField} min={0} max={1000} value={weight}
                           onChange={onChangeWeight}/>
                </div>
                {!props.fromOwner &&
                    <div className={style.formControl}>
                        <label htmlFor="owner">Owner:</label>
                        <select name="owner" className={style.formField} value={owner} onChange={onChangeOwner}>
                            <option value="">Select owner</option>
                            {owners.map(owner => (
                                <option key={owner.id} value={owner.id}>({owner.id}) {owner.fullName}</option>
                            ))}
                        </select>
                    </div>}
                <label>
                    <input type="submit" value="Submit"/>
                </label>
            </form>
        </div>
    );
}
