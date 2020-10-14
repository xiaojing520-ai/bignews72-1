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
  // 5. 更新文章
  // 5.1 给form表单注册click事件
  $(".myForm").on("click", ".btn", function (e) {
    // 阻止表单的默认事件
    e.preventDefault()
    var data = new FormData($(".myForm")[0])

    //判断此文章是什么状态 '发布' '草稿'
    if ($(e.target).hasClass("btn-release")) {
      //发布
      data.append("state", "发布")
    } else {
      //草稿
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
        data.append("content", tinyMCE.activeEditor.getContent())
        // 发起请求，把文章信息保存到服务器
        $.ajax({
          type: "POST",
          url: "/my/article/edit",
          data: data,
          contentType: false,
          processData: false,
          success: function (res) {
            if (res.status !== 0) {
              return layer.msg("文章更新失败")
            }
            location.href = "./article_list.html"
          }
        })
      })
  })
})
