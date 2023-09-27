---
title: docker简记
date: 2023/09/21
tags:
 - docker
categories:
 - docker
---
## docker compose
### 安装 
1. 下载
```
sudo curl -L "https://github.com/docker/compose/releases/download/v2.2.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```
    版本号参考 https://github.com/docker/compose/tags
> 如果是手动下载 ，去 https://github.com/docker/compose/tags 下
> 然后移动修改文件名
      cp /opt/docker/docker-compose-linux-x86_64 /usr/local/bin 
      mv docker-compose-linux-x86_64 docker-compose
   
2. 授权
    sudo chmod +x /usr/local/bin/docker-compose
3. docker-compose --version


### 命令
#### 启动:  
    docker-compose -f ***/docker-compose.yml up -d
    docker-compose -f ***/docker-compose.yml up -d 某个具体的服务名
#### 停止:  
    docker-compose -f ***/docker-compose.yml stop
    docker-compose -f ***/docker-compose.yml stop 某个具体的服务名
#### 查看后台的一些输出日志:  
    docker-compose -f ***/docker-compose.yml logs -f
#### 修改配置后,重加载文件,重启:  
    docker-compose -f ***/docker-compose.yml up -d --build && docker-compose -f ***/docker-compose.yml restart
#### 完全清理容器和其他网络文件挂载   
    docker-compose -f ***/docker-compose.yml down (备注: -v 会完全清理本地文件和网络设置,不再保留任何容器产生的数据)
    docker compose -f a-docker-compose.yml down --rmi all (把build的镜像也移除掉)
 ( A***/docker-compose.yml 为全路径的编排文件地址,尽可能在docker-compose.yml这一级目录操作.)

## docker
#### 容器操作
- 进入容器:
docker exec -it 容器ID/容器名 /bin/bash
或者
docker exec -it 容器ID/容器名 bash
- 查看日志: docker logs 名
#### 镜像操作
- 查看所有镜像: docker images
- 删除镜像: docker rmi 镜像id或镜像名
- 离线安装镜像:
> 1. 在具有外网连接的机器上下载所需的Docker镜像: docker pull mysql:5.7.22
> 2. 将下载的Docker镜像保存到归档文件: docker save -o mysql_5.7.22.tar mysql:5.7.22
> 3. 在目标环境中加载Docker镜像: docker load -i mysql_5.7.22.tar
### yml文件编写
#### 将外部的docker-compose文件整理在一块
方式一:
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

方式二:
```
version: '3'

include:
  - ./mysql/docker-compose.yml
  - ./redis/docker-compose.yml
  - ./nginx/docker-compose.yml
  - ./nacos/docker-compose.yml
  - ./rabbitmq/docker-compose.yml
```

## 监控工具安装Portainer
```
docker pull portainer/portainer-ce:latest 

#启动容器
docker run -d  --name portainer -p 19000:9000 -v /var/run/docker.sock:/var/run/docker.sock -v /app/portainer_data:/data --restart always --privileged=true portainer/portainer-ce:latest
```
管理地址：http://localhost:19000

## 其他常用
开启端口|firewall-cmd --zone=public --add-port=端口/tcp --permanent
开启端口后重启防火墙|firewall-cmd --reload