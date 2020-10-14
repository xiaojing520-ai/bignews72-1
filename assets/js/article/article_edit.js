$(function () {
  // 1. 初始化富文本编辑器
  initEditor()
  // 2、创建图片裁剪区域
  var $image = $("#image")

  //   配置选项
  const options = {
    // 纵横比
    aspectRatio: 3 / 2,
    // 指定预览区域
    preview: ".img-preview"
  }

  $image.cropper(options)

  // 3、文章分类数据的渲染
  $.ajax({
    type: "GET",
    url: "/my/article/cates",
    success: function (res) {
      if (res.status == 0) {
        var htmlStr = template("categoryList", res)
        $("#category").html(htmlStr)

        // 重新渲染一下表单内容
        layui.form.render()

        getArticleDataById()
      }
    }
  })

  // 4. 实现数据回显示
  // 4.1 获取地址栏中的id
  var id = location.search.slice(4)
  console.log(id)
  console.log(location.search) //?id=38530

  // 4.2 向服务器端发送请示

  function getArticleDataById() {
    $.ajax({
      type: "GET",
      url: "/my/article/" + id,
      success: function (res) {
        console.log(res)
        if (res.status == 0) {
          layui.form.val("myForm", {
            // 这个地方最好是用到什么写什么，有三个属性
            Id: res.data.Id,
            title: res.data.title,
            cate_id: res.data.cate_id
          })
          // 富文本编辑中的数据需要单独来渲染
          tinyMCE.activeEditor.setContent(res.data.content)
          // 渲染图片
          $("#image")
            .cropper("destroy") // 销毁旧的裁剪区域
            .attr(
              "src",
              "http://ajax.frontend.itheima.net" + res.data.cover_img
            ) // 重新设置图片路径
            .cropper(options)
        }
      }
    })
  }

  // 更新数据
})
