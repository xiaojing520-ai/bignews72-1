$(function () {
  // 1. 发送ajax请求 获取当前登陆的用户的数据
  // 1.1 直接发送ajax请求
  $.ajax({
    type: "GET",
    url: "/my/userinfo",
    success: function (res) {
      console.log(res)
      if (res.status == 0) {
        // 1.2 渲染页面  注意：form标签上加 lay-filter="myForm"
        layui.form.val("myForm", res.data)
      }
    }
  })


  
})
