$(function () {
    var form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度在1-6之间！';
            }
        }
    });
    initu()
    var layer = layui.layer;
    function initu() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                form.val('formuu',res.data)
            }
        })
    }

    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        initu()
    })

    $(".layui-form").on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data:$(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('恭喜您，修改用户信息成功')
                window.parent.getusetinfo()
            }
        })
    })
})