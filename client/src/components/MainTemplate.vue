<template>
  <v-app id="inspire">
    <v-navigation-drawer
      fixed
      clipped
      class="grey lighten-4"
      app
      v-model="drawer"
    >
      <v-list
        dense
        class="grey lighten-4"
      >
        <template v-for="(item, i) in items">
          <v-layout
            row
            v-if="item.heading"
            align-center
            :key="i"
          >
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
          </v-layout>
          <v-divider
            dark
            v-else-if="item.divider"
            class="my-3"
            :key="i"
          ></v-divider>
          <v-list-tile
            v-ripple
            :key="i"
            v-else
            @click="firebaseGet"
          >
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="grey--text">
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="amber" app absolute clipped-left>
      <v-toolbar-side-icon @click.native="drawer = !drawer"></v-toolbar-side-icon>
      <span class="title ml-3 mr-5">Сроки&nbsp;<span class="text">закупок</span></span>
      <v-text-field
        solo-inverted
        flat
        label="Поиск..."
        prepend-icon="search"
      ></v-text-field>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height class="grey lighten-4">
        <v-layout justify-center align-center>
          <v-flex shrink>
            <v-card>
              <v-card-title primary-title>
                <div>
                  <h3 class="headline mb-0"> {{ message }}</h3>
                  <div></div>
                </div>
              </v-card-title>
              <v-card-actions>
                <v-btn flat color="orange">Изменить</v-btn>
                <v-btn flat color="red">Удалить</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService';

export default {
	name: 'MainTemplate',
	data: () => ({
		message: '',
		drawer: null,
		items: [
			{ message: 'Привет' },
			{ heading: 'События' },
			{ icon: 'add', text: 'Добавить' },
			{ icon: 'refresh', text: 'Обновить' },
			{ divider: true },
			{ icon: 'archive', text: 'Архив' },
			{ divider: true },
			{ icon: 'help', text: 'Как это работает?' },
		],
	}),
	props: {},
	methods: {
		async firebaseGet() {
			console.log('firebaseGet');

			await AuthenticationService.firebaseGet()
				.then(res => (this.message = res))
				.catch(err => console.log(err));
		},
	},
};
</script>

<style>
#keep main .container {
	height: 660px;
}
.navigation-drawer__border {
	display: none;
}
.text {
	font-weight: 400;
}
</style>

