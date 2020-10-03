$(function () {
  // 1、 登录框和注册框的切换
  $('.login a').on('click', function () {
    $('.login').hide().next().show()
  })
  $('.register a').on('click', function () {
    $('.register').hide().prev().show()
  })

  //  2、注册前的校验
  var form = layui.form
  form.verify({
    username: function (value, item) {
      //value：表单的值、item：表单的DOM对象
      if (!new RegExp('^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$').test(value)) {
        return '用户名不能有特殊字符'
      }
      if (/(^\_)|(\__)|(\_+$)/.test(value)) {
        return "用户名首尾不能出现下划线'_'"
      }
      //   if(/^\d+\d+\d$/.test(value)){
      //     return '用户名不能全为数字';
      //   }
    },
    repass: function (value, item) {
      var passVal = $('.register .myForm input[name=password]').val()
      if (value !== passVal) {
        // 清空
        $('.register .myForm .pass, .register .myForm .repass').val('')
        return '两次密码不一致，请重新输入'
      }
    },

    //我们既支持上述函数式的方式，也支持下述数组的形式
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    pass: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格']
  })

  // 3、注册form表单的submit事件， 进行注册用户
  var baseURL = 'http://ajax.frontend.itheima.net'
  $('.register .myForm').on('submit', function (e) {
    // 阻止表单的默认行为
    e.preventDefault()
    $.ajax({
      type: 'POST',
      url: baseURL + '/api/reguser',
      data: $(this).serialize(),
      success: function (res) {
        // console.log(res)
        if (res.status === 0) {
          // 表单清空
          $('.register .myForm')[0].reset()
          $('.register').hide().prev().show()
        }
      }
    })
  })

  // 4、登录用户
  $('.login .myForm').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      type: 'POST',
      url: baseURL + '/api/login',
      data: $(this).serialize(),
      success: function (res) {
        console.log(res)
        if (res.status === 0) {
          location.href = './index.html'
        }
      }
    })
  })
})
