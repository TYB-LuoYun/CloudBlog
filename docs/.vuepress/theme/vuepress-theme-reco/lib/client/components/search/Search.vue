<template>
  <div id="search" >
     <!-- 这是隐藏的获取关键词联想的框 -->
      <div>
          <input id="dataFromBd" type="text" style="display:none">
          <input id="dataFrominput" type="text" v-model="associateKey" style="display:none">
      </div> 
      <div id="se" class="searchInput">
         <div class="row" style="position:relative">
           <div style="position:absolute;top:0;margin-top:-68px;width:100%; color:white;text-align:center;">
             <!-- <h1 class="transitions" :style="{'font-size':'36px','opacity':opacityTime}">{{time}}</h1> -->
             <h1 v-if="opacityTime == 1" class="animate__animated animate__zoomIn" :style="{'font-size':'36px','opacity':opacityTime}">{{time}}</h1>
           </div>
           <input id="wd" v-model="inputValue" 
           :class="{'so':true,'glass-effect-se-simple':searchBgMode =='glass-effect-se-simple','glass-effect-se':searchBgMode =='glass-effect-se','trueSe':searchBgMode =='trueSe'}"   @focus="focus()" @keydown="keydown" @keyup.up="upPage()" @keyup.down="downPage()" @keydown.enter="search()" @mouseenter="mouseenter" @mouseleave="mouseleave"  type="text"  autocomplete="off"  :placeholder="placeholder">
           <i id="soso" v-if="searchBgMode !='glass-effect-se-simple'" style="position:relative;margin-left:-25px;cursor:default;color:#777;z-index: 999;" @click="search()" class="iconfont icon-sousuo "></i>
        </div>
        <div class="row" :style="{
          'font-size': fontSize.associate + 'px',
          position: 'relative'
        }"
        > 
            <!-- 关键词联想 -->
            <div class="associate" v-show="smartTipShow"  >
                  <ul class="associate_ul" :style="{ 'background-color': color.associate }">
                    <!-- <li>
                       <a id="engin"  style="position:relative">
                         <img  style="width:14px;margin-top:-3px;margin-left:-5px" :src="currentEngin.img" alt="">
                         <ul  id="engins">
                          <li @click="changeEngin(item)" v-for="(item,index) in engin">{{item.name}}</li>
                        </ul>
                       </a>
                       <a style="margin-left:4px" @click="comesoon()" href="javascript:void(0)" >图片</a>
                       <a style="margin-left:1px" target="_blank"  :href="'https://video.tf/search/'+inputValue+'.shtml'">视频</a>
                       <a style="margin-left:1px" target="_blank"  :href="'http://www.iciba.com/'+inputValue" >翻译</a>
                       <a style="margin-left:1px" @click="comesoon()" href="javascript:void(0)">音乐</a>
                       <a style="margin-left:1px" @click="comesoon()" href="javascript:void(0)">磁力</a>
                       <a style="margin-left:1px" @click="comesoon()" href="javascript:void(0)">文档</a>
                       <a style="margin-left:1px" target="_blank"  :href="'https://s.weibo.com/weibo/'+inputValue">微博</a>
                    </li> -->
                      <li
              v-if="searchedHisoryShow && inputValue == ''"
              v-for="(item, index) in searchedHisory"
              :style="{
                'background-color':
                  index == currentIndex ? color.associateLiHover : '',
                transition: 'all 0.4s',
                'padding-left': index == currentIndex ? '15px' : ''
              }"
            >
              <a @click="search(item)" href="javascript:void(0)">
                {{ item }}
              </a>
              <i
                @click="removeHistory(item)"
                style="font-weight:bold;float:right;margin-right:10px"
                class="iconfont icon-shanchu"
              ></i>
            </li>
            <li
              v-if="inputValue != ''"
              v-for="(item, index) in smartTipItems"
              :style="{
                'background-color':
                  index == currentIndex ? color.associateLiHover : '',
                transition: 'all 0.4s',
                'padding-left': index == currentIndex ? '15px' : ''
              }"
            >
              <a
                @click="search(item)"
                href="javascript:void(0)"
                style="display:block"
                >{{ item }}</a
              >
            </li>

            <li
              v-if="translate && translate != ''"
              :style="{
                'background-color':
                  index == currentIndex ? color.associateLiHover : '',
                position: 'relative',
                transition: 'all 0.4s',
                'padding-left': index == currentIndex ? '15px' : ''
              }"
            >
              <a
                target="_blank"
                :href="'http://www.iciba.com/' + inputValue"
                style="position:absolute;bottom:0px;left:0px;display:block;border-left:5px solid rgba(238,18,137,0.7);height:20px;line-height:20px;padding-left:5px"
                >{{ translate }}</a
              >
            </li>
                  </ul>
            </div>
        </div>
      </div>
       
  </div>
</template>

<script>

// import $ from 'jquery';  
import {getTanslate} from './api/index' 
const img11 = new URL('./images/engin/se_1.png',import.meta.url).href 

export default {
  name: 'Search', 
  data(){
    return {
      isLeave:false,
      opacityTime:0,
      placeholder:"Search",
       associateKey:"",
       associateData:[],
       inputValue:"",
      //  上下键按键切换联想位置
      countDownAndUpTime:0,
      startTime:0,
      isRecordTime:true,
      isUp:true,//记录键按下后是否释放
      isExcute:true,
      isExcuteUp:true,
      currentIndex:-1,//这是记录当前选中的li索引，用来与真实索引比较，相同则添加样式
      isPage:false,//这是当按键为上下键时存储input临时值
      // 搜索引擎
      currentEngin:{name:"百度",baseUrl:"https://www.baidu.com/s?wd=",suffix:'',img:img11},
      engin:[
        {name:"百度",baseUrl:"https://www.baidu.com/s?wd=",suffix:'',img:"./images/engin/se_1.png"},
        {name:"Yandex",baseUrl:"https://yandex.com/search/?text=",suffix:'',img:"./images/engin/yandex.png"},
        {name:"Bing",baseUrl:"https://www.bing.com/search?q=",suffix:'',img:"./images/engin/se_2.png"},
        {name:"搜狗",baseUrl:"https://www.sogou.com/sogou?query=",suffix:'',img:"./images/engin/se_3.png"},
        {name:"360",baseUrl:"https://www.so.com/s?q=",suffix:'',img:"./images/engin/se_4.png"},
        {name:"Google",baseUrl:"https://www.google.com.hk/search?q=",suffix:'',img:"./images/engin/se_5.png"},
        {name:"秘迹",baseUrl:"https://mijisou.com/?q=",suffix:'',img:"./images/engin/mj.png"},
        
      ],
      // 控制显示
      smartTipShow:false,
      searchedHisoryShow:false,
      // 搜索历史相关
      searchedHisory:[],
      searchingHistory:[],
      focusVal:false,
      // 翻译
      translate:'',
      searchBgMode:"glass-effect-se-simple",
      state : {
            randomBasicWallpaperUrl: "http://anets.top:8082/wallpaper.action?offset=",
            passportBasicUrl: "http://passport.anets.top",
            searchBasicUrl: "http://anets.top",
            searchServiceUrl: "http://anets.top:8082",
            passportServiceUrl: "http://passport.anets.top:8086",
            shopBasicUrl: "http://shop.anets.top",
            homeBasicUrl: "http://anets.top",
            user: false,
            color: {
                font: "#ee1289",
                fontCommon: "#777",
                searchBg: "rgba(255,255,255,0.8)",
                bg: "rgba(0,0,0,0.8)",
                basic: "rgba(0,0,0,0)",
                associate: "rgba(255,255,255,0.8)",
                associateLiHover: "rgba(244,90,141,0.2)",
                control: "rgba(32, 32, 32, 0.9)",
                controlPanel: "rgba(0, 0, 0, 0.8)",
                controlFont: "white"
            },
            fontSize: {
                associate: 14
            },
            historyView: [],
            
        } 
       
    }
  },
  props:{
    time:{
      type: String,
      default:""
    }
  },
  computed:{
    color:{
      get(){
        return this.state.color;
      }
    },
    fontSize:{
      get(){
        return this.state.fontSize;
      }
    },
    smartTipItems:{
      get(){
        return this.searchingHistory.concat(this.associateData);
      }
    },
    time:{
      get(){
        return this.$props.time;
      }
    }
  },
  created(){
   
  },
  mounted(){  
    this.query()
    window.addEventListener('click',this.listenerChangeFlag)
  },
  beforeDestroy() { 
     window.removeEventListener('click',this.listenerChangeFlag)
  },
  watch:{
    inputValue:{
      handler(newval,oldval){
         if(this.isPage){
           console.log(666);
           return;
         }
         console.log("key:"+newval);
         if(newval!=''){  //输入不为空
            this.associateKey=newval;//联想的关键字
            this.changeAssociateData();
            // this.gainTranslate(newval);

            // 从历史搜索中匹配
            for(var index in this.searchedHisory){
              // 去除重复记录
                 this.searchingHistory=this.searchingHistory.filter(item=>item!=this.searchedHisory[index]);
                 if(this.searchedHisory[index].indexOf(newval)!=-1){
                    this.searchingHistory.push(this.searchedHisory[index]);
                 }
            }
         }else{
           this.translate=null;
            this.searchingHistory=[];
            this.changeAssociateData();
         }
        },deep:true,immediate:true
    },
    smartTipShow:{
      handler(newval,oldval){ 
      },deep:true,immediate:false
    }
  },
  methods:{
    listenerChangeFlag(e){
      let nowClassName = e.target.className 
      if("so trueSe"!=nowClassName){
          this.blur()
      }
    },
    async gainTranslate(query){
        //  let {data:res} = await getTanslate(query);
        //  if(res&&res.translateResult[0][0]){
        //     this.translate=res.translateResult[0][0].tgt;
        //     console.log(res.translateResult[0][0].tgt);
        //  }else{
        //     this.translate=null
        //  }
    },
    search(item){
      if(item){
         window.open(this.currentEngin.baseUrl+item+this.currentEngin.suffix)
         this.recordSerchHistory(item);
      }else{
         window.open(this.currentEngin.baseUrl+this.inputValue+this.currentEngin.suffix)
         this.recordSerchHistory(this.inputValue);
      }
    },
    changeAssociateData(){
      console.log("联想");
         let times=setInterval( ()=> {
                let datas=document.getElementById("dataFromBd").value;
                console.log("结果",datas);
                if(datas!=''){
                  let newData=datas.split(',');
                  this.associateData=newData;
                  clearInterval(times);
                }else{
                  this.associateData=[];
                  clearInterval(times);
                  setTimeout(()=>{
                    
                  },300)
                }
          },200);
    },
    upPage(){
          this.isPage=true;
          this.countDownAndUpTime=new Date()-this.startTime;
          // console.log(this.countDownAndUpTime);
          this.isRecordTime=true;
          this.isUp=true;
          this.isExcute=true;
          if(this.isExcuteUp){
            this.upPages();
          }
          
    },
    upPages(){
      if(this.currentIndex>=0){
        if(this.currentIndex==0){
          // alert(this.inputValueTemp);
          this.inputValue=this.associateKey;
          //  console.log("ss",this.associateKey);
          this.currentIndex=-1;
        }else{
          this.currentIndex-=1;
          let nowIndex=this.currentIndex;
          let historyLength=this.searchHistoryLength;
         
          this.inputValue=this.smartTipItems[nowIndex];
          
          // console.log(nowIndex);
        }

      }else{
        // alert(2);
        this.currentIndex=this.smartTipItems.length-1;
        let nowIndex=this.currentIndex;
        this.inputValue=this.smartTipItems[nowIndex];
        
      }
    },
    mouseenter(){ 
        this.searchBgMode ="trueSe"
        this.placeholder="";
    },
    keydown(){
        this.searchBgMode ="trueSe"
    },
    mouseleave(){
      // 离开并且非聚焦状态
        if(this.focusVal == false){ 
          if (this.inputValue == null || this.inputValue == ''){
              this.placeholder="Search";
               this.searchBgMode ="glass-effect-se-simple"
          }else{
                this.searchBgMode ="glass-effect-se"
          }
        }else{
          if(this.inputValue == null || this.inputValue == ''){
            // this.searchBgMode ="glass-effect-se"
          }else  if((this.searchedHisory == null ||this.searchedHisory.length<=0 )&& (this.smartTipItems ==null|| this.smartTipItems.length<=0)){
            // this.searchBgMode ="glass-effect-se"
          }  
        } 
        
         
    }, 
    downPage(){
          console.log("颜色",  this.currentIndex + this.color.associateLiHover );
          this.isPage=true;
          this.countDownAndUpTime=new Date()-this.startTime;
          // console.log(this.countDownAndUpTime);
          this.isRecordTime=true;
          this.isUp=true;
          this.isExcute=true;
           if(this.isExcuteUp){
             this.downPages();
           }
    },
    downPages(){

      this.currentIndex+=1;

      let nowIndex=this.currentIndex;

      this.inputValue=this.smartTipItems[nowIndex];
     

      if(this.currentIndex>=this.smartTipItems.length){
          this.currentIndex=-1;
          this.inputValue=this.associateKey;
      }
    },
    comesoon(){
      this.$layer.msg("comming soon ...😀");
    },
    changeEngin(item){
      if(item.name=="Google"){
        this.$layer.msg("提示：谷歌需要翻墙🙂，翻墙找我qq1632414557");
      }
      console.log("切换");
      this.currentEngin=item;
      window.localStorage.setItem("engin",JSON.stringify(item));
    },
    initEngin(){
      let engin=window.localStorage.getItem("engin");
      if(engin){
          this.currentEngin=JSON.parse(engin);
      }
    },
    blur(){//输入框离开焦点  
        this.focusVal = false;
        this.smartTipShow=false;
        this.mouseleave() 
        this.$emit("blurs",true)  
        this.opacityTime = 0
    },
    focus(){ 
        
        this.$emit("focus",true)
        this.smartTipShow=true;
        this.searchedHisoryShow=true; 
        this.focusVal = true;
       this.mouseenter()
       this.opacityTime = 1
    },
    recordSerchHistory(item1){//记录搜索历史
       let len=this.searchedHisory.length;
       if(len>20){
          //  删除随后一个
          this.searchedHisory.pop();
       }
      //  检查重复记录，如果有就删除
      this.searchedHisory=this.searchedHisory.filter(item=>item!=item1);
       //  记录历史
       let a=JSON.stringify(item1);
       let b=JSON.parse(a);
       this.searchedHisory.unshift(b);

       window.localStorage.setItem("searchHistory",JSON.stringify(this.searchedHisory));
    },
    initSearchHistory(){
      let history=window.localStorage.getItem("searchHistory");
      if(history){
          this.searchedHisory=JSON.parse(history);
      }
    },
    removeHistory(item1){
        this.searchedHisory=this.searchedHisory.filter(item=>item!=item1);
        window.localStorage.setItem("searchHistory",JSON.stringify(this.searchedHisory));
    },  query(){
         
         var input=document.getElementById("wd");
         var value='';
		      console.log("添加监听",input);
         ['keyup','paste','cut','copy','focus'].forEach( (item,index)=>{
           if(!input){
             return ;
           }
           input.addEventListener(item,  ()=> { 
             value=document.getElementById("dataFrominput").value;
             console.log(value)
             if(item=='cut'){ 
               setTimeout(  () =>{
                 value=document.getElementById("dataFrominput").value;
                 if(value!=''){
                   this.associate(value);
                 }
               },500)
             }else if(value!=''){ 
                this.associate(value);
 
             }else{
 
             }
           });
         });
     },associate(value) {
		
       var oScript = document.createElement('script');
       oScript.src = 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=' + value + '&cb=soso';
       document.body.appendChild(oScript);
       document.body.removeChild(oScript);
     },
     
  }
  
}
</script>

<style scoped lang="scss">
// .trueSe{
//    color: #ee1289;
//    background-color: rgba(255,255,255,0.8);
//     position: relative;
// }
 /* This only changes this particular animation duration */
.animate__animated.animate__zoomIn {
  --animate-duration: 0.4s;
}
.animate__animated.animate__fadeInDown {
  --animate-duration: 0.4s;
}
.glass-effect-se-simple::placeholder {
   color: white; /* 将 placeholder 文本颜色设置为白色 */
   text-indent: 25px;
}
.glass-effect-se:hover::placeholder {
  // color: rgba(0,0,0,0); /* 将 placeholder 文本颜色设置为白色 */
}
.trueSe{
   color: #ee1289 !important;
   background-color: rgba(255,255,255,0.8);
  position: relative; 
    text-align: left;
   
  //  width:100% !important;
  //  margin-left:0%;
  //  border-radius: 3px !important; /* 可以根据需要设置圆角 */ 
}
.glass-effect-se-simple{
  color:rgba(255, 255, 255, 0.2) !important;
  // position: absolute;
  // left:50%;  
  text-align: center;
  width:50% !important;
  margin-left:25%;
  background: rgba(255, 255, 255, 0.2); /* 背景颜色设置为半透明 */
  border-radius: 50px !important; /* 可以根据需要设置圆角 */
  backdrop-filter: blur(10px); /* 使用 backdrop-filter 创建磨砂效果，可以根据需要调整模糊程度 */
  /* 添加其他样式，如边框、内边距等 */
}
.glass-effect-se { 
  color:rgba(255, 255, 255, 0.2) !important;
 
  // position: absolute;
  // left:50%; 
  // width:50% !important;
  // margin-left:25%;
  text-align: left;
  background: rgba(255, 255, 255, 0.2); /* 背景颜色设置为半透明 */
  // border-radius: 50px !important; /* 可以根据需要设置圆角 */
  backdrop-filter: blur(10px); /* 使用 backdrop-filter 创建磨砂效果，可以根据需要调整模糊程度 */
  /* 添加其他样式，如边框、内边距等 */
}
.so{ 
    /* height: 36px; */ 
    height:40px;
    outline: none;
    border: 1px solid rgba(0,0,0,0.1);
    box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.1);
    border-radius: 3px;
    transition: all 0.5s;
}


.glass-effect {
 
  background: rgba(255, 255, 255, 0.2); /* 背景颜色设置为半透明 */
  border-radius: 1px; /* 可以根据需要设置圆角 */
  backdrop-filter: blur(10px); /* 使用 backdrop-filter 创建磨砂效果，可以根据需要调整模糊程度 */
  /* 添加其他样式，如边框、内边距等 */
}
#search{
    /* background-color: yellow;   */
    /* transition: all 0.5s;   */
    width: 100%;
}
.searchInput{
  width: 100%;
  display: flex;
  flex-direction: column;
  margin:0px;
  /* background-color: red; */
  
} 

.searchInput .row{ 
}

#wd{
  width:100%;
  padding-right:30px;
  padding-left:5px; 
}

 
 
a {
  color: #007BFF !important;
}
a:hover{
  text-decoration: underline;
}
/*PHONE屏幕下的专用样式*/
 @media screen and (max-width:767px) {
     #soso{
       right:0px !important;
     }
 }

.so:hover{
     box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.1);
}

.associate{ 
   margin:0;
   padding:0; 
   height:500px;
   margin-top:-24px;
}
.associate ul{
  background-color: green;
   list-style: none;
   padding: 0px;
   /* background-color: rgba(0,0,0,0.9); */
   /* font-size: 14px; */
    /* border: 1px solid rgba(0,0,0,0.1); */
   box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.1);
  
}
.associate ul li{
  padding-left: 10px;
   height: 25px;
   line-height: 25px;
       /* overflow: hidden; */
  
}
.associate ul li:hover{
  background-color: rgba(255, 255, 255, 0.04);
}

#engin #engins{
  display: none;
 
  position:absolute;top:18px;left:-10px;background-color:rgba(0,0,0,0.9);
  /* background-color: red;
  height: 300px; */
   z-index: 1999;
}
#engin:hover #engins{
  display: block;
}
#engin #engins li{
  cursor: default;
  width: 100px;
  color: white;
  padding: 0px 10px;
}

.transitions{
  transition:all 0.5s
}
</style>
