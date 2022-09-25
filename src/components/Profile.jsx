import Header from './Header';
import '../styles/Profile.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/authSlice';

const Profile = () => {
    // const name = useSelector(selectName);
    const user = useSelector(selectUser);
    return ( 
        <div>
            <Header/>
            <div className='edit__profile__box'>
                <p className="edit__header">Edit Profile</p>
                <div className='profile__info'>
                    <img className="avatar_logo" src="https://cdn-icons-png.flaticon.com/512/147/147142.png" alt="avatar-default-icon"/>
                    <div className='user__info'>
                        <div className='user_name_mail'>
                            <p>Email: <span>{user?.email}</span></p>
                        </div>
                        <div>
                            <p style={{fontWeight:'900'}}>Plans</p>
                            <hr style={{backgroundColor:'red', marginTop:'10px'}}/>
                        </div>
                    </div>
                </div>
                <div className='log__out__div__btn'>
                    <button className='log__out__btn'>Log Out</button>
                </div>
            </div>
        </div>
    );
}
 
export default Profile;
