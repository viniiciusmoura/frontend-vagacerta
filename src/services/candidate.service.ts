import api from '../../vueconfig'
import { CandidateRegister, UpdateCadidate } from '@/types/register.types';
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
            const response = await api.get(`candidates/city/${city}`, { headers: authHeader() })
            return response.data
        }catch (erro)
        {
            return erro;
        }    
    },

    async getState(state:string) 
    {
        try{
            const response = await api.get(`candidates/state/${state}`, { headers: authHeader() })
            return response.data
        }catch (erro)
        {
            return erro;
        }    
    },

    async getOffice(office:string) 
    {
        try{
            const response = await api.get(`candidates/office/${office}`,{ headers: authHeader() })
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
                    localStorage.setItem('userData', JSON.stringify(response.data));
                }
                return response;
            });
        } catch (error) {
            return error;
        }
    },

    async update(cadidate:CandidateRegister)
    {
        const update: UpdateCadidate = {name: cadidate.name, generalRegister: cadidate.generalRegister, sex: cadidate.sex, birthdate: cadidate.birthdate};
        try {
            return await api.patch(`candidates/update/${cadidate.id}`,  update, { headers: authHeader() }).then((response:any) => {
                if(response.data){
                    localStorage.setItem('userData', JSON.stringify(response.data));
                }
                return response;
            });
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