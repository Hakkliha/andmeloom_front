import styles from './StyleButton.module.css';
import {ImSpinner9} from 'react-icons/im';

export default function StyleButton(props) {
    return (
        <button className={styles.button} {...props}>
            {props.loading ? <ImSpinner9 size={24} className={styles.spinner}/>: props.children}
        </button>
    );
}
