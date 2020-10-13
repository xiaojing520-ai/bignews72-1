$(function () {
  // 一打开页面就发请求拿数据渲染页面
  $.ajax({
    type: "GET",
    url: "/my/article/cates",
    success: function (res) {
      if (res.status == 0) {
        var htmlStr = template("categoryList", res)
        $("#category").html(htmlStr)

        // 重新渲染一下表单内容
        layui.form.render()
      }
    }
  })

  // 发请求拿文章列表的数据渲染
  $.ajax({
    type: "GET",
    url: "/my/article/list",
    data: {
      pagenum: 1,
      pagesize: 6
    },
    success: function (res) {
      console.log(res)
      if (res.status == 0) {
        var htmlStr = template("articleList", res)
        $("tbody").html(htmlStr)
      }
    }
  })
})
