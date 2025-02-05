import { useContext } from 'react';
import style from './EditWindow.module.scss'
import { Context } from '../../context/Context';

export default function EditWindow({ visibility }) {

    const { showEditWind, setShowEditWind } = useContext(Context);

    // получение данных о выбранном сертификате
    let localStorageData = localStorage.getItem('choosenSemin')
    let JSONData = JSON.parse(localStorageData) || {}

    // закрытие модального окна и удаление локального хранилища
    function CloseEditWindow() {
        setShowEditWind(!showEditWind)
        localStorage.removeItem('choosenSemin');
    }

    return (
        <div className={style.EditWindow_container} style={{ display: !visibility ? 'none' : 'flex' }}>
            <div className={style.window}>
                <form action="">
                    <label>Название</label>
                    <input type="text" id="title" name="title" value={JSONData.title} />
                    
                    <label>Описание</label>
                    <input type="text" id="description" name="description" value={JSONData.description} />

                    <label>Ссылка на изображение</label>
                    <input type="text" id="photoUrl" name="photoUrl" value={JSONData.photo} />
                </form>

                <button onClick={() => CloseEditWindow()}>Закрыть</button>
            </div>
        </div>
    )
}