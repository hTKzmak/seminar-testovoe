import { useEffect, useState } from 'react'
import './App.scss'
import './reset.css'
import SeminList from './components/SeminList'
import HeaderComp from './components/HeaderComp'
import Loading from './components/Loading'

function App() {

  // данные
  const [semin, setSemin] = useState([])

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


  return (
    <div>
      <HeaderComp />
      <main>
        <div className="container">
          {/* <Loading visibility={visibility} /> */}
          <SeminList semin={semin} />
        </div>
      </main>
    </div>
  )
}

export default App
