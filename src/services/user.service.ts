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

    async getToken(user:User) 
    {
        try{
            const response = await api.post(`auth/login`, user)
            return response.data
        }catch (erro) {
            return erro;
        }    
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