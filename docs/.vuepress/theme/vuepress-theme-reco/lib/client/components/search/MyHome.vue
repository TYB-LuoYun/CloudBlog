<template>
   <div class="all-page" :style="{'backgroundImage':'url('+bg+')'}" >   
         <div style="width:30%;margin:auto;margin-top: 20vh;">
            <ClientOnly>
                 <Search @focus="focus"></Search>
            </ClientOnly>

             <div v-if="!inputFocus">
                <h1 @click="changeBg" class="timez" style="cursor:pointer;text-align:center;color:white;margin:auto;font-size:40px">{{simpleTime}}</h1>
                <p class="mix" style="text-align:center;color:white;margin:auto;margin-top:10px;font-size:20px;mix-blend-mode:overlay;">{{fullTime}}</p>
             </div>
             <div style="margin-top:10%">
                <p style="text-align:center;color:white;margin:auto;font-size14px;mix-blend-mode:overlay; ">{{word}} </p>
             </div>
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
<div class="glass-effect foot" style="font-size:13px;color:rgba(255,255,255,.6);padding:0 20px;"> 
  <!-- 内容放在这里 -->
  <span v-if="year" style="">© {{year}} by Unglory |</span>    <a  target="_blank"  href="/#/home">Blog</a>
</div>
         <!-- <div class="glass foot"></div> -->
   </div>
</template>

<script>
import Search from "./Search.vue"; 
export default {
    components: { Search  },
    data(){
      return {
         dynamicComponent: null,
         bg:'https://pic.netbian.com/uploads/allimg/230813/221347-16919360279c09.jpg',
         simpleTime:null,
         fullTime:null,
         inputFocus : false,
         year:null,
         bgs:[
             'https://api.cyrilstudio.top/bing/image.php', 
            'https://pic.netbian.com/uploads/allimg/230829/145009-1693291809b5f4.jpg',
            'https://pic.netbian.com/uploads/allimg/210423/224716-1619189236e4d9.jpg', 
            'https://api.likepoems.com/img/bing/',
            'https://imgapi.cn/api.php?fl=meizi&gs=images',
            'https://imgapi.cn/api.php?fl=fengjing&gs=images',
            'https://api.likepoems.com/ana/dujitang/',
            'https://api.btstu.cn/sjbz/api.php?lx=meizi&format=images',
            'https://api.btstu.cn/sjbz/api.php?lx=fengjing&format=images',
            'https://unsplash.it/1600/900?random', 
            'https://t.mwm.moe/pc/',
            'https://t.mwm.moe/fj/'
         ],
         word:'衰兰送客咸阳道，天若有情天亦老。',
         words:[
            '衰兰送客咸阳道，天若有情天亦老。',
            '花开，痕迹依然在。',
            '锦瑟年华，肆意挥洒。',
            '星辰之际，我在等你。',
            '窗外的雨，是我最深情的告别。',
            '深夜，灯火阑珊处，孤影漫步。',
            '深夜的思绪，总是最让人感伤。',
            '时光如水，岁月如歌，青春如梦。',
            '海市蜃楼谁家瑶台?万顷江山缭绕。' 
         ]
      }
    },
    created(){
      if(window.localStorage.getItem("bg")){
           this.bg = window.localStorage.getItem("bg");
      }
    },
    mounted(){
      this.initTime();
    },
    methods:{
      changeBg(){
         var index = this.bgs.indexOf(this.bg);
         if(index < this.bgs.length-1){
             index = index +1
         }else{
             index = 0
         }
         this.bg = this.bgs[index]
         window.localStorage.setItem("bg",this.bg);
         this.changeWord();
      },
      changeWord(){
         var index = this.words.indexOf(this.word);
         if(index < this.words.length-1){
             index = index +1
         }else{
             index = 0
         }
         this.word = this.words[index]
      },
      focus(val){
         this.inputFocus = val
      },
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

            this.year = y;
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
<style  lang="scss">
 html,body{
  width:100%;
  min-height:100%;
  /* background-color:#EEF2F5;  */
}

.timez{
   mix-blend-mode:overlay;  
}
 
.all-page{
   background-color:rgba(30,30,30,1);
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
   // width: 800px;
   height:25px;
   position: absolute;
   bottom: 5px;
   left:50%;
   -webkit-transform: translate(-50%, 0);
    -ms-transform: translate(-50%, 0);
    transform: translate(-50%, 0)

    
}

.foot a{
      color: rgba(255,255,255,.6);
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
