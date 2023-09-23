<template>
   <div class="all-page" :style="{'backgroundImage':'url('+bg+')'}" >   
         <div style="width:30%;margin:auto;margin-top: 20vh;">
            <ClientOnly>
                 <Search ></Search>
            </ClientOnly>
         </div>

         <!-- <div class="glass foot"></div> -->
   </div>
</template>

<script>
import Search from "./Search.vue";
const imgBg = new URL('./images/bg.jpg',import.meta.url).href 
export default {
    components: { Search  },
    data(){
      return {
         dynamicComponent: null,
         bg:imgBg
      }
    },
     
}
</script>
<style  >
 html,body{
  width:100%;
  min-height:100%;
  /* background-color:#EEF2F5;  */
}
.all-page{
  position: fixed;   
  width:100%;
  height:100%;
  z-index:-999;
  /* background-color: red; */
  
        	background-position: center;
            background-repeat: no-repeat;
            background-attachment: fixed;
            background-size:cover;
}
.foot{
   width: 800px;
   height: 20px;
   position: absolute;
   bottom: 0px;
   left:50%;
   -webkit-transform: translate(-50%, 0);
    -ms-transform: translate(-50%, 0);
    transform: translate(-50%, 0)
}
.glass{
   background: inherit; 
   
   overflow: hidden;  
}
.glass:before{
   content: "";
   /* width: 300px;
   height: 400px; */
   background: inherit; 
   position: absolute;
   left: -25px;  
   right: 0;
   top: -25px;   
   bottom: 0;
   box-shadow: inset 0 0 0 200px rgba(255,255,255,0.3);
   filter: blur(10px);
}
</style>
