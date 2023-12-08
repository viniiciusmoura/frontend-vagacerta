import api from '../../vueconfig'
import { AddressType } from '@/types/address.types';
import authHeader from './token.service';
export default {
    
    async getAll() 
    {
        try{
            const response = await api.get(`address`)
            return response.data
        }catch (erro)
        {
            return erro;
        }    
    },

    async getAddressCompany(id:number) 
    {
        try{
            const response = await api.get(`address/company/${id}`, { headers: authHeader() })
            return response.data
        }catch (erro)
        {
            return erro;
        }    
    },

    async getAddressCandidate(id:number) 
    {
        try{
            const response = await api.get(`address/candidate/${id}`, { headers: authHeader() })
            return response.data
        }catch (erro)
        {
            return erro;
        }    
    },
    async getAddress(cep:string)
    {
        try{
            const response = await api.get(`https://viacep.com.br/ws/${cep}/json/`)
            return response;
        }catch (error) {
            return error;
        }
    },

    async create(address:AddressType)
    {
        try {
            return await api.post(`address/save`, address, { headers: authHeader() }).then((response:any) => {
                return response;
            });
        } catch (error) {
            return error;
        }
    },

    async update(address:AddressType, id:number)
    {
        try {
            const response = await api.patch(`address/update/${id}`, { 
                body: address
            });
            return response.data;
        } catch (error) {
            return error;
        }
    },

    async delete(id:number)
    {
        try {
            const response = await api.delete(`address/delete/${id}`, { headers: authHeader() });
            return response.status;
        } catch (error) {
            return error;
        }
    },
};