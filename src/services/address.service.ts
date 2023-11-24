import api from '../../vueconfig'
import { Address } from '@/types/address.types';
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

    async create(address:Address)
    {
        try {
            const response = await api.post(`address/save`, { 
                body: address
            });
            return response.data;
        } catch (error) {
            return error;
        }
    },

    async update(address:Address, id:number)
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
            const response = await api.delete(`address/delete/${id}`);
            return response.status;
        } catch (error) {
            return error;
        }
    },
};