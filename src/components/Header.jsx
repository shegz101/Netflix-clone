import React,{useState, useEffect}from 'react';
import pic from '../images/trailflix.png';
import { AiOutlineSearch } from 'react-icons/ai';
import '../styles/Header.css';

const Header = () => {
    const [showdark, setShowDark] = useState(false);
    const [showDrop, setShowDrop] = useState(false);
    const controlBlackNav = () => {
        if(window.scrollY > 100) {
            setShowDark(true);
        } else {
            setShowDark(false);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', controlBlackNav);
        return () => {
            window.removeEventListener('scroll', controlBlackNav)
        };
    }, [])
    return (
        <div className={`header ${showdark && 'bg__dark'}`}>
            <div className="header-image">
              <div className='header__start__name'>
                <img className="header__logo" src={pic} alt="web-app-logo"/>
                <nav className='nav-links' style={{zIndex:'10',}}>
                  <li style={{color:'white', paddingLeft: '10px', opacity: '1',}}>Home</li>
                  <li style={{color:'white', paddingLeft: '10px', opacity:'0.6',}}>Tv Shows</li>
                  <li style={{color:'white', paddingLeft: '10px', opacity:'0.6',}}>Movies</li>
                  <li style={{color:'white', paddingLeft: '10px', opacity:'0.6',}}>New & Popular</li>
                  <li style={{color:'white', paddingLeft: '10px', opacity:'0.6',}}>My List</li>
                </nav>
              </div>
              
              <div className='floated-right-nav'>
                <nav className='nav-icon'>
                  <AiOutlineSearch className='search-icon'  style={{color:'white', paddingLeft:'10px'}}/>
                  <img className="avatar__logo" onClick={() => setShowDrop(true)} style={{ paddingLeft:'10px' }} src="https://cdn-icons-png.flaticon.com/512/147/147142.png" alt="avatar-default-icon"/>
                </nav>
                {
                  showDrop && (
                    <aside className='more-nav'>
                      <li style={{color:'white', paddingBottom: '5px', cursor:'pointer',}}>Log Out</li>
                      <li style={{color:'white', cursor:'pointer'}}>My Account</li>
                    </aside>
                  )
                }
              </div>
            </div> 
        </div>
    )
}

export default Header;