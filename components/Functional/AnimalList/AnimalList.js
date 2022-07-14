import AnimalListItem from '../AnimalListItem';
import style from './AnimalList.module.css';

export default function AnimalList(props) {
    return (
        <div className={style.list}>
            {props.items.map(item => (
                <AnimalListItem key={item.id} {...item} />
            ))}
        </div>
    );
}
