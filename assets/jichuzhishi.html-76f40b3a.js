import{_ as e,a as t,b as p,c,d as i,e as o,f as l,g as u,h as r,i as d,j as k,k as v,l as m,m as b,n as h}from"./image-20240329170221756-2127be8c.js";import{_ as g,r as y,o as x,c as f,b as s,d as n,e as w,a as T}from"./app-8e16188a.js";const E={},q=T('<h1 id="设计模式" tabindex="-1"><a class="header-anchor" href="#设计模式" aria-hidden="true">#</a> 设计模式</h1><p>https://blog.csdn.net/qq_45649807/article/details/124593629#6_184</p><h2 id="创建型设计模式" tabindex="-1"><a class="header-anchor" href="#创建型设计模式" aria-hidden="true">#</a> 创建型设计模式：</h2><ul><li><p>简单工厂：用来生产同一等级结构中的任意产品。（不支持拓展增加产品）</p><p>2个不同的产品类 继承 抽象产品类，由工厂类决定创建哪个对象</p><p><img src="'+e+'" alt="image-20240221163346068"><img src="'+t+'" alt="image-20240221163401806"></p></li></ul><p>具体应用： <img src="'+p+'" alt="image-20240221163835558"> <img src="'+c+'" alt="image-20240221163835558"></p><ul><li><p>工厂方法（又称多态性工厂模式）：用来生产同一等级结构中的固定产品。（支持拓展增加产品）</p><p>多个工厂类继承抽象工厂，实现创建对象的方法，由工厂子类去创建具体的对象，生成对应的产品</p><p><img src="'+i+'" alt="image-20240222155127414"></p></li><li><p>抽象工厂： 用来生产不同产品族的全部产品。（不支持拓展增加产品；支持增加产品族）</p><p>和工厂方法一样，只不过可以创建不同类型的产品。比如既可以生产车吗，又可以生产引擎。</p><p><img src="'+o+'" alt="image-20240222155857129"></p></li></ul><h2 id="结构型" tabindex="-1"><a class="header-anchor" href="#结构型" aria-hidden="true">#</a> 结构型</h2><h3 id="装饰者模式" tabindex="-1"><a class="header-anchor" href="#装饰者模式" aria-hidden="true">#</a> 装饰者模式</h3><p>通过创建一个装饰类来 包装（实现）原始类。装饰类具有与原始类相同的接口，在装饰类中调用原始类的方法，可以在方法中包装额外的功能 <img src="'+l+'" alt="image-20240222161923899"><img src="'+u+'" alt="image-20240222162031841"></p><h1 id="线程" tabindex="-1"><a class="header-anchor" href="#线程" aria-hidden="true">#</a> 线程</h1><h2 id="统一管理项目的线程池" tabindex="-1"><a class="header-anchor" href="#统一管理项目的线程池" aria-hidden="true">#</a> 统一管理项目的线程池</h2><p>频繁的创建、销毁线程和线程池，会给系统带来额外的开销。未经池化及统一管理的线程，则会导致<strong>系统内线程数上限不可控</strong>。</p><ul><li><p>使用单例模式 <img src="'+r+`" alt="image-20240222144945332"></p></li><li><p>自建线程池交给spring管理</p></li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token annotation punctuation">@EnableAsync</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ThreadPoolConfig</span> <span class="token keyword">implements</span> <span class="token class-name">AsyncConfigurer</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * 项目共用线程池
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">MALLCHAT_EXECUTOR</span> <span class="token operator">=</span> <span class="token string">&quot;mallchatExecutor&quot;</span><span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * websocket通信线程池
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">WS_EXECUTOR</span> <span class="token operator">=</span> <span class="token string">&quot;websocketExecutor&quot;</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Executor</span> <span class="token function">getAsyncExecutor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">mallchatExecutor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Bean</span><span class="token punctuation">(</span><span class="token constant">MALLCHAT_EXECUTOR</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@Primary</span>
    <span class="token keyword">public</span> <span class="token class-name">ThreadPoolTaskExecutor</span> <span class="token function">mallchatExecutor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ThreadPoolTaskExecutor</span> executor <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ThreadPoolTaskExecutor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        executor<span class="token punctuation">.</span><span class="token function">setCorePoolSize</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        executor<span class="token punctuation">.</span><span class="token function">setMaxPoolSize</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//优雅停机,不设置的化好像也可以，spring处理了的</span>
        executor<span class="token punctuation">.</span><span class="token function">setWaitForTasksToCompleteOnShutdown</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        executor<span class="token punctuation">.</span><span class="token function">setQueueCapacity</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        executor<span class="token punctuation">.</span><span class="token function">setThreadNamePrefix</span><span class="token punctuation">(</span><span class="token string">&quot;mallchat-executor-&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        executor<span class="token punctuation">.</span><span class="token function">setRejectedExecutionHandler</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ThreadPoolExecutor<span class="token punctuation">.</span>CallerRunsPolicy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//满了调用线程执行，认为重要任务</span>
        executor<span class="token punctuation">.</span><span class="token function">setThreadFactory</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">MyThreadFactory</span><span class="token punctuation">(</span>executor<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        executor<span class="token punctuation">.</span><span class="token function">initialize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> executor<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>





<span class="token doc-comment comment">/**
* 装饰者模式-线程的异常捕捉
**/</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token annotation punctuation">@AllArgsConstructor</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyThreadFactory</span> <span class="token keyword">implements</span> <span class="token class-name">ThreadFactory</span> <span class="token punctuation">{</span> 
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">ThreadFactory</span> factory<span class="token punctuation">;</span> 
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Thread</span> <span class="token function">newThread</span><span class="token punctuation">(</span><span class="token class-name">Runnable</span> r<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Thread</span> thread <span class="token operator">=</span> factory<span class="token punctuation">.</span><span class="token function">newThread</span><span class="token punctuation">(</span>r<span class="token punctuation">)</span><span class="token punctuation">;</span>
        thread<span class="token punctuation">.</span><span class="token function">setUncaughtExceptionHandler</span><span class="token punctuation">(</span><span class="token class-name">GlobalUncaughtExceptionHandler</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> thread<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>



<span class="token annotation punctuation">@Slf4j</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">GlobalUncaughtExceptionHandler</span> <span class="token keyword">implements</span> <span class="token class-name">Thread<span class="token punctuation">.</span>UncaughtExceptionHandler</span> <span class="token punctuation">{</span> 
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">GlobalUncaughtExceptionHandler</span> instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">GlobalUncaughtExceptionHandler</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
    <span class="token keyword">private</span> <span class="token class-name">GlobalUncaughtExceptionHandler</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span> 
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">uncaughtException</span><span class="token punctuation">(</span><span class="token class-name">Thread</span> t<span class="token punctuation">,</span> <span class="token class-name">Throwable</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">&quot;Exception in thread {} &quot;</span><span class="token punctuation">,</span> t<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> e<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> 
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">GlobalUncaughtExceptionHandler</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> instance<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> 
<span class="token punctuation">}</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用：</p><p><img src="`+d+'" alt="image-20240222153212899"><img src="'+k+`" alt="image-20240222153228361"></p><h2 id="线程池" tabindex="-1"><a class="header-anchor" href="#线程池" aria-hidden="true">#</a> 线程池</h2><p>ThreadPoolExecutor</p><p>a。继承了ExecutorService的普通类,这是JDK线程池的核心实现。</p><p>b。它的构造器提供了各种可配置参数,比如线程数量、任务队列、拒绝策略等，方便我们自定义自己的线程池，以及各种钩子 (hook) 方法，方便追踪线程任务的执行，这是我们学习的重点。</p><p>线程池参数：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>* corePollSize核心线程池大小 : 活动线程在 队列未满的情况下  一直在核心线程数内处理任务 ；核心线程会一直存活，即使没有任务需要处理。当线程数小于核心线程数时，即使现有的线程空闲，线程池也会优先创建新线程来处理任务，而不是直接交给现有的线程处理。
* maximumPoolSize最大线程池大小:线程池允许的最大线程数，BlockingQueue满了，当线程池中的线程数&lt; 最大线程数时，当有新的任务到来时，会继续创建新的线程去处理
* keepAliveTime线程空闲时间: 当线程池中空闲线程数量超过了核心线程数时，多余的线程会在多长时间内被销毁
* workQueue阻塞工作队列:任务队列，被添加到线程池中，但尚未被执行的任务；
     i.ArrayBlockingQueue: 有界阻塞任务队列，构造函数一定要传入具体队列容量
     ii.LinkedBlockingQueu: 通常作为无界阻塞任务队列 (构造函数不传大小会默认为IntegerMAX VALUE ) ，当有大量任务提交时，容易造成内存耗尽
     iii.SynchronousQueue: 一个没有容量的阻塞队列，会将任务同步交付给工作线程.
     iv.PriorityBlockingQueue: 具有优先级的无界阻塞任务队列。
* handle任务拒绝策略:当任务超过了线程工作队列时，对任务的拒绝策略
     a对于正在执行的线程数等于maxmumPoolSize以及workQueue容量已满时提交的任务，或者线程池正在关闭时的新提交的任务，线程池将会执行拒绝策略，即这些任务都      直接被非线程池线程处理了。bThreadPoolExecutor中提供了4种拒绝策略的实现:
        i.AbortPolicy: 调用者的线程直接抛出异常，作为默认拒绝策略:
        ii.CallerRunsPolicy: 用调用者的线程执行任务:
        iii.DiscardOldestPolicy: 抛弃队列中最久的任务:
        iv.DiscardPolicy: 抛弃当前任务;
        v. 当然，我们还能够实现 RejectedExecutionHandler ，方法自行实现拒绝策略。就比如阿斌公司w用线程池来控制并发，但是希望满了后不丢弃，而是将主线程             阻塞着，等到队列里放得下，再放进去。这个场景比较特殊，是mq，本来就是背压式的消费，所以可以阻塞住。
* threadFactory : 线程工厂用于创建工作线程，默认线程工厂: Executors.defaultThreadFactory。
                  a我们经常在里面设置线程前缀，还可以做包装，比如执行前后做一些动作.
* unit:keepAliveTime线程空闲时间的时间单位                 

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ScheduledThreadPoolExecutor a。继承了ThreadPoolExecutor的普通类，可以看作功能的扩展或增强 b，它能够将线程任务延迟指定时间后执行，或者间隔固定时间多次执行。功能与Timer类似，但ScheduledThreadPoolExecutor功能更强大，更灵活。Timer对应的是单个后台线程，而ScheduledThreadPoolExecutor可以在构造函数中指定多个对应的后台线程数。Timer中一个任务出现异常之后会影响其他任务的执行，但是ScheduledThreadPoolExecutor不会。Timer中一个任务耗时较常会影响其他任务的执行，ScheduledThreadPoolExecutor不会。</p><p>Executors a.独立出来的一个普通类(没有继承和实现关系，采用组合/聚合关系，图上没有注明)，作为一个线程池工厂，提供各种实用方法。 b.提供了各种预定义线程池的实现，比如CachedThreadPool、FixedThreadPoo等:提供了将Runnable包装、转换为Callable的方法，提供默认的ThreadFactory线程工厂的实现等功能。</p><h4 id="引出的面试问题" tabindex="-1"><a class="header-anchor" href="#引出的面试问题" aria-hidden="true">#</a> 引出的面试问题：</h4><ol><li>你是如何做线程池统一管理的（引出你对线程池参数的理解）</li><li>你是如果做优雅停机的（可自己写，也可使用spring自带线程池，项目都用到了）</li><li>你是如何做异常捕获日志打印，更好的监控线程运行的？</li><li>你又是如何查看spring线程池源码，用装饰器更优雅去添加异常捕获功能的（引出你对源码，设计模式的理解）</li></ol><h1 id="锁" tabindex="-1"><a class="header-anchor" href="#锁" aria-hidden="true">#</a> 锁</h1><h2 id="从特性角度" tabindex="-1"><a class="header-anchor" href="#从特性角度" aria-hidden="true">#</a> 从特性角度</h2><h3 id="可重入锁-reentrant-lock-synchronized" tabindex="-1"><a class="header-anchor" href="#可重入锁-reentrant-lock-synchronized" aria-hidden="true">#</a> 可重入锁（Reentrant Lock/Synchronized）</h3><p>指的是同一个线程可以多次获得同一个锁，而不会因此发生死锁指的是同一个线程可以多次获得同一个锁，而不会因此发生死锁,统一线程外层函数获得锁之后，内层递归函数仍然能获取该锁的代码。简单来说，如果一个线程已经获得了某个锁，那么在持有锁的情况下，可以再次获得相同的锁，而不会被自己所持有的锁所阻塞</p><p>可重入锁最大的作用是避免死锁</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@SneakyThrows</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token class-name">ReentrantLock</span><span class="token punctuation">(</span><span class="token class-name">String</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">RLock</span> lock <span class="token operator">=</span> redissonClient<span class="token punctuation">.</span><span class="token function">getLock</span><span class="token punctuation">(</span>  <span class="token string">&quot;ssssss:&quot;</span> <span class="token operator">+</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">boolean</span> lockSuccess <span class="token operator">=</span> lock<span class="token punctuation">.</span><span class="token function">tryLock</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">SECONDS</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>lockSuccess<span class="token punctuation">)</span><span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span><span class="token string">&quot;获取锁失败&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">ServiceException</span><span class="token punctuation">(</span><span class="token string">&quot;获取锁失败&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">10000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token keyword">finally</span> <span class="token punctuation">{</span>
        lock<span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;结束&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="公平锁-fair-lock" tabindex="-1"><a class="header-anchor" href="#公平锁-fair-lock" aria-hidden="true">#</a> 公平锁 (Fair Lock)</h3><p>公平锁（Fair Lock）是一种锁机制，它<code>按照请求锁的顺序来分配锁，以确保资源的公平分配</code>。换句话说，公平锁保证线程按照它们发出请求的顺序来获取锁，不会因为线程调度的不确定性而导致某些线程永远无法获取到锁</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">new</span> <span class="token class-name">ReentrantLock</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 就可以
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="自旋锁" tabindex="-1"><a class="header-anchor" href="#自旋锁" aria-hidden="true">#</a> 自旋锁</h3><p>相比可重入锁来说适用于锁竞争不激烈的情况，在非常小的临界区域内使用，当线程在获取锁时通常能够快速成功，<code>避免了线程切换的开销</code>。</p><h3 id="读写锁-reentrantreadwritelock" tabindex="-1"><a class="header-anchor" href="#读写锁-reentrantreadwritelock" aria-hidden="true">#</a> 读写锁(ReentrantReadWriteLock)</h3><p>它允许多个线程同时读取共享资源，但只允许一个线程写入共享资源。它的特点是可重入性，即同一个线程可以多次获取同一把锁，同时还支持读写锁分离的功能</p><p>相比于使用普通的互斥锁来控制读写操作，使用 ReentrantReadWriteLock 的好处在于它允许多个线程同时进行读操作，从而提高了读取性能。但是，由于需要维护读写锁之间的状态，因此在实现上可能会比简单的互斥锁更复杂，同时也可能存在一些性能开销。</p><p>public class MyCache {</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">volatile</span> <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token class-name">ReentrantReadWriteLock</span> rwLock <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ReentrantReadWriteLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">put</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">,</span><span class="token class-name">Object</span> value<span class="token punctuation">)</span><span class="token punctuation">{</span>

    rwLock<span class="token punctuation">.</span><span class="token function">writeLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">try</span> <span class="token punctuation">{</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot; \\t 正在写入&quot;</span> <span class="token operator">+</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">MICROSECONDS</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">300</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;\\t 写入完成&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span><span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span><span class="token punctuation">{</span>

    <span class="token punctuation">}</span><span class="token keyword">finally</span> <span class="token punctuation">{</span>
        rwLock<span class="token punctuation">.</span><span class="token function">writeLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">)</span><span class="token punctuation">{</span>
    rwLock<span class="token punctuation">.</span><span class="token function">readLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">try</span> <span class="token punctuation">{</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot; \\t 正在读取&quot;</span> <span class="token operator">+</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">MICROSECONDS</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">300</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">Object</span> result <span class="token operator">=</span> map<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;\\t 读取完成&quot;</span> <span class="token operator">+</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span><span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span><span class="token punctuation">{</span>

    <span class="token punctuation">}</span><span class="token keyword">finally</span> <span class="token punctuation">{</span>
        rwLock<span class="token punctuation">.</span><span class="token function">readLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>}</p><h3 id="信号量" tabindex="-1"><a class="header-anchor" href="#信号量" aria-hidden="true">#</a> 信号量</h3><p>信号量主要用于两个目的：一个是用于多个共享资源的互斥使用，另一个用于并发线程数的控制</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SemaphoreDemo</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Semaphore</span> semaphore <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Semaphore</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//模拟3个停车位</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">6</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span> <span class="token comment">//模拟6辆汽车</span>
            <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-&gt;</span><span class="token punctuation">{</span>
                <span class="token keyword">try</span> <span class="token punctuation">{</span>
                    semaphore<span class="token punctuation">.</span><span class="token function">acquire</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;抢到停车位&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">try</span> <span class="token punctuation">{</span>
                    <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">SECONDS</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;停车3秒后离开车位&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span><span class="token keyword">finally</span> <span class="token punctuation">{</span>
                    semaphore<span class="token punctuation">.</span><span class="token function">release</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="闭锁-countdownlatch" tabindex="-1"><a class="header-anchor" href="#闭锁-countdownlatch" aria-hidden="true">#</a> 闭锁（CountDownLatch）</h3><p>CountDownLatch：让一些线程阻塞直到另一些线程完成一系列操作后才被唤醒。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class CountDownLatchDemo {

    public static void main(String[] args) throws InterruptedException {
        CountDownLatch countDownLatch = new CountDownLatch(5);
        for(int i = 1; i &lt;= 5; i++){
            new Thread(()-&gt;{
                countDownLatch.countDown();
                System.out.println(Thread.currentThread().getName() + &quot;朝灭亡&quot;);
            },CountryEnum.forEach_CountryEnum(i).getRetMessage()).start();
        }
        countDownLatch.await();  //当减为0的时候，被阻止的主线程才能被使用
        System.out.println(Thread.currentThread().getName() + &quot;朝&quot;);
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public enum CountryEnum {

    ONE(1,&quot;唐&quot;),TWO(2,&quot;宋&quot;),THREE(3,&quot;元&quot;),FOUR(4,&quot;明&quot;),FIVE(5,&quot;清&quot;);

    @Getter
    private Integer retCode;
    @Getter
    private String retMessage;

    CountryEnum(Integer retCode,String retMessage){
        this.retCode = retCode;
        this.retMessage = retMessage;
    }

    public static CountryEnum forEach_CountryEnum(int index){
        CountryEnum[] myArray = CountryEnum.values();
        for(CountryEnum element : myArray){
            if(index == element.getRetCode()){
                return element;
            }
        }
        return null;
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="从读写角度" tabindex="-1"><a class="header-anchor" href="#从读写角度" aria-hidden="true">#</a> 从读写角度</h2><h3 id="独占锁-写锁" tabindex="-1"><a class="header-anchor" href="#独占锁-写锁" aria-hidden="true">#</a> 独占锁（写锁）</h3><p>独占锁：指该锁一次只能被一个线程所持有。ReentrantLock和Synchronized都是独占锁</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ReentrantReadWriteLock lock = new ReentrantReadWriteLock();
lock.readLock().lock(); // 获取读锁
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="共享锁-读锁" tabindex="-1"><a class="header-anchor" href="#共享锁-读锁" aria-hidden="true">#</a> 共享锁（读锁）</h3><p>指该锁可被多个线程所持有</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ReentrantReadWriteLock lock = new ReentrantReadWriteLock();
lock.readLock().lock(); // 获取读锁
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="互斥锁" tabindex="-1"><a class="header-anchor" href="#互斥锁" aria-hidden="true">#</a> 互斥锁</h3><p>确保同一时间只有一个线程可以进入同步代码块或同步方法，如synchronized，ReentrantLock</p><h1 id="限流" tabindex="-1"><a class="header-anchor" href="#限流" aria-hidden="true">#</a> 限流</h1><p>一般来说系统的吞吐量是可以被测算的，为了保证系统的稳定运行，一旦达到的需要限制的阈值，就需要限制流量并采取一些措施以完成限制流量的目的。比如：延迟处理，拒绝处理，或者部分拒绝处理等等。</p><h2 id="固定窗口-计数器" tabindex="-1"><a class="header-anchor" href="#固定窗口-计数器" aria-hidden="true">#</a> 固定窗口(计数器)</h2><p>每秒作为一个时间窗口，设置每个时间窗口不能超过4个请求</p><p><strong>临界点问题</strong>。当切换窗口的时候，所有计数将会重新计数，就会出现短短0.5秒内达到6个请求的情况；如果请求集中在两个窗口之间。那么请求次数可能会超过我们的预期，最高达到预期的两倍</p><p>适用于平常流量相对均匀分布，比如签到和二维码获取接口（每个人每天请求二维码不超过20次。超过就认为是小黑子，直接限流） <img src="`+v+'" alt="image-20240329164706314"></p><h2 id="滑动窗口" tabindex="-1"><a class="header-anchor" href="#滑动窗口" aria-hidden="true">#</a> 滑动窗口</h2><p>解决临界点问题，就是窗口重叠</p><p><img src="'+m+'" alt="image-20240329164706314"></p><p>滑动窗口最大<code>优点</code>是平滑。能够允许<strong>偶尔突发</strong>的请求，但是会<strong>限制</strong>窗口内的<strong>总次数</strong>，适合需要保证平均速率的场景。<code>缺点</code>是他需要保存窗口内<strong>每个请求</strong>的时间分布状态，比较占用内存。真是因为这样的状态<code>滑动窗口最好是用于全局的限流</code></p><p>如果用于用户级别的限流，那就会为每一个用户都创建一个滑动窗口，比较消耗内存。</p><p>适用：<strong>api限流</strong>和<strong>sentinel限流框架底层</strong></p><h2 id="漏桶" tabindex="-1"><a class="header-anchor" href="#漏桶" aria-hidden="true">#</a> 漏桶</h2><p>无论你以什么样的<strong>不确定频率</strong>去添<strong>加水</strong>。水都会从底部以<strong>固定的频率流出</strong>，其余的水蓄在漏桶中，直到漏桶满了被丢弃。</p><p><img src="'+b+'" alt="image-20240329165508049"></p><p>漏桶限流算法最大的特点就是<strong>流量整型</strong>。让不规则的请求频率，转为规则的频率进行消费。</p><p><strong>优点</strong>：</p><p>可以严格限制请求的处理速度，避免瞬间请求过多导致系统崩溃或者雪崩。</p><p><strong>缺点</strong>：</p><ul><li>需要对请求进行缓存，会增加服务器的内存消耗。</li><li>面对突发流量的时候，优点同时也会是缺点。无法适应瞬时的突增流量。</li></ul><p>适用：</p><p>流量整型，超级<strong>严格的限制流出的速率</strong>,漏桶比较适合后台任务的限流，或者客户端限流。比如 <strong>家庭带宽20M限制</strong></p><p>不适合C端接口的限流。因为对于都到了限流的场景了。并发已经比较高了。我们希望的是超过限制的请求，立马就给他快速失败返回了，而不是hold在桶里休眠等待响应。这样整体的RT会很高，同时还占用我们的请求连接池。</p><h2 id="令牌桶" tabindex="-1"><a class="header-anchor" href="#令牌桶" aria-hidden="true">#</a> 令牌桶</h2><p>其实和漏桶算法的效果是一样的。最大的差别就是在请求不多的时候，它能<strong>存储令牌</strong>，用来应对<strong>突增流量</strong></p><p><img src="'+h+`" alt="image-20240329170221756"></p><p>适用:</p><p>更加适合应对突发的流量。流量达到极限后，就会退化成没桶的漏桶，速率变成了严格控制。适用于流量整体平滑的情况下，同时也可以满足一定的突发流程场景</p><p>缺点，就是他的预热问题。刚创建的令牌桶，这时候没有令牌，请求刚进来，又由于它没有桶，直接就把请求丢弃了。</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>令牌桶更能够扛波动，而漏桶完全固定速率。</p><ul><li><code>固定窗口</code>：实现简单，适用于流量相对均匀分布，对限流准确度要求不严格的场景。</li><li><code>滑动窗口</code>：适用于对准确性和性能有一定的要求场景，能够控制平均的速率。</li><li><code>漏桶</code>：适用于固定速率处理请求</li><li><code>令牌桶</code>：适用于控制精确速率，同时也可以满足一定的突发流量场景</li></ul><h2 id="工作中的使用" tabindex="-1"><a class="header-anchor" href="#工作中的使用" aria-hidden="true">#</a> 工作中的使用</h2><h3 id="spring-cloud-gateway" tabindex="-1"><a class="header-anchor" href="#spring-cloud-gateway" aria-hidden="true">#</a> spring cloud gateway</h3><ul><li>spring cloud gateway 默认使用 redis 进行限流，笔者一般只是修改修改参数属于拿来即用，并没有去从头实现上述那些算法。</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;dependency&gt;
    &lt;groupId&gt;org.springframework.cloud&lt;/groupId&gt;
    &lt;artifactId&gt;spring-cloud-starter-gateway&lt;/artifactId&gt;
&lt;/dependency&gt;
&lt;dependency&gt;
    &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
    &lt;artifactId&gt;spring-boot-starter-data-redis-reactive&lt;/artifactId&gt;
&lt;/dependency&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>spring:
    cloud:
        gateway:
            routes:
                - id: requestratelimiter_route

                  uri: lb://pigx-upms
                  order: 10000
                  predicates:
                      - Path=/admin/**

                  filters:
                      - name: RequestRateLimiter

                        args:
                            redis-rate-limiter.replenishRate: 1 # 令牌桶的容积
                            redis-rate-limiter.burstCapacity: 3 # 流速 每秒
                            key-resolver: &#39;#{@remoteAddrKeyResolver}&#39; #SPEL表达式去的对应的bean

                      - StripPrefix=1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Bean
KeyResolver remoteAddrKeyResolver() {
    return exchange -&gt; Mono.just(exchange.getRequest().getRemoteAddress().getHostName());
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="sentinel" tabindex="-1"><a class="header-anchor" href="#sentinel" aria-hidden="true">#</a> sentinel</h3><ul><li>通过配置来控制每个 url 的流量</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;dependency&gt;
    &lt;groupId&gt;com.alibaba.cloud&lt;/groupId&gt;
    &lt;artifactId&gt;spring-cloud-starter-alibaba-sentinel&lt;/artifactId&gt;
&lt;/dependency&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>spring:
    cloud:
        nacos:
            discovery:
                server-addr: localhost:8848
        sentinel:
            transport:
                dashboard: localhost:8080
                port: 8720
            datasource:
                ds:
                    nacos:
                        server-addr: localhost:8848
                        dataId: spring-cloud-sentinel-nacos
                        groupId: DEFAULT_GROUP
                        rule-type: flow
                        namespace: xxxxxxxx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>配置内容在 nacos 上进行编辑</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[
    {
        &quot;resource&quot;: &quot;/hello&quot;,
        &quot;limitApp&quot;: &quot;default&quot;,
        &quot;grade&quot;: 1,
        &quot;count&quot;: 1,
        &quot;strategy&quot;: 0,
        &quot;controlBehavior&quot;: 0,
        &quot;clusterMode&quot;: false
    }
]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>resource：资源名，即限流规则的作用对象。</li><li>limitApp：流控针对的调用来源，若为 default 则不区分调用来源。</li><li>grade：限流阈值类型，QPS 或线程数模式，0 代表根据并发数量来限流，1 代表根据 QPS 来进行流量控制。</li><li>count：限流阈值</li><li>strategy：判断的根据是资源自身，还是根据其它关联资源 (refResource)，还是根据链路入口</li><li>controlBehavior：流控效果（直接拒绝 / 排队等待 / 慢启动模式）</li><li>clusterMode：是否为集群模式</li></ul><h3 id="总结-1" tabindex="-1"><a class="header-anchor" href="#总结-1" aria-hidden="true">#</a> 总结</h3>`,105),S={href:"https://github.com/alibaba/spring-cloud-alibaba",target:"_blank",rel:"noopener noreferrer"},_=s("strong",null,"spring cloud gateway",-1);function L(R,C){const a=y("ExternalLinkIcon");return x(),f("div",null,[q,s("blockquote",null,[s("p",null,[n("sentinel 和 spring cloud gateway 两个框架都是很好的限流框架， 但是在我使用中还没有将"),s("a",S,[n("spring-cloud-alibaba"),w(a)]),n("接入到项目中进行使用， 所以我会选择"),_,n("， 当接入完整的或者接入 Nacos 项目使用 setinel 会有更加好的体验.")])])])}const j=g(E,[["render",L],["__file","jichuzhishi.html.vue"]]);export{j as default};
