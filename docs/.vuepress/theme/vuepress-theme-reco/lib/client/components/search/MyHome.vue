<template>
   <div class="all-page" :style="{'backgroundImage':'url(https://pic.netbian.com/uploads/allimg/230813/221347-16919360279c09.jpg)'}" >   
         <div style="width:30%;margin:auto;margin-top: 20vh;">
            <ClientOnly>
                 <Search ></Search>
            </ClientOnly>

             <h1  style="text-align:center;color:white;margin:auto;font-size:40px;mix-blend-mode:overlay; ">{{simpleTime}}</h1>
                  <p class="mix" style="text-align:center;color:white;margin:auto;margin-top:10px;font-size:20px;mix-blend-mode:overlay;">{{fullTime}}</p>
            <!-- <div style="display:flex;flex-direction:row;justify-content:space-between">
               <div class="left">
                  <h1 style="text-align:center;color:white;margin:auto;font-size:40px">{{simpleTime}}</h1>
                  <p style="text-align:center;color:white;margin:auto;margin-top:10px;font-size:20px">{{fullTime}}</p>
               </div>
               <div class="right">
                   <h1 style="text-align:center;color:white;margin:auto;font-size:40px">天气</h1>
               </div>
            </div> -->
         </div>
<div class="glass-effect foot" > 
  <!-- 内容放在这里 -->
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
         bg:imgBg,
         simpleTime:null,
         fullTime:null
      }
    },
    mounted(){
      this.initTime();
    },
    methods:{
      initTime() {
      let timer1 = setTimeout(() => {
        setInterval(() => {
          this.countTime();
        }, 500);
         }, 3000);
       }, 
         countTime() {
            // alert(1);
            var time = new Date();
            var y = time.getFullYear();
            var mon = time.getMonth() + 1;
            var d = time.getDate();
            var w = time.getDay();
            var week = "";
            var hourzzz = time.getHours();
            this.hour = hourzzz;
            var h = hourzzz + "";
            var h_lenth = h.length;

            var minutezzz = time.getMinutes();
            this.minute = minutezzz;
            var min = minutezzz + "";
            var min_lenth = min.length;
            // alert(min_lenth);

            var secondzzz = time.getSeconds();
            this.second = secondzzz;
            var s = secondzzz + "";
            var s_lenth = s.length;

            // alert(min);
            if (w == 0) {
            week = "日";
            this.week = "周日";
            } else if (w == 1) {
            week = "一";
            this.week = "周一";
            } else if (w == 2) {
            week = "二";
            this.week = "周二";
            } else if (w == 3) {
            week = "三";
            this.week = "周三";
            } else if (w == 4) {
            week = "四";
            this.week = "周四";
            } else if (w == 5) {
            week = "五";
            this.week = "周五";
            } else {
            week = "六";
            this.week = "周六";
            }

            var minutes;
            if (min_lenth == 1) {
            minutes = "0" + min;
            } else {
            minutes = min;
            }
            var seconds;
            if (s_lenth == 1) {
            seconds = "0" + s;
            } else {
            seconds = s;
            }

            var hours;
            if (h_lenth == 1) {
            hours = "0" + h;
            } else {
            hours = h;
            }

            var simpleTime = hours + ":" + minutes + ":" + seconds;
            var fullTime = y + "年" + mon + "月" + d + "日" + " " + "星期" + week;
            this.simpleTime = simpleTime;
            this.fullTime = fullTime;

            // $("#stime").html(simpleTime);
            // $("#fulltime").html(fullTime);
         },
    }
     
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
   height:25px;
   position: absolute;
   bottom: 5px;
   left:50%;
   -webkit-transform: translate(-50%, 0);
    -ms-transform: translate(-50%, 0);
    transform: translate(-50%, 0)
}

.glass-effect {
 
  background: rgba(0, 0, 0, 0.2); /* 背景颜色设置为半透明 */
  border-radius: 1px; /* 可以根据需要设置圆角 */
  backdrop-filter: blur(10px); /* 使用 backdrop-filter 创建磨砂效果，可以根据需要调整模糊程度 */
  /* 添加其他样式，如边框、内边距等 */
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
