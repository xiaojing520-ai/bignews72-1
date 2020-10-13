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

  // 文章列表页中发送给服务器的参数数据
  var options = {
    pagenum: 1, // 页码值 默认是第1页
    pagesize: 3, // 每页显示的文章数据 默认是3页
    cate_id: $("#category").val(), // 文章的所属分类
    state: $("#state").val() // 文章的当前状态
  }

  // 发请求拿文章列表的数据渲染
  renderList()
  function renderList() {
    $.ajax({
      type: "GET",
      url: "/my/article/list",
      data: options,
      success: function (res) {
        console.log(res)
        if (res.status == 0) {
          var htmlStr = template("articleList", res)
          $("tbody").html(htmlStr)
        }
      }
    })
  }

  // 实现筛选功能
  $(".myForm").on("submit", function (e) {
    e.preventDefault()
    // 改变筛选的条件
    options.cate_id = $("#category").val()
    options.state = $("#state").val()
    renderList()
  })
})
