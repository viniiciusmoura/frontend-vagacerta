import api from '../../vueconfig'
import { Experience } from '@/types/experience.types';
import authHeader from './token.service';
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

    async getExperienceUser(id:number) 
    {
        try{
            const response = await api.get(`experiences/candidate/${id}`, { headers: authHeader() })
            return response.data
        }catch (erro)
        {
            return erro;
        }    
    },

    async create(experiences:Experience)
    {
        try {
            return await api.post(`experiences/save`, experiences, { headers: authHeader() }).then((response:any) => {
                return response;
            });
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
            const response = await api.delete(`experiences/delete/${id}`, {headers: authHeader()});
            return response.status;
        } catch (error) {
            return error;
        }
    },
};