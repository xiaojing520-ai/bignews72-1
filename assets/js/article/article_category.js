$(function () {
  // 发送ajax请求拿数据，渲染页面
  renderTable()
  function renderTable() {
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
  }

  // 给添加分类按钮注册事件
  $(".btn-add").on("click", function () {
    // 调用layui.open方法
    window.addIndex = layer.open({
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

  // 给添加分类的确定按钮注册事件，发送ajax请示  由于是模板创建的，要给body绑定事件，由弹出层的addForm触发
  $("body").on("submit", ".addForm", function (e) {
    e.preventDefault()
    $.ajax({
      type: "POST",
      url: "/my/article/addcates",
      data: $(this).serialize(),
      success: function (res) {
        console.log(res)
        if (res.status == 0) {
          // 关闭弹出层
          layer.close(window.addIndex)
          // 重新渲染
          renderTable()
        }
      }
    })
  })

  // 删除功能 因为是动态生成的删除按钮，所以就用事件委托
  $("tbody").on("click", ".btn-del", function () {
    // 获取id
    var id = $(this).data("id")
    // console.log(id)
    // 弹出提示框
    layer.confirm("确定要删除该条数据吗", { icon: 3, title: "提示" }, function (
      index
    ) {
      //do something
      $.ajax({
        type: "GET",
        url: "/my/article/deletecate/" + id,
        success: function (res) {
          console.log(res)
          if (res.status == 0) {
            renderTable()
            layer.close(index)
          }
        }
      })
    })
  })

  // 编辑按钮数据回显
  $("tbody").on("click", ".btn-edit", function () {
    // 获取id
    var id = $(this).data("id")
    // 6.3 弹出模态框
    window.editIndex = layer.open({
      type: 1,
      title: "更新文章分类",
      content: $("#editCteTmp").html(),
      area: "520px" // 弹出框的宽度
    })

    $.ajax({
      type: "GET",
      url: "/my/article/cates/" + id,
      success: function (res) {
        if (res.status == 0) {
          // 获取成功后渲染表单数据  form标签要加入lay-filter="editForm"
          layui.form.val("editForm", res.data)
        }
      }
    })
  })

  //   给弹出框的确定更新按钮注册事件，注意是通过委托的方式来注册的事件，发送ajax请示
  $("body").on("submit", ".editForm", function (e) {
    e.preventDefault()
    $.ajax({
      type: "POST",
      url: "/my/article/updatecate",
      data: $(this).serialize(),
      success: function (res) {
        console.log(res)
        if (res.status == 0) {
          layer.close(window.editIndex)
          renderTable()
        }
      }
    })
  })
})
