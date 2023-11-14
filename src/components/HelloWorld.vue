<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">
      <v-row>
        <v-col v-for="i in 6" :key="i" cols="4"> 
          <v-card>
            <v-card-title>Oportunidade</v-card-title>
            <v-img src="@/assets/oportunidade.png" max-height="50" aspect-ratio="1.5"></v-img> 
            <v-card-text>
              <div>
                Java Dev
              </div>
              <div>
                Salário: 1.000,00
              </div>
              <v-btn to="/info" color="primary" >
                Mais informações
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script setup>
//
</script>
