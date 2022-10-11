import React,{useState, useEffect}from 'react';
import pic from '../images/trailflix.png';
import { AiOutlineSearch } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const Header = () => {
    const [showdark, setShowDark] = useState(false);
    const [showdrop, setShowDrop] = useState(false);
    const navigate = useNavigate();

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

    const showDropDown = () => {
      if(showdrop === true) {
        setShowDrop(false);
      } else {
        setShowDrop(true);
      }
    }

    const signedOut = async () => {
      await(signOut(auth));
      navigate('/');
    }
    
    return (
        <div className={`header ${showdark && 'bg__dark'}`}>
            <div className="header-image">
              <div className='header__start__name'>
                <img className="header__logo" src={pic} alt="web-app-logo" onClick={() => navigate('/home')}/>
                <nav className='nav-links' style={{zIndex:'10',}}>
                  <li style={{color:'white', paddingLeft: '13px', opacity:'1' ,}}>Home</li>
                  <li style={{color:'white', paddingLeft: '13px', opacity:'0.6',}}>My List</li>
                </nav>
              </div>
              
              <div className='floated-right-nav'>
                <nav className='nav-icon'>
                  <div>
                    <div className='search__div' style={{ position: 'fixed' }} onClick={() => navigate('/search')}>
                      <AiOutlineSearch className='search-icon'  style={{color:'white', fontWeight:'900', fontSize:'20px'}}/>
                    </div>
                  </div>
                  <div>
                    <img className="avatar__logo" onClick={() => showDropDown(true)} style={{ paddingLeft:'20px', paddingTop:'20px' }} src="https://cdn-icons-png.flaticon.com/512/147/147142.png" alt="avatar-default-icon"/>
                  </div>
                </nav>
                {
                  showdrop && (
                    <div className='more-nav'>
                      <li style={{color:'white', paddingBottom: '5px', paddingLeft:'10px', cursor:'pointer',}} onClick={signedOut}>Log Out</li>
                      <li style={{color:'white', cursor:'pointer', paddingBottom: '5px', paddingLeft:'10px',}} onClick={() => navigate('/profile')}>Account</li>
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