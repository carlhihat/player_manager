<template>
<div>
  <v-text-field
      class="gloot_blue"
      label=""
      :class="text_field_has_focus===true?'border-grow':text_field_has_focus===false?'border-shrink':''"
      @blur="text_field_has_focus=false"
      style="z-index: 2;position: relative;"
      @focus="text_field_has_focus=true"
      placeholder="+ New player name..."
      solo
      v-model="new_player_name"
      @keydown.enter="add_player"
  >

    <template v-slot:append>
      <v-form @submit="add_player">

        <v-fade-transition>
          <v-img :class="enter_is_down?'enter-down':'enter-up'" :style="{'opacity':invalid_player_name?'0.3':'1.0'}" v-show="text_field_has_focus"  @click="add_player" style="height:64px;width:64px;cursor: pointer;" :src="require('../assets/keyboard_key_enter.png')">

          </v-img>
        </v-fade-transition>

      </v-form>


    </template>
  </v-text-field>
  <v-fade-transition>
    <div v-show="text_field_has_focus" class="dimmer"></div>

  </v-fade-transition>

</div>
</template>

<script>
export default {
  name: "PlayerAdder",
  data(){
    return{
      enter_is_down:false,
      new_player_name:"",
      text_field_has_focus:null,
    }
  },
  methods:{
    add_player:function(){
      //Must check for keydown.enter to no submit empty names!
      if(this.invalid_player_name){
        return
      }
      //Play enter-down animation
      this.enter_is_down=true;
      let self=this;
      setTimeout(function(){self.enter_is_down=false;},100);

      this.$emit("add_player",this.new_player_name)
      this.new_player_name="";

    }
  },
  computed:{
    invalid_player_name:function(){
      //TODO add more checks, profanity filter etc
      return this.new_player_name===''
    }
  }
}
</script>

<style scoped>

.dimmer{
  position:fixed;
  width:100vw;
  height:100vh;
  background-color: rgba(0,0,0,0.4);
  top:0;
  left:0;
  z-index: 1;
}

.gloot_blue >>> .v-input__slot{
  background-color: #151532 !important;
}
.enter-down{
  transform:translateY(10px);
  filter:brightness(60%);



  transition: transform 0.1s linear,filter 0.1s linear;
  will-change: opacity;
}
.enter-up{
  transform:translateY(0px);
  filter:brightness(100%);
  transition: transform 0.1s linear,filter 0.1s linear;


}

.border-grow >>> .v-input__slot  {

  animation-duration: 0.2s;
  animation-fill-mode: forwards;
  animation-name: border_grow;
}

@keyframes border_grow {
  from{
    font-size:inherit;
    padding:0 12px;
    height: 50px;
    border: 0 solid transparent;
  }
  to{
    font-size:24px;
    padding:20px;
    height: 160px;
    border: 4px solid #13f094;

  }
}
@keyframes border_shrink{
  from{
    font-size:24px;
    padding:20px;
    height: 160px;
    border: 4px solid #13f094;


  }
  to{
    font-size:inherit;
    padding:0 12px;
    height: 50px;
    border: 0 solid transparent;


  }
}
.border-shrink >>> .v-input__slot  {

  animation-duration: 0.2s;
  animation-fill-mode: forwards;
  animation-name: border_shrink;
}
</style>