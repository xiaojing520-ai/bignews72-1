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

          // 开启分页  要把res作为实参
          renderPage(res)
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

  // 4. 实现分页布局
  function renderPage(res) {
    var laypage = layui.laypage
    //执行一个laypage实例
    laypage.render({
      elem: "test1", //注意，这里的 test1 是 ID，不用加 # 号
      count: res.total, //数据总数，从服务端得到
      curr: options.pagenum, // 当前页码值
      limit: options.pagesize, // 每页的条数
      limits: [3, 5, 10],
      layout: ["count", "limit", "prev", "page", "next", "skip"],
      // 单击页码值的时候会调用
      jump: function (obj, first) {
        //obj包含了当前分页的所有参数，比如：
        console.log(obj.curr) //得到当前页，以便向服务端请求对应页的数据。
        console.log(obj.limit) //得到每页显示的条数
        // console.log(first)
        //首次不执行
        if (!first) {
          //do something
          // 需要给当前页码和每页显示的条数赋值
          options.pagenum = obj.curr
          options.pagesize = obj.limit
          renderList()
        }
      }
    })
  }

  //使用委托的方式给删除按钮注册事件，发送请示，删除数据
  $("tbody").on("click", ".btn-del", function () {
    // 获取id
    var articleId = $(this).data("id")
    window.articleIndex = layer.confirm(
      "确认要删除该条数据吗?",
      { icon: 3, title: "提示" },
      function (index) {
        $.ajax({
          type: "GET",
          url: "/my/article/delete/" + articleId,
          success: function (res) {
            if (res.status == 0) {
              renderList()
              layer.close(window.articleIndex)
              layer.msg(res.message)
            }
          }
        })
      }
    )
  })
})
