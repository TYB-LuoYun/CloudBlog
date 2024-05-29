import{_ as e,o as i,c as n,a as s}from"./app-85ce69c0.js";const d={},r=s(`<h1 id="记一次网站挂在子目录的处理" tabindex="-1"><a class="header-anchor" href="#记一次网站挂在子目录的处理" aria-hidden="true">#</a> 记一次网站挂在子目录的处理</h1><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    server{
        listen       6008;
        server_name  127.0.0.1;
        location /uis/  {
		# proxy_pass http://us.demo3.dicomclub.com:82;
                              # rewrite ^/uis/(.*)$ /$1 break;
                              proxy_pass http://127.0.0.1:6001/;  
                              proxy_set_header Host  127.0.0.1:6001;
                              proxy_set_header X-Forwarded-For  http://127.0.0.1:6001/uis;
                              proxy_set_header X-Forwarded-Prefix /uis/;     
                              
                              add_header X-Frame-Options &quot;SAMEORIGIN&quot;;
                              add_header Set-Cookie &quot;my_cookie=my_value; Path=/uis; HttpOnly&quot;;


                              sub_filter &#39;src=&quot;js&#39; &#39;src=&quot;js&#39;;
                              sub_filter_once off;
                              sub_filter_types *;
  
        }

        location / {  
   
            set $do_rewrite &quot;0&quot;;  
            if ($http_cookie ~*  WebUIS) {
               set $do_rewrite &quot;\${do_rewrite}1&quot;;
            } 
            if ($http_referer ~* ^http://127.0.0.1:6008/uis) {
               set $do_rewrite &quot;\${do_rewrite}1&quot;; 
             } 
            if ($request_uri  ~* ^/uis){
               set $do_rewrite &quot;0&quot;; 
            }   
             
            if ($request_uri ~* \\.html){
               set $do_rewrite &quot;\${do_rewrite}2&quot;; 
            } 

           if ($do_rewrite =  &quot;01&quot; ) {  
                rewrite ^/(.*)$ /uis/$1 ;    
           }  
            if ($request_uri = &quot;012&quot;){
                 return 302 /uis$request_uri; 
            } 
           
 
        }
    }
	
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),l=[r];function v(t,u){return i(),n("div",null,l)}const c=e(d,[["render",v],["__file","nginx.html.vue"]]);export{c as default};
