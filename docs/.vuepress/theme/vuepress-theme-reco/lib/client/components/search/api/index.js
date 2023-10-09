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


const repo = 'TYB-LuoYun/ImgBed' // 填你的仓库 repo
const cutToken = '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' // 填你的 Token
const tailToken = ''
const uploaderGit = async (content) => {
  const d = new Date()
  const path = `${d.getFullYear()}/${d.getMonth()}/a.png`
  const imageUrl = 'https://api.github.com/repos/' + repo + '/contents/' + path
  const body = { branch: 'main', message: 'upload', content, path }
  const headers = {
    Authorization: `token ${cutToken}${tailToken}`,
    'Content-Type': 'application/json; charset=utf-8',
  }
  const res = await axios.put(imageUrl, body, { headers })
  // 直接取得返回的图片地址
  return res?.content?.download_url
  // return `https://fastly.jsdelivr.net/gh/${repo}@main/${path}`
} 
export {uploaderGit,getClassifyUrlRank,getTanslate,getUrl,getTree,getChildren,getSelfAndChildren,getRank,getTread,getPraise,getViews,getWallpapers,getWallpaper,getWallpapersSell,getWallpapersBuy,getWallpaperByPassword}

