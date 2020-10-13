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

  // 3.实现验证功能
  var form = layui.form
  form.verify({
    username: function (value, item) {
      //value：表单的值、item：表单的DOM对象
      if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
        return "用户名不能有特殊字符"
      }
      if (/(^\_)|(\__)|(\_+$)/.test(value)) {
        return "用户名首尾不能出现下划线'_'"
      }
      if (/^\d+\d+\d$/.test(value)) {
        return "用户名不能全为数字"
      }
    }
  })
})
