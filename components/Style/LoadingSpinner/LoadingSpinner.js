import {ImSpinner9} from 'react-icons/im';
import styles from './LoadingSpinner.module.css';

export default function LoadingSpinner(props) {
    return (
        <ImSpinner9 size={props.size} className={styles.loadingSpinnerIcon}/>
    );
}
