$.ajaxPrefilter(function (options) {
  // console.log(options);
  // 这个函数中的options选项就包含着$.ajax()函数中的对象数据
  options.url = "http://ajax.frontend.itheima.net" + options.url

  // 统一设置token
  // 1. 由于$.ajaxPrefilter只要发送请求 就会被执行
  // 2. 但是登陆和注册的请求是不需要携带token的
  // 3. 因此需要将登陆和注册的请求排除掉

  if (options.url.includes("/my")) {
    options.headers = {
      Authorization: window.localStorage.getItem("token")
    }
  }

  // 开启防翻墙
  options.complete = function (res) {
    // console.log(res);
    // 根据响应回来的状态码和状态描述进行判断
    if (
      res.responseJSON.status == 1 &&
      res.responseJSON.message == "身份认证失败！"
    ) {
      // 说明没有登陆或是token已经失效 请重新登陆
      // 跳转到登陆页面
      location.href = "./login.html"
    }
  }
})
