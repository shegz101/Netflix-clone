import Header from './Header';
import '../styles/Profile.css';

const Profile = () => {
    return ( 
        <div>
            <Header/>
            <div className='edit__profile__box'>
                <h1 className="edit__header">Edit Profile</h1>
            </div>
        </div>
     );
}
 
export default Profile;
