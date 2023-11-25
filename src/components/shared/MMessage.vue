<template>
    <v-snackbar
      :timeout="datamsg.time"
      :color="datamsg.color"
      elevation="24"
    >
      {{ datamsg.message }}
    </v-snackbar>
</template>
<script lang="ts" setup>
import { Msg } from "@/types/generic.types";
import { PropType } from "vue";

const props = defineProps({
    datamsg:{
        type: Object as PropType<Msg>,
        required: true,
    },
});
</script>