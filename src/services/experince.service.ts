import api from '../../vueconfig'
import { Experience } from '@/types/experience.types';
export default {
    
    async getAll() 
    {
        try{
            const response = await api.get(`experiences`)
            return response.data
        }catch (erro)
        {
            return erro;
        }    
    },

    async create(experiences:Experience)
    {
        try {
            const response = await api.post(`experiences/save`, { 
                body: experiences
            });
            return response.data;
        } catch (error) {
            return error;
        }
    },

    async update(experiences:Experience, id:number)
    {
        try {
            const response = await api.patch(`experiences/update/${id}`, { 
                body: experiences
            });
            return response.data;
        } catch (error) {
            return error;
        }
    },

    async delete(id:number)
    {
        try {
            const response = await api.delete(`experiences/delete/${id}`);
            return response.status;
        } catch (error) {
            return error;
        }
    },
};