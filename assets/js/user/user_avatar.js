$(function () {
  // 1.1 获取裁剪区域的 DOM 元素
  $image = $("#image")
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: ".img-preview"
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)

  // 给上传按钮注册事件，弹出选择图片的窗口
  $(".btn-upload").on("click", function () {
    $("#avatar").click()
  })

  // 文件窗口弹出后，给文件按钮绑定一个change事件
  $("#avatar").on("change", function () {
    // 3.2 获取待上传的图片
    var file = this.files[0]
    // 3.3 生成一个链接
    var imgUrl = URL.createObjectURL(file)

    // 3.4 显示到img标签内

    $image
      .cropper("destroy") // 销毁旧的裁剪区域
      .attr("src", imgUrl) // 重新设置图片路径
      .cropper(options) // 重新初始化裁剪区域
  })

  // 上传头像
  $(".btn-sure").on("click", function (e) {
    e.preventDefault()
    // 4.2 生成base64格式的图片链接
    var dataURL = $image
      .cropper("getCroppedCanvas", {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL("image/png") // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    $.ajax({
      type: "POST",
      url: "/my/update/avatar",
      data: {
        avatar: dataURL
      },
      success: function (res) {
        if (res.status == 0) {
          layer.msg(res.message)
          window.parent.getUserInfo()
        }
      }
    })
  })
})
