$(function () {
  //1、启用富文本编辑器
  initEditor()

  // 2、创建裁剪区
  // 获取裁剪区的DOM元素
  var $image = $("#image")
  // 配置选项
  const options = {
    // 纵横比
    aspectRatio: 400 / 280,
    // 指定预览区域
    preview: ".img-preview"
  }

  // 创建裁剪区
  $image.cropper(options)
})
