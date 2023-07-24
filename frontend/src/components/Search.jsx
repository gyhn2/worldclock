import { useState, useEffect } from 'react'
import { getFlags } from '../utils/utils.js';
import axios from "axios"

/* limit the number of predictive search results */
var timeout = null;

export default function Search({viewArray, setViewArray}) {

    const [searchValue, setSearchValue] = useState("")
    const [searchList, setSearchList] = useState([])
    const [loading, setLoading] = useState(true)
    const [focused, setFocused] = useState(false)
    const [highlighted, setHighlighted] = useState(0)

    useEffect( () => {
        // fetch search suggestions
            let searchTimeout;
            if (searchValue.length > 0) {
                searchTimeout = setTimeout(() => {
                axios.get(`/api/query/${searchValue}`)
                .then(data => {
                    let y = data.data.map((x, i) => {
                        return {searchid: i, ...x}
                    })
                    setSearchList(y)  
                    setLoading(false)  
                })
                .catch( err => console.log(err))
            }, 150);

            }    
        return () => clearTimeout(searchTimeout);

    }, [setSearchList, searchValue, setLoading])


    useEffect( () => {
        
        const arrowScroll = setTimeout(() => {
            const element = document.querySelector(".active");
                element? element.scrollIntoView(
                    {
                        behavior: "smooth",
                        block: "nearest"
                    }
                )   : null 
        }, 100);
        return () => clearTimeout(arrowScroll);

    }, [highlighted])

    const onInputChange = (e) => {
        const sv = e.target.value.trim();
        if (!sv.length) {
            setFocused(false)
            return;
        } else {
            setFocused(true)
            setSearchValue(sv)
        }
    }

    const handleKeyDown = (e) => {
        // enter key
        if (e.key == "Enter") {
            e.preventDefault();
            handleSearch(searchList[highlighted]);
            clearTimeout(timeout);
            timeout = setTimeout(function () {
                setHighlighted(0)
            }, 100);
            e.target.blur();
            return
        }
        // arrow up
        else if (e.key == "ArrowUp") {
            e.preventDefault();
            if (highlighted > 0)
                setHighlighted(highlighted - 1)
        }
        // arrow down 
        else if (e.key == "ArrowDown" ) {
            e.preventDefault();
            if (highlighted === searchList.length-1)
                return;
            setHighlighted(highlighted + 1)            
        } else {
            setHighlighted(0)
        }
    }

    // empty list on input focusout
    const emptyList = (e) => {
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            setFocused(false)   
        }, 100);  
        setHighlighted(0) 
    }

    // show list on input focus
    const showList = (e) => {
        setFocused(true)
    }

    //search
    const handleSearch = (city) => {
        axios.post('/api', city)
        .then(data => {
            if (viewArray.length === 12) {
                setViewArray([...viewArray.slice(1), data.data])
            } else
                setViewArray([...viewArray, data.data])
        })
    }
   
    return (
        <div className="search-group">
            <div className="search">
                <input 
                    type="search" 
                    id="search-bar" 
                    defaultValue={searchValue}
                    onChange={onInputChange}
                    placeholder="Search for city or country" 
                    autoComplete="off" 
                    autoCorrect="off" 
                    autoCapitalize="off" 
                    spellCheck="false" 
                    onKeyDown={handleKeyDown}
                    onBlur={emptyList}
                    onFocus={showList}
                />
                <ul className="search-list"
                    style={focused ? {display: 'block'} : {display: 'none'}}>
                    {!loading ? searchList.map(city => { 
                        return <li 
                        key={city.searchid} 
                        id={`city-${city.searchid}`}
                        className = {highlighted === city.searchid ? 'active' : ''}
                        onClick={() => handleSearch(city)}>
                            {city.name} ({city.country_code})&nbsp;&nbsp;{getFlags(city.country_code)}
                        </li>
                    }): null}
                </ul>
            </div>
        </div>  
    )
}
