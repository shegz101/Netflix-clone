import '../styles/VerifyEmail.css'
import {useState, useEffect} from 'react'
import {auth} from '../firebase'
import {sendEmailVerification} from 'firebase/auth'
import {useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser, selectTime } from '../features/authSlice';
import { useDispatch } from 'react-redux';
import { updateTimeActive } from '../features/authSlice';

function VerifyEmail() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const timeActive = useSelector(selectTime);
  const [time, setTime] = useState(60)
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      user?.reload()
      .then(() => {
        if(user?.emailVerified){
          clearInterval(interval)
          navigate('/')
        }
      })
      .catch((err) => {
        alert(err.message)
      })
    }, 1000)
  }, [navigate, user])

  useEffect(() => {
    let interval = null
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
    sendEmailVerification(auth.currentUser)
    .then(() => {
      dispatch(updateTimeActive(true))
    }).catch((err) => {
      alert(err.message)
    })
  }

  return (
    <div className='center'>
      <div className='verifyEmail'>
        <h1>Verify your Email Address</h1>
        <p>
          <strong>A Verification email has been sent to:</strong><br/>
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

export default VerifyEmail