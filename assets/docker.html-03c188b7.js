import{_ as e,o as d,c as r,a}from"./app-232b67dc.js";const c={},o=a(`<h2 id="docker-compose" tabindex="-1"><a class="header-anchor" href="#docker-compose" aria-hidden="true">#</a> docker compose</h2><h3 id="命令" tabindex="-1"><a class="header-anchor" href="#命令" aria-hidden="true">#</a> 命令</h3><h4 id="启动" tabindex="-1"><a class="header-anchor" href="#启动" aria-hidden="true">#</a> 启动:</h4><pre><code>docker-compose -f ***/docker-compose.yml up -d
</code></pre><h4 id="停止" tabindex="-1"><a class="header-anchor" href="#停止" aria-hidden="true">#</a> 停止:</h4><pre><code>docker-compose -f ***/docker-compose.yml stop
</code></pre><h4 id="查看后台的一些输出日志" tabindex="-1"><a class="header-anchor" href="#查看后台的一些输出日志" aria-hidden="true">#</a> 查看后台的一些输出日志:</h4><pre><code>docker-compose -f ***/docker-compose.yml logs -f
</code></pre><h4 id="修改配置后-重加载文件-重启" tabindex="-1"><a class="header-anchor" href="#修改配置后-重加载文件-重启" aria-hidden="true">#</a> 修改配置后,重加载文件,重启:</h4><pre><code>docker-compose -f ***/docker-compose.yml up -d --build &amp;&amp; docker-compose -f ***/docker-compose.yml restart
</code></pre><h4 id="完全清理容器和其他网络文件挂载" tabindex="-1"><a class="header-anchor" href="#完全清理容器和其他网络文件挂载" aria-hidden="true">#</a> 完全清理容器和其他网络文件挂载</h4><pre><code>docker-compose -f ***/docker-compose.yml down (备注: -v 会完全清理本地文件和网络设置,不再保留任何容器产生的数据)
</code></pre><p>( A***/docker-compose.yml 为全路径的编排文件地址,尽可能在docker-compose.yml这一级目录操作.)</p><h2 id="docker" tabindex="-1"><a class="header-anchor" href="#docker" aria-hidden="true">#</a> docker</h2><h4 id="进入容器" tabindex="-1"><a class="header-anchor" href="#进入容器" aria-hidden="true">#</a> 进入容器</h4><p>docker exec -it 容器ID/容器名 /bin/bash 或者 docker exec -it 容器ID/容器名 bash</p><h3 id="yml文件编写" tabindex="-1"><a class="header-anchor" href="#yml文件编写" aria-hidden="true">#</a> yml文件编写</h3><h4 id="将外部的docker-compose文件整理在一块" tabindex="-1"><a class="header-anchor" href="#将外部的docker-compose文件整理在一块" aria-hidden="true">#</a> 将外部的docker-compose文件整理在一块</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>version: &#39;2&#39;
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意:container_name需要和单独的docker-compose文件保持不一样，否则单独启动的时候容器会报错的</strong></p>`,20),i=[o];function s(n,l){return d(),r("div",null,i)}const h=e(c,[["render",s],["__file","docker.html.vue"]]);export{h as default};
