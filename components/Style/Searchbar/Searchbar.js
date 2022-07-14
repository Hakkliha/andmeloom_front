import {GrClose, GrSearch, GrUpdate} from 'react-icons/gr';
import {useState} from "react";
import styles from "./Searchbar.module.css";

export default function Searchbar(props) {
    const [searchValue, setSearchValue] = useState("");
    const [searching, setSearching] = useState(false);

    const onChangeSearch = (e) => {
        setSearchValue(e.target.value);
    }

    const onClickSearch = () => {
        setSearching(true);
    }

    const onClickClose = () => {
        setSearching(false);
        setSearchValue("");
    }

    return (
        <div className={styles.searchbar}>
            <div className={styles.searchbar__input}>
                <input type="text" placeholder="Search" value={searchValue} onChange={onChangeSearch}/>
                {searching ? <GrUpdate size={16} className={styles.load_icon}/> : <GrSearch className={styles.search_icon} onClick={onClickSearch} size={16}/>}
                <GrClose className={styles.close_icon} onClick={onClickClose} size={16}/>
            </div>
        </div>
    );
}
