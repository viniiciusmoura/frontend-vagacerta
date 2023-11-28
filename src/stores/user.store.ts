import userService from "@/services/user.service";
import { User } from '@/types/user.types';

const user = localStorage.getItem('user');

const initialState:any = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };


export const auth = {
    namespaced: true,
    state: initialState,
    actions: {
      login(user:any) {
        return userService.login(user).then(
          user => {
            return Promise.resolve(user);
          },
          error => {
            return Promise.reject(error);
          }
        );
      },
      logout() {
        userService.logout();
      },
    },
  };