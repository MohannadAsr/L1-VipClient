import { createSlice } from '@reduxjs/toolkit';
import { UserDto } from '@src/Auth/useAuth';
import {
  ModeSwitch,
  switchAlert,
  switchDialog,
  switchMenu,
  updateAuth,
} from '@src/actions/App/AppActions';

export class AppReducerState {
  mode: 'dark' | 'light' = 'dark';
  authDialog: boolean = false;
  showDeleteAlert: boolean = false;
  MobileMenu: boolean = false;
  Auth: {
    isLoggedIn: boolean;
    UserInfo: UserDto | null;
  } = { isLoggedIn: false, UserInfo: null };
}

const initialState: AppReducerState = { ...new AppReducerState() };

const AppSlice = createSlice({
  name: 'App',
  initialState,
  reducers: {
    switchMode: ModeSwitch,
    switchAuthDialog: switchDialog,
    switchDeleteAlert: switchAlert,
    switchMobileMenu: switchMenu,
    UpdateAuth: updateAuth,
  },
});

export const {
  switchMode,
  switchAuthDialog,
  switchDeleteAlert,
  switchMobileMenu,
  UpdateAuth,
} = AppSlice.actions;
export default AppSlice.reducer;
