<template>
  <v-app-bar app flat color="primary">
    <v-img src="@/assets/VagaCerta.png" max-height="120" class="mr-2"></v-img>
    <v-btn text to="/vagas">
      <!-- <v-img src="@/assets/VagaCerta.png" max-height="120" class="mr-2"></v-img> -->
      Vagas
    </v-btn>
    <v-btn text to="/empresas">
      Empresas
    </v-btn>
    <v-btn text to="/candidato">
      Candidato
    </v-btn>
    <v-spacer></v-spacer>
    <v-btn
      to="/register"
      min-width="164"
      color="primary"
      variant="flat">
      <v-icon
        icon="mdi-account-plus"
        size="large"
        start/>
      Cadastrar
    </v-btn>
  </v-app-bar>

  
</template>

<script lang="ts" setup>
  //
</script>
