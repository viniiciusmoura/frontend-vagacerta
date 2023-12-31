import api from '../../vueconfig'
import { Vacancies } from '@/types/vacancies.types';
import authHeader from './token.service';
export default {
    
    async getAll() 
    {
        try{
            const response = await api.get(`vacancies`)
            return response.data
        }catch (erro)
        {
            return erro;
        }    
    },

    async getAllCompany(id:number) 
    {
        try{
            const response = await api.get(`vacancies/company/${id}`, { headers: authHeader() })
            return response.data
        }catch (erro)
        {
            return erro;
        }    
    },

    async getSalary(salary:number) 
    {
        try{
            const response = await api.get(`vacancies/salary/${salary}`)
            return response.data
        }catch (erro)
        {
            return erro;
        }    
    },

    async getOffice(office:string) 
    {
        try{
            const response = await api.get(`vacancies/office/${office}`,  { headers: authHeader() })
            return response.data
        }catch (erro)
        {
            return erro;
        }    
    },

    async create(vacancies:Vacancies)
    {
        try {
            const response = await api.post(`vacancies/save`, vacancies, { headers: authHeader() });
            return response.data;
        } catch (error) {
            return error;
        }
    },

    async update(vacancies:Vacancies, id:number)
    {
        try {
            const response = await api.patch(`vacancies/update/${id}`, { 
                body: vacancies
            });
            return response.data;
        } catch (error) {
            return error;
        }
    },

    async delete(id:number)
    {
        try {
            const response = await api.delete(`vacancies/delete/${id}`, { headers: authHeader() });
            return response.status;
        } catch (error) {
            return error;
        }
    },
};