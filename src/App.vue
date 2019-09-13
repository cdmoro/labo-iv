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
        <span v-show="animals.length != 0">
          <i class="fas fa-redo"></i> Restaurar
        </span>
        <b-spinner v-show="animals.length == 0" variant="primary" style="width: 1.5rem; height: 1.5rem" />
      </b-button>
    </b-navbar>
    <b-container>
        <h2>Animales ({{ animals.length }})</h2>

        <transition-group class="card-columns" name="list" tag="div">
          <b-card
            v-for="animal in animals"
            :key="animal.id"
            class="animal shadow-sm"
            :img-src="`./images/${animal.image}`"
            img-top
          >
            <b-card-title class="d-flex mb-0">
              <i 
                class="mr-3 fas fa-fw" 
                :class="`fa-${animal.icon}`"
                :style="`color: ${animal.color}`"
              />
              <span class="flex-fill">{{ animal.name }}</span>
              <b-link 
                type="button" 
                v-b-tooltip 
                title="Eliminar"
                @click="deleteRow(animal.id)"
              >
                <i class="fas text-danger fa-skull-crossbones"></i>
              </b-link>
            </b-card-title>
          </b-card>
        </transition-group>
    </b-container>
  </div>
</template>

<script>
import { db } from './db'
import Animal from '@/models/Animal'

export default {
  firebase: {
    animals: db.ref('animals')
  },
  mounted() {
    this.restoreData()
  },
  methods: {
    restoreData() {
      db.ref('animals').set(this.animalsBack)
    },
    deleteRow(id) {
      db.ref('animals').child(id).remove()
    }
  },
  data() {
    return {
      animals: [],
      animalsBack: [
        new Animal(0, '#6c757d', 'hippo', 'Hipopótamo', 'hippo.jpg'),
        new Animal(1, '#28a745', 'dragon', 'Dragón', 'dragon.jpg'),
        new Animal(2, 'orange', 'spider', 'Araña', 'spider.jpg'),
        new Animal(3, '#ffc107', 'fish', 'Pez', 'fish.jpg'),
        new Animal(4, 'brown', 'otter', 'Nutria', 'otter.jpg'),
        new Animal(5, '#343a40', 'crow', 'Cuervo', 'crow.jpg'),
      ],
    };
  }
};
</script>

<style>
  .card-img-top {
    height: 243px;
  }
  .card.animal, .card.animal img {
    transition: all ease .35s;
  }
  .card.animal:hover {
    transform: scale(.95);
  }
  .card.animal:hover img {
    filter: grayscale(100%);
  }

  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }
  .list-enter, .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
</style>