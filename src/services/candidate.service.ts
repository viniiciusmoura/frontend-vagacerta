import api from '../../vueconfig'
import { CandidateRegister } from '@/types/register.types';
import authHeader from './token.service';
export default {
    
    async getAll() 
    {
        try{
            const response = await api.get(`candidates`)
            return response
        }catch (erro)
        {
            return erro;
        }    
    },

    async getCity(city:string) 
    {
        try{
            const response = await api.get(`candidates/city/${city}`)
            return response.data
        }catch (erro)
        {
            return erro;
        }    
    },

    async getState(state:string) 
    {
        try{
            const response = await api.get(`candidates/state/${state}`)
            return response.data
        }catch (erro)
        {
            return erro;
        }    
    },

    async getOffice(office:string) 
    {
        try{
            const response = await api.get(`candidates/office/${office}`)
            return response.data
        }catch (erro)
        {
            return erro;
        }    
    },

    async create(cadidate:CandidateRegister)
    {
        try {
            return await api.post(`candidates/save`, cadidate, { headers: authHeader() }).then((response:any) => {
                if(response.data){
                    localStorage.setItem('candidateid', response.data.id);
                }
                return response;
            });
        } catch (error) {
            return error;
        }
    },

    async update(cadidate:CandidateRegister, id:number)
    {
        try {
            const response = await api.patch(`candidates/update/${id}`, { 
                body: cadidate
            });
            return response.data;
        } catch (error) {
            return error;
        }
    },

    async delete(id:number)
    {
        try {
            const response = await api.delete(`candidates/delete/${id}`);
            return response.status;
        } catch (error) {
            return error;
        }
    },
};