<template>
  <v-app style="background-color: #151532;">
    <PlayerManager>

    </PlayerManager>
  </v-app>
</template>

<script>

import PlayerManager from "@/components/PlayerManager";
export default {
  name: 'App',

  components: {
    PlayerManager
  },

  data: () => ({
    //
  }),
};


</script>
<style>
*{
  font-family: 'Carter One', cursive;
}
</style>