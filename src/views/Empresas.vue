<template>
    <v-container class="fill-height">
      <v-responsive class="align-center text-center fill-height">
        <v-row>
          <v-col v-for="i in 6" :key="i" cols="4"> 
            <v-card>
              <v-card-title>Empresas</v-card-title>
              <v-img src="@/assets/oportunidade.png" max-height="50" aspect-ratio="1.5"></v-img> 
              <v-card-text>
                <div>
                  Java Dev
                </div>
                <div>
                  Salário: 1.000,00
                </div>
                <v-btn color="primary" @click="dialog = true">
                  Mais informações
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-dialog v-model="dialog" max-width="600">
          <v-card>
            <v-card-title >Detalhes da Empresa</v-card-title>
            <v-card-text>
              Detalhes da Empresa aqui.
            </v-card-text>
            <v-card-actions>
              <v-btn @click="dialog = false" color="primary" class="ml-auto">Fechar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-responsive>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const dialog = ref(false);
  </script>
  