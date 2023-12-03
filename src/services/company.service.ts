import api from '../../vueconfig'
import { CompanyRegister } from '@/types/register.types';
import authHeader from './token.service';
export default {
    
    async getAll() 
    {
        try{
            return api.get(`companies`).then((response:any) => {
                if(response.data){
                    return response;
                }
            });
        }catch (erro)
        {
            return erro;
        }    
    },

    async getCity(city:string) 
    {
        try{
            const response = await api.get(`companies/city/${city}`)
            return response.data
        }catch (erro)
        {
            return erro;
        }    
    },

    async getState(state:string) 
    {
        try{
            const response = await api.get(`companies/state/${state}`)
            return response.data
        }catch (erro)
        {
            return erro;
        }    
    },

    async getOffice(office:string) 
    {
        try{
            const response = await api.get(`companies/office/${office}`)
            return response.data
        }catch (erro)
        {
            return erro;
        }    
    },

    async create(company:CompanyRegister)
    {
        try {
            return await api.post(`companies/save`, company, { headers: authHeader() }).then((response:any) => {
                if(response.data){
                    localStorage.setItem('companyid',response.data.id);
                }
                return response;
            });
        } catch (error) {
            return error;
        }
    },

    async update(company:CompanyRegister, id:number)
    {
        try {
            const response = await api.patch(`companies/update/${id}`, { 
                body: company
            });
            return response.data;
        } catch (error) {
            return error;
        }
    },

    async delete(id:number)
    {
        try {
            const response = await api.delete(`companies/delete/${id}`);
            return response.status;
        } catch (error) {
            return error;
        }
    },
};