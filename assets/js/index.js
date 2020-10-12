$(function () {
  getUserInfo()
  function getUserInfo() {
    $.ajax({
      type: "GET",
      url: "/my/userinfo",
      // headers: {
      //   Authorization:
      //     "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQyNTYsInVzZXJuYW1lIjoieHVqaW5nIiwicGFzc3dvcmQiOiIiLCJuaWNrbmFtZSI6IumdmemdmSIsImVtYWlsIjoieHh4QGpqLmNvbSIsInVzZXJfcGljIjoiIiwiaWF0IjoxNjAyMjQ5NDIwLCJleHAiOjE2MDIyODU0MjB9.HjdLEjG1JbKkTqsS6WvGvWCyrDIH_9sIQY-LvQr7qKg"
      // },
      success: function (res) {
        console.log(res)
        if (res.status == 0) {
          var nickname =
            res.data.nickname == "" ? res.data.username : res.data.nickname

          $(".userInfo .welcome").html(`欢迎&nbsp;&nbsp;${nickname}`)

          //如果有头像和没头像的判断
          if (!res.data.user_pic) {
            //没头像
            $(".userInfo .text-avatar").html(nickname.slice(0, 1).toUpperCase())
            $(".layui-header .text-avatar").html(
              nickname.slice(0, 1).toUpperCase()
            )
          } else {
            //有头像
            $(".userInfo img")
              .show()
              .attr("src", res.data.user_pic)
              .prev()
              .hide()
            $(".layui-nav img")
              .show()
              .attr("src", res.data.user_pic)
              .prev()
              .hide()
          }
        }
      }
    })
  }
  window.getUserInfo = getUserInfo

  // - 1.给退出按钮注册事件
  // - 2.删除本地存储中的token
  // - 3.跳转到login.html页面

  // 2. 实现退出功能
  // 2.1 给退出按钮注册事件
  $(".logout").on("click", function () {
    layer.confirm("确认要退出吗?", { icon: 3, title: "提示" }, function (
      index
    ) {
      //do something
      // 2.2 删除本地存储中的token
      window.localStorage.removeItem("token")
      // 2.3 跳转到登陆页面
      location.href = "./login.html"

      // 隐藏当前弹出层
      layer.close(index)
    })
  })
})
