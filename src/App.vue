<template>
  <div>
    <b-navbar type="dark" variant="primary" class="mb-3">
      <b-navbar-brand href="#">LABO IV - Base de datos en la nube</b-navbar-brand>
      <b-button 
        class="ml-auto" 
        variant="light" 
        @click="restoreData"
        :disabled="animals.lenght == 0"
      >
        <span v-show="animals.length != 0">Restaurar</span>
        <b-spinner v-show="animals.length == 0" variant="primary" style="width: 1.5rem; height: 1.5rem" />
      </b-button>
    </b-navbar>
    <b-container>
        <h2>Animales ({{ animals.length }})</h2>

        <b-card-group columns>
          <b-card
            v-for="animal in animals"
            :key="animal.id"
            :img-src="animal.stickerUrl"
          >
            <b-card-title class="d-flex mb-0">
              <span class="flex-fill">{{ animal.name }}</span>
              <b-link 
                type="button" 
                v-b-tooltip 
                title="Borrar"
                @click="deleteRow(animal.id)"
              >
                <i class="fas text-danger fa-thumbs-down"></i>
              </b-link>
            </b-card-title>
          </b-card>
        </b-card-group>
    </b-container>
  </div>
</template>

<script>
import { db } from './db'
import Animal from '../models/Animal'

export default {
  firebase: {
    animals: db.ref('social')
  },
  methods: {
    restoreData() {
      db.ref('social').set(this.animalsBack)
    },
    deleteRow(id) {
      db.ref('social').child(id).remove()
    }
  },
  data() {
    return {
      animals: [],
      animalsBack: [
        new Animal(0, 'grey', 'hippo', 'Hipopótamo', 'https://media.giphy.com/media/1lBHa6fa91MA1itBXp/giphy.gif'),
        new Animal(1, 'green', 'dragon', 'Dragón', 'https://media.giphy.com/media/144Ou7cw4Gd74Q/giphy.gif'),
        new Animal(2, 'pink', 'spider', 'Araña', 'https://media.giphy.com/media/xUA7bgGSAIxDSCrwXK/giphy.gif'),
        new Animal(3, 'yellow', 'fish', 'Pez', 'https://media.giphy.com/media/86ZaveoUagZAQ/giphy.gif'),
        new Animal(4, 'brown', 'otter', 'Nutria', 'https://media.giphy.com/media/fINnWyWeWZDVu/giphy.gif'),
        new Animal(5, 'black', 'crow', 'Cuervo', 'https://media.giphy.com/media/7ZUgBDGY7U6be/giphy.gif'),
      ],
    };
  }
};
</script>

<style>
  .card-img {
    height: 250px;
    background: gray;
  }
</style>