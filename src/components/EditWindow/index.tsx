import { useContext, useState, useEffect } from 'react';
import style from './EditWindow.module.scss'
import { Context } from '../../context/Context';

export default function EditWindow({ visibility }) {
    const { showEditWind, setShowEditWind, selectedSemin, setSelectedSemin, UpdateSemin } = useContext(Context);

    const [values, setValues] = useState({
        title: '',
        photo: '',
        description: '',
    });

    // Обновление values при изменении selectedSemin
    useEffect(() => {
        setValues({
            title: selectedSemin.title || '',
            photo: selectedSemin.photo || '',
            description: selectedSemin.description || '',
        });
    }, [selectedSemin]);

    function CloseEditWindow(event) {
        event.preventDefault();
        setShowEditWind(false);
        setSelectedSemin({});
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();

        UpdateSemin(selectedSemin, values.title, values.photo, values.description)

        setShowEditWind(false);
        setSelectedSemin({});
    };

    return (
        <div className={style.EditWindow_container} style={{ display: !visibility ? 'none' : 'flex' }}>
            <div className={style.window}>
                <form onSubmit={handleSubmit}>
                    <div className={style.field}>
                        <label>Название</label>
                        <input type="text" name="title" value={values.title} onChange={handleInputChange} />
                    </div>

                    <div className={style.field}>
                        <label>Ссылка на изображение</label>
                        <input type="text" name="photo" value={values.photo} onChange={handleInputChange} />
                    </div>

                    <div className={style.field}>
                        <label>Описание</label>
                        <textarea name="description" value={values.description} onChange={handleInputChange}></textarea>
                    </div>

                    <div className={style.options}>
                        <button type="submit">Сохранить</button>
                        <button onClick={CloseEditWindow}>Закрыть</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
