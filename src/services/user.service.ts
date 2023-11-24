import api from '../../vueconfig'
import { User } from '@/types/user.types';
export default {
    
    async getEmail() 
    {
        try{
            const response = await api.get(`user/email/${'company@teste.com'}`)
            return response.data
        }catch (erro)
        {
            return erro;
        }    
    },

    async create(user:User)
    {
        try {
            const response = await api.post(`user/save`, { 
                body: user
            });
            return response;
        } catch (error) {
            return error;
        }
    }
};