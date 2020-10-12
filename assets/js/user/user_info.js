$(function () {
  // 1. 发送ajax请求 获取当前登陆的用户的数据
  // 1.1 直接发送ajax请求
  renderInfo()
  function renderInfo() {
    $.ajax({
      type: "GET",
      url: "/my/userinfo",
      success: function (res) {
        console.log(res)
        if (res.status == 0) {
          // 1.2 渲染页面  注意：form标签上加 lay-filter="myForm"
          layui.form.val("myForm", res.data)

          // 将获取到的数据存储起来
          window.renderData = res.data
        }
      }
    })
  }

  // 2. 实现表单验证
  layui.form.verify({
    nickname: function (value, item) {
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

  //给form表单 绑定submit事件   提交修改
  $(".myForm").on("submit", function (e) {
    e.preventDefault()

    $.ajax({
      type: "POST",
      url: "/my/userinfo",
      data: layui.form.val("myForm"),
      success: function (res) {
        console.log(res)
        if (res.status == 0) {
          layer(res.message)
          renderInfo()
          window.parent.getUserInfo()
        }
      }
    })
  })

  // 给重置按钮注册事件 使表单恢复之前的值
  $(".myForm .btn-reset").on("click", function (e) {
    e.preventDefault()

    //  所谓重置就是重新显示原来的数据
    layui.form.val("myForm", window.renderData)
  })
})
