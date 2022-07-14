import style from './ListItem.module.css';

export default function ListItem(props) {
    return (<div className={style.listItem}>
        {props.children}
    </div>);
}
