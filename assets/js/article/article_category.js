$(function () {
  // 发送ajax请求拿数据，渲染页面
  $.ajax({
    type: "GET",
    url: "/my/article/cates",
    success: function (res) {
      console.log(res)
      if (res.status == 0) {
        var htmlStr = template("categoryList", res)
        $("tbody").html(htmlStr)
      }
    }
  })

  // 给添加分类按钮注册事件
  $(".btn-add").on("click", function () {
    // 调用layui.open方法
    layer.open({
      type: 1,
      title: "添加文章分类",
      content: $("#addCteTmp").html(),
      area: "520px" // 弹出框的宽度
    })
  })
})
