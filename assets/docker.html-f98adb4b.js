import{_ as e,o as d,c as i,a}from"./app-1e5e08b8.js";const r={},n=a(`<h1 id="docker简记" tabindex="-1"><a class="header-anchor" href="#docker简记" aria-hidden="true">#</a> docker简记</h1><p>https://github.com/TYB-LuoYun/docker-componse</p><h2 id="docker-安装" tabindex="-1"><a class="header-anchor" href="#docker-安装" aria-hidden="true">#</a> docker 安装</h2><ol><li><p>卸载旧版</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>yum remove docker-ce \\
       docker-ce-client \\
       docker-client-latest \\
       docker-common \\
       docker-latest \\
       docker-latest-logrotate \\
       docker-logrotate \\
       docker-engine
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>安装一组工具</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>yum install -y yum-utils \\
    device-mapper-persistent-data \\
    lvm2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>设置 yum 仓库地址</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> yum-config-manager \\
   --add-repo \\
   https://download.docker.com/linux/centos/docker-ce.repo
 yum-config-manager \\
   --add-repo \\
   http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>更新 yum 缓存</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>yum makecache fast
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>安装新版 docker</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> yum install docker-ce docker-ce-cli containerd.io
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>启动, 测试</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>systemctl start docker
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>设置 docker 开机启动</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>systemctl enable docker
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>运行 hello-world 镜像，验证 docker</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docker run hello-world
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ol><h2 id="docker-compose" tabindex="-1"><a class="header-anchor" href="#docker-compose" aria-hidden="true">#</a> docker compose</h2><h3 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h3><ol><li>下载</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sudo curl -L &quot;https://github.com/docker/compose/releases/download/v2.22.0/docker-compose-$(uname -s)-$(uname -m)&quot; -o /usr/local/bin/docker-compose
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><pre><code>版本号参考 https://github.com/docker/compose/tags
</code></pre><blockquote><p>如果是手动下载 ，去 https://github.com/docker/compose/tags 下 然后移动修改文件名 cp /opt/docker/docker-compose-linux-x86_64 /usr/local/bin mv docker-compose-linux-x86_64 docker-compose</p></blockquote><ol start="2"><li>授权 sudo chmod +x /usr/local/bin/docker-compose</li><li>docker-compose --version</li></ol><h3 id="命令" tabindex="-1"><a class="header-anchor" href="#命令" aria-hidden="true">#</a> 命令</h3><h4 id="启动" tabindex="-1"><a class="header-anchor" href="#启动" aria-hidden="true">#</a> 启动:</h4><pre><code>docker-compose -f ***/docker-compose.yml up -d
docker-compose -f ***/docker-compose.yml up -d 某个具体的服务名
</code></pre><h4 id="停止" tabindex="-1"><a class="header-anchor" href="#停止" aria-hidden="true">#</a> 停止:</h4><pre><code>docker-compose -f ***/docker-compose.yml stop
docker-compose -f ***/docker-compose.yml stop 某个具体的服务名
</code></pre><h4 id="查看后台的一些输出日志" tabindex="-1"><a class="header-anchor" href="#查看后台的一些输出日志" aria-hidden="true">#</a> 查看后台的一些输出日志:</h4><pre><code>docker-compose -f ***/docker-compose.yml logs -f
</code></pre><h4 id="修改配置后-重加载文件-重启" tabindex="-1"><a class="header-anchor" href="#修改配置后-重加载文件-重启" aria-hidden="true">#</a> 修改配置后,重加载文件,重启:</h4><pre><code>docker-compose -f ***/docker-compose.yml up -d --build &amp;&amp; docker-compose -f ***/docker-compose.yml restart
</code></pre><h4 id="完全清理容器和其他网络文件挂载" tabindex="-1"><a class="header-anchor" href="#完全清理容器和其他网络文件挂载" aria-hidden="true">#</a> 完全清理容器和其他网络文件挂载</h4><pre><code>docker-compose -f ***/docker-compose.yml down (备注: -v 会完全清理本地文件和网络设置,不再保留任何容器产生的数据)
docker compose -f a-docker-compose.yml down --rmi all (把build的镜像也移除掉)
</code></pre><p>( A***/docker-compose.yml 为全路径的编排文件地址,尽可能在docker-compose.yml这一级目录操作.)</p><h2 id="docker" tabindex="-1"><a class="header-anchor" href="#docker" aria-hidden="true">#</a> docker</h2><h4 id="容器操作" tabindex="-1"><a class="header-anchor" href="#容器操作" aria-hidden="true">#</a> 容器操作</h4><ul><li>进入容器: docker exec -it 容器ID/容器名 /bin/bash 或者 docker exec -it 容器ID/容器名 bash</li><li>查看日志: docker logs 名</li></ul><h4 id="镜像操作" tabindex="-1"><a class="header-anchor" href="#镜像操作" aria-hidden="true">#</a> 镜像操作</h4><ul><li>查看所有镜像: docker images</li><li>删除镜像: docker rmi 镜像id或镜像名</li><li>离线安装镜像:</li></ul><blockquote><ol><li>在具有外网连接的机器上下载所需的Docker镜像: docker pull mysql:5.7.22</li><li>将下载的Docker镜像保存到归档文件: docker save -o mysql_5.7.22.tar mysql:5.7.22</li><li>在目标环境中加载Docker镜像: docker load -i mysql_5.7.22.tar</li></ol></blockquote><h3 id="yml文件编写" tabindex="-1"><a class="header-anchor" href="#yml文件编写" aria-hidden="true">#</a> yml文件编写</h3><h4 id="将外部的docker-compose文件整理在一块" tabindex="-1"><a class="header-anchor" href="#将外部的docker-compose文件整理在一块" aria-hidden="true">#</a> 将外部的docker-compose文件整理在一块</h4><p>方式一:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>version: &#39;2&#39;
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>方式二:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>version: &#39;3&#39;

include:
  - ./mysql/docker-compose.yml
  - ./redis/docker-compose.yml
  - ./nginx/docker-compose.yml
  - ./nacos/docker-compose.yml
  - ./rabbitmq/docker-compose.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="监控工具安装portainer" tabindex="-1"><a class="header-anchor" href="#监控工具安装portainer" aria-hidden="true">#</a> 监控工具安装Portainer</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docker pull portainer/portainer-ce:latest 

#启动容器
docker run -d  --name portainer -p 19000:9000 -v /var/run/docker.sock:/var/run/docker.sock -v /app/portainer_data:/data --restart always --privileged=true portainer/portainer-ce:latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>管理地址：http://localhost:19000</p><h2 id="其他常用" tabindex="-1"><a class="header-anchor" href="#其他常用" aria-hidden="true">#</a> 其他常用</h2><p>开启端口|firewall-cmd --zone=public --add-port=端口/tcp --permanent 开启端口后重启防火墙|firewall-cmd --reload</p>`,40),s=[n];function c(l,o){return d(),i("div",null,s)}const m=e(r,[["render",c],["__file","docker.html.vue"]]);export{m as default};
