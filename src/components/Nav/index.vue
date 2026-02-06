<template>
  <nav class="nav">
    <img :src="logo" alt="logo" class="logo" />
    <AutoComplete v-model="selectedItem" placeholder="Pesquise um nome de pessoa" :suggestions="filteredItems"
      @complete="searchItems" :virtualScrollerOptions="{ itemSize: 38 }" optionLabel="label" dropdown />
    <CascadeSelect v-model="selectEmpresa" :options="empresas" optionLabel="label" optionValue="value"
      optionGroupLabel="label" :optionGroupChildren="['departamentos', 'equipes', 'membros']" class="w-56"
      placeholder="Selecione um membro" />
      <InputMask id="basic" v-model="value" mask="(99) 9 9999-9999" placeholder="(99) 9 9999-9999" />
    <ul>
      <li>Inicio</li>
      <li>Configs</li>
      <li>Fale conosco</li>
      <li @click="logout">Sair</li>
      <ColorPicker v-model="color" />
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { ref } from "vue";
import logo from '../../assets/image/logo.png'
import { useRouter } from 'vue-router'

import { empresas, nomesPessoas } from "../../utils/consts";
import AutoComplete from 'primevue/autocomplete';
import CascadeSelect from 'primevue/cascadeselect';
import ColorPicker from 'primevue/colorpicker';
import InputMask from 'primevue/inputmask';
const router = useRouter()

function logout() {
  router.push('/login')
}

const value = ref(null);
const color = ref();
const selectedItem = ref();
const filteredItems = ref();

const searchItems = (event: any) => {
  let query = event.query;
  let _filteredItems = [];

  for (let i = 0; i < nomesPessoas.value.length; i++) {
    let item = nomesPessoas.value[i];

    if (item?.label.toLowerCase().indexOf(query.toLowerCase()) === 0) {
      _filteredItems.push(item);
    }
  }

  filteredItems.value = _filteredItems;
};

const selectEmpresa = ref();
</script>