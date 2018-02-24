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
            v-if="item.add"
            @click="eventAdderShow = true"
          >
          <v-dialog v-model="eventAdderShow" max-width="700">
              <v-card>
                <v-card-title align-center class="headline">Создать новое событие</v-card-title>
                <v-form class="innerForm">
                  <v-text-field prepend-icon="subtitles" name="title" label="Название проекта" type="text"></v-text-field>
                  <v-select
                    :items="selectItems"
                    v-model="selectItemsModel"
                    label="Тип проекта:"
                    single-line
                    bottom
                  ></v-select>
                  <v-date-picker align-center v-model="picker" :landscape="landscape" :reactive="reactive"></v-date-picker>
                </v-form>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="black darken-1" flat="flat" @click.native="eventAdderShow = false">Отмена</v-btn>
                  <v-btn color="green darken-1" flat="flat" @click.native="eventAdderShow = false">Добавить</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="grey--text">
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile
            v-ripple
            :key="i"
            v-if="item.refresh"
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
          <v-list-tile
            v-ripple
            :key="i"
            v-if="item.archive"
            @click=""
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
          <v-list-tile
            v-ripple
            :key="i"
            v-if="item.help"
            @click=""
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
          <v-flex  shrink>
            <template v-for="(curEvent, i) in events">
              <v-card
              class="v-card"
              :key="i"
              >
                <v-card-title primary-title>
                  <div>
                    <h3 class="headline mb-0"> {{ curEvent.title }}</h3>
                    <div> {{ curEvent.type }} </div>
                    <div> {{ curEvent.date }} </div>
                    <div> {{ curEvent.dateString }} </div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn flat color="orange">Изменить</v-btn>
                  <v-btn flat color="red">Удалить</v-btn>
                </v-card-actions>
              </v-card>
            </template>
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
		events: [],
		drawer: null,
		picker: null,
		landscape: true,
		reactive: true,
		eventAdderShow: false,
		eventAdder: [{}],
		selectItemsModel: null,
		selectItems: [
			{ text: 'Аукцион длинный' },
			{ text: 'Аукцион короткий' },
			{ text: 'Конкурс длинный' },
			{ text: 'Конкурс короткий' },
			{ text: 'Запрос котировок длинный' },
			{ text: 'Запрос котировок которкий' },
		],
		items: [
			{ message: 'Привет' },
			{ heading: 'События' },
			{ icon: 'add', text: 'Добавить', add: true },
			{ icon: 'refresh', text: 'Обновить', refresh: true },
			{ divider: true },
			{ icon: 'archive', text: 'Архив', archive: true },
			{ divider: true },
			{ icon: 'help', text: 'Как это работает?', help: true },
		],
	}),
	props: {},
	methods: {
		async firebaseGet() {
			await AuthenticationService.firebaseGet()
				.then(res => (this.events = res.data))
				.catch(err => console.log(err));
		},
		async firebaseSet() {
			await AuthenticationService.firebaseSet()
				.then(res => (this.successSetMessage = res.data))
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
.v-card {
	margin-bottom: 20px;
}
.innerForm {
	width: 80%;
	margin: auto;
}
.picker__body {
	width: auto !important;
}
</style>