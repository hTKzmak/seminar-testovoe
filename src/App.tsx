import { useEffect, useState } from 'react'
import './App.scss'
import './reset.css'
import SeminList from './components/SeminList'
import HeaderComp from './components/HeaderComp'
import Loading from './components/Loading'
import { Context } from './context/Context'
import EditWindow from './components/EditWindow'

function App() {

  // данные
  const [semin, setSemin] = useState([])

  // отображение окна редактирования
  const [showEditWind, setShowEditWind] = useState(false)

  // отображение экрана загрузки
  const [visibility, setVisibility] = useState(true)

  // выбранный семинар для редактирования
  const [selectedSemin, setSelectedSemin] = useState({})

  const URL = 'http://localhost:3000/seminars';

  // GET запрос
  useEffect(() => {
    fetch(URL)
      .then(res => res.json())
      .then(data => {
        setSemin(data)
        setVisibility(false)
      })
  }, [])

  // ВЗАИМОДЕЙСТВИЕ С ДАННЫМИ ИЗ SEMIN:

  // удаление семинара, обновив данные в semin и не трогая seminars.json
  function DeleteSemin(id) {
    setSemin(semin.filter(elem => elem.id !== id))
  }

  // редактирование семинара, обновив данные в semin и не трогая seminars.json
  function UpdateSemin(selectedSemin, title, photo, description) {
    const index = semin.findIndex(elem => elem.id === selectedSemin.id)

    if (index !== -1) {
      const seminItem = semin[index];
      seminItem.title = title || 'Название семинара';
      seminItem.photo = photo || 'https://images.unsplash.com/photo-1738597452982-5759da74f68d?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
      seminItem.description = description || 'Описание семинара';
      seminItem.date = selectedSemin.date;
      seminItem.time = selectedSemin.time;
    }
  }


  // ЗАПРОСЫ НА САМ JSON-SERVER:

  // удаление семинара, обновив данные в seminars.json
  // function DeleteSemin(id) {
  //   fetch(`${URL}/${id}`, {
  //     method: 'DELETE'
  //   })
  //     .then(res => res.json())
  //     .then(data => setSemin(semin.filter(elem => elem.id !== id)))
  // }

  // // редактирование семинара, обновив данные в seminars.json
  // function UpdateSemin(selectedSemin, title, photo, description) {
  //   fetch(`${URL}/${selectedSemin.id}`, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json' // Указываем тип содержимого
  //     },
  //     body: JSON.stringify({ title, photo, description }) // Передаем данные в теле запроса
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       setSemin(semin.map(elem => {
  //         if (elem.id === selectedSemin.id) {
  //           return {
  //             ...elem,
  //             title: title || 'Название семинара',
  //             photo: photo || 'https://images.unsplash.com/photo-1738597452982-5759da74f68d?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //             description: description || 'Описание семинара',
  //             date: selectedSemin.date,
  //             time: selectedSemin.time
  //           };
  //         }
  //         return elem;
  //       }))
  //     })
  // }


  return (
    <Context.Provider value={{ DeleteSemin, showEditWind, setShowEditWind, selectedSemin, setSelectedSemin, UpdateSemin }}>
      <div>
        <HeaderComp />
        <main>
          <div className="container">
            {visibility ? (
              <Loading visibility={visibility} />
            ) : (
              <SeminList semin={semin} />
            )}

            <EditWindow visibility={showEditWind} />
          </div>
        </main>
      </div>
    </Context.Provider>
  )
}

export default App
