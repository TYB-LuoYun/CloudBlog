import { defineUserConfig } from "vuepress";
import type { DefaultThemeOptions } from "vuepress";
import recoTheme from "./theme/vuepress-theme-reco";




export default defineUserConfig({ 
  title: "UNGLORY",
  description: "Just playing around", 
  theme: recoTheme({
    style: "@vuepress-reco/style-default",
    logo: "/logo.png",
    author: "Indell",
    authorAvatar: "/head.png",
    docsRepo: "https://github.com/TYB-LuoYun/",
    docsBranch: "main",
    docsDir: "example",
    lastUpdatedText: "", 
    primaryColor: '#fd2d6e',
    
    // series 为原 sidebar
    series: {
      "/docs/apis/":["/docs/apis/接口文档.html"],
      "/docs/theme-reco/": [
        {
          text: "module one",
          children: ["home", "theme"],
        },
        {
          text: "module two",
          children: ["api", "plugin"],
        },
      ],
    },
  
     // 自动设置分类
     autoSetBlogCategories: true,
     // 自动将分类和标签添加至头部导航条
     autoAddCategoryToNavbar: {
       location: 1, // 默认 0
       categoryText: '分类', // 默认 categories
       tagText: '标签' // 默认 tags
     }, 
    navbar: [
      { text: "Home", link: "/" },
      { text: 'TimeLine', link: '/timeline/', icon: 'reco-date' },
      // { text: "Categories", link: "/categories/reco/1/" },
      // { text: "Tags", link: "/tags/tag1/1/" },
      {
        text: "Docs",
        children: [
          { text: "vuepress-reco", link: "/docs/theme-reco/theme" } 
        ],
      },
    ],
    bulletin: {
      // body: [
      //   {
      //     type: "text",
      //     content: `🎉🎉🎉WELCOM。`,
      //     style: "font-size: 12px;",
      //   },
      //   {
      //     type: "hr",
      //   },
      //   {
      //     type: "title",
      //     content: "welcom",
      //   },
        
      // ],
    },
    // commentConfig: {
    //   type: 'valie',
    //   // options 与 1.x 的 valineConfig 配置一致
    //   options: {
    //     // appId: 'xxx',
    //     // appKey: 'xxx',
    //     // placeholder: '填写邮箱可以收到回复提醒哦！',
    //     // verify: true, // 验证码服务
    //     // notify: true,
    //     // recordIP: true,
    //     // hideComments: true // 隐藏评论
    //   },
    // },
  }),
  // debug: true,
});
