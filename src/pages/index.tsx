import { useAuth } from '@src/Auth/useAuth';
import Signin from './Signin';
import EventByUser from '@components/EventAccess/EventControl/EventByUser';
import { useSelector } from 'react-redux';
import { RootState } from '@src/store/store';

function Home() {
  const { isLoggedIn } = useSelector((state: RootState) => state.App.Auth);
  if (!isLoggedIn) return <Signin />;
  return <EventByUser />;
}

export default Home;
