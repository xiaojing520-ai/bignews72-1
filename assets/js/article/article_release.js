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

  // 3、文章分类下拉框数据的渲染
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

  $(".btn-upload").on("click", function () {
    $("#avatar").click()
  })

  // 5. 实现图片的本地预览功能
  // 5.1 给input标签注册change事件
  $("#avatar").on("change", function () {
    // 5.2 获取待上传的图片
    var file = this.files[0]
    // 5.3 生成图片的链接
    var imgUrl = URL.createObjectURL(file)

    // 5.4 实现本地预览功能 需要先销毁之前的 然后再显示新的
    $("#image")
      .cropper("destroy") // 销毁旧的裁剪区域
      .attr("src", imgUrl) // 重新设置图片路径
      .cropper(options) // 重新初始化裁剪区域
  })
})
