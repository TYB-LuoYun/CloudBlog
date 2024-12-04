

## 新建用户

**tanyangbo**

**2024blubtyb**

数据库密码:
set password = password("2024@Blubtyb");  root



1

useradd -m hadoop -s /bin/bash #创建用户
passwd hadoop	#设置密码



2为 hadoop 用户增加管理员权限，方便部署，避免一些对新手来说比较棘手的权限问题，执行下面代码添加权限

```
visudo
```

![image-20240715160658078](D:\tyb\code\TYB-LuoYun.github.io\docs\blogs\大数据\spark\Spark安装.assets\image-20240715160658078.png)

chmod -R 777 ./soft/     递归修改权限，常用，777 表示所有用户（所有者、组和其他人）都有读、写和执行权限。

3切换用户

su hadoop





4ssh免密登录













## 安装-local模式

### 安装jdk&scala环境

解压缩scala：tar -zxvf scala-2.12.12.tgz -C /opt/

编辑环境变量vim /etc/profile

在文件最后一行插入以下内容

 export SCALA_HOME=/opt/scala-2.12.12

 export PATH=$PATH:${SCALA_HOME}/bin

退出并保存然后用下面命令重启使文件生效

source /etc/profile

验证scala安装是否成功极其版本，并启动，输入以下命令

scala -version

### spark安装

https://blog.csdn.net/weixin_41429931/article/details/137383174#4_hive_mysqlmetastore_56

下载 https://spark.apache.org/downloads.html

2 解压 tar -xvf spark-3.1.2-bin-hadoop3.2.tgz

3修改环境变量: vi /etc/profile

添加以下代码后执行 source /etc/profile

```text
export SPARK_HOME=/Users/Jine/Documents/spark-3.1.2-bin-hadoop3.2
export PATH=$PATH:${SPARK_HOME}/bin
export PATH=$PATH:${SPARK_HOME}/sbin
```

4进入spark/conf备份文件

cp spark-env.sh.template spark-env.sh

备份完后编辑该文件，将以下内容粘贴到最后

 vim spark-env.sh

export SCALA_HOME=/opt/scala-2.12.12

export JAVA_HOME=/opt/module/java

export SPARK_MASTER_IP=master

export SPARK_WOKER_CORES=2

export SPARK_WOKER_MEMORY=2g

export HADOOP_CONF_DIR=/opt/module/hadoop

#export SPARK_MASTER_WEBUI_PORT=8080

#export SPARK_MASTER_PORT=7070 





启动

进入sbin,./start-all.sh

启动成功后

jps查看

#### Spark Thrift JDBCServer



将下载的安装包解压缩之后，直接启动：

$ cd sbin/
$ ./start-thriftserver.sh 

默认侦听10000端口：

$ lsof -i:10000
COMMAND  PID      USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
java    1414 yeyonghao  407u  IPv6 0x3cb645c07427abbb      0t0  TCP *:ndmp (LISTEN)



前面说过了，其本质上是Spark的一个Application，因此可以看到这时4040端口也启动了：

$ lsof -i:4040
COMMAND  PID      USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
java    1414 yeyonghao  270u  IPv6 0x3cb645c07427d3fb      0t0  TCP *:yo-main (LISTEN)


使用jps命令查看，可以看到有SparkSubmit进程： 
$ jps
901 SecondaryNameNode
1445 Jps
806 DataNode
1414 SparkSubmit
729 NameNode
1132 NodeManager 

1053 ResourceManager









