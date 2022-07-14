// create form component
// Language: javascript
import style from './AnimalForm.module.css';
import Link from 'next/link';
import {useState} from "react";
import {useRouter} from "next/router";
import {owners as owners_data} from '../../../data/DUMMYDATA';

export default function AnimalForm(props) {
    const router = useRouter();
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [species, setSpecies] = useState('');
    const [breed, setBreed] = useState('');
    const [age, setAge] = useState('');
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
        setAge(e.target.value);
    }
    const onChangeWeight = (e) => {
        setWeight(e.target.value);
    }
    const onChangeOwner = (e) => {
        setOwner(e.target.value);
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        const animal = {name, gender, species, breed, age, weight, owner};
        console.log("new Animal", animal);
        // Set all states back to initial state
        setName('');
        setAge('');
        setBreed('');
        setGender('');
        setSpecies('');
        setWeight('');
        setOwner('');
        //props.listReload();
        // Redirect to the animal list page
        const pushResponse = await router.push('/animals');
        console.log(pushResponse);
    }
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
                    <input type="number" name="age" className={style.formField} min={0} max={1000} value={age}
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
                            {owners_data.map(owner => (
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
