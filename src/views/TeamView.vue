<template>

<div v-if="singleTeam !== null" class="text-center bg-green-300 text-gray-800 py-24 px-6">
      <h1 class="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12 ">{{ singleTeam.school }} <br /><span class="text-blue-600">City: {{ singleTeam.location.city }}  {{ singleTeam.location.country_code }}</span></h1>

      <img :src="singleTeam.logos[0]" alt="" :style="{'width': '150px'}" class="m-auto">
      
      <h6 class="text-2xl md:text-3xl xl:text-3xl font-bold tracking-tight mb-12"><span class="text-blue-600">Abbreviation:</span> {{ singleTeam.abbreviation }}</h6>
      <h6 class="text-2xl md:text-3xl xl:text-3xl font-bold tracking-tight mb-12"><span class="text-blue-600">Classification:</span> {{ singleTeam.classification }}</h6>
      <h6 class="text-2xl md:text-3xl xl:text-3xl font-bold tracking-tight mb-12"><span class="text-blue-600">Mascot:</span> {{ singleTeam.mascot }}</h6>
      <h6 class="text-2xl md:text-3xl xl:text-3xl font-bold tracking-tight mb-12"><span class="text-blue-600"> Location: </span> {{ singleTeam.location.city }}  {{ singleTeam.location.country_code }}</h6>
      <h6 class="text-2xl md:text-3xl xl:text-3xl font-bold tracking-tight mb-12"><span class="text-blue-600"> Place: </span> {{ singleTeam.location.name}}</h6>
    </div>

</template>

<script>
import { ref } from "@vue/reactivity";
import getTeams from "../composables/getTeams.js";
import { onMounted } from "@vue/runtime-core";

export default {
  props: ["id"],
  setup(props) {
    let teams = ref(null);
    let singleTeam = ref(null);

    onMounted(() => {
      getTeams().then((data) => {
        teams.value = data;

        singleTeam.value = teams.value.find(
          (team) => team.id === parseInt(props.id)
        );
        console.log(singleTeam.value);

        return { singleTeam };
      });
    });

    return { teams, singleTeam };
  },
};
</script>

<style>
</style>