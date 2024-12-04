## 安装
https://zhuanlan.zhihu.com/p/667206246
##  常用命令
- 查看pg状态:systemctl status postgresql
- 查看配置文件位置: find / -name postgresql.conf
- 重启pg: systemctl restart postgresql
- 登录: psql -U postgres   (linux中:su - postgres   | psql)
- 显示所有数据库: `\l`
- 切换setCurrentDatabase: `\c 数据库名`
- 显示当前数据库: `\d`
- 查看当前表详情：  \d 表
- 显示当前数据库中的所有表: `\dt` 
- 退出数据库: `\q`
- 修改密码: ALTER USER username WITH PASSWORD 'newpassword';
- 删除某表的索引: DROP INDEX index_name ON table_name;
 
## 索引
### 模糊查询分词和倒排索引




## 插件
### pg_preswam
1. 安装pg_prewarm扩展: `CREATE EXTENSION pg_prewarm;`
2. 预热缓存: `SELECT pg_prewarm('table_name');`  或者  `select pg_prewarm(#tablename, read, main);`
- pg_prewarm函数主要参数:
  regclass: 要预热的表名
  mode: prewarm模式。prefetch表示异步预取到os cache；read表示同步预取；buffer表示同步读入PG的shared buffer
  fork：relation fork的类型。一般用main，其他类型有visibilitymap和fsm
### pg_trgm
https://billtian.github.io/digoal.blog/2016/05/06/02.html

- 创建扩展插件pg_trgm: `CREATE EXTENSION pg_trgm;`  或者`CREATE EXTENSION IF NOT EXISTS pg_trgm;` 
- 创建gin索引和pg_trgm扩展: `CREATE INDEX idx_name_gin ON table_name USING GIN (name gin_trgm_ops);`

### pg_bigm
- 安装插件: https://blog.csdn.net/weixin_45692576/article/details/129667199
- 创建插件: CREATE EXTENSION pg_bigm;
- 加载插件到内存: LOAD 'pg_bigm';
- 创建索引:
```
CREATE INDEX pg_tools_idx ON pg_tools USING gin (description gin_bigm_ops);
CREATE INDEX cn_word_index ON public.aba_data USING gin (cn_word gin_bigm_ops);
CREATE INDEX pg_tools_multi_idx ON pg_tools USING gin (tool gin_bigm_ops, description gin_bigm_ops) WITH (FASTUPDATE = off);
```

## 性能分析
explain (analyze,buffers,verbose,costs,timing) sql语句
- analyze: 显示实际执行的查询计划，包括每个节点的开销，索引选择，查询计划的估计总时间等。
- buffers: 显示缓冲区使用情况，包括shared buffer，local buffer，temp buffer等。
- verbose: 显示详细信息，包括每个节点的输出信息，每个节点的实际执行时间，每个节点的cpu使用率等。
- costs: 显示代价估算信息，包括每个节点的估算代价，索引选择的代价等。
- format: 输出格式，包括text，xml，json等。
- timing: 显示查询执行的总时间。
- settings: 显示查询执行的设置。
- buffers: 显示缓冲区使用情况。
 
```
explain (analyze,verbose,timing,costs,buffers) select * from test where info ~ '北京天安门';
 
   Recheck Cond: (test.info ~ '北京天安门'::text)  -- 说明索引已过滤了  
   Recheck Cond: (test.info ~ '你好'::text)  -- 命中索引 
   Rows Removed by Index Recheck: 1  -- 命中索引（与TOKEN有关）, 通过recheck过滤成功 
```

执行计划分析
并行顺序扫描： 
  -- Gather：这个操作表示多个并行的工作进程正在处理数据，然后将结果汇总到一个主进程。
  -- Parallel Seq Scan：这个操作说明查询在全表上进行顺序扫描，尽管使用了并行处理，但没有使用索引。 
  -- 位图索引扫描（Bitmap Index Scan）： Bitmap Index Scan阶段是关于利用索引快速找出结果集合的概要。生成一个位图，这个位图表示满足过滤条件的行。适用场景：当查询能够利用表的一个或多个索引时特别有效
  -- 位图堆扫描（Bitmap Heap Scan）： 执行了Bitmap Index Scan并生成了位图之后，Bitmap Heap Scan是第二步，遍历位图，对于位图中标记为匹配的行，它去表（heap）中检索这些具体的数据行
  -- 重检查条件（Recheck Cond）：通过索引查找的结果需要进行重检查，去除不符合的行，这也可能增加查询的处理时间。不过说明索引已过滤了，命中索引 

## 持久化
PostgreSQL WAL(Write-Ahead Log)实现持久化机制，通过事务日志记录快速恢复数据，确保数据可靠性。优化技巧包括调整wal_buffer_size、设置checkpoint_interval和使用WAL日志压缩。注意WAL文件过大或Checkpoint间隔过小可能影响性能
WAL 的机制:
- 事务记录: 记录该事务的操作
- 日志记录
- Checkpoint：checkpoint 是 WAL 文件中一个重要的概念，用于将事务日志记录写入磁盘中。


## 配置优化
- shared_buffers: 一般来说，对于专用的数据库服务器，shared_buffers 大概可以设置为系统内存的 25%。增加 shared_buffers 的值通常可以提高性能，例如，当整个数据库都可以被加载到缓存中时，可以明显减少磁盘的读取操作。由于 PostgreSQL 还依赖于操作系统的缓存，大于内存 40% 的 shared_buffers 并不会带来性能的提示，反而可能会下降。
- effective_cache_size: 它仅用于 PostgreSQL 查询计划器判断索引的代价，越大的值越可能使用索引扫描，否则更可能使用表的顺序扫描.默认值为 4 GB，保守估可以设置为是系统可用内存的 1/2。通常对于专用数据库服务器可以设置为系统总内存的 75％，可以根据特定的服务器工作负载进行调整。如果 effective_cache_size 设置过低，查询计划器可能会忽略某些索引，即使通过索引可以明显增加查询的性能。
- work_mem： 用于复杂的排序操作，它决定了中间结果（例如哈希表）或者排序操作可以使用的最大内存。work_mem 的值不能设置的过高，因为它可能导致内存使用瓶颈。
涉及排序操作的 SQL 子句包括 ORDER BY、DISTINCT 以及排序合并连接（Sort Merge Join）。使用哈希表的操作包括哈希连接（Hash Join）、基于哈希的聚合以及基于哈希的 IN 子查询实现。
- maintenance_work_mem: 指定了日常维护操作允许占用的最大内存，例如 VACUUM、CREATE INDEX 以及 ALTER TABLE ADD FOREIGN KEY 等操作

- wal_buffers： PostgreSQL 使用预写日志（WAL）确保数据的持久性；与 shared_buffers 作用类似，PostgreSQL 将 WAL 日志写入缓冲并且批量写入磁盘。初始值为 4MB（shared_buffers 的 1/32）。WAL 缓冲区在每次事务提交时都会写入磁盘，因此过大的值并不会带来显着的性能提升。不过，对于大量并发的写入操作，适当增加该参数的值可以提高系统的性能。

- huge_pages = on ：-- 注册共享内存时必须使用大页，降低了系统的内存占用，但Huge Page使用的内存需要预先分配；强烈推荐PG实例开启Huge Page的场景：共享内存使用较大（>=8GB）且连接数较多（>= 500），并且热点数据分散。不推荐PG实例开启Huge Page的场景：写业务密集，热点数据集中且内存使用较小。


- checkpoint优化:（触发条件和控制checkpoint写脏页速度）
  max_wal_size:  #当写入了max_wal_size大小的wal日志时，触发一次checkpoint。建议值：max_wal_size=shared_buffers * 0.75
  checkpoint_timeout       #当checkpoint_timeout时间后，触发一次checkpoint建议值：10min
  checkpoint_completion_target   #建议值：0.9,为了避免检查点产生太多的I/O，导致系统性能出现大的抖动,此参数的默认值为“0.5”，即让PostgreSQL在两个检查点间隔时间的0.5倍时间内完成所有脏页的刷新。看起来把该值设置得越接近1.0，性能的抖动越平稳，但实际上不要设置为“1.0”，设置为“0.9”就足够了，因为设置为“1.0”极有可能导致不能按时完成检查点

- VACUUM中的优化(垃圾回收):
  1. 打开自动vacuum:强烈建议打开autovacuum，自动进行垃圾回收和统计信息收集。
      autovacuum  #是否开启自动vacuum强烈建议值：on
      autovacuum_max_workers  #autovacuum进程的最大数量
  2. 控制vacuum执行力度/频度    



优化总结:
```
max_connections = 300       # (change requires restart)
unix_socket_directories = '.'   # comma-separated list of directories
shared_buffers = 194GB       # 尽量用数据库管理内存，减少双重缓存，提高使用效率
huge_pages = on           # on, off, or try  ，使用大页
work_mem = 256MB # min 64kB  ， 减少外部文件排序的可能，提高效率
maintenance_work_mem = 2GB  # min 1MB  ， 加速建立索引
autovacuum_work_mem = 2GB   # min 1MB, or -1 to use maintenance_work_mem  ， 加速垃圾回收
dynamic_shared_memory_type = mmap      # the default is the first option
vacuum_cost_delay = 0      # 0-100 milliseconds   ， 垃圾回收不妥协，极限压力下，减少膨胀可能性
bgwriter_delay = 10ms       # 10-10000ms between rounds    ， 刷shared buffer脏页的进程调度间隔，尽量高频调度，减少用户进程申请不到内存而需要主动刷脏页的可能（导致RT升高）。
bgwriter_lru_maxpages = 1000   # 0-1000 max buffers written/round ,  一次最多刷多少脏页
bgwriter_lru_multiplier = 10.0          # 0-10.0 multipler on buffers scanned/round  一次扫描多少个块，上次刷出脏页数量的倍数
effective_io_concurrency = 2           # 1-1000; 0 disables prefetching ， 执行节点为bitmap heap scan时，预读的块数。从而
wal_level = minimal         # minimal, archive, hot_standby, or logical ， 如果现实环境，建议开启归档。
synchronous_commit = off    # synchronization level;    ， 异步提交
wal_sync_method = open_sync    # the default is the first option  ， 因为没有standby，所以写xlog选择一个支持O_DIRECT的fsync方法。
full_page_writes = off      # recover from partial page writes  ， 生产中，如果有增量备份和归档，可以关闭，提高性能。
wal_buffers = 1GB           # min 32kB, -1 sets based on shared_buffers  ，wal buffer大小，如果大量写wal buffer等待，则可以加大。
wal_writer_delay = 10ms         # 1-10000 milliseconds  wal buffer调度间隔，和bg writer delay类似。
commit_delay = 20           # range 0-100000, in microseconds  ，分组提交的等待时间
commit_siblings = 9        # range 1-1000  , 有多少个事务同时进入提交阶段时，就触发分组提交。
checkpoint_timeout = 55min  # range 30s-1h  时间控制的检查点间隔。
max_wal_size = 320GB    #   2个检查点之间最多允许产生多少个XLOG文件
checkpoint_completion_target = 0.99     # checkpoint target duration, 0.0 - 1.0  ，平滑调度间隔，假设上一个检查点到现在这个检查点之间产生了100个XLOG，则这次检查点需要在产生100*checkpoint_completion_target个XLOG文件的过程中完成。PG会根据这些值来调度平滑检查点。
random_page_cost = 1.0     # same scale as above  , 离散扫描的成本因子，本例使用的SSD IO能力足够好
effective_cache_size = 240GB  # 可用的OS CACHE
log_destination = 'csvlog'  # Valid values are combinations of
logging_collector = on          # Enable capturing of stderr and csvlog
log_truncate_on_rotation = on           # If on, an existing log file with the
update_process_title = off
track_activities = off
autovacuum = on    # Enable autovacuum subprocess?  'on'
autovacuum_max_workers = 4 # max number of autovacuum subprocesses    ，允许同时有多少个垃圾回收工作进程。
autovacuum_naptime = 6s  # time between autovacuum runs   ， 自动垃圾回收探测进程的唤醒间隔
autovacuum_vacuum_cost_delay = 0    # default vacuum cost delay for  ， 垃圾回收不妥协 
```