import { useState, useEffect } from 'react'
import Search from './components/Search'
import ClockBox  from "./components/ClockBox"
import axios  from "axios"

import './App.css'

function App() {
  
    const [viewArray, setViewArray] = useState([])
    const [loading, setLoading] = useState(true)
    
    useEffect( () => {
        axios.get('/api')
        .then(data => {
            setViewArray(data.data)
            setLoading(false)
        })
        .catch(err => console.log(err))
    }, [setViewArray])
    
    return (
        <>            
			{!loading ? 
				<>
                    <h1>WORLD CLOCK</h1>
                    <Search viewArray={viewArray} setViewArray={setViewArray}/>
					<div className='container'>
						{ viewArray.length > 0 ? 
						viewArray.slice(0).reverse().map( (x, i) => 
							<ClockBox key={x._id}
							city={x} 
							viewArray={viewArray} 
							setViewArray={setViewArray}/>)
						: null
						}
					</div>
					<footer>@gyhn2</footer>
				</>
				:
				<div className = 'loading'>
					<div className='loader'></div>
				</div>
            }
        </>
    )
}

export default App


