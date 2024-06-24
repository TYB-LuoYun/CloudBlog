import{_ as e,o as a,c as i,e as n}from"./app-b1d3968c.js";const r={},d=n(`<h1 id="gateway-网关" tabindex="-1"><a class="header-anchor" href="#gateway-网关" aria-hidden="true">#</a> gateway 网关</h1><p>是一个基于Spring Boot、Spring WebFlux、Project Reactor构建的高性能网关，旨在提供简单、高效的API路由。Spring Cloud Gateway基于Netty运行</p><h2 id="核心组件" tabindex="-1"><a class="header-anchor" href="#核心组件" aria-hidden="true">#</a> 核心组件</h2><p>Route路由：由一个ID、一个目标URI、一组谓词（Predicate）和一组过滤器（Filter）构成 Predicate断言：匹配 HTTP请求的不同属性，如路径、方法或头部信息 Filter过滤器:用于修改请求和响应，分为GatewayFilter（作用于单个路由）和GlobalFilter（影响所有路由） 其他:Actuator(监控和管理)，GatewayHandlerMapping,GatewayWebHandler,Gateway Controller Endpointm,RouteLocator，ProxyExchange</p><h2 id="作用" tabindex="-1"><a class="header-anchor" href="#作用" aria-hidden="true">#</a> 作用</h2><p>请求路由以及过滤 负载均衡： API网关分发请求，可以实现跨多个微服务实例的负载均衡 安全以及认证和授权: 统一进行用户认证和授权校验，可以简化各个微服务的安全实现 限流和熔断: 可以对流量进行控制，包括请求的限流和熔断，以防止系统过载和故障蔓延 跨域资源共享（CORS）处理 链路追踪：网关是实施链路追踪的理想位置，可以为进出的请求加上追踪标识。 缓存: 提供响应缓存功能，减少对后端微服务的请求次数，提升响应速度和减轻后端服务的负载 监控和日志</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>spring: 
  cloud:
    gateway:
      routes:
        - id: user-service
          uri: lb://USER-SERVICE
          predicates:
            - Path=/user/**
          filters:
            - StripPrefix=1
        - id: order-service
          uri: lb://ORDER-SERVICE
          predicates:
            - Path=/order/**
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="负载均衡" tabindex="-1"><a class="header-anchor" href="#负载均衡" aria-hidden="true">#</a> 负载均衡</h2><p>Gateway有两种客户端负载均衡器，LoadBalancerClientFilter和ReactiveLoadBalancerClientFilter。LoadBalancerClientFilter使用一个Ribbon的阻塞式LoadBalancerClient，Gateway建议使用ReactiveLoadBalancerClientFilter。 可以通过设置spring.cloud.loadbalancer.ribbon.enabled=false，切换到ReactiveLoadBalancerClientFilter。无论使用Ribbon还是LoadBalancer，在Route中配置的lb是一样的</p><h2 id="如何集成spring-cloud-gateway与分布式追踪系统" tabindex="-1"><a class="header-anchor" href="#如何集成spring-cloud-gateway与分布式追踪系统" aria-hidden="true">#</a> 如何集成Spring Cloud Gateway与分布式追踪系统</h2><p>添加分布式追踪库的依赖Sleuth</p>`,11),l=[d];function t(s,c){return a(),i("div",null,l)}const u=e(r,[["render",t],["__file","springcloud.html.vue"]]);export{u as default};
