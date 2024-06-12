---
title: SpringCloud
date: 2024/04/11
tags:
 - 基础知识
categories:
 - 基础知识
---
 

# gateway 网关
是一个基于Spring Boot、Spring WebFlux、Project Reactor构建的高性能网关，旨在提供简单、高效的API路由。Spring Cloud Gateway基于Netty运行
## 作用
请求路由
负载均衡
认证和授权
限流和熔断
跨域资源共享（CORS）处理
链路追踪：网关是实施链路追踪的理想位置，可以为进出的请求加上追踪标识。
缓存: 提供响应缓存功能，减少对后端微服务的请求次数，提升响应速度和减轻后端服务的负载


## 负载均衡
Gateway有两种客户端负载均衡器，LoadBalancerClientFilter和ReactiveLoadBalancerClientFilter。LoadBalancerClientFilter使用一个Ribbon的阻塞式LoadBalancerClient，Gateway建议使用ReactiveLoadBalancerClientFilter。
可以通过设置spring.cloud.loadbalancer.ribbon.enabled=false，切换到ReactiveLoadBalancerClientFilter。无论使用Ribbon还是LoadBalancer，在Route中配置的lb是一样的
 