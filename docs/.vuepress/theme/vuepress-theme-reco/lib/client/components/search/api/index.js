import axios from 'axios'
axios.defaults.baseURL = '/api';



let getTree=()=>{
    return axios.get("url/tree.action");
}
let getChildren=()=>{
    return axios.get("url/getChildren.action");
}

let getSelfAndChildren=(wid)=>{
    return axios.get("url/getSelfAndChildren.action?parentWid="+wid);
}


let getRank=()=>{
    return axios.get("url/getRank.action");
}


let getClassifyUrlRank=()=>{
    return axios.get("url/getClassifyUrlRank.action");
}


let getPraise=(wid)=>{
    return axios.get("url/praise.action?wid="+wid);
}
let getTread=(wid)=>{
    return axios.get("url/tread.action?wid="+wid);
}


let getViews=(wid)=>{
    return axios.get("url/views.action?wid="+wid);
}

let getWallpapers=()=>{
    return axios.get("shop/wallpapers.action");
}
let getWallpaper=(sid)=>{
    return axios.get("shop/wallpaper.action?sid="+sid);
}

let getWallpapersSell=()=>{
    return axios.get("shop/wallpapers/sell.action");
}
let getWallpapersBuy=()=>{
    return axios.get("shop/wallpapers/buy.action");
}

let getWallpaperByPassword=(address,password)=>{
    return axios.get("shop/getWallpaper.action?address="+address+"&password="+password);
}

let getUrl=(wid)=>{
    return axios.post("url/query.action?wid="+wid);
}

let getTanslate=(query)=>{
    return axios.get("translate.action?query="+query);
}
export {getClassifyUrlRank,getTanslate,getUrl,getTree,getChildren,getSelfAndChildren,getRank,getTread,getPraise,getViews,getWallpapers,getWallpaper,getWallpapersSell,getWallpapersBuy,getWallpaperByPassword}

