---
title: docker简记
date: 2023/09/21
tags:
 - docker
categories:
 - docker
---

## docker compose
### 命令
#### 启动:  
    docker-compose -f ***/docker-compose.yml up -d
#### 停止:  
    docker-compose -f ***/docker-compose.yml stop
#### 查看后台的一些输出日志:  
    docker-compose -f ***/docker-compose.yml logs -f
#### 修改配置后,重加载文件,重启:  
    docker-compose -f ***/docker-compose.yml up -d --build && docker-compose -f ***/docker-compose.yml restart
#### 完全清理容器和其他网络文件挂载   
    docker-compose -f ***/docker-compose.yml down (备注: -v 会完全清理本地文件和网络设置,不再保留任何容器产生的数据)

 ( A***/docker-compose.yml 为全路径的编排文件地址,尽可能在docker-compose.yml这一级目录操作.)

## docker
#### 进入容器
docker exec -it 容器ID/容器名 /bin/bash
或者
docker exec -it 容器ID/容器名 bash

### yml文件编写
#### 将外部的docker-compose文件整理在一块
```
version: '2'
services:
  # 通过 extends 引入 mysql-docker-compose.yml 中的服务
  mysql:
    container_name: main-mysql
    extends:
      file: mysql/docker-compose.yml
      service: mysqlservice
    # 可以在这里覆盖或添加额外的配置

  # 通过 extends 引入 redis-docker-compose.yml 中的服务
  redis:
    container_name: main-redis
    extends:
      file: redis/docker-compose.yml
      service: redisservice-develeper
```
**注意:container_name需要和单独的docker-compose文件保持不一样，否则单独启动的时候容器会报错的**