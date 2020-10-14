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

  // 文章分类下拉框数据的渲染
  $.ajax({
    type: "GET",
    url: "/my/article/cates",
    success: function (res) {
      if (res.status == 0) {
        var htmlStr = template("categoryList", res)
        $("#category").html(htmlStr)

        // select  checkbox   radio  layui自动渲染可能失效，需要再渲染一次
        // 重新渲染一下表单内容
        layui.form.render()
      }
    }
  })
})
