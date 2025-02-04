import SeminItem from "../SeminItem"
import style from './SeminList.module.scss'

export default function SeminList({ semin }) {
    return (
        <div className={style.seminList}>
            {semin.map(elem =>
                <SeminItem
                    key={elem.id}
                    id={elem.id}
                    title={elem.title}
                    description={elem.description}
                    date={elem.date}
                    time={elem.time}
                    photo={elem.photo}
                />
            )}
        </div>
    )
}