import axios, { AxiosError } from 'axios';
import { useToast } from '../hooks/useToast';
import { themeConfig } from '@src/themeConfig';
import store from '@src/store/store';
import { UpdateAuth } from '@src/actions/App/AppSlice';

export class UserDto {
  name: string = '';
  id: string = '';
  email: string = '';
  token: string = '';
}

const { toast } = useToast();
export const useAuth = () => {
  const Login = async (payload: { email: string; phone: string }) => {
    try {
      const response = await axios.post(
        `${themeConfig.API_URL}/api/vips/login`,
        payload
      );
      SetuserData(response.data.data as UserDto);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const LogOut = () => {
    sessionStorage.removeItem('vip-auth');
    location.reload();
    store.dispatch(UpdateAuth({ isLoggedIn: false, UserInfo: null }));
  };

  const SetuserData = (userData: UserDto) => {
    store.dispatch(UpdateAuth({ isLoggedIn: true, UserInfo: userData }));
    sessionStorage.setItem('vip-auth', JSON.stringify(userData));
  };

  const GetUserData = (): UserDto | undefined => {
    const userData = sessionStorage.getItem('vip-auth');
    return userData ? JSON.parse(userData) : JSON.stringify(undefined);
  };

  const isAuth = (SuccessFn: () => void, FailFn?: () => void) => {
    isLoggedIn() ? SuccessFn() : FailFn ? FailFn() : null;
  };

  const GetAccessToken = (): string | undefined => {
    const userData = GetUserData();
    return userData ? userData.token : null;
  };

  const isLoggedIn = (): boolean => {
    const userData = sessionStorage.getItem('vip-auth');
    return userData ? true : false;
  };

  return {
    Login,
    LogOut,
    GetUserData,
    isLoggedIn,
    GetAccessToken,
    SetuserData,
    isAuth,
  };
};
