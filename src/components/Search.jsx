import React, { useState } from 'react';
import axios_fetch from '../api/axios_fetch';
import request_data from '../api/request_data';
import {BiSearch} from 'react-icons/bi';
import {MdOutlineArrowBackIosNew} from 'react-icons/md'
import '../styles/search.css';

const Search = () => {
    const [searchinput, setSearchInput] = useState("");
    const [searchresponse, setSearchResponse] = useState([]);
    const url = request_data.search;
    
    const fetch_search = async () => {
        const resp = await axios_fetch.get(`${url}&query=${searchinput}`);
        setSearchResponse(resp.data.results);
        setSearchInput("");
    }

    console.log(searchresponse);
    return ( 
        <div className='search__section'>
            <div className="search__input__section">
                <div className='navigate_icon'>
                    <MdOutlineArrowBackIosNew style={{color:'white'}} className="nav__icon"/>
                </div>
                <div className="search__field">
                    <div className='input__gloss'>
                        <BiSearch className='search__icon' style={{color:'white'}}/>
                        <input type='text' value={searchinput} style={{width:'80%'}} 
                        onChange={(e) => setSearchInput(e.target.value)} 
                        placeholder='search for movie...'/>
                        <button className='search__btn' onClick={fetch_search}>Search</button>
                    </div>

                    <div className='result__section'>
                        <p style={{color:'white'}}>20 results found</p>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Search;