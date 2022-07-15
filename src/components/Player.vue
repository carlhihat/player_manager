<template>
  <div @mouseenter="hovered=true" @mouseleave="hovered=false" :class="`${animation_class} ${hovered?'is_hovered':''}`"  style="border-radius: 4px;margin-bottom:8px;background-color: #151532;position:relative;" class="px-4 py-2">
    <span class="name_span" v-show="!edit_mode" @click="edit_name" style="cursor:pointer;">{{player_info.name}}</span>

    <input
        v-show="edit_mode"
        ref="edit_name_field"
        @blur="edit_mode=false"
        style="outline: none !important;color:white;"
        v-model="new_player_name"
        @keydown.enter="update_name"

    >


    <v-fade-transition>
      <v-btn @click="delete_player" v-show="hovered && animation_class!=='removed'" style="position:absolute;right:0;top:0;" icon>
        <v-icon >mdi-close</v-icon>
      </v-btn>
    </v-fade-transition>
  </div>
</template>

<script>
export default {
  name: "Player",
  data(){
    return{
      animation_class:"",
      hovered:false,
      edit_mode:false,
      new_player_name:"",
      autosave_timeout:null
    }
  },
  props:[
      "player_info"
  ],mounted(){
    //Add green swipe animation if player was added just now
    if(this.player_info.just_added){
      this.animation_class="added";
    }
    this.new_player_name=this.player_info.name;
  },
  methods:{
    delete_player:function(){
      this.$emit("delete_player",this.player_info);
      this.animation_class="removed";

    },

    update_name:function(){
      //Clear "auto-save-timeo
      clearTimeout(this.autosave_timeout);

      this.$emit("update_player",{new_player_name:this.new_player_name,player_info:this.player_info});
      this.edit_mode=false;

    },

    focus_input:function(){

      this.$refs.edit_name_field.focus();
    },
    edit_name:function(){
      this.edit_mode=true;
      //Wait for input to be visible, then focus it
      this.$nextTick(() => {
        this.focus_input();
      });
    }
  },
  watch:{

    edit_mode:function(){
      if(!this.edit_mode && (this.new_player_name!==this.player_info.name)){
        this.update_name()
      }

    },
    new_player_name:function(){
      //Player name should save after change, even if user doesnt blur input
      clearTimeout(this.autosave_timeout);
      if(this.new_player_name!==this.player_info.name){ //Dont save if new name is the same as the old name (for instance on mount)
        this.autosave_timeout=setTimeout(this.update_name,2*1000);
      }
    }
  }
}
</script>

<style scoped>


.name_span:hover{
  color:white;
}
.is_hovered{
  background-color: rgba(255, 255, 255, 0.2) !important;
}

.added{
  animation: slide-down 0.5s forwards;
}
.removed{
  animation: slide-left 0.5s forwards;
}

@keyframes slide-down {
  0% {
    transform: translateY(-100px) scaleY(200%);
    background: #46FFB5C3;
    z-index: 2;
  }
  100% {
    transform: translateX(0) scale(100%);
    background: #151532;
    z-index: auto;
  }

}

@keyframes slide-left {
  0% {
    transform: translateX(0);
    background: #151532;
    opacity: 1.0;

  }
  100% {
    transform: translateX(-100px);
    background: #FF4677C1;
    opacity: 0.0;


  }

}

</style>