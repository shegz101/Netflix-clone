import React,{useState, useEffect}from 'react';
import pic from '../images/trailflix.png';
import { AiOutlineSearch } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css';
import { signOut } from 'firebase/auth';
import {auth} from '../firebase';

const Header = () => {
    const [showdark, setShowDark] = useState(false);
    const [showdrop, setShowDrop] = useState(false);
    // const [list, setList] = useState(false);
    // const [opacityhome, setOpacityHome] = useState(1);
    // const [opacitylist, setOpacityList] = useState(0.6);
    const navigate = useNavigate();

    const controlBlackNav = () => {
        if(window.scrollY > 100) {
            setShowDark(true);
        } else {
            setShowDark(false);
        }
    }

    // const controlOpacity = (e) => {
    //   e.preventDefault();
    //   if (list === true) {
    //     setOpacityHome(0.6);
    //     setOpacityList(1);
    //   } else {
    //     setOpacityHome(1);
    //     setOpacityList(0.6);
    //   }
    // }

    useEffect(() => {
        window.addEventListener('scroll', controlBlackNav);
        return () => {
            window.removeEventListener('scroll', controlBlackNav)
        };
    }, [])

    const showDropDown = () => {
      if(showdrop === true) {
        setShowDrop(false);
      } else {
        setShowDrop(true);
      }
    }
    return (
        <div className={`header ${showdark && 'bg__dark'}`}>
            <div className="header-image">
              <div className='header__start__name'>
                <img className="header__logo" src={pic} alt="web-app-logo" onClick={() => navigate('/home')}/>
                <nav className='nav-links' style={{zIndex:'10',}}>
                  <li style={{color:'white', paddingLeft: '10px', opacity:'1' ,}}>Home</li>
                  <li style={{color:'white', paddingLeft: '10px', opacity:'0.6',}}>My List</li>
                  <li style={{color:'white', paddingLeft: '10px', opacity:'0.6',}}>Tv Shows</li>
                  <li style={{color:'white', paddingLeft: '10px', opacity:'0.6',}}>Movies</li>
                  <li style={{color:'white', paddingLeft: '10px', opacity:'0.6',}}>New & Popular</li>
                </nav>
              </div>
              
              <div className='floated-right-nav'>
                <nav className='nav-icon'>
                  <div><AiOutlineSearch className='search-icon'  style={{color:'white', paddingLeft:'10px',fontWeight:'800', fontSize:'25px'}}/></div>
                  <img className="avatar__logo" onClick={() => showDropDown(true)} style={{ paddingLeft:'10px' }} src="https://cdn-icons-png.flaticon.com/512/147/147142.png" alt="avatar-default-icon"/>
                </nav>
                {
                  showdrop && (
                    <div className='more-nav'>
                      <li style={{color:'white', paddingBottom: '5px', paddingLeft:'10px', cursor:'pointer',}} onClick={() => signOut(auth)}>Log Out</li>
                      <li style={{color:'white', cursor:'pointer', paddingBottom: '5px', paddingLeft:'10px',}} onClick={() => navigate('/')}>Account</li>
                      <li style={{color:'white', cursor:'pointer', paddingBottom: '5px', paddingLeft:'10px',}}>My list</li>
                    </div>
                  )
                }
              </div>
            </div> 
        </div>
    )
}

export default Header;