var userdetail,waitRequest={};
var myCaptcha;
function getQueryString(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    if(window.location.hash.indexOf("#") < 0) return null;
    let r = window.location.hash.split("#")[1].match(reg); 　　
    if (r != null) return decodeURIComponent(r[2]); 
　　    return null; 
  }
  function setCookie(cname, cvalue, exdays) {
    console.log('设置cookie')
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString()+(1 || location.host=='127.0.0.1:5500'?'  path=/;':'  domain=.40code.com; path=/;');
    if(exdays<0){
      var expires = "expires=" + d.toGMTString()+('  path=/;');
      document.cookie = cname + "=" + cvalue + "; " + expires;
      var expires = "expires=" + d.toGMTString()+(' domain=.40code.com; path=/;');
      document.cookie = cname + "=" + cvalue + "; " + expires;
    }
    document.cookie = cname + "=" + cvalue + "; " + expires;
  }
  function getCookie(cname) {
    
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i].trim();
      if (c.indexOf(name) == 0){
        let d=c.substring(name.length, c.length);
        if(cname=='token'){
          try {
            v.$data.token=d
          } catch (error) {}
        }
        return d
      } 
    }
    return "";
  }
  function getuserinfo() {
    get({
      url: 'user/myinfo'
    }, function (d) {
      userdetail=d.data;
      console.log('获取信息成功',d)
      if((typeof v) !== "undefined"){
        v.$data.detail = d.data;
        // qh('index')
      }
        
    //   $('#n-input')[0].value=d.data.nickname
      
    })
  }
  function getuserinfosync() {
    return new Promise(function(reslove){
        get({
            url: 'user/myinfo'
          }, function (d) {
            userdetail=d.data;
            console.log('获取信息成功',d)
            if((typeof v) !== "undefined") {
                v.$data.detail = d.data;
                // qh('index')
            }
            reslove(userdetail)
          })
    })
  }
  function getworkinfosync(id) {
    return new Promise(function(reslove){
        get({
            url: 'work/info',
            data:{id:id}
          }, function (d) {
            reslove(d.data)
          })
    })
  }
        function get(d, n, eee, method) {
            let d2 = d.data;
            if(typeof d==='string'){
              d={url:d}
            }
            if (!d2) d2 = {};
            if (d.p) {
                if (waitRequest[d.p]) return;
                waitRequest[d.p] = 1;
            }
            d2.token = getCookie('token');
            $.ajax({
                url: apihost + d.url,
                data: d2,
                type: method || 'get',
                // headers: { "Authorization": getCookie('token') },
                headers: { 'onreferer': location.pathname, 'href': location.href },
                success: function (f) {
                    console.log(f)
                    if (f.redirect) {
                        location.href = f.redirect;
                        return;
                    }
                    if (f.cz == 'exit') {
                        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                        document.cookie = 'token=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=.40code.com; path=/;';document.cookie = 'token=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
                        console.log('清除cookie')
                    }
                    d.p && (delete waitRequest[d.p])
                    n && n(f)
                },
                error: function (e) {
                    d.p && (delete waitRequest[d.p])
                    console.log(e)
                    if (eee)
                        eee(e)
                    else
                        alert(e && e.responseJSON && (e.responseJSON.msg || e.responseJSON.errmsg) || "服务器或网络错误")
                    if(e.status==0 && e.statusText=='error'){
                      if(!window.qf)window.qf=0;
                      window.qf++;
                     
                      if(location.pathname=='/' && window.qf==3)
                      fetch('/111').then(d=>{
                        if(d.status)location.href=("#page=qf")
                      })
                      
                      return;
                    }
                    if (e.responseJSON.redirect) {
                        location.href = e.responseJSON.redirect;
                        return;
                    }
                }
            })
        }
        setInterval(()=>{
          if(!window.qf)window.qf=0;
          else window.qf--;
        },500)
        function post(d, n, eee, method) {
            let d2 = d.data;
            if (d.p) {
                if (waitRequest[d.p]) return;
                waitRequest[d.p] = 1;
            }
            if (!d2) d2 = {};
            $.ajax({
                url: apihost + d.url + '?token=' + getCookie('token'),
                data: JSON.stringify(d2),
                type: method || 'post',
                contentType: 'application/json',
                headers: { 'onreferer': location.pathname, 'href': location.href },
                success: function (f) {
                    console.log(f)
                    d.p && (delete waitRequest[d.p])
                    if (f.msg || f.errmsg) {
                        alert(f.msg || f.errmsg)
                    }
                    if (f.cz == 'exit') {
                        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                        console.log('清除cookie')
                    }
                    if (f.redirect) {
                        location.href = f.redirect;
                        return;
                    }
                    n && n(f)
                },
                error: function (e) {
                    d.p && (delete waitRequest[d.p])
                    console.log(e)
                    if (eee) eee(e)
                    else alert(e && e.responseJSON && (e.responseJSON.msg || e.responseJSON.errmsg) || "服务器或网络错误")
                    if(e.status==0 && e.statusText=='error'){
                      if(!window.qf)window.qf=0;
                      window.qf++;
                      if(location.pathname=='/' && window.qf==3)
                      fetch('/111').then(d=>{
                        if(d.status)location.href=("#page=qf")
                      })
                      return;
                    }
                    if (e.responseJSON.redirect) {
                        location.href = e.responseJSON.redirect;
                        return;
                    }
                }
            })
        }

  if(getQueryString('i')){
    setCookie('i',getQueryString('i'),3);
  }
  var apihost = "https://service-dq726wx5-1302921490.sh.apigw.tencentcs.com/",
  mianhost="http://127.0.0.1:5500",
  scratchhost="https://abc.520gxx.com";
