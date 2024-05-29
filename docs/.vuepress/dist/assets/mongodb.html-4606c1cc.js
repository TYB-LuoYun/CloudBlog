import{_ as o,o as a,c as n,a as e}from"./app-ea0d6870.js";const d={},r=e('<h2 id="概念" tabindex="-1"><a class="header-anchor" href="#概念" aria-hidden="true">#</a> 概念</h2><p>是一个介于关系数据库和非关系数据库之间的产品，是非关系数据库中功能最丰富、最像关系数据库的 在高负载的情况下，通过添加更多的节点，可以保证服务器性能。 采用bson数据结构</p><h2 id="数据持久化" tabindex="-1"><a class="header-anchor" href="#数据持久化" aria-hidden="true">#</a> 数据持久化</h2><ul><li>journal journal，1.8版本之后开始支持journal,在2.0之后的版本，journal都是默认打开的 就是我们常说的redo log，用于故障恢复和持久化。持久化为了保证数据永久保存不丢失 生产环境下，我们强烈推荐开启journal</li></ul><p>工作原理: 当执行写操作时，MongoDB创建一个journal来包含确切磁盘位置和改变的字节。因此，如果服务器突然崩溃，启动时，journal会重放崩溃前并没有刷新到磁盘上的任何写操作。 数据文件每隔60s刷新到磁盘上，默认情况下，因此journal只需要持有60s内的写入数据。journal预分配了几个空文件用于此目的，位于/data/db/journal，命名为_j.0,j.1等等 这些文件是当前的journal文件，如果MongoDB一直运行，这些数字会持续增加。当正常关闭MongoDB时，这些文件将被清除(注意，数据存储在/data/db)</p><p>默认情况下，MongoDB每隔100ms写入一次journal日志,意味着mongodb批量提交更改，每个写不立即刷新到磁盘</p><p>所以可能会失去这100ms的数据，这种保证对某些应用不是足够强，有几种方法可以得到更强的持久化保证（getLastError来确保写入已经写入持久化）</p><h2 id="mongodb索引类型" tabindex="-1"><a class="header-anchor" href="#mongodb索引类型" aria-hidden="true">#</a> MongoDB索引类型</h2><p>单键索引 (Single Field) db.集合名.createIndex({&quot;字段名&quot;:排序方式}) 复合索引(Compound Index) 与mysql的复合索引相同，支持基于多个字段的索引。 多键索引，地理空间索引，全文索引，哈希索引</p><h2 id="explain参数及慢查询分析" tabindex="-1"><a class="header-anchor" href="#explain参数及慢查询分析" aria-hidden="true">#</a> Explain参数及慢查询分析</h2><p>https://zhuanlan.zhihu.com/p/494298431?utm_id=0</p><h2 id="mongodb索引底层实现原理" tabindex="-1"><a class="header-anchor" href="#mongodb索引底层实现原理" aria-hidden="true">#</a> MongoDB索引底层实现原理</h2><p>MongoDB底层B-树： 每个节点既保存数据又保存索引，所以磁盘IO的次数很少，区间访问差 搜索时相当于二分查找</p><h2 id="mongodb的适用场景" tabindex="-1"><a class="header-anchor" href="#mongodb的适用场景" aria-hidden="true">#</a> MongoDB的适用场景</h2><p>缓存：由于性能很高，Mongo 也适合作为信息基础设施的缓存层 直播，使用 MongoDB 存储用户信息、礼物信息等。 物联网场景，使用 MongoDB 存储所有接入的智能设备信息，以及设备汇报的日志信息，并对这 些信息进行多维度的分析。</p><h2 id="mongodb架构及集群高可用" tabindex="-1"><a class="header-anchor" href="#mongodb架构及集群高可用" aria-hidden="true">#</a> MongoDB架构及集群高可用</h2><h3 id="mongodb存储引擎和数据模型" tabindex="-1"><a class="header-anchor" href="#mongodb存储引擎和数据模型" aria-hidden="true">#</a> MongoDB存储引擎和数据模型</h3><ul><li>存储引擎 存储引擎是MongoDB的核心组件，负责管理数据如何存储在硬盘和内存上。mongodb3.2开始默认的存储引擎是WiredTiger，3.2版本之前的默认存储引擎是MMAPv1。</li></ul>',18),h=[r];function i(t,l){return a(),n("div",null,h)}const c=o(d,[["render",i],["__file","mongodb.html.vue"]]);export{c as default};
