var qwd = 'http://ajax.frontend.itheima.net'
$.ajaxPrefilter(function (base) {
    base.url = qwd + base.url
    if (base.url.indexOf('/my/') !== -1) {
        base.headers = {
           Authorization :localStorage.getItem('token') || ''
        }
    }
    base.complete = function (res) {
        console.log(res.responseJSON);
        var obj = res.responseJSON
        if (obj.status == 1 && obj.message == '身份认证失败！') {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }
})