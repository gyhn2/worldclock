import { useState, useEffect } from 'react'
import Search from './components/Search'
import ClockBox  from "./components/ClockBox"
import axios  from "axios"

import './App.css'

function App() {
  
    const [viewArray, setViewArray] = useState([])

    useEffect( () => {

      axios.get('/api')
      .then(data => setViewArray(data.data))
      .catch(err => console.log(err))

    }, [setViewArray])

    return (
        <>
            <div className="all">
                <h1>WORLD CLOCK</h1>
                <Search viewArray={viewArray} setViewArray={setViewArray}/>
                <div className="container">
                  {viewArray.length>0 ? viewArray.slice(0).reverse().map( (x, i) => 
                  <ClockBox key={x._id}
                  city={x} 
                  viewArray={viewArray} 
                  setViewArray={setViewArray}/>) : null}
                </div>
            </div>
            <footer>@gyhn2</footer>
        </>
    )
}

export default App


