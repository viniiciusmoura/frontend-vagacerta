<template>
    <h4>> Meus endereços</h4>

    <v-btn color="primary"
      class="align-center"
      @click="openmodal"
      append-icon="mdi-plus">
      Adicionar
    </v-btn>
    <v-table theme="light">
      <thead>
        <tr>
          <th class="text-left">
            CEP
          </th>
          <th class="text-left">
            Cidade
          </th>
          <th class="text-left">
            Estado
          </th>
          <th class="text-left">
            Bairro
          </th>
          <th class="text-left">
            Complemento
          </th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in data"
          :key="item.id"
        >
          <td>{{ item.cep }}</td>
          <td>{{ item.city }}</td>
          <td>{{ item.state }}</td>
          <td>{{ item.neighborhood }}</td>
          <td>{{ item.address }}</td>  
          <td> <v-btn class="ma-2" color="yellow" icon="mdi-pencil" @click="editarAddress(item)" ></v-btn> </td>
          <td> <v-btn class="ma-2" color="red" icon="mdi-delete" @click="deleteAddress(item.id)"></v-btn> </td>
        </tr>
      </tbody>
    </v-table>
    <v-dialog
        transition="dialog-top-transition"
        v-model="dialog"
        width="600">
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
                        sm="6">
                            <v-text-field
                                label="Cep"
                                v-model="address.cep"
                                persistent-hint
                                type="number"
                                variant="outlined"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-btn
                            color="primary"
                            :loading="loading"
                            @click="sendCep"
                            variant="outlined">
                            consultar
                          </v-btn>
                        </v-col>
                        <v-col
                        cols="12"
                        sm="12">
                            <v-text-field
                                label="Cidade"
                                v-model="address.city"
                                persistent-hint
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
                                variant="outlined"
                                readonly
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
                >{{ edit ? 'Cadastrar' : 'Atualizar'}}</v-btn>
                <v-btn
                variant="text"
                @click="dialog = !dialog"
                >Fechar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <m-message :datamsg="datamsg" v-model="alertMsg" />
  </template>
<script setup lang="ts">

import { AddressType } from '@/types/address.types';
import { ref } from 'vue';
import MMessage from './shared/MMessage.vue';
import { Msg } from '@/types/generic.types';
import addressService from '@/services/address.service';
import { onMounted } from 'vue';


const loading = ref<boolean>(false)
const dialog = ref<boolean>(false);
const data = ref<AddressType[]>([])
const alertMsg = ref<boolean>(false);
const datamsg = ref<Msg>({});
const idCompany = ref<number>(0);
const edit = ref<boolean>(false);

const props = defineProps({
  company: Boolean
})

const address = ref<AddressType>({
    cep: '',
    address: '',
    city: '',
    neighborhood: '',
    state: '',
}); 


async function addressAll(id:number) {
    let response: any;
    if(props.company){
      response = await addressService.getAddressCompany(id);
      address.value.company = id;
    }else{
      response = await addressService.getAddressCandidate(id);
      address.value.candidate = id;
    }
    data.value = response;
}


async function createAddress() {
  if(validadtionsAddress()) {
    if (props.company) {
      address.value.company = idCompany.value;
    }else{
      address.value.candidate = idCompany.value;
    }

    const responseAddress: any = await addressService.create(address.value);   
    addressAll(idCompany.value);
    dialog.value = !dialog.value;
    datamsg.value = {message: "Atualizado com sucesso", color: "primary", time: 3000};
  }else{
    datamsg.value = {message: "Campos vazio, favor conferir", color: "erromsg", time: 3000};
    alertMsg.value=true
  }
}

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
async function editarAddress(addressEdit:AddressType) {
  edit.value = false;
  address.value = addressEdit;
  dialog.value = true;
}

function openmodal(){
  address.value = {
    cep: '',
    address: '',
    city: '',
    neighborhood: '',
    state: '',
  };
  edit.value = true;
  dialog.value = true;
}

async function deleteAddress(id:number|undefined) {
  if (id != undefined) {
    const response: any = await addressService.delete(id);
    data.value = data.value.filter(vaga => vaga.id !== id);
  }
}

function validadtionsAddress() {
  return Object.values(address.value).every(valor => valor !== '');
}

onMounted(() => {
  
  const userDataStore = localStorage.getItem("userData");
  
  if (userDataStore) {
    const objetoUser = JSON.parse(userDataStore);
    idCompany.value = objetoUser.id; 
    addressAll(objetoUser.id);
  }
})


</script>

