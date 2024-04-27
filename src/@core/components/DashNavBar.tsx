import { IconButton, Paper } from '@mui/material';
import { useAuth } from '@src/Auth/useAuth';
import { RootState } from '@src/store/store';
import { useSelector } from 'react-redux';
import MuiIcon from './MuiIcon';
import ThemeSwitcher from './ThemeSwitcher';

function DashNavBar() {
  const { Auth } = useSelector((state: RootState) => state.App);
  const { LogOut } = useAuth();
  return (
    <Paper className="  py-2 px-2" elevation={0}>
      <div className=" container flex items-center justify-between">
        <img
          src="/logo.webp"
          alt=""
          className=" bg-primary p-3 lg-h-[40px] h-16 rounded-md"
        />
        <div className=" flex items-center  gap-3">
          <ThemeSwitcher />
          {Auth.isLoggedIn && (
            <IconButton onClick={LogOut}>
              <MuiIcon name="Logout" />
            </IconButton>
          )}
        </div>
      </div>
    </Paper>
  );
}

export default DashNavBar;
