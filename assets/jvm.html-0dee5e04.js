import{_ as a,o as e,c as i,a as r}from"./app-8e16188a.js";const l={},d=r('<h1 id="八股文" tabindex="-1"><a class="header-anchor" href="#八股文" aria-hidden="true">#</a> 八股文</h1><h2 id="jvm内存模型" tabindex="-1"><a class="header-anchor" href="#jvm内存模型" aria-hidden="true">#</a> jvm内存模型</h2><p>1程序计数器:当前线程<code>所执行的字节码的行号指示器</code>，线程私有,正在执行的是Native方法，计数器值则为空 2虚拟机栈: 每个方<code>法被执行的时候都会同时创建一个栈帧</code>（Stack Frame）用于存储局部变量表、操作栈、动态链接、方法出口等信息 3本地方法栈: Native方法</p><p>4堆:存放对象实例，几乎所有的对象实例都在这里分配内存；新生代（ eden 和 survivor区(from-to)）、老年代 ； jdk1.8之后，字符串常量池也放在堆中。 5元空间:以前永久代，是方法区的实现，也叫非堆，存储已被虚拟机加载的类元数据信息</p><h2 id="jmm-java内存模型的简称" tabindex="-1"><a class="header-anchor" href="#jmm-java内存模型的简称" aria-hidden="true">#</a> JMM - Java内存模型的简称</h2><p>它描述 的和多线程相关的一组规范，定义了程序中对各个变量（包括实例字段，静态字段和构成数组对象的元素）的访问方式，有了JMM规范的保障，并发程序运行在不同的虚拟机上时，得到的程序结果才是安全可靠可信赖的</p><p>计算机在执行程序时，每条指令都是在CPU中执行的 (硬盘 &lt; 内存 &lt;缓存cache &lt; CPU),也就是当程序在运行过程中，会将运算需要的数据从主存复制一份到CPU的高速缓存当中，那么CPU进行计算时，就可以直接从它的高速缓存中读取数据或向其写入数据了。当运算结束之后，再将高速缓存中的数据刷新到主存当中</p><p>JMM 抽象出主存储器（Main Memory）和工作存储器（Working Memory）两种</p><ul><li>主存储器是实例对象所在的区域，所有的实例都存在于主存储器内。比如，实例所拥有的字段即位于主存储器内，主存储器是所有的线程所共享的。</li><li>工作存储器是线程所拥有的作业区，每个线程都有其专用的工作存储器。工作存储器存有主存储器中必要部分的拷贝，称之为工作拷贝（Working Copy）。</li></ul><p>JAVA内存模型中规定，所有变量都存储在主内存中，主内存是共享内存区域，所有线程都可以访问。 ​但线程对变量的操作（读取赋值等）必须在自己的工作内存中进行。首先要将变量从主内存拷贝到自己的工作内存空间，然后对变量进行操作，操作完成后，再将变量写回到主内存。由于不能直接操作主内存中的变量，各个线程的工作内存中存储着主内存中的变量副本，因此，不同的线程之间无法直接访问对方的工作内存，线程间的通信（传值）必须通过主内存来完成。</p><h3 id="jmm的三大特性" tabindex="-1"><a class="header-anchor" href="#jmm的三大特性" aria-hidden="true">#</a> JMM的三大特性：</h3><p>JMM的三大特性：</p><ul><li>原子性： 一个或多个操作，要么全部执行，要么全部不执行</li><li>可见性: 只要有一个线程对共享变量的值做了修改，其他线程都将马上收到通知</li><li>有序性： 多线程的环境下，由于执行语句重排序后，重排序的这一部分没有一起执行完，就切换到了其它线程，导致计算结果与预期不符的问题； volatile 和 synchronized 两个关键字来保证线程之间操作的有序性，volatile 是因为其本身包含“禁止指令重排序”的语义，synchronized 是由“一个变量在同一个时刻只允许一条线程对其进行 lock 操作”这条规则获得的</li></ul><h3 id="关于同步的规定" tabindex="-1"><a class="header-anchor" href="#关于同步的规定" aria-hidden="true">#</a> 关于同步的规定</h3><p>1.线程解锁前，必须把共享变量的值刷新回主内存。</p><p>2.线程加锁前，必须将主内存的最新值读取到自己的工作内存。</p><p>3.加锁解锁是同一把锁。</p><h3 id="jmm中的八种操作" tabindex="-1"><a class="header-anchor" href="#jmm中的八种操作" aria-hidden="true">#</a> JMM中的八种操作：</h3><p>为了支持 JMM，Java 定义了8种原子操作，用来控制主存与工作内存之间的交互：</p><p>·read 读取：作用于主内存，将共享变量从主内存传送到线程的工作内存中。 ·load 载入：作用于工作内存，把 read 读取的值放到工作内存中的副本变量中。 ·store 存储：作用于工作内存，把工作内存中的变量传送到主内存中。 ·write 写入：作用于主内存，把从工作内存中 store 传送过来的值写到主内存的变量中。 ·use 使用：作用于工作内存，把工作内存的值传递给执行引擎，当虚拟机遇到一个需要使用这个变量的指令时，就会执行这个动作。 ·assign 赋值：作用于工作内存，把执行引擎获取到的值赋值给工作内存中的变量，当虚拟机栈遇到给变量赋值的指令时，就执行此操作。 ·lock锁定： 作用于主内存，把变量标记为线程独占状态。 ·unlock解锁： 作用于主内存，它将释放独占状态。</p><h2 id="栈和堆的区别" tabindex="-1"><a class="header-anchor" href="#栈和堆的区别" aria-hidden="true">#</a> 栈和堆的区别</h2><p>​在JVM中，栈负责运行（主要是方法），堆负责存储（比如new的对象）。<br> 栈是线程私有的，每个线程有一个栈内存，如果使用递归，栈很快就满了 栈内存用来存储基本类型的变量和对象的引用变量，堆内存用来存储Java中的对象，无论是成员变量，局部变量，还是类变量，它们指向的对象都存储在堆内存中 栈内存StackOverFlowError(s) 堆内存OutOfMemoryError(m) -Xss(stack)选项设置栈内存的大小； -Xms选项可以设置堆的开始时的大小</p><h2 id="gc回收" tabindex="-1"><a class="header-anchor" href="#gc回收" aria-hidden="true">#</a> GC回收</h2><p>最初的对象都分配在Eden(伊甸园)区,分配新对象的时候eden区内存不足，触发Minor GC 移动存活对象先去to,然后与from交换(采用复制回收算法，这两个区只有一个区有数据，避免碎片化的发生)，交换15次后经过了15次Minor GC 仍然存活的对象 会移动到老年 老年代空间不足,会触发Full GC(标记-清除算法).</p><h2 id="gc算法" tabindex="-1"><a class="header-anchor" href="#gc算法" aria-hidden="true">#</a> GC算法</h2><p>引用计数器算法：对每一个对象记录其引用数，回收引用数为0的对象；优点简单，缺点 计数器会有消耗，无法解决循环引用问题 复制回收算法: 会产生内存碎片,但需要一块多余的存储空间 标记清除算法 : 会产生大量内存碎片 ,标记清除压缩法解决了碎片化问题，但时间复杂度高 分代收集算法: 现代的JVM大多采用这种方式。将堆分为年轻代和老年代。在年轻代中，由于对象生存周期短，每次回收都会有大量对象死去，这时采用复制算法。而老年代中，对象生存周期长，采用标记清除压缩算法或标记清除算法。 补充：调用System.gc会优先调用重GC(full GC)，但是不一定立刻调用。</p><h2 id="jvm调优" tabindex="-1"><a class="header-anchor" href="#jvm调优" aria-hidden="true">#</a> jvm调优</h2><p>JVM调优内容</p><ol><li>堆内存调优 调整JVM堆内存的大小，包括初始堆大小（-Xms参数）和最大堆大小（-Xmx参数） Minor GC执行时间不到50ms；执行不频繁，约10秒一次;Full GC执行时间不到1s；不低于10分钟1次；不用优化</li></ol><ul><li><p>针对JVM堆的设置，一般可以通过-Xms -Xmx限定其最小、最大值，为了防止垃圾收集器在最小、最大之间收缩堆而产生额外的时间，通常把最大、最小设置为相同的值;</p></li><li><p>.年轻代和年老代设置多大才算合理 （1）本着Full GC尽量少的原则，让年老代尽量缓存常用对象，JVM的默认比例1：2也是这个道理 。 （2）通过观察应用一段时间，看其他在峰值时年老代会占多少内存，在不影响Full GC的前提下，根据实际情况加大年轻代(大的年轻代会延长普通GC的周期，但会增加每次GC的时间)，比如可以把比例控制在1：1。但应该给年老代至少预留1/3的增长空间。</p></li><li><p>在配置较好的机器上（比如多核、大内存），可以为年老代选择并行收集算法： -XX:+UseParallelOldGC 。</p></li><li><p>线程堆栈的设置：每个线程默认会开启1M的堆栈，用于存放栈帧、调用参数、局部变量等，对大多数应用而言这个默认值太了，一般256K就足用。</p></li></ul><ol start="2"><li>垃圾回收调优 选择适当的垃圾回收器（GC）算法和参数，以最大限度地减少垃圾回收的停顿时间和提高吞吐量。常见的GC算法包括串行GC、并行GC和并发GC（如CMS、G1等）。</li><li>线程调优 调整JVM线程相关的参数，如线程栈大小、线程池大小等，</li><li>类加载调优 对类加载器进行调优，包括设置适当的类加载器层次结构、减少类加载的次数和提高加载速度。</li><li>JIT编译器调优 Java虚拟机的即时编译器（JIT）将热点代码编译成本地机器码，提高执行速度</li><li>I/O调优 对输入输出操作进行优化，包括使用合适的缓冲区大小、选择高效的I/O操作方式（如NIO）、优化文件和网络操作等</li><li>监控和分析 使用工具监控JVM的运行情况，如内存使用情况、垃圾回收情况、线程状态等，并进行性能分析，以找出性能瓶颈和优化的潜在点。</li></ol><h2 id="java四引用" tabindex="-1"><a class="header-anchor" href="#java四引用" aria-hidden="true">#</a> Java四引用</h2><p>强引用(不会回收)&gt;软引用(不足才回收)&gt;弱引用(发现就回收)&gt;虚引用(随时回收主要用来跟踪回收时会通知)</p>',33),h=[d];function t(n,o){return e(),i("div",null,h)}const s=a(l,[["render",t],["__file","jvm.html.vue"]]);export{s as default};
