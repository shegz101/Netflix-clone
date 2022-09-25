import {Navigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/authSlice';

export default function PrivateRoute({children}) {
  const user = useSelector(selectUser);

  if(!user){
    return <Navigate to='/' replace/>
  }

  return children
}