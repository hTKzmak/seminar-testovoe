import style from './Loading.module.scss';

export default function Loading({visibility}){
    return(
        <div className={style.loading} style={{display: visibility}}>
            <span className={style.loader}></span>
        </div>
    )
}
