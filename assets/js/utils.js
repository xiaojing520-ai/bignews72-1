$.ajaxPrefilter(function (options) {
  // console.log(options);
  // 这个函数中的options选项就包含着$.ajax()函数中的对象数据
  options.url = "http://ajax.frontend.itheima.net" + options.url

  // 统一设置token
  if (options.url.includes("/my")) {
    options.headers = {
      Authorization: window.localStorage.getItem("token")
    }
  }
})
