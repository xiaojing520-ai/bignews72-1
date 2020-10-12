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
    var avatar = this.files[0]
    // 3.3 生成一个链接
    var imgUrl = URL.createObjectURL(avatar)

    // 3.4 显示到img标签内
    $image.cropper("destroy").attr("src", imgUrl).cropper(options)
  })
})
