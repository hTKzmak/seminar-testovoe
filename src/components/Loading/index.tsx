import style from './Loading.module.scss';

export default function Loading({visibility}){
    return(
        <div className={style.loading} style={{display: visibility ? 'flex' : 'none'}}>
            <span className={style.loader}></span>
        </div>
    )
}
