import api from '../../vueconfig'
import { User } from '@/types/user.types';
export default {
    
    async getEmail(email:string) 
    {
        try{
            const response = await api.get(`user/email/${email}`)
            return response.data
        }catch (erro) {
            return erro;
        }    
    },

    async login(user:User) 
    {
        const token: any = localStorage.getItem('user');
        if (token) {
            return token;
        }
        try{
            return api.post(`auth/login`, user).then((response:any) => {
                if (response.data.token) {
                    localStorage.setItem('user', response.data.token);
                }

                if (response.data.candidate) {
                    localStorage.setItem('userData', JSON.stringify(response.data.candidate));
                }

                if(response.data.company) {
                    localStorage.setItem('userData', JSON.stringify(response.data.company));
                }
                return response;
            }).catch((error) => {
                return error.response.data;
            });
        }catch (erro) {
            return erro;
        }    
    },

    async logout() {
        localStorage.removeItem('user');
    },

    async create(user:User)
    {
        try {
            const response = await api.post(`user/save`, user);
            return response;
        } catch (error) {
            return error;
        }
    }
};