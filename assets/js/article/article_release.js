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

  // 文章发布
  // 给form注册点击事件，有btn 按钮触发，两个按钮都有 btn的类名
  $(".myForm").on("click", ".btn", function (e) {
    e.preventDefault()
    // 准备数据  FormData 的参数是DOM对象
    var data = new FormData($(".myForm")[0])

    // 判断此文章是什么状态 '发布' '草稿'
    if ($(e.target).hasClass("btn-release")) {
      // 发布
      data.append("state", "发布")
    } else {
      // 草稿
      data.append("state", "草稿")
    }

    $image
      .cropper("getCroppedCanvas", {
        width: 400,
        height: 280
      })
      .toBlob(function (blob) {
        // 将裁剪之后的图片，转化为 blob 对象
        data.append("cover_img", blob)
        // 由于原始的方式获取内容不到，因此使用如下方式来获取
        data.append("content", tinyMCE.activeEditor.getContent())

        // 数据都追加成功后 发送ajax请求

        $.ajax({
          type: "POST",
          url: "/my/article/add",
          // 用FormData收集数据，要设置这两项 contentType:false, processData:false,
          contentType: false,
          processData: false,
          data: data,
          success: function (res) {
            if (res.status !== 0) {
              return layer.msg("文章发表失败")
            } else {
              location.href = "./article_list.html"
            }
          }
        })
      })
  })
})
