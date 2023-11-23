import api from '../../vueconfig'

export default {
    async getEmailUser() 
    {
        try{
            const response = await api.get(`user/email/${'company@teste.com'}`)
            return response.data
        }catch (erro)
        {
            return erro;
        }
        
    }

};