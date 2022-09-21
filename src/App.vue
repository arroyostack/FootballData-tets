<template>
<nav class="relative w-full flex flex-wrap items-center ">
  
      <!-- <a class="text-xl text-black" href="#">Navbar</a> -->
      <button @click="$router.push('/')" class="text-xl text-black m-auto bg-blue-400 rounded p-3 mb-3 mt-3">Home</button>


</nav>

  <router-view/>
</template>

<script>

export default {

}
</script>


<style>

</style>
