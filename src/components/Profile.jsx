import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();
    return ( 
        <div>
            <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                <h1 style={{color:'red', fontSize:'20px', cursor:'pointer', paddingTop:'10px',}} onClick={() => navigate('/home')}>Trailflix</h1>
                <img className="avatar__logo" style={{ paddingLeft:'10px', objectFit:'contain', width:'35px', right:'4px', paddingTop:'10px', cursor:'pointer' }} src="https://cdn-icons-png.flaticon.com/512/147/147142.png" alt="avatar-default-icon"/>
            </div>
        </div>
     );
}
 
export default Profile;
