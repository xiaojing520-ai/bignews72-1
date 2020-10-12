$(function () {
  // 1.实现验证功能
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
      // if(/^\d+\d+\d$/.test(value)){
      //   return '用户名不能全为数字';
      // }
    },
    repass: function (value, item) {
      // item是当前的确认密码框元素
      // value是当前确认密码框中输入的值
      // 1.1 获取密码框中的输入内容
      var passVal = $(".myForm .pass").val()
      // 1.2 判断两次输入的密码是否相同
      if (passVal !== value) {
        // 1.3 清空密码框并添加提示
        $(".myForm .pass,.myForm .repass").val("")
        return "两次密码不一致,请重新输入"
      }
    },

    //我们既支持上述函数式的方式，也支持下述数组的形式
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    pass: [/^[\d]{6,12}$/, "密码必须6到12位数字，且不能出现空格"]
  })

  //   给修改密码按钮注册事件
  $(".myForm").on("submit", function (e) {
    e.preventDefault()
    $.ajax({
      type: "POST",
      url: "/my/updatepwd",
      data: $(this).serialize(),
      success: function (res) {
        console.log(res)
        if (res.status == 0) {
          // 2.4 修改完成后提示
          layer.open({
            title: "温馨提示",
            content: res.message,
            yes: function (index, layero) {
              //do something
              // 清空表单中的内容
              $(".myForm")[0].reset()
              layer.close(index) //如果设定了yes回调，需进行手工关闭
            }
          })
        }
      }
    })
  })
})
