$(function () {
    var $image = $('#image')
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }
    $image.cropper(options)
    $("#btnChooseImage").on('click', function () {
        $('#file').click()
    })

    var layer = layui.layer;
    $('#file').on('change', function (e) {
        var file = e.target.files[0];
        console.log(file);
        if (file == undefined) {
            return layer.msg('请选择图片')
        }
        var newImgURL = URL.createObjectURL(file);
        $image
            .cropper('destroy')
            .attr('src', newImgURL)
            .cropper(options)
    })


    $("#btnUpload").on('click', function () {
        var dataURL = $image
        .cropper('getCroppedCanvas', {
            // 创建一个 Canvas 画布
            width: 100,
            height: 100
          })
            .toDataURL('image/png')
        console.log(dataURL);
   
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('恭喜您，头像获取成功')
                window.parent.getusetinfo()
            }
        })
   
    })
   

    
})