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

  // удаление семинара, обновив данные в seminars.json
  // function DeleteSemin(id) {
  //   fetch(`${URL}/${id}`, {
  //     method: 'DELETE'
  //   })
  //     .then(res => res.json())
  //     .then(data => setSemin(semin.filter(elem => elem.id !== id)))
  // }

  return (
    <Context.Provider value={{ DeleteSemin, showEditWind, setShowEditWind}}>
      <div>
        <HeaderComp />
        <main>
          <div className="container">
            {/* <Loading visibility={visibility} /> */}
            <EditWindow visibility={showEditWind}/>
            <SeminList semin={semin} />
          </div>
        </main>
      </div>
    </Context.Provider>
  )
}

export default App
