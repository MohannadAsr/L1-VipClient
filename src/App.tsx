import React from 'react';
import { useLocation } from 'react-router-dom';
import DeleteContainer from './@core/shared/DeleteDialog/DeleteContainer';
import ToastContainer from './@core/shared/Toast/ToastContainer';
import DashNavigation from './@core/Navigation/DashNavigation';
import DashThemeProvider from './@core/Providers/DashThemeProvider';
import { useAuth } from './Auth/useAuth';
import store from './store/store';
import { UpdateAuth } from './actions/App/AppSlice';
import { AppLoading } from './@core/components/AppLoading';

function App() {
  const { pathname } = useLocation();
  const { isLoggedIn, GetUserData } = useAuth();

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  React.useEffect(() => {
    store.dispatch(
      UpdateAuth({
        isLoggedIn: isLoggedIn(),
        UserInfo: GetUserData() || null,
      })
    );
  }, [isLoggedIn()]);

  return (
    <>
      <div className="relative ">
        <ToastContainer />
        <DashNavigation />
      </div>
    </>
  );
}

export default App;
