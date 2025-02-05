import { useContext } from 'react';
import style from './SeminItem.module.scss';
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import { Context } from '../../context/Context';

export default function SeminItem({ id, title, description, date, time, photo }) {

    const { DeleteSemin, showEditWind, setShowEditWind } = useContext(Context);

    function EditSemin() {
        let seminData = {
            id: id,
            title: title,
            description: description,
            date: date,
            time: time,
            photo: photo
        }

        window.localStorage.setItem('choosenSemin', JSON.stringify(seminData))

        setShowEditWind(!showEditWind)
    }

    return (
        <div className={style.seminItem} id={id}>
            <div className={style.semiItem_image} style={{ backgroundImage: `url("${photo}")` }}></div>

            <div className={style.seminItem_info}>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>

            <div className={style.date_and_time}>
                <span>{date}</span>
                <span>{time}</span>
            </div>

            <div className={style.options}>
                <button className={style.edit} onClick={() => EditSemin()}><FaPencilAlt /></button>
                <button className={style.delete} onClick={() => DeleteSemin(id)}><FaTrash /></button>
            </div>
        </div>
    )
}