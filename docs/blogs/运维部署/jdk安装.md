---
title: JDK安装
date: 2024/07/21
tags:
 - jdk安装
categories:
 - 运维部署
---


- 下载JDK安装包
- 解压到指定目录
tar -zxvf jdk-8u333-linux-x64.tar.gz
- 配置环境变量
vi /etc/profile

```
export JAVA_HOME=/work/soft/jdk/jdk-18.0.2.1
export PATH=$JAVA_HOME/bin:$PATH
export CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar 
```
让配置文件生效
source /etc/profile

- java -version


