import api from '../../vueconfig'
import { CompanyRegister } from '@/types/register.types';
export default {
    
    async getAll() 
    {
        try{
            const response = await api.get(`companies`)
            return response.data
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
            const response = await api.post(`companies/save`, { 
                body: company
            });
            return response.data;
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