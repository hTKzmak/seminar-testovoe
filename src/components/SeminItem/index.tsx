import style from './SeminItem.module.scss';

export default function SeminItem({ id, title, description, date, time, photo }) {
    return (
        <div className={style.seminItem} id={id}>
            <div className={style.semiItem_image} style={{backgroundImage: `url("${photo}")`}}></div>

            <div className={style.seminItem_info}>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>

            <div className={style.date_and_time}>
                <span>{date}</span>
                <span>{time}</span>
            </div>
        </div>
    )
}