flashAjax
======
 
通过flash解决ajax请求无法跨域问题的jquery插件  
请先自行放好**crossdomain.xml**跟**crossDomain.swf**(可重命名)资源。
使用依赖
======

```
<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script src="src/swfobject.js"></script>
<script src="src/flashAjax.min.js"></script>

```

插件使用
======

```
$.flashAjax({
    url : '', //接口地址
    type : 'POST',
    data : {
        info : 11093
    },
    flashUrl : '', //flash地址
    onReady : function(){ //return false时不会发送请求
        alert('onReady');
    },
    onSuccess : function(text){
        alert('onSuccess' + text);
    },
    onFail : function(message){
        alert(message);
    },
    onComplete : function(){
        alert('onComplete');
    }
});
    
```
