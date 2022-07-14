import Link from 'next/link';
import AnimalForm from '../../../components/Functional/AnimalForm';

export default function CreateAnimal(props) {
    function onSubmit(data) {
        console.log(data);
    }
    return (
        <div>
            <h1>Create Animal</h1>
            <AnimalForm fromOwner={false} />
        </div>
    );
}
