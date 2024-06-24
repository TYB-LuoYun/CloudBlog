import{_ as e,o as a,c as i,a as l}from"./app-2ace92a1.js";const d="/assets/image-20240618140121413-569621f0.png",r="/assets/image-20240618140509228-9ba9e8d4.png",n="/assets/image-20240618142217767-8812d3f4.png",s="/assets/1-b6da75cf.jpg",h={},t=l('<h1 id="八股文" tabindex="-1"><a class="header-anchor" href="#八股文" aria-hidden="true">#</a> 八股文</h1><h2 id="sql优化" tabindex="-1"><a class="header-anchor" href="#sql优化" aria-hidden="true">#</a> sql优化</h2><p>索引优化，优化查询，配置优化</p><p>慢查询日志记录慢SQL explain分析SQL的执行计划 profile 分析执行耗时 Optimizer Trace分析详情 确定问题并采用相应的措施 https://www.zhihu.com/question/485701420/answer/3156990749</p><p>explain查看执行计划， SQL性能优化的目标：至少要达到 range 级别（索引范围内查找），要求是ref级别，如果可以是consts最好 说明： 1） consts 单表中最多只有一个匹配行（主键或者唯一索引），在优化阶段即可读取到数据。 2） ref 指的是使用普通的索引（normal index）。 3） range 对索引进行范围检索。</p><h3 id="索引优化-面试" tabindex="-1"><a class="header-anchor" href="#索引优化-面试" aria-hidden="true">#</a> 索引优化 -- 面试</h3><p>尽量避免全表扫描，首先应考虑在 where 及 order by 涉及的列上建立索引。 创建适当的索引(为经常出现在WHERE子句、JOIN条件或排序操作中的列创建索引)，避免过多的索引（5个以内么，过多的索引会增加插入、更新和删除操作的开销），使用复合索引(当查询中有多个条件时，可以考虑使用复合索引),防止索引失效</p><p>补充: 尽可能使用覆盖索引（Covering Index）避免回表查询:一个索引包含了查询所需要的所有列，不需要回表查询数据（CREATE INDEX idx_name ON table_name(column1, column2)） 选择合适的索引列顺序: 常见的是最适合查询条件的列放在前面</p><h4 id="防止索引失效" tabindex="-1"><a class="header-anchor" href="#防止索引失效" aria-hidden="true">#</a> 防止索引失效</h4><ol><li>尽量全值匹配 如果一个表有一个复合索引 (A, B)，那么在查询条件中，如果 A 和 B 都被指定了具体的值，就叫全值匹配 （如果不是复合索引，而是2个单独的索引，称为索引合并，那么mysql会分别根据索引找到行取交集，比复合索引慢 ，但注意索引合并不是总能被优化器选中，有时可能会回退到全表扫描，具体取决于表的大小和数据的分布）</li><li>满足最佳左前缀法则 最左优先，在检索数据时从联合索引的最左边开始匹配。 联合索引把频繁查询的列放左。索引（a,b,c），只能查(a,b,c),(a,b),(a)。 而(b),(b,c),(c)都不会走索引。</li><li>主键尽量自增：如果主键不自增，需要查找目标位置再插入，并且如果目标位置所在数据页满了就必须得分页，造成性能损耗。</li><li>计算、函数导致索引失效：计算例如where num+1=2，函数例如abs(num)取绝对值</li><li>类型转换导致索引失效：例如name=123，而不是name=&#39;123&#39;。又例如使用了不同字符集。</li><li>范围条件右边的列索引失效：例如（a,b,c）联合索引，查询条件a,b,c，如果b使用了范围查询，那么b右边的c索引失效。建议把需要范围查询的字段放在最后。范围包括：(&lt;) (&lt;=) (&gt;) (&gt;=) 和 between。</li><li>没覆盖索引时，“不等于”导致索引失效：因为“不等于”不能精准匹配，全表扫描二级索引树再回表效率不如直接全表扫描聚簇索引树。但使用覆盖索引时，联合索引数据量小，加载到内存所需空间比聚簇索引树小，且不需要回表，索引效率优于全表扫描聚簇索引树。覆盖索引：一个索引包含了满足查询结果的数据就叫做覆盖索引，不需要回表等操作。解决办法:使用覆盖索引</li><li>没覆盖索引时，左模糊查询导致索引失效：例如LIKE &#39;%abc&#39;。因为字符串开头都不能精准匹配。跟上面一个道理。</li><li>没覆盖索引时，is not null、not like无法使用索引：因为不能精准匹配。跟上面一个道理。 解决方案:NOT NULL 约束 ; int 默认0 ，字符类型设置为空串</li><li>“OR”前后存在非索引列，导致索引失效：MySQL里，即使or左边条件满足，右边条件依然要进行判断。 解决：union拆分or为独立的查询</li><li>不同字符集导致索引失败：建议utf8mb4，不同的字符集进行比较前需要进行 转换 会造成索引失效。 (左右连接，关联的字段编码格式不一样)</li><li>in 如果查询的值列表比较大,不要超过200个，则会引起索引失效. （<code>子查询表大的用exists</code>，<code>子查询表小的用in</code>） 解决方案:拆分查询：将大列表拆分为多个较小的查询，并使用 UNION 或 UNION ALL 合并结果：</li></ol><h3 id="优化查询" tabindex="-1"><a class="header-anchor" href="#优化查询" aria-hidden="true">#</a> 优化查询</h3><ol><li>避免使用select * , 减少回表和不必要的传输</li><li>用union all代替union: union可以获取排除重复后的数据,排除重复的过程需要遍历，排序和比较，他更耗时</li><li>小表驱动大表（用小表的数据集驱动大表的数据集）： <code>子查询表大的用exists</code>，<code>子查询表小的用in</code>，因为in关键字，他会优先执行in里面的子查询语句，exists关键字，他会优先执行exists左边的语句</li><li>批处理减少io： 单个查询或者插入次数过多每次请求数据库消耗一定性能； 改为一条语句 批量插入或查询(比如for循环的查询)</li><li>多用limit，比如mybatis的 getOne方法没有limit</li><li>用连接查询代替子查询 ：子查询，比如in，一个查询语句的条件落在另一个select语句的查询结果中，程序先运行嵌套在最内层的语句，在运行外层的语句，子查询的优点是简单，结构化，如果涉及的表数据不多的话，但缺点是数据库执行子查询时，需要创建临时表，查询完毕后，会删除这些临时表，有一些额外的性能消耗 ; 连接查询，性能会更高</li><li>使用临时表优化复杂查询,使用临时表可以存储中间结果，从而简化查询并提高性能</li><li>深分页问题： select id,name,balance from account where create_time&gt; &#39;2020-09-19&#39; limit 100000,10; 这个SQL的执行流程: 普通二级索引树idx_create_time，过滤create_time条件，找到满足条件的主键id。-----&gt; 通过主键id，回到id主键索引树，找到满足记录的行，然后取出需要展示的列（回表过程）-----&gt; 扫描满足条件的100010行，然后扔掉前100000行，返回 优化:标签记录法（范围条件）和延迟关联法(把条件转移到主键索引树,减少回表)如select acct1.id,acct1.name,acct1.balance FROM account acct1 INNER JOIN (SELECT a.id FROM account a WHERE a.create_time &gt; &#39;2020-09-19&#39; limit 100000, 10) AS acct2 on acct1.id= acct2.id;</li></ol><h3 id="表设计" tabindex="-1"><a class="header-anchor" href="#表设计" aria-hidden="true">#</a> 表设计</h3><p>将数据分解到不同的表中，以减少数据冗余，但 在某些情况下，为了提高查询性能，可以进行适当的反规范化 利用分区提高性能 : 对于大型表，特别是那些行数以百万计的表，使用分区可以提高查询性能和数据管理效率。 减少冗余需要满足三大范式:1每列保持原子性; 2 非主键列完全依赖于主键,如果存在不完全依赖,那么需要建新表就是1对多的关系 3 即每个列都与主键直接相关，而不是间接相关</p><h3 id="数据库配置优化-缓冲池-和-查询缓存" tabindex="-1"><a class="header-anchor" href="#数据库配置优化-缓冲池-和-查询缓存" aria-hidden="true">#</a> 数据库配置优化 --缓冲池 和 查询缓存</h3><p>核心就是：减少磁盘io，增加内存读取 <code>查看配置: SHOW VARIABLES LIKE &#39;配置名&#39;;</code></p><ul><li>InnoDB配置 innodb_buffer_pool_size 缓冲池的大小，缓存数据和索引，对InnoDB整体性能影响较大，相当于MyISAM的key_buffer_size。如果只用Innodb，可以把这个值设为内存的70%-80%。越大越好，这能保证你在大多数的读取操作时使用的是内存而不是硬盘。查询也会快。 innodb_log_buffer_size   尚未执行的事务的缓存大小，默认值为8M，一般8M-16M。如果你有很多事务的更新，插入或删除操作，通过这个参数会大量的节省了磁盘I/O。但是如果你的事务中包含有二进制大对象或者大文本字段的话，这点缓存很快就会被填满并触发额外的I/O操作。看看Innodb_log_waits状态变量，如果它不是0，应该增大这个值。但太大了也是浪费内存，因为1秒钟总会flush一次，所以不需要设到超过1秒的需求。</li><li>全局配置： max_connections 最大连接数。默认值是151，最多2000。如果服务器的并发连接请求量比较大，建议调高此值，以增加并行连接数量 max_used_connections / max_connections * 100% （理想值≈85%）  如果max_used_connections跟max_connections相同 那么就是max_connections设置过低或者超过服务器负载上限了，低于10%则设置过大。 back_log MySQL能暂存的连接数量，当主要MySQL线程在一个很短时间内得到非常多的连接请求，这就起作用。 key_buffer_size 索引缓冲区的大小，它决定索引处理的速度，尤其是索引读的速度。 key_buffer_size只对MyISAM表起作用，即使你不使用MyISAM表，但是内部的临时磁盘表是MyISAM表，也要使用该值。 query_cache_size 使用查询缓存： 当相同的查询被频繁执行时，使用查询缓存可以避免重复的数据库扫描 ` -- 启用查询缓存 SET global query_cache_size = 1000000; SET global query_cache_type = 1; MySQL将查询结果存放在缓冲区中，今后对于同样的SELECT语句（区分大小写），将直接从缓冲区中读取结果 read_buffer_size MySQL读入缓冲区的大小，将对表进行顺序扫描的请求将分配一个读入缓冲区，MySQL会为它分配一段内存缓冲区，read_buffer_size变量控制这一缓冲区的大小，如果对表的顺序扫描非常频繁，并你认为频繁扫描进行的太慢，可以通过增加该变量值以及内存缓冲区大小提高其性能。 默认数值是131072(128K)，可改为16773120(16M)</li></ul><h2 id="索引" tabindex="-1"><a class="header-anchor" href="#索引" aria-hidden="true">#</a> 索引</h2><h3 id="索引类型" tabindex="-1"><a class="header-anchor" href="#索引类型" aria-hidden="true">#</a> 索引类型</h3><p>主键，唯一(UNIQUE),普通，全文</p><p>复合索引: 复合索引也叫多列索引或联合索引，它是包含多个列的索引类型，能够加速多列查询和排序操作。需要遵循最左前缀匹配原则（最左匹配原则） 哈希索引:对等值查询进行高效的处理，但不支持范围查询和排序</p><h3 id="创建索引的原则-重中之重-面试题" tabindex="-1"><a class="header-anchor" href="#创建索引的原则-重中之重-面试题" aria-hidden="true">#</a> 创建索引的原则（重中之重） -- 面试题</h3><p>索引虽好，但也不是无限制的使用，最好符合一下几个原则</p><p>1） 最左前缀匹配原则，组合索引非常重要的原则，mysql会一直向右匹配直到遇到范围查询(&gt;、&lt;、between、like)就停止匹配，比如a = 1 and b = 2 and c &gt; 3 and d = 4 如果建立(a,b,c,d)顺序的索引，d是用不到索引的，如果建立(a,b,d,c)的索引则都可以用到，a,b,d的顺序可以任意调整。 2）较频繁作为查询条件的字段才去创建索引 3） <code>更新频繁字段不适合创建索引</code> 4）基数较小的类（较少不同数值，重复值比较多，比如性别），索引效果较差(如性别，男女未知，最多也就三种，区分度实在太低) 5）尽量的扩展索引，不要新建索引。比如表中已经有a的索引，现在要加(a,b)的索引，那么只需要修改原来的索引即可(联合索引，减少索引数量)。 6）定义有外键的数据列一定要建立索引。 7）对于定义为text、image和bit的数据类型的列不要建立索引。 8）使用短索引，如果对长字符串列进行索引，应该指定一个前缀长度，这样能够节省大量索引空间</p><h3 id="索引的数据结构-重点" tabindex="-1"><a class="header-anchor" href="#索引的数据结构-重点" aria-hidden="true">#</a> 索引的数据结构（重点）</h3><p>MySQL中使用较多的索引有Hash索引，B+树索引等，而我们经常使用的InnoDB存储引擎的默认索引实现为：B+树索引。对于哈希索引来说，底层的数据结构就是哈希表，因此在绝大多数需求为<code>单条记录查询的时候，可以选择哈希索引</code>，查询性能最快；其余大部分场景，建议选择BTree索引。</p><h3 id="b树和b-树的区别-重点" tabindex="-1"><a class="header-anchor" href="#b树和b-树的区别-重点" aria-hidden="true">#</a> B树和B+树的区别（重点）</h3><p>B树 - 平衡多路查找树 ， 和平衡二叉查找树如红黑树相比较，子树更多也就是路数越多，子树越多表示树的高度越低，搜索效率越高。可以实现多路存储， 多用于做文件系统的索引 B树中，你可以将键和值存放在内部节点和叶子节点 B+树是在B树的基础上进行改造的，B+树中，内部节点都是键，没有值，叶子节点同时存放键和值，同时叶子节点之间还加了指针形成链表。</p><ul><li><p>使用B树的好处 B树可以在内部节点同时存储键和值,B树在特定数据重复多次查询的场景中更加高效</p></li><li><p>使用B+树的好处 由于B+树的内部节点只存放键，不存放值，因此，一次读取，可以在内存页中获取更多的键，有利于更快地缩小查找范围 B+树的叶节点由一条链相连，因此，当需要进行一次全数据遍历的时候，B+树只需要使用O(logN)时间找到最小的一个节点，然后通过链进行O(N)的顺序遍历即可。而B树则需要对树的每一层进行遍历</p></li><li><p>数据库为什么使用B+树而不是B树 B树只适合随机查找，而B+树同时支持随机查找和顺序范围查找 B+树空间利用率更高，可减少I/O次数，磁盘读写代价更低</p></li></ul><p>B+树的查询效率更加稳定,顺序检索比较明显 增删文件（节点）时，效率更高。因为B+树的叶子节点包含所有关键字，并以有序的链表结构存储，这样可很好提高增删效率。</p><h3 id="hash索引和b-树所有有什么区别或者说优劣呢" tabindex="-1"><a class="header-anchor" href="#hash索引和b-树所有有什么区别或者说优劣呢" aria-hidden="true">#</a> Hash索引和B+树所有有什么区别或者说优劣呢?</h3><p>hash索引底层就是hash表，进行查找时，调用一次hash函数就可以获取到相应的键值，之后进行回表查询获得实际数据。B+树底层实现是多路平衡查找树。对于每一次的查询都是从根节点出发，查找到叶子节点方可以获得所查键值，然后根据查询判断是否需要回表查询数据。</p><ul><li>hash索引进行等值查询更快(一般情况下)，但是却无法进行范围查询。 而B+树的的所有节点皆遵循(左节点小于父节点，右节点大于父节点，多叉树也类似)，天然支持范围。</li></ul><h3 id="mysql-索引实现" tabindex="-1"><a class="header-anchor" href="#mysql-索引实现" aria-hidden="true">#</a> mysql 索引实现</h3><h4 id="主键索引-聚簇索引" tabindex="-1"><a class="header-anchor" href="#主键索引-聚簇索引" aria-hidden="true">#</a> 主键索引（聚簇索引）</h4><p>将数据存储与索引放到了一块，找到索引也就找到了数据</p><p>叶子节点存储的数据是整行记录，当一个表没有创建主键索引时，InnoDB会自动创建一个ROWID字段来构建聚簇索引</p><p><img src="'+d+'" alt="image-20240618140121413"></p><h4 id="辅助索引-非聚簇索引" tabindex="-1"><a class="header-anchor" href="#辅助索引-非聚簇索引" aria-hidden="true">#</a> 辅助索引（非聚簇索引）</h4><p>辅助索引中的叶子节点存储的数据是该行的主键值</p><p>将数据存储于索引分开结构，索引结构的叶子节点指向了数据的对应行，</p><p>使用辅助索引需要检索两遍索引：首先检索辅助索引获得主键，然后使用主键到主索引中检索获得记录</p><p>根据在辅助索引树中获取的主键id，到主键索引树检索数据的过程称为<strong>回表</strong>查询。</p><p><img src="'+r+'" alt="image-20240618140509228"></p><h4 id="避免回表" tabindex="-1"><a class="header-anchor" href="#避免回表" aria-hidden="true">#</a> 避免回表</h4><p>使用辅助索引查询的时候，因为辅助索引叶子节点保存的数据不是当前记录的数据而是当前记录的主键索引，索引如果需要获取当前记录完整数据就必然需要根据主键值从主键索引继续查询。这个过程我们成位回表。想想回表必然是会消耗性能影响性能。那如何避免呢？</p><p>使用索引覆盖，举个例子：现有User表（id(PK),name(key),sex,address,hobby…）</p><p>如果在一个场景下，select id,name,sex from user where name =&#39;zhangsan&#39;;这个语句在业务上频繁使用到，而user表的其他字段使用频率远低于它，在这种情况下，如果我们在建立 name 字段的索引的时候，不是使用单一索引，而是使用联合索引（name，sex）这样的话再执行这个查询语句是根据辅助索引查询到的结果就可以获取当前语句的完整数据。这样就可以有效地避免了回表再获取sex的数据。</p><h4 id="覆盖索引" tabindex="-1"><a class="header-anchor" href="#覆盖索引" aria-hidden="true">#</a> 覆盖索引</h4><p>覆盖索引是一种很常用的优化手段。因为在使用辅助索引的时候，我们只可以拿到主键值，相当于获取数据还需要再根据主键查询主键索引再获取到数据。但是试想下这么一种情况，在上面abc_innodb表中的组合索引查询时，如果我只需要abc字段的，那是不是意味着我们查询到组合索引的叶子节点就可以直接返回了，而不需要回表。这种情况就是覆盖索引。</p><p><img src="'+n+'" alt="image-20240618142217767"></p><h3 id="b-树在满足聚簇索引和覆盖索引的时候不需要回表查询数据" tabindex="-1"><a class="header-anchor" href="#b-树在满足聚簇索引和覆盖索引的时候不需要回表查询数据" aria-hidden="true">#</a> B+树在满足聚簇索引和覆盖索引的时候不需要回表查询数据</h3><p>在B+树的索引中，叶子节点可能存储了当前的key值，也可能存储了当前的key值以及整行的数据，这就是聚簇索引和非聚簇索引。在InnoDB中，只有主键索引是聚簇索引，如果没有主键，则挑选一个唯一键建立聚簇索引。如果没有唯一键，则隐式的生成一个键来建立聚簇索引。</p><p>当查询使用聚簇索引时，在对应的叶子节点，可以获取到整行数据，因此不用再次进行回表查询。</p><h3 id="什么是聚簇索引-何时使用聚簇索引与非聚簇索引" tabindex="-1"><a class="header-anchor" href="#什么是聚簇索引-何时使用聚簇索引与非聚簇索引" aria-hidden="true">#</a> 什么是聚簇索引？何时使用聚簇索引与非聚簇索引</h3><p>聚簇索引：将数据存储与索引放到了一块，找到索引也就找到了数据 非聚簇索引：将数据存储于索引分开结构，索引结构的叶子节点指向了数据的对应行，myisam通过key_buffer把索引先缓存到内存中，当需要访问数据时（通过索引访问数据），在内存中直接搜索索引，然后通过索引找到磁盘相应数据，这也就是为什么索引不在key buffer命中时，速度慢的原因</p><h3 id="非聚簇索引一定会回表查询吗" tabindex="-1"><a class="header-anchor" href="#非聚簇索引一定会回表查询吗" aria-hidden="true">#</a> 非聚簇索引一定会回表查询吗？</h3><p>不一定，这涉及到查询语句所要求的字段是否全部命中了索引，如果全部命中了索引，那么就不必再进行回表查询。</p><p>举个简单的例子，假设我们在员工表的年龄上建立了索引，那么当进行select <code>age</code> from employee where age &lt; 20的查询时，在索引的叶子节点上，已经包含了age信息，不会再次进行回表查询。</p><h3 id="联合索引是什么-为什么需要注意联合索引中的顺序" tabindex="-1"><a class="header-anchor" href="#联合索引是什么-为什么需要注意联合索引中的顺序" aria-hidden="true">#</a> 联合索引是什么？为什么需要注意联合索引中的顺序？</h3><p>MySQL可以使用多个字段同时建立一个索引，叫做联合索引。在联合索引中，如果想要命中索引，需要按照建立索引时的字段顺序挨个使用，否则无法命中索引。</p><h2 id="事务" tabindex="-1"><a class="header-anchor" href="#事务" aria-hidden="true">#</a> 事务</h2><h3 id="acid" tabindex="-1"><a class="header-anchor" href="#acid" aria-hidden="true">#</a> ACID</h3><ul><li>原子性:要么全部完成，要么完全不起作用</li><li>一致性:比如失败回滚，事务在执行前后数据库都必须保持一致状态</li><li>隔离性:并发访问数据库时，一个用户的事务不被其他事务所干扰</li><li>持久性:改变是持久的，即使数据库发生故障</li></ul><h3 id="什么是脏读-幻读-不可重复读-隔离级别" tabindex="-1"><a class="header-anchor" href="#什么是脏读-幻读-不可重复读-隔离级别" aria-hidden="true">#</a> 什么是脏读？幻读？不可重复读？ ----- 隔离级别</h3><p>脏读: 读到别人未提交的数据，造成脏读 ----&gt; 读已提交 不可重复读： 读取已提交 更新的行。----&gt;解决：可重复读，mysql默认级别 幻读: 读到了别人已提交 新增的行。----&gt;串行化</p><p>事务隔离机制的实现基于锁机制和并发调度。其中并发调度使用的是MVVC（多版本并发控制） 隔离级别越低，事务请求的锁越少，所以大部分数据库系统的隔离级别都是READ-COMMITTED(读取提交内容):，但是你要知道的是InnoDB 存储引擎默认使用 **REPEATABLE-READ（可重读）**并不会有任何性能损失。</p><h1 id="详细" tabindex="-1"><a class="header-anchor" href="#详细" aria-hidden="true">#</a> 详细</h1><h2 id="mysql存储引擎myisam与innodb区别" tabindex="-1"><a class="header-anchor" href="#mysql存储引擎myisam与innodb区别" aria-hidden="true">#</a> MySQL存储引擎MyISAM与InnoDB区别</h2><ol><li>MyISAM：默认表类型，不提供事务的支持，也不支持行级锁和外键，如果执行大量的select，insert MyISAM比较适合。</li><li>InnoDB：支持事务安全的引擎，支持外键、行级锁、ACID事务是他的最大特点。如果有大量的update和insert，建议使用InnoDB，特别是针对多个并发和QPS较高的情况。 如果没有特别的需求，使用默认的Innodb即可。 MyISAM：以读写插入为主的应用程序，比如博客系统、新闻门户网站。 Innodb：更新（删除）操作频率也高，或者要保证数据的完整性；并发量高，支持事务和外键。比如OA自动化办公系统。</li></ol><h2 id="索引-1" tabindex="-1"><a class="header-anchor" href="#索引-1" aria-hidden="true">#</a> 索引</h2><p>索引的实现通常使用B树及其变种B+树。通俗的说，索引就相当于目录。 索引加载检索所读，但是索引需要占物理空间，增加、删除和修改的时候，索引也要动态的维护，会降低增/改/删的执行效率</p><h3 id="索引使用场景-重点" tabindex="-1"><a class="header-anchor" href="#索引使用场景-重点" aria-hidden="true">#</a> 索引使用场景（重点）</h3><ul><li><p>where <img src="'+s+`" alt=""></p></li><li><p>order by 使用order by将查询结果按照某个字段排序时，如果该字段没有建立索引，那么执行计划会将查询出的所有数据使用外部排序（将数据从硬盘分批读取到内存使用内部排序，最后合并排序结果），这个操作是很影响性能的，因为需要将查询涉及到的所有数据从磁盘中读到内存（如果单条数据过大或者数据量过多都会降低效率），更无论读到内存之后的排序了。 有索引由于索引本身是有序的，因此直接按照索引的顺序和映射关系逐条取出数据即可</p></li><li><p>join 对join语句匹配关系（on）涉及的字段建立索引能够提高效率</p></li></ul><h3 id="索引类型-1" tabindex="-1"><a class="header-anchor" href="#索引类型-1" aria-hidden="true">#</a> 索引类型</h3><p>主键，唯一(UNIQUE),普通，全文</p><h4 id="主键和唯一的区别" tabindex="-1"><a class="header-anchor" href="#主键和唯一的区别" aria-hidden="true">#</a> 主键和唯一的区别</h4><p>主键在物理存储上是聚簇索引 ，主键只能有一个，不能为null</p><h3 id="索引的数据结构-重点-1" tabindex="-1"><a class="header-anchor" href="#索引的数据结构-重点-1" aria-hidden="true">#</a> 索引的数据结构（重点）</h3><p>MySQL中使用较多的索引有Hash索引，B+树索引等，而我们经常使用的InnoDB存储引擎的默认索引实现为：B+树索引。对于哈希索引来说，底层的数据结构就是哈希表，因此在绝大多数需求为<code>单条记录查询的时候，可以选择哈希索引</code>，查询性能最快；其余大部分场景，建议选择BTree索引。</p><ul><li>B树索引查询方式: 主键索引区:PI(关联保存的时数据的地址)按主键查询, 普通索引区:si(关联的id的地址,然后再到达上面的地址)。<code>所以按主键查询,速度最快</code></li></ul><h3 id="索引算法" tabindex="-1"><a class="header-anchor" href="#索引算法" aria-hidden="true">#</a> 索引算法</h3><ul><li>BTree算法</li></ul><p>BTree是最常用的mysql数据库索引算法，也是mysql默认的算法。因为它不仅可以被用在=,&gt;,&gt;=,&lt;,&lt;=和between这些比较操作符上，而且还可以用于like操作符，只要它的查询条件是一个不以通配符开头的常量， 例如：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>-- 只要它的查询条件是一个不以通配符开头的常量
select * from user where name like &#39;jack%&#39;;
-- 如果一通配符开头，或者没有使用常量，则不会使用索引，例如：
select * from user where name like &#39;%jack&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>Hash算法 Hash Hash索引只能用于对等比较，例如=,&lt;=&gt;（相当于=）操作符。由于是一次定位数据，不像BTree索引需要从根节点到枝节点，最后才能访问到页节点这样多次IO访问，所以检索效率远高于BTree索引。</li></ul><h3 id="索引的基本原理" tabindex="-1"><a class="header-anchor" href="#索引的基本原理" aria-hidden="true">#</a> 索引的基本原理</h3><p>索引用来快速地寻找那些具有特定值的记录。如果没有索引，一般来说执行查询时遍历整张表。</p><p>索引的原理很简单，就是把无序的数据变成有序的查询</p><ol><li>把创建了索引的列的内容进行排序</li><li>对排序结果生成倒排表</li><li>在倒排表内容上拼上数据地址链</li><li>在查询的时候，先拿到倒排表内容，再取出数据地址链，从而拿到具体数据</li></ol><h3 id="创建索引时需要注意什么" tabindex="-1"><a class="header-anchor" href="#创建索引时需要注意什么" aria-hidden="true">#</a> 创建索引时需要注意什么？</h3><ol><li>非空字段：应该指定列为NOT NULL，除非你想存储NULL。在mysql中，含有空值的列很难进行查询优化，因为它们使得索引、索引的统计信息以及比较运算更加复杂。你应该用0、一个特殊的值或者一个空串代替空值；</li><li>取值离散大的字段：（变量各个取值之间的差异程度）的列放到联合索引的前面，可以通过count()函数查看字段的差异值，返回值越大说明字段的唯一值越多字段的离散程度高；</li><li>索引字段越小越好：数据库的数据存储以页为单位一页存储的数据越多一次IO操作获取的数据越大效率越高。</li></ol><h3 id="前缀索引" tabindex="-1"><a class="header-anchor" href="#前缀索引" aria-hidden="true">#</a> 前缀索引</h3><p>语法：index(field(10))，使用字段值的前10个字符建立索引，默认是使用字段的全部内容建立索引。 前提：前缀的标识度高。比如密码就适合建立前缀索引，因为密码几乎各不相同。 实操的难度：在于前缀截取的长度。 我们可以利用select count(*)/count(distinct left(password,prefixLen));，通过从调整prefixLen的值（从1自增）查看不同前缀长度的一个平均匹配度，接近1时就可以了（表示一个密码的前prefixLen个字符几乎能确定唯一一条记录）</p><h3 id="什么是最左前缀原则-什么是最左匹配原则" tabindex="-1"><a class="header-anchor" href="#什么是最左前缀原则-什么是最左匹配原则" aria-hidden="true">#</a> 什么是最左前缀原则？什么是最左匹配原则</h3><p>顾名思义，就是最左优先，在创建多列索引时，要根据业务需求，where子句中使用最频繁的一列放在最左边。 最左前缀匹配原则，非常重要的原则，mysql会一直向右匹配直到遇到范围查询(&gt;、&lt;、between、like)就停止匹配，比如a = 1 and b = 2 and c &gt; 3 and d = 4 如果建立(a,b,c,d)顺序的索引，d是用不到索引的，如果建立(a,b,d,c)的索引则都可以用到，a,b,d的顺序可以任意调整。 =和in可以乱序，比如a = 1 and b = 2 and c = 3 建立(a,b,c)索引可以任意顺序，mysql的查询优化器会帮你优化成索引可以识别的形式</p><h3 id="b树和b-树的区别-重点-1" tabindex="-1"><a class="header-anchor" href="#b树和b-树的区别-重点-1" aria-hidden="true">#</a> B树和B+树的区别（重点）</h3><ul><li>mysqlB树索引是B+树实现的 在B树中，你可以将键和值存放在内部节点和叶子节点；但在B+树中，内部节点都是键，没有值，叶子节点同时存放键和值。 B+树的叶子节点有一条链相连，而B树的叶子节点各自独立</li><li>使用B树的好处 B树可以在内部节点同时存储键和值,B树在特定数据重复多次查询的场景中更加高效</li><li>使用B+树的好处 由于B+树的内部节点只存放键，不存放值，因此，一次读取，可以在内存页中获取更多的键，有利于更快地缩小查找范围 B+树的叶节点由一条链相连，因此，当需要进行一次全数据遍历的时候，B+树只需要使用O(logN)时间找到最小的一个节点，然后通过链进行O(N)的顺序遍历即可。而B树则需要对树的每一层进行遍历</li><li>数据库为什么使用B+树而不是B树 B树只适合随机检索，而B+树同时支持随机检索和顺序检索 B+树空间利用率更高，可减少I/O次数，磁盘读写代价更低 B+树的查询效率更加稳定,顺序检索比较明显 增删文件（节点）时，效率更高。因为B+树的叶子节点包含所有关键字，并以有序的链表结构存储，这样可很好提高增删效率。</li></ul><h3 id="hash索引和b-树所有有什么区别或者说优劣呢-1" tabindex="-1"><a class="header-anchor" href="#hash索引和b-树所有有什么区别或者说优劣呢-1" aria-hidden="true">#</a> Hash索引和B+树所有有什么区别或者说优劣呢?</h3><p>hash索引底层就是hash表，进行查找时，调用一次hash函数就可以获取到相应的键值，之后进行回表查询获得实际数据。B+树底层实现是多路平衡查找树。对于每一次的查询都是从根节点出发，查找到叶子节点方可以获得所查键值，然后根据查询判断是否需要回表查询数据。</p><ul><li>hash索引进行等值查询更快(一般情况下)，但是却无法进行范围查询。 而B+树的的所有节点皆遵循(左节点小于父节点，右节点大于父节点，多叉树也类似)，天然支持范围。</li></ul><h3 id="b-树在满足聚簇索引和覆盖索引的时候不需要回表查询数据-1" tabindex="-1"><a class="header-anchor" href="#b-树在满足聚簇索引和覆盖索引的时候不需要回表查询数据-1" aria-hidden="true">#</a> B+树在满足聚簇索引和覆盖索引的时候不需要回表查询数据</h3><p>在B+树的索引中，叶子节点可能存储了当前的key值，也可能存储了当前的key值以及整行的数据，这就是聚簇索引和非聚簇索引。在InnoDB中，只有主键索引是聚簇索引，如果没有主键，则挑选一个唯一键建立聚簇索引。如果没有唯一键，则隐式的生成一个键来建立聚簇索引。</p><p>当查询使用聚簇索引时，在对应的叶子节点，可以获取到整行数据，因此不用再次进行回表查询。</p><h3 id="什么是聚簇索引-何时使用聚簇索引与非聚簇索引-1" tabindex="-1"><a class="header-anchor" href="#什么是聚簇索引-何时使用聚簇索引与非聚簇索引-1" aria-hidden="true">#</a> 什么是聚簇索引？何时使用聚簇索引与非聚簇索引</h3><p>聚簇索引：将数据存储与索引放到了一块，找到索引也就找到了数据 非聚簇索引：将数据存储于索引分开结构，索引结构的叶子节点指向了数据的对应行，myisam通过key_buffer把索引先缓存到内存中，当需要访问数据时（通过索引访问数据），在内存中直接搜索索引，然后通过索引找到磁盘相应数据，这也就是为什么索引不在key buffer命中时，速度慢的原因</p><h3 id="非聚簇索引一定会回表查询吗-1" tabindex="-1"><a class="header-anchor" href="#非聚簇索引一定会回表查询吗-1" aria-hidden="true">#</a> 非聚簇索引一定会回表查询吗？</h3><p>不一定，这涉及到查询语句所要求的字段是否全部命中了索引，如果全部命中了索引，那么就不必再进行回表查询。</p><p>举个简单的例子，假设我们在员工表的年龄上建立了索引，那么当进行select <code>age</code> from employee where age &lt; 20的查询时，在索引的叶子节点上，已经包含了age信息，不会再次进行回表查询。</p><h3 id="联合索引是什么-为什么需要注意联合索引中的顺序-1" tabindex="-1"><a class="header-anchor" href="#联合索引是什么-为什么需要注意联合索引中的顺序-1" aria-hidden="true">#</a> 联合索引是什么？为什么需要注意联合索引中的顺序？</h3><p>MySQL可以使用多个字段同时建立一个索引，叫做联合索引。在联合索引中，如果想要命中索引，需要按照建立索引时的字段顺序挨个使用，否则无法命中索引。</p><h2 id="事务-1" tabindex="-1"><a class="header-anchor" href="#事务-1" aria-hidden="true">#</a> 事务</h2><h3 id="acid-1" tabindex="-1"><a class="header-anchor" href="#acid-1" aria-hidden="true">#</a> ACID</h3><ul><li>原子性:要么全部完成，要么完全不起作用</li><li>一致性:比如失败回滚，事务在执行前后数据库都必须保持一致状态</li><li>隔离性:并发访问数据库时，一个用户的事务不被其他事务所干扰</li><li>持久性:改变是持久的，即使数据库发生故障</li></ul><h3 id="什么是脏读-幻读-不可重复读" tabindex="-1"><a class="header-anchor" href="#什么是脏读-幻读-不可重复读" aria-hidden="true">#</a> 什么是脏读？幻读？不可重复读？</h3><p>脏读: 读到别人未提交的数据，造成脏读<br> 不可重复读： 读取已提交 更新的行。----&gt;解决：可重复读，mysql默认级别 幻读: 读到了别人已提交 新增的行</p><h3 id="隔离级别" tabindex="-1"><a class="header-anchor" href="#隔离级别" aria-hidden="true">#</a> 隔离级别</h3><p>读取未提交；读取已提交；可重复读；可串行化</p><p>事务隔离机制的实现基于锁机制和并发调度。其中并发调度使用的是MVVC（多版本并发控制） 隔离级别越低，事务请求的锁越少，所以大部分数据库系统的隔离级别都是READ-COMMITTED(读取提交内容):，但是你要知道的是InnoDB 存储引擎默认使用 **REPEATABLE-READ（可重读）**并不会有任何性能损失。</p><h2 id="锁" tabindex="-1"><a class="header-anchor" href="#锁" aria-hidden="true">#</a> 锁</h2><p>并发事务,会产生数据的不一致，这时候需要一些机制来保证访问的次序 就像酒店的房间，如果大家随意进出，就会出现多人抢夺同一个房间的情况，而在房间上装上锁，申请到钥匙的人才可以入住并且将房间锁起来，其他人只有等他使用完毕才可以再次使用。</p><h3 id="隔离级别与锁的关系" tabindex="-1"><a class="header-anchor" href="#隔离级别与锁的关系" aria-hidden="true">#</a> 隔离级别与锁的关系</h3><p>Read Committed级别下，读操作需要加共享锁，但是在语句执行完以后释放共享锁；</p><p>在Repeatable Read级别下，读操作需要加共享锁，但是在事务提交之前并不释放共享锁，也就是必须等待事务执行完毕以后才释放共享锁。</p><p>SERIALIZABLE 是限制性最强的隔离级别，因为该级别锁定整个范围的键，并一直持有锁，直到事务完成。</p><h3 id="按照锁的粒度分数据库锁有哪些-锁机制与innodb锁算法" tabindex="-1"><a class="header-anchor" href="#按照锁的粒度分数据库锁有哪些-锁机制与innodb锁算法" aria-hidden="true">#</a> 按照锁的粒度分数据库锁有哪些？锁机制与InnoDB锁算法</h3><p>锁的粒度把数据库锁分为行级锁(INNODB引擎)、表级锁(MYISAM引擎)和页级锁(BDB引擎 )。</p><p>行级锁 行级锁是Mysql中锁定粒度最细的一种锁，表示只针对当前操作的行进行加锁。行级锁能大大减少数据库操作的冲突。其加锁粒度最小，但加锁的开销也最大。 行级锁分为共享锁 和 排他锁。</p><p>从锁的类别上来讲，有共享锁和排他锁: 共享锁: 又叫做读锁。当用户要进行数据的读取时，对数据加上共享锁。共享锁可以同时加上多个。 排他锁: 又叫做写锁。当用户要进行数据的写入时，对数据加上排他锁。排他锁只可以加一个，他和其他的排他锁，共享锁都相斥。 用上面的例子来说就是用户的行为有两种，一种是来看房，多个用户一起看房是可以接受的。一种是真正的入住一晚，在这期间，无论是想入住的还是想看房的都不可以。</p><h3 id="mysql中innodb引擎的行锁是怎么实现的" tabindex="-1"><a class="header-anchor" href="#mysql中innodb引擎的行锁是怎么实现的" aria-hidden="true">#</a> MySQL中InnoDB引擎的行锁是怎么实现的？</h3><p>InnoDB是基于索引来完成行锁 例: select * from tab_with_index where id = 1 for update;</p><p>for update 可以根据条件来完成行锁锁定，并且 id 是有索引键的列，如果 id 不是索引键那么InnoDB将完成表锁，并发将无从谈起</p><h3 id="什么是死锁-怎么解决" tabindex="-1"><a class="header-anchor" href="#什么是死锁-怎么解决" aria-hidden="true">#</a> 什么是死锁？怎么解决？</h3><p>交叉锁等待：两个或多个事务按不同的顺序获取锁，并交叉等待对方释放锁。这种情况下，如果每个事务都在等待对方释放的锁，就可能导致死锁。 争夺资源： 因争夺资源而造成的一种互相等待的现象,永远在互相等待的进程称为死锁进程 死锁的关键在于：两个(或以上)的Session加锁的顺序不一致。 那么对应的解决死锁问题的关键就是：让不同的session加锁有次序</p><p>解决死锁的方法：</p><ol><li>一个事务如果需要对几行进行加锁查询，那么就要一次都锁住，不要分几次锁，那样顺序可能会被打乱 如果业务处理不好可以用分布式事务锁或者使用乐观锁</li></ol><h3 id="数据库的乐观锁和悲观锁是什么-怎么实现的" tabindex="-1"><a class="header-anchor" href="#数据库的乐观锁和悲观锁是什么-怎么实现的" aria-hidden="true">#</a> 数据库的乐观锁和悲观锁是什么？怎么实现的？</h3><p>悲观锁：假定会发生并发冲突，屏蔽一切可能违反数据完整性的操作。在查询完数据的时候就把事务锁起来，直到提交事务。实现方式：使用数据库中的锁机制 乐观锁：假设不会发生并发冲突，只在提交操作时检查是否违反数据完整性。在修改数据的时候把事务锁起来，通过version的方式来进行锁定。实现方式：乐一般会使用版本号机制或CAS算法实现。</p><p>乐观锁适用于写比较少的情况下（多读场景），即冲突真的很少发生的时候，这样可以省去了锁的开销，加大了系统的整个吞吐量。 多写的场景下用悲观锁就比较合适。</p><h3 id="视图" tabindex="-1"><a class="header-anchor" href="#视图" aria-hidden="true">#</a> 视图</h3><p>简化sql查询，提高开发效率，保护数据。如果说还有另外一个用途那就是兼容老的表结构。</p><h3 id="存储过程与函数" tabindex="-1"><a class="header-anchor" href="#存储过程与函数" aria-hidden="true">#</a> 存储过程与函数</h3><p>存储过程是一个预编译的SQL语句</p><h3 id="触发器" tabindex="-1"><a class="header-anchor" href="#触发器" aria-hidden="true">#</a> 触发器</h3><p>触发器是指一段代码，当触发某个事件时，自动执行这些代码。</p><p>使用场景</p><p>可以通过数据库中的相关表实现级联更改。 实时监控某张表中的某个字段的更改而需要做出相应的处理。 例如可以生成某些业务的编号。 注意不要滥用，否则会造成数据库及应用程序的维护困难。 大家需要牢记以上基础知识点，重点是理解数据类型CHAR和VARCHAR的差异，表存储引擎InnoDB和MyISAM的区别。 Before Insert After Insert Before Update After Update Before Delete After Delete</p><h3 id="sql-约束" tabindex="-1"><a class="header-anchor" href="#sql-约束" aria-hidden="true">#</a> SQL 约束</h3><p>NOT NULL: 用于控制字段的内容一定不能为空（NULL）。 UNIQUE: 控件字段内容不能重复，一个表允许有多个 Unique 约束。 PRIMARY KEY: 也是用于控件字段内容不能重复，但它在一个表只允许出现一个。 FOREIGN KEY: 用于预防破坏表之间连接的动作，也能防止非法数据插入外键列，因为它必须是它指向的那个表中的值之一。 CHECK: 用于控制字段的值范围。</p><h3 id="语句" tabindex="-1"><a class="header-anchor" href="#语句" aria-hidden="true">#</a> 语句</h3><ul><li>子查询: 条件：一条SQL语句的查询结果做为另一条查询语句的条件或查询结果 嵌套：多条SQL语句嵌套使用，内部的SQL查询语句称为子查询。</li><li>mysql中 in 和 exists 区别 mysql中的in语句是把外表和内表作hash 连接，而exists语句是对外表作loop循环，每次loop循环再对内表进行查询。一直大家都认为exists比in语句的效率要高，这种说法其实是不准确的。这个是要区分环境的。</li></ul><p>如果查询的两个表大小相当，那么用in和exists差别不大。 如果两个表中一个较小，一个是大表，则<code>子查询表大的用exists</code>，<code>子查询表小的用in</code>。 not in 和not exists：如果查询语句使用了not in，那么内外表都进行全表扫描，没有用到索引；而not extsts的子查询依然能用到表上的索引。<code>所以无论那个表大，用not exists都比not in要快</code>。</p><ul><li>UNION与UNION ALL的区别？ 如果使用UNION ALL，不会合并重复的记录行 效率 UNION 高于 UNION ALL</li></ul><h3 id="sql优化-重点" tabindex="-1"><a class="header-anchor" href="#sql优化-重点" aria-hidden="true">#</a> SQL优化（重点）</h3><ul><li>explain命令来查看语句的执行计划</li></ul><p>【推荐】SQL性能优化的目标：至少要达到 range 级别（索引范围内查找），要求是ref级别，如果可以是consts最好。 说明： 1） consts 单表中最多只有一个匹配行（主键或者唯一索引），在优化阶段即可读取到数据。 2） ref 指的是使用普通的索引（normal index）。 3） range 对索引进行范围检索。 反例：explain表的结果，type=index，索引物理文件全扫描，速度非常慢，这个index级别比较range还低，与全表扫描是小巫见大巫。</p><ul><li>大表数据查询，怎么优化</li></ul><ol><li>优化shema、sql语句+索引；</li><li>第二加缓存，memcached, redis；</li><li>主从复制，读写分离；</li><li>垂直拆分，根据你模块的耦合度，将一个大的系统分为多个小的系统，也就是分布式系统；</li><li>水平切分，针对数据量大的表，这一步最麻烦，最能考验技术水平，要选择一个合理的sharding key, 为了有好的查询效率，表结构也要改动，做一定的冗余，应用也要改，sql中尽量带sharding key，将数据定位到限定的表上去查，而不是扫描全部的表；</li></ol><ul><li>超大分页怎么处理？ 数据库层面,这也是我们主要集中关注的(虽然收效没那么大),类似于select * from table where age &gt; 20 limit 1000000,10这种查询其实也是有可以优化的余地的. 这条语句需要load1000000数据然后基本上全部丢弃,只取10条当然比较慢. 当时我们可以修改为select * from table where id in (select id from table where age &gt; 20 limit 1000000,10).这样虽然也load了一百万的数据,但是由于索引覆盖,要查询的所有字段都在索引中,所以速度会很快. 同时如果ID连续的好,我们还可以select * from table where id &gt; 1000000 limit 10,效率也是不错的,优化的可能性有许多种,但是核心思想都一样,就是 减少load的数据.</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>【推荐】利用延迟关联或者子查询优化超多分页场景。

说明：MySQL并不是跳过offset行，而是取offset+N行，然后返回放弃前offset行，返回N行，那当offset特别大的时候，效率就非常的低下，要么控制返回的总页数，要么对超过特定阈值的页数进行SQL改写。

正例：先快速定位需要获取的id段，然后再关联：

SELECT a.* FROM 表1 a, (select id from 表1 where 条件 LIMIT 100000,20 ) b where a.id=b.id
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>慢查询日志 用于记录执行时间超过某个临界值的SQL日志，用于快速定位慢查询，为我们的优化做参考。 开启慢查询日志</li></ul><p>配置项：slow_query_log</p><p>可以使用show variables like ‘slov_query_log’查看是否开启，如果状态值为OFF，可以使用set GLOBAL slow_query_log = on来开启，它会在datadir下产生一个xxx-slow.log的文件。</p><p>设置临界时间</p><p>配置项：long_query_time</p><p>查看：show VARIABLES like &#39;long_query_time&#39;，单位秒</p><p>设置：set long_query_time=0.5</p><p>实操时应该从长时间设置到短的时间，即将最慢的SQL优化掉</p><p>查看日志，一旦SQL超过了我们设置的临界时间就会被记录到xxx-slow.log中</p><ul><li>为什么要尽量设定一个主键？ 主键是聚簇索引，如果没有主键，InnoDB会选择一个唯一键来作为聚簇索引，如果没有唯一键，会生成一个隐式的主键 自增主键性能会好一些</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>主键索引的B+树叶子节点上存储了主键索引以及全部的数据(按照顺序)，如果主键索引是自增ID，那么只需要不断向后排列即可，如果是UUID，由于到来的ID与原来的大小不确定，会造成非常多的数据插入，数据移动，然后导致产生很多的内存碎片，进而造成插入性能的下降
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><p>字段为什么要求定义为not null？ null值会占用更多的字节，且会在程序中造成很多与预期不符的情况。</p></li><li><p>优化特定类型的查询语句 count(*)会忽略所有的列，直接统计所有列数，不要使用count(列名) 增加汇总表 使用缓存</p></li><li><p>优化关联查询 确定ON或者USING子句中是否有索引。 确保GROUP BY和ORDER BY只有一个表中的列，这样MySQL才有可能使用索引。</p></li><li><p>优化子查询 用关联查询替代<br> 如果不需要ORDER BY，进行GROUP BY时加ORDER BY NULL，MySQL不会再进行文件排序。 WITH ROLLUP超级聚合，可以挪到应用程序处理</p></li><li><p>优化UNION查询 UNION ALL的效率高于UNION</p></li><li><p>优化WHERE子句</p></li></ul><ol><li>对查询进行优化，应尽量避免全表扫描，首先应考虑在 where 及 order by 涉及的列上建立索引。</li><li>应尽量避免在 where 子句中对字段进行 null 值判断，否则将导致引擎放弃使用索引而进行全表扫描，如：</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>select id from t where num is null
-- 可以在num上设置默认值0，确保表中num列没有null值，然后这样查询：
select id from t where num=
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>应尽量避免在 where 子句中使用!=或&lt;&gt;操作符，否则引擎将放弃使用索引而进行全表扫描。(注意大于小于符号不影响)</li><li>应尽量避免在 where 子句中使用or 来连接条件，否则可能导致引擎放弃使用索引而进行全表扫描，如： -- 使用OR条件连接 SELECT * FROM employees WHERE department_id = 1 OR salary &gt; 50000;</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>在这个查询中，OR条件连接了两个不同的条件，一个是department_id = 1，另一个是salary &gt; 50000。这种情况下，如果 department_id 和 salary 字段上都有索引，MySQL可能会难以同时利用这两个索引来执行查询，导致放弃索引而进行全表扫描。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>为了优化这样的查询，可以考虑使用UNION或者重写查询条件，将OR条件拆分成多个独立的查询，使得每个查询条件都更容易地利用索引。例如</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> -- 使用UNION拆分查询条件
SELECT * FROM employees WHERE department_id = 1
UNION
SELECT * FROM employees WHERE salary &gt; 50000;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="5"><li>in 或 or</li></ol><ul><li>1结论：对于索引字段or或者in的效率基本一致，非索引字段in的效率优于or</li><li>（1）or的效率为O(n)，</li><li>（2）in的效率为O(logn)，当n越大的时候效率相差越明显。</li></ul><ol start="6"><li><p>下面的查询也将导致全表扫描：select id from t where name like ‘%李%’若要提高效率，可以考虑全文检索。 或者select id from t where name like ‘李%’ 能够用到索引</p></li><li><p>应尽量避免在 where 子句中对字段进行表达式操作，这将导致引擎放弃使用索引而进行全表扫描。如： select id from t where num/2=100 -- 应改为: select id from t where num=100*2</p></li><li><p>大表怎么优化？某个表有近千万数据，CRUD比较慢，如何优化？分库分表了是怎么做的？分表分库了有什么问题？有用到中间件么？他们的原理知道么？ 当MySQL单表记录数过大时，数据库的CRUD性能会明显下降，一些常见的优化措施如下：</p></li></ol><p>限定数据的范围：务必禁止不带任何限制数据范围条件的查询语句。比如：我们当用户在查询订单历史的时候，我们可以控制在一个月的范围内。； 读/写分离：经典的数据库拆分方案，主库负责写，从库负责读； 缓存：使用MySQL的缓存，另外对重量级、更新少的数据可以考虑使用应用级别的缓存； 还有就是通过分库分表的方式进行优化，主要有垂直分表和水平分表</p><ul><li>垂直拆分是指数据表列的拆分，把一张列比较多的表拆分为多张表</li><li>水平分表： 数据库分片的两种常见方案: 客户端代理：分片逻辑在应用端，封装在jar包中，通过修改或者封装JDBC层来实现。当当网的 Sharding-JDBC 、阿里的TDDL是两种比较常用的实现。 中间件代理：在应用和数据中间加了一个代理层。分片逻辑统一维护在中间件服务中。我们现在谈的 Mycat 、360的Atlas、网易的DDB等等都是这种架构的实现。 分库分表后面临的问题：事务需要分布式事务，跨库join，跨节点的count,order by,group by以及聚合函数问题 这些是一类问题</li></ul><h3 id="mysql的复制原理以及流程" tabindex="-1"><a class="header-anchor" href="#mysql的复制原理以及流程" aria-hidden="true">#</a> MySQL的复制原理以及流程</h3><p>将主数据库中的DDL和DML操作通过二进制日志（BINLOG）传输到从数据库上，然后将这些日志重新执行（重做）；从而使得从数据库的数据与主数据库保持一致。</p><p>主从复制的作用</p><p>主数据库出现问题，可以切换到从数据库。 可以进行数据库层面的读写分离。 可以在从数据库上进行日常备份。</p><p>基本原理流程，3个线程以及之间的关联 主：binlog线程——记录下所有改变了数据库数据的语句，放进master上的binlog中； 从：io线程——在使用start slave 之后，负责从master上拉取 binlog 内容，放进自己的relay log中； 从：sql执行线程——执行relay log中的语句；</p><h3 id="读写分离有哪些解决方案" tabindex="-1"><a class="header-anchor" href="#读写分离有哪些解决方案" aria-hidden="true">#</a> 读写分离有哪些解决方案？</h3><p>读写分离是依赖于主从复制，而主从复制又是为读写分离服务的。因为主从复制要求slave不能写只能读（如果对slave执行写操作，那么show slave status将会呈现Slave_SQL_Running=NO，此时你需要按照前面提到的手动同步一下slave）。</p><p>方案一:使用mysql-proxy代理,不用修改代码，缺点：降低性能， 不支持事务 方案二：使用AbstractRoutingDataSource+aop+annotation在dao层决定数据源。也就是不支持事务， 所以我们还需要重写一DataSourceTransactionManager， 将read-only的事务扔进读库， 其余的有读有写的扔进写库。 方案三：使用AbstractRoutingDataSource+aop+annotation在service层决定数据源，可以支持事务.缺点：类内部方法通过this.xx()方式相互调用时，aop不会进行拦截，需进行特殊处理。</p><h3 id="备份计划-mysqldump以及xtranbackup的实现原理" tabindex="-1"><a class="header-anchor" href="#备份计划-mysqldump以及xtranbackup的实现原理" aria-hidden="true">#</a> 备份计划，mysqldump以及xtranbackup的实现原理</h3><p>视库的大小来定，一般来说 100G 内的库，可以考虑使用 mysqldump 来做，因为 mysqldump更加轻巧灵活，备份时间选在业务低峰期，可以每天进行都进行全量备份(mysqldump 备份出来的文件比较小，压缩之后更小)。</p><p>100G 以上的库，可以考虑用 xtranbackup 来做，备份速度明显要比 mysqldump 要快。一般是选择一周一个全备，其余每天进行增量备份，备份时间为业务低峰期。</p><p>备份恢复时间： 物理备份恢复快，逻辑备份恢复慢</p><p>这里跟机器，尤其是硬盘的速率有关系，以下列举几个仅供参考</p><p>20G的2分钟（mysqldump）</p><p>80G的30分钟(mysqldump)</p><p>111G的30分钟（mysqldump)</p><p>288G的3小时（xtra)</p><p>3T的4小时（xtra)</p><p>逻辑导入时间一般是备份时间的5倍以上</p><p>(3)备份恢复失败如何处理： 首先在恢复之前就应该做足准备工作，避免恢复的时候出错。比如说备份之后的有效性检查、权限检查、空间检查等。如果万一报错，再根据报错的提示来进行相应的调整。 (4)mysqldump和xtrabackup实现原理 mysqldump 属于逻辑备份。 xtrabackup 属于物理备份，直接拷贝表空间文件</p><h3 id="数据表损坏的修复方式有哪些" tabindex="-1"><a class="header-anchor" href="#数据表损坏的修复方式有哪些" aria-hidden="true">#</a> 数据表损坏的修复方式有哪些？</h3><p>使用 myisamchk 来修复，具体步骤：</p><p>1）修复前将mysql服务停止。 2）打开命令行方式，然后进入到mysql的/bin目录。 3）执行myisamchk –recover 数据库所在路径/*.MYI 使用repair table 或者 OPTIMIZE table命令来修复，REPAIR TABLE table_name 修复表 OPTIMIZE TABLE table_name 优化表 REPAIR TABLE 用于修复被破坏的表。OPTIMIZE TABLE 用于回收闲置的数据库空间，当表上的数据行被删除时，所占据的磁盘空间并没有立即被回收，使用了OPTIMIZE TABLE命令后这些空间将被回收，并且对磁盘上的数据行进行重排（注意：是磁盘上，而非数据库</p>`,206),c=[t];function o(p,u){return a(),i("div",null,c)}const b=e(h,[["render",o],["__file","mysqlmianshi.html.vue"]]);export{b as default};
