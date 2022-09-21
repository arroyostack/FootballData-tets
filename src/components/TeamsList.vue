<template>
  <!-- <h1>hi there</h1>
  

  {{ team.mascot}} -->
  <div class="flex justify-center gap-12 mb-12 mt-6 text-center">
    <div class="rounded-lg shadow-lg bg-white">
      <a href="#!">
        <img alt="" />
        <div v-if="team.logos && team.logos[0]">
          <img
            :src="team.logos[0]"
            alt=""
            class="rounded-t-lg"
            :style="{ width: '300px' }"
          />
        </div>

        <div v-else>
          <img
            src="https://t4.ftcdn.net/jpg/04/00/24/31/360_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg"
            alt=""
            class="rounded-t-lg"
          />
        </div>
      </a>
      <div
        class="w-24 h-24 rounded-full m-auto"
        :style="{ background: team.color }"
      ></div>
      <div class="p-6">
        <router-link
          class="no-underline cursor-pointer"
          :to="{ name: 'team', params: { id: team.id } }"
        >
          <h2 class="text-gray-900 text-xl font-medium mb-2">
            {{ team.school }}
          </h2>
          <h2 class="mb-6">{{ team.location.city }} {{ team.location.country_code }}</h2>

          <div>
            <p class="text-green-400">
              {{ myTeam.isFav === undefined ? "" : "you liked this team" }}
            </p>
          </div>
          <p class="text-blue-400">
            {{ myTeam.comment }}
          </p>
        </router-link>

        <button
          @click.prevent="handleFav"
          type="button"
          class="
            inline-block
            px-6
            py-2.5
            bg-blue-600
            text-white
            font-medium
            text-xs
            leading-tight
            uppercase
            rounded
            shadow-md
            hover:bg-blue-700 hover:shadow-lg
            focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
            active:bg-blue-800 active:shadow-lg
            transition
            duration-150
            ease-in-out
            mr-6
          "
        >
          Like
        </button>
        <button
          @click.prevent="clearComent"
          type="button"
          class="
            inline-block
            px-6
            py-2.5
            bg-blue-600
            text-white
            font-medium
            text-xs
            leading-tight
            uppercase
            rounded
            shadow-md
            hover:bg-blue-700 hover:shadow-lg
            focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
            active:bg-blue-800 active:shadow-lg
            transition
            duration-150
            ease-in-out
          "
        >
          ClearComment
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  props: ["team", "favTeam", "wasFav", "favOn"],
  setup(props, { emit }) {
    let myTeam = props.team;

    if (props.wasFav !== null && props.wasFav.includes(myTeam.id)) {
      myTeam.isFav = true;
    }

    const handleFav = () => {
      const userText = prompt("Enter text");
      myTeam.comment = userText;
      if (myTeam.isFav === undefined) {
        myTeam.isFav = true;
        emit("favId", myTeam);
        alert("Saved in favs!");
      }
    };

    const clearComment = () => {
      myTeam.comment = "";
      myTeam.isFav = false;
      emit("noFav", myTeam.id);
    };

    return { handleFav, myTeam, clearComment };
  },
};
</script>

<style>
img {
  max-width: 200px;
}
</style>