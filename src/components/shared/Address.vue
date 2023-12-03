<template>

    <v-card
        class="mx-auto"
        title="Endereço"
        elevation="5"
        prepend-icon="mdi-home">

        <v-card-text>
            <v-form>
                <v-row >
                    <v-col cols="4" >
                        <v-text-field
                            label="CEP"
                            v-model="address.cep"
                            type="text"
                            variant="outlined"
                            required />
                    </v-col>
                    <v-col cols="2">
                        <v-btn
                            color="primary"
                            :loading="loading"
                            @click="sendCep"
                            variant="outlined">
                            consultar
                        </v-btn>
                    </v-col>
                    <v-col cols="6">
                        <v-card
                        v-if="addressFormt!=''"
                        class="mx-auto"
                        width="300"
                        color="indigo"
                        variant="flat"
                        >
                            <v-card-item>
                                <div>
                                    <div class="text-h6 mb-1">
                                        Endereço
                                    </div>
                                    <div class="text-caption">{{ addressFormt }}</div>
                                </div>
                            </v-card-item>
                        </v-card>
                    </v-col>
                </v-row>
                
            </v-form>
        </v-card-text>
    </v-card>
    
    <v-dialog
        transition="dialog-top-transition"
        v-model="dialog"
        width="500">
        <v-card>
            <v-toolbar
                color="primary"
                title="Informações de endereço"
            ></v-toolbar>
            <v-card-text>
                <v-form>
                    <v-row>
                        <v-col
                        cols="12"
                        sm="4">
                            <v-text-field
                                label="Cep"
                                v-model="address.cep"
                                persistent-hint
                                type="number"
                                readonly
                                variant="outlined"
                            ></v-text-field>
                        </v-col>
                        <v-col
                        cols="12"
                        sm="8">
                            <v-text-field
                                label="Cidade"
                                v-model="address.city"
                                persistent-hint
                                readonly
                                variant="outlined"
                            ></v-text-field>
                        </v-col>
                    </v-row>    
                    <v-row>
                        <v-col
                        cols="12"
                        sm="3">
                            <v-text-field
                                label="Estado"
                                v-model="address.state"
                                persistent-hint
                                readonly
                                variant="outlined"
                            ></v-text-field>
                        </v-col>
                        <v-col
                        cols="12"
                        sm="9">
                            <v-text-field
                                label="Bairro"
                                v-model="address.neighborhood"
                                persistent-hint
                                variant="outlined"
                            ></v-text-field>
                        </v-col>
                    </v-row>  
                    <v-row>
                        <v-text-field
                                label="Complemento"
                                v-model="address.address"
                                persistent-hint
                                variant="outlined"
                            ></v-text-field>
                    </v-row>  
                </v-form>
            </v-card-text>
            <v-card-actions class="justify-end">
                <v-btn
                variant="flat"
                color="primary"
                @click="createAddress"
                >Cadastrar</v-btn>
                <v-btn
                variant="text"
                @click="dialog = !dialog"
                >Fechar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <MMessage v-model="alertMsg" :datamsg=datamsg />
</template>
<script lang="ts" setup>
import { AddressType } from '@/types/address.types';
import { ref } from 'vue';
import addressService from '@/services/address.service';
import MMessage from './MMessage.vue';
import { Msg } from '@/types/generic.types';


const loading = ref<boolean>(false)
const dialog = ref<boolean>(false);
const addressFormt = ref<string>('');
const datamsg = ref<Msg>({});
const alertMsg = ref<boolean>(false);

const emit = defineEmits(['address']);

const address = ref<AddressType>({
    cep: '',
    address: '',
    city: '',
    neighborhood: '',
    state: ''
}); 


async function sendCep()
{
    if (address.value.cep) {
        loading.value = true;
        const response: any = await addressService.getAddress(address.value.cep)
        if (response.status === 200) {
            address.value.city = response.data.localidade;
            address.value.neighborhood = response.data.bairro;
            address.value.state = response.data.uf;
            address.value.address = response.data.logradouro+ ", ";
    
            loading.value = false;
            dialog.value = true
        }else{
            loading.value = false;
            datamsg.value = {message: "Erro na consulta do cep, favor veirfique os dados", color: "erromsg", time: 3000};
            alertMsg.value=true
        }
    }
}


function createAddress() 
{
    if(validadtionsAddress()) {
        dialog.value = !dialog.value;
        addressFormt.value = `Endereço: ${address.value.city}, ${address.value.state}, ${address.value.neighborhood}
        Complemento: ${address.value.address}`;
        emit("address", address.value);
    }else{
        datamsg.value = {message: "Campos vazio, favor conferir", color: "erromsg", time: 3000};
        alertMsg.value=true
    }

}

function validadtionsAddress() {
  return Object.values(address.value).every(valor => valor !== '');
}
</script>