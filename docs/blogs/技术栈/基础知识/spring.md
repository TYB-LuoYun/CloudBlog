---
title: 数据结构
date: 2024/04/11
tags:
 - 基础知识
categories:
 - 基础知识
---
 # 八股文  
 
 ## springmvc
1.客户端请求提交到前端控制器DispatcherServlet
2.DispatcherServlet接收到请求后、将提交的信息交给处理器映射器(HandlerMapping)
3.HandlerMapping根据用户的url请求、匹配该url的Handler(Controller)，并返回一个执行链
4.DispatcherServlet调用HandlerAdapter(处理器适配器)
5.HandlerAdapter经过适配调用具体的处理器(Controller)扫描
6.Controller扫描完成后返回一个ModelAndView
7.HandlerAdapter将Controller扫描结果(ModelAndView)返回给DispatcherServlet
8.DispatcherServlet将ModelAndView请求试图解析器(ViewReslover)进行解析
9.ViewReslover解析后返回具体的View给前端控制器DispatcherServlet
10.DispatcherServlet将view进行渲染试图(即将模型数据填充到视图中)
11.DispatcherServlet将页面响应给个用户 