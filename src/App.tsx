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
  const [visibility, setVisibility] = useState('flex')

  // выбранный семинар для редактирования
  const [selectedSemin, setSelectedSemin] = useState({})

  const URL = 'http://localhost:3000/seminars';

  // GET запрос
  useEffect(() => {
    fetch(URL)
      .then(res => res.json())
      .then(data => {
        setSemin(data)
        console.log(semin)
      })
  }, [])

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

  // удаление семинара, обновив данные в seminars.json
  // function DeleteSemin(id) {
  //   fetch(`${URL}/${id}`, {
  //     method: 'DELETE'
  //   })
  //     .then(res => res.json())
  //     .then(data => setSemin(semin.filter(elem => elem.id !== id)))
  // }

  // редактирование семинара, обновив данные в seminars.json
  // function UpdateSemin(id, title, photo, description) {
  //   fetch(`${URL}/${id}`, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json' // Указываем тип содержимого
  //     },
  //     body: JSON.stringify({ title, photo, description }) // Передаем данные в теле запроса
  //   })
  //     .then(res => {
  //       if (!res.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return res.json();
  //     })
  //     .then(data => {
  //       setSemin(semin.map(elem => {
  //         if (elem.id === id) {
  //           return {
  //             ...elem,
  //             title: title,
  //             photo: photo,
  //             description: description
  //           };
  //         }
  //         return elem;
  //       }))
  //     })
  //     .catch(error => {
  //       console.error('There was a problem with the fetch operation:', error);
  //     });
  // }
  

  return (
    <Context.Provider value={{ DeleteSemin, showEditWind, setShowEditWind, selectedSemin, setSelectedSemin, UpdateSemin }}>
      <div>
        <HeaderComp />
        <main>
          <div className="container">
            {/* <Loading visibility={visibility} /> */}
            <EditWindow visibility={showEditWind} />
            <SeminList semin={semin} />
          </div>
        </main>
      </div>
    </Context.Provider>
  )
}

export default App
