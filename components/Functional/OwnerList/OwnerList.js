import OwnerListItem from "../OwnerListItem";
import styles from "./OwnerList.module.css";

export default function OwnerList(props) {
    return (
        <div className={styles.list}>
            {props.items.map(item => (
                <OwnerListItem key={item.id} item={item} />
            ))}
        </div>
    );
}
