import React,{ useState }from 'react';
import '../styles/Profile.css';
import pic from '../images/trailflix.png';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth'; 
import { auth } from '../firebase';

const Profile = () => {
    const user = useSelector(selectUser);
    const [showdrop, setShowDrop] = useState(false);
    const navigate = useNavigate();
    
    const showDropDown = () => {
        if(showdrop === true) {
          setShowDrop(false);
        } else {
          setShowDrop(true);
        }
    }

    return ( 
        <div className='profile_section'>
            <div className="header-image">
              <div className='header__start__name'>
                <img className="header__logo" src={pic} alt="web-app-logo" onClick={() => navigate('/home')}/>
              </div>
              
              <div className='floated-right-nav'>
                <nav className='nav-icon'>
                  <img className="avatar__logo" onClick={() => showDropDown(true)} style={{ paddingLeft:'10px' }} src="https://cdn-icons-png.flaticon.com/512/147/147142.png" alt="avatar-default-icon"/>
                </nav>
                {
                  showdrop && (
                    <div className='more-nav'>
                      <li style={{color:'white', paddingBottom: '5px', paddingLeft:'10px', cursor:'pointer',}} onClick={() => signOut(auth)}>Log Out</li>
                      <li style={{color:'white', cursor:'pointer', paddingBottom: '5px', paddingLeft:'10px',}} onClick={() => navigate('/home')}>Home</li>
                      <li style={{color:'white', cursor:'pointer', paddingBottom: '5px', paddingLeft:'10px',}}>My list</li>
                    </div>
                  )
                }
              </div>
            </div>
            <div className='edit__profile__box'>
                <p className="edit__header">Edit Profile</p>
                <div className='profile__info'>
                    <img className="avatar_logo" src="https://cdn-icons-png.flaticon.com/512/147/147142.png" alt="avatar-default-icon"/>
                    <div className='user__info'>
                        <h2><strong>bobatesegun3@gmail.com</strong></h2>
                        <div className='profile_plans'>
                            <h3>Plans</h3>
                            <button className='log__out__btn' onClick={() => signOut(auth)}>Log Out</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Profile;
