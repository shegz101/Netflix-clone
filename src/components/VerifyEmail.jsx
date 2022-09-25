import '../styles/VerifyEmail.css'
import {useState, useEffect} from 'react'
import {auth} from '../firebase'
import {sendEmailVerification} from 'firebase/auth'
import {useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser, selectTime } from '../features/authSlice';
import { useDispatch } from 'react-redux';
import { updateTimeActive } from '../features/authSlice';

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  // const [resendbtndisabled, setResendBtnDisabled] = useState(false);
  const timeActive = useSelector(selectTime);
  const [time, setTime] = useState(60)
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      user?.reload()
      .then(() => {
        if(user?.emailVerified){
          clearInterval(interval)
          navigate('/home')
        }
      })
      .catch((err) => {
        alert(err.message)
      })
    }, 1000)
  }, [navigate, user])

  useEffect(() => {
    let interval = null;
    if(timeActive && time !== 0 ){
      interval = setInterval(() => {
        setTime((time) => time - 1)
      }, 1000)
    }else if(time === 0){
      dispatch(updateTimeActive(false))
      setTime(60)
      clearInterval(interval)
    }
    return () => clearInterval(interval);
  }, [timeActive, time, dispatch])

  const resendEmailVerification = () => {
    // setResendBtnDisabled(true);
    sendEmailVerification(auth.user)
    .then(() => {
      // setResendBtnDisabled(false);
      dispatch(updateTimeActive(true))
    }).catch((err) => {
      alert(err.message);
      // setResendBtnDisabled(false);
    })
  }

  return (
    <div className='center'>
      <div className='verifyEmail'>
        <h1>Verify your Email Address</h1>
        <p>
          <strong>A Verification email has been sent to spam:</strong><br/>
          <span>{user?.email}</span>
        </p>
        <span>Follow the instruction in the email to verify your account</span>       
        <button 
          onClick={resendEmailVerification}
          disabled={timeActive}
        >Resend Email {timeActive && time}</button>
      </div>
    </div>
  )
}

export default VerifyEmail;