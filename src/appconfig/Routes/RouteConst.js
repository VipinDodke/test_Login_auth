import Home from '../../screens/Home';
import Login from '../../screens/Login';

export const SCREEN_NAMES = {
  login: 'login',
  home: 'home',
};
export const SCREEN_ROUTES = [
  {
    key: 'login_screen',
    name: SCREEN_NAMES.login,
    component: Login,
    private: false,
    initial: true,
  },
  {
    key: 'home_screen',
    name: SCREEN_NAMES.home,
    component: Home,
    private: true,
    initial: false,
  },
];
