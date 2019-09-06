<template>
  <div>
    <b-navbar type="dark" variant="primary" class="mb-3">
      <b-navbar-brand href="#">LABO IV</b-navbar-brand>
      <b-button 
        class="ml-auto" 
        variant="light" 
        @click="restoreData"
        :disabled="items.lenght == 0"
      >
        <span v-show="items.length != 0">Restaurar</span>
        <b-spinner v-show="items.length == 0" variant="primary" style="width: 1.5rem; height: 1.5rem" />
      </b-button>
    </b-navbar>
    <b-container>
        <h2 class="mb-4">Demo Base de datos en la nube</h2>

        <b-table :busy="items.length == 0" outlined striped hover :items="items" :fields="fields">
          <template v-slot:font="{ item }">
            <i class="fab fa-fw fa-2x" :class="`fa-${item.font}`" :style="`color: ${item.color}`"></i>
          </template>
          <template v-slot:url="{ item }">
            <a :href="item.url" target="_blank">{{ item.url }}</a>
          </template>
          <template v-slot:actions="{ item }">
            <b-link 
              type="button" 
              v-b-tooltip 
              title="Borrar"
              @click="deleteRow(item.id)"
            >
              <i class="fas text-danger fa-trash"></i>
            </b-link>
          </template>
        </b-table>
    </b-container>
  </div>
</template>

<script>
import { db } from './db'

export default {
  firebase: {
    items: db.ref('social')
  },
  methods: {
    restoreData() {
      db.ref('social').set(this.itemsBack)
    },
    deleteRow(id) {
      db.ref('social').child(id).remove()
    }
  },
  data() {
    return {
      items: [],
      itemsBack: [
        {
          id: 0,
          color: "#3954A1",
          font: "facebook",
          header: true,
          nombre: "Facebook",
          url: "http://www.facebook.com"
        },
        {
          id: 1,
          color: "#56D7FE",
          font: "twitter",
          header: true,
          nombre: "Twitter",
          url: "http://www.twitter.com",
          visible: true
        },
        {
          id: 2,
          color: "#C0328D",
          font: "instagram",
          nombre: "Instagram",
          url: "http://www.instagram.com",
          visible: true
        },
        {
          id: 3,
          color: "#FF0000",
          font: "youtube",
          header: true,
          nombre: "Youtube",
          url: "http://www.youtube.com",
          visible: true
        },
        {
          id: 4,
          color: "#1D8BBE",
          font: "wordpress",
          nombre: "Wordpress",
          url: "http://www.wordpress.com",
          visible: true
        }
      ],
      fields: [{key:"font", label:"Ícono"}, "nombre", "url", {key: "actions", label: " "}]
    };
  }
};
</script>

<style>
  table td {
    vertical-align: middle !important;
  }
</style>