<template>
  <v-card
    class="mx-auto my-12"
    width="500"
    dark
    style="background-color: #0b0b1e;border-radius: 10px;"
>


    <v-snackbar
        v-model="show_alert"
        top
        text
        timeout="1000"
        outlined
        :color="alert_color"
    >
     <v-icon :color="alert_color" left>{{alert_icon}}</v-icon> {{alert_text}}


    </v-snackbar>

  <v-card-title ><span style="color:#13f094;margin-right:4px;">Player</span> Manager</v-card-title>

  <v-card-text >



          Add, update or delete players


  </v-card-text>

  <v-divider class="mx-4"></v-divider>


  <v-card-text>
    <PlayerAdder v-on:add_player="add_player"></PlayerAdder>
    <span style="text-align:center;width:100%;display: block;margin-bottom:12px;">Players ({{players.length}})</span>



    <Player @update_player="update_player" @delete_player="delete_player"  :key="player.id"  v-for="player in players" :player_info="player"></Player>

  </v-card-text>


</v-card>
</template>

<script>
import PlayerAdder from "@/components/PlayerAdder";
import Player from "@/components/Player";

export default {
  name: "PlayerManager",
  components: {PlayerAdder,Player},
  mounted(){
    this.get_players();
  },
  data(){
    return{
      show_alert:false,
      alert_text:"",
      alert_icon:"",
      alert_color:"",

      players:[
      ]
    }
  },
  methods:{

    alert_user(icon,text,color){
      this.alert_icon=icon;
      this.alert_text=text;
      this.alert_color=color;
      this.show_alert=true;
    },
    /*
    Delete request to delete player.
    If request is successful: wait 500ms for css-animation to finish, then remove player from client list
    If not successful (json parse fails or network error): notify the user of error and refresh player list. (Corrupt player-list-state)
    */
    delete_player:function(player_info){
      fetch('http://localhost:3000/player/'+player_info.id, {
        method: 'DELETE'
      }).then(res => res.json())
          .then(() => {
            let self=this;
            setTimeout(function(){
              self.players = self.players.filter(player => player.id !== player_info.id);
            },0.5*1000);

            this.alert_user("mdi-delete",`${player_info.name} deleted`,"#13f094");
          }).catch(() =>{
            this.alert_user("mdi-alert-circle",`Could not delete player. Please try again later.`,"#f0de13");
            this.get_players();
          })
    },




    /*
    Put request to update player name.
    Updates player name instantly without server response, to give feedback to user.
    If not successful (json parse fails or network error): notify the user of error and revert client player name change.
    */
    update_player:function({new_player_name,player_info}){
      this.players=this.players.map(player => {
        if (player.id === player_info.id) {
          return {...player, name: new_player_name};
        }
        return player;
      });
      fetch('http://localhost:3000/player/'+player_info.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: new_player_name})
      }).then(res => res.json())
          .then(() => {
            this.alert_user("mdi-content-save",`Player updated.`,"#13f094");
          })
          .catch(() =>{
            this.alert_user("mdi-alert-circle",`Could not update player. Please try again later.`,"#f0de13");
            this.players=this.players.map(player => {
              if (player.id === player_info.id) {
                return {...player, name: player_info.name};
              }
              return player;
            });
          });
    },


    /*
    Get request to get all players.
    If request is successful: reverses list to get most recent players first
    If not successful (json parse fails or network error): notify the user of error.
    */
    get_players:function(){
      fetch('http://localhost:3000/players')
          .then(res => res.json())
          .then(data => {
            this.players=data.reverse();
          })
          .catch(() =>{
            this.alert_user("mdi-alert-circle",`Could not retrieve players. Please try again later.`,"#f0de13")
          })
    },



    /*
    Send request to add new player to player list.
    If request is successful: adds the player to the front of the list and notifies the user.
    If not successful (json parse fails or network error): notify the user of error.
    */
    add_player:function(player_name){
      fetch('http://localhost:3000/player', {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: player_name})
      }).then(res => res.json())
          .then(data => {
            data.just_added=true;this.players.unshift(data)
            this.alert_user("mdi-check-circle",`${player_name} added.`,"#13f094")
          }).catch(() =>{
          this.alert_user("mdi-alert-circle",`Could not add player. Please try again later.`,"#f0de13")

      });
    }
  }
}
</script>

<style scoped>

</style>