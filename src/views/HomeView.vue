<template>
  <form action="#" @submit.prevent="handleSearch">
    <div class="flex justify-center text-center bg-slate-300">
      <div class="mb-3 xl:w-96">
        <label
          for="exampleSearch2"
          class="form-label inline-block mb-2 mt-6 text-gray-700"
          >Search</label
        >
        <input
          type="search"
          class="
          text-center
            form-control
            block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700
            focus:bg-white
            focus:border-blue-600
            focus:outline-none
          "
          id="exampleSearch2"
          placeholder="Type query"
          v-model="typeSearch"
        />
      </div>
    </div>
  </form>
  <div @click.prevent="isFavOn = !isFavOn" class="flex space-x-2 justify-center sticky top-0">
  <button type="button" class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mt-12 sticky">
    <p v-if="!isFavOn">Liked Teams</p>
    <p v-if="isFavOn">All Teams</p>
  </button>

    <button @click.prevent="handleClear" type="button" class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mt-12">
    <p>Clear Search</p>
  </button>
</div>

<div >

</div>



  <div
    v-if="!isFavOn && filteredTeams === null"
    class="flex flex-wrap gap-x-1.5 justify-center bg-slate-300 mt-12"
  >
    <TeamsList
      v-for="team in teams"
      :key="team.id"
      :team="team"
      @favId="handleEmit"
      :favTeams="favTeams"
      :wasFav="wasFav"
    />
  </div>
  <div v-if="filteredTeams !== null" class="flex flex-wrap gap-x-1.5 m-auto">
    <TeamsList
      v-for="team in filteredTeams"
      :key="team.id"
      :team="team"
      @favId="handleEmit"
      :favTeams="favTeams"
      :wasFav="wasFav"
    />
  </div>

  <div v-if="isFavOn === true && favTeams !== [] && filteredTeams === null" class="flex flex-wrap gap-x-1.5 m-auto">
    <TeamsList
      v-for="team in favTeams"
      :key="team.id"
      :team="team"
      @favId="handleEmit"
      :favTeams="favTeams"
      :wasFav="wasFav"
    />
  </div>
  <div v-else>
      <h1 class="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12 text-blue-400 text-center">Here it comes...</h1></div>
</template>

<script>
import { ref } from "@vue/reactivity";
import TeamsList from "../components/TeamsList.vue";
import getTeams from "../composables/getTeams.js";
import { onMounted } from "@vue/runtime-core";

export default {
  name: "HomeView",
  components: {
    TeamsList,
  },
  setup() {
    let teams = ref(null);
    let favTeams = ref([]);
    let wasFav = ref([]);
    let isFavOn = ref(false);
    let typeSearch = ref("");
    let searchedTerm = ref("");
    let filteredTeams = ref(null);

    onMounted(() => {
      getTeams().then((data) => {
        teams.value = data;
        console.log(teams.value);
      });
      wasFav.value = JSON.parse(localStorage.getItem("isFav"));
    });

    const handleEmit = (e) => {
      favTeams.value.push(e);
      localStorage.removeItem("isFav");
      localStorage.setItem("isFav", JSON.stringify(favTeams.value));
    };

    const handleSearch = () => {
      searchedTerm.value = typeSearch.value;

      if (typeSearch.value !== "") {
        filteredTeams.value = teams.value.filter((item) =>
          item.school.includes(typeSearch.value)
        );
      }
    };

    const handleClear = () => {
      filteredTeams.value = null;
      typeSearch.value = "";
    };

    return {
      teams,
      handleEmit,
      favTeams,
      wasFav,
      isFavOn,
      typeSearch,
      handleSearch,
      filteredTeams,
      handleClear,
    };
  },
};
</script>
