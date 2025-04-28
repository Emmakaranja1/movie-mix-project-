import React from 'react'
import {useState} from 'react';
function Searchbar ()  {
    const [search, setSearch] = useState('');
    const handleInputChange =(e) =>{
        setSearch(e.target.value);
    }
    const handleSearch = () => {
        // Perform search logic here
        console.log('Searching for:', search);
        // add api call here
    }
  return (
    <div className="search-bar">
        <input 
            type="text" 
            placeholder="Search" 
            value={search} 
            onChange={handleInputChange}
            style={{width: '300px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc'}}
        />
        <button onClick={handleSearch}>Search</button>
    </div>
  )
}

export default Searchbar