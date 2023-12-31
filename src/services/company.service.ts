import api from '../../vueconfig'
import { CompanyRegister, UpdateCompany } from '@/types/register.types';
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
            const response = await api.get(`companies/city/${city}`, { headers: authHeader() })
            return response.data
        }catch (erro)
        {
            return erro;
        }    
    },

    async getSearch(search:string) 
    {
        try{
            const response = await api.get(`companies/search/${search}`, { headers: authHeader() })
            return response.data
        }catch (erro)
        {
            return erro;
        }    
    },

    async getState(state:string) 
    {
        try{
            const response = await api.get(`companies/state/${state}`, { headers: authHeader() })
            return response.data
        }catch (erro)
        {
            return erro;
        }    
    },

    async getOffice(office:string) 
    {
        try{
            const response = await api.get(`companies/office/${office}`, { headers: authHeader() })
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
                    localStorage.setItem('userData', JSON.stringify(response.data));
                }
                return response;
            });
        } catch (error) {
            return error;
        }
    },

    async update(company:CompanyRegister)
    {
        const update: UpdateCompany = {socialReason: company.socialReason, areaOfActivity: company.areaOfActivity, cnpj: company.cnpj};
        try {
            return await api.patch(`companies/update/${company.id}`, update, { headers: authHeader() }).then((response:any) => {
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
            const response = await api.delete(`companies/delete/${id}`);
            return response.status;
        } catch (error) {
            return error;
        }
    },
};