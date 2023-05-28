function loadNavbar() {
    // 创建 XMLHttpRequest 对象
    var xhttp = new XMLHttpRequest();
  
    // 监听 readyStateChange 事件
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        // 将导航栏插入到容器元素中
        document.getElementById("navbar-container").innerHTML = this.responseText;
      }
    };
  
    // 发送 AJAX 请求，加载导航栏文件
    xhttp.open("GET", "navbar.html", true);
    xhttp.send();
  }
  