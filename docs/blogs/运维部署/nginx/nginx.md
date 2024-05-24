---
title: Nginx
date: 2024/05/21
tags:
 - docker
categories:
 - 运维部署
---


# 记一次网站挂在子目录的处理
```
    server{
        listen       6008;
        server_name  127.0.0.1;
        location /uis/  {
		# proxy_pass http://us.demo3.dicomclub.com:82;
                              # rewrite ^/uis/(.*)$ /$1 break;
                              proxy_pass http://127.0.0.1:6001/;  
                              proxy_set_header Host  127.0.0.1:6001;
                              proxy_set_header X-Forwarded-For  http://127.0.0.1:6001/uis;
                              proxy_set_header X-Forwarded-Prefix /uis/;     
                              
                              add_header X-Frame-Options "SAMEORIGIN";
                              add_header Set-Cookie "my_cookie=my_value; Path=/uis; HttpOnly";


                              sub_filter 'src="js' 'src="js';
                              sub_filter_once off;
                              sub_filter_types *;
  
        }

        location / {  
   
            set $do_rewrite "0";  
            if ($http_cookie ~*  WebUIS) {
               set $do_rewrite "${do_rewrite}1";
            } 
            if ($http_referer ~* ^http://127.0.0.1:6008/uis) {
               set $do_rewrite "${do_rewrite}1"; 
             } 
            if ($request_uri  ~* ^/uis){
               set $do_rewrite "0"; 
            }   
             
            if ($request_uri ~* \.html){
               set $do_rewrite "${do_rewrite}2"; 
            } 

           if ($do_rewrite =  "01" ) {  
                rewrite ^/(.*)$ /uis/$1 ;    
           }  
            if ($request_uri = "012"){
                 return 302 /uis$request_uri; 
            } 
           
 
        }
    }
	
```