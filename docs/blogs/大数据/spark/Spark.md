---
title: Spark
date: 2024/07/08
tags:
 - 大数据
categories:
 - 大数据
---

# Spark

一个基于内存的分布式计算框架，与 Hadoop 的 MapReduce 模型相比，Spark 提供了更高的计算性能.

侧重于内存计算和实时处理，适合需要高性能和低延迟的数据处理任务



而**Hadoop**：更侧重于存储和批处理，适合处理大量静态数据，尤其是需要高可靠性的存储解决方案。



两者可以互补使用，利用 Hadoop 的分布式存储和 Spark 的快速计算能力，共同构建高效的大数据处理系统。

# Spark数据可视化:结合Tableau与Power Bl进行深入的数据分析

引言

> 在大数据时代，数据处理和数据分析已经变得密不可分。Apache Spark作为一个快速、通用的大规模数据处理引擎，为数据预处理和转换提供了强大的支持。然而，对于非技术人员来说，原始数据或中间处理结果可能并不直观。这时，数据可视化工具如Tableau和Powe!BI就显得尤为重要。它们可以将Spark处理后的数据以图表、仪表板等形式展示出来，使数据洞察更为直观。

Spark数据处理流程
首先，我们需要明确在使用Tableau或Power Bl进行数据可视化之前，Spark在整个数据处理流程中的角色
1.数据采集: Spark可以从各种数据源中读取数据，如HDFS、HBase、Cassandra等

2. 数据清洗:通过Spark SQL或DataFrame API，我们可以对数据进行清洗、转换和聚合
3.数据建模:基于业务需求，$park可以帮助构建数据模型，如机器学习模型或统计模型
4.数据输出:处理后的数据可以输出到多种存储系统，如Parquet、ORC等，或直接与Tableau或Power BI集成。



## 理论

### Spark为什么能提高Mysql的查询速度？

Spark 可以通过 JDBC 读取 MySQL 上的数据，也可以执行 SQL 查询，因此我们可以直接连接到 MySQL 并执行查询。那么为什么速度会快呢？对一些需要运行很长时间的查询（如报表或者BI），由于 Spark 是一个大规模并行系统，因此查询会非常的快。MySQL 只能为每一个查询分配一个 CPU 核来处理，而 Spark 可以使用所有集群节点的所有核

在下面的例子中，我们会在 Spark 中执行 MySQL 查询，这个查询速度比直接在 MySQL 上执行速度要快 5 到 10 倍。

另外，Spark 可以增加“集群”级别的并行机制，在使用 MySQL 复制或者 Percona XtraDB Cluster 的情况下，Spark 可以把查询变成一组更小的查询（有点像使用了分区表时可以在每个分区都执行一个查询），然后在多个 Percona XtraDB Cluster 节点的多个从服务器上并行的执行这些小查询。最后它会使用 map/reduce 方式将每个节点返回的结果聚合在一起行程完整的结果。

## Spark SQL

前身为Shark。Shark是Spark上的数据仓库,即Hive on Spark,继承了大量的Hive代码,基于MapReduce设计的部分，成为整个项目的瓶颈。因此，在2014年的时候，Shark项目中止，并转向Spark SQL的开发.

Spark SQL增加了SchemaRDD（即带有Schema信息的RDD），使用户可以在Spark SQL中执行SQL语句，数据既可以来自RDD，也可以来自Hive、HDFS、Cassandra等外部数据源，还可以是JSON格式的数据

**可以理解为在原生的RDD上做的一层封装，通过SparkSQL可以在scala和java中写SQL语句，并将结果作为Dataset/DataFrame返回。简单来讲，SparkSQL可以让我们像写SQL一样去处理内存中的数据。**

Dataset是一个数据的分布式集合，是Spark1.6之后新增的接口，它提供了RDD的优点和SparkSQL优化执行引擎的优点，一个Dataset相当于RDD+Schema的结合。

Dataset的底层封装是RDD，当RDD的泛型是Row类型时，该类型就可以称为DataFrame。DataFrame是一种表格型的数据结构，就和传统的Mysql结构一样，通过DataFrame我们可以更加高效地去执行Sql。



总结:

SparkSQL是对Spark原生RDD的增强，虽然很多功能通过RDD就可以实现，但是SparkSQL可以更加灵活地实现一些功能。

### 概念

#### SchemaRDD

SchemaRDD（即带有Schema信息的RDD）

RDD- Resilient Distributed Dataset（弹性分布式数据集）

关键特点:

- 弹性: 提供了容错机制。即使某些节点失败，RDD 也能通过血统（lineage）信息重新计算丢失的数据分区
- 分布式： 分布式的，它的数据存储在多个节点上，可以并行处理
- 不可变: 一旦创建，不能修改。但可以通过转换（transformation）生成新的 RDD
- 惰性求值： RDD 的操作是惰性求值的，只有在触发动作（action）时才会真正计算

#### DataFrame

DataFrame是一种表格型的数据结构，此时RDD的泛型是Row类型时

## Spark SQL Thrift

Thrift Server是Spark提供的一种JDBC/ODBC访问Spark SQL的服务，它是基于Hive1.2.1的HiveServer2实现的。

有了它之后，sparksql就可以直接用jdbc去连接

