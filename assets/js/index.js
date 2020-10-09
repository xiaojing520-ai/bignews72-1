$(function () {
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
          $(".userInfo img").show().attr("src", res.data.user_pic).prev().hide()
          $(".layui-nav img")
            .show()
            .attr("src", res.data.user_pic)
            .prev()
            .hide()
        }
      }
    }
  })
})
