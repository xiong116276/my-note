//创建元素函数
function element(tag,attrs,html) {
  var element = document.createElement(tag);
  // 判断第二个参数是属性还是内容
  if(typeof(attrs) === "string"){
    html = attrs;
    attrs = null;
  }
  // 判断是否有属性
  if(attrs !== undefined){
    for(var attr in attrs){
      element.setAttribute(attr,attrs[attr]);
    }
  }
  // 判断是否有内容
  if(html !== undefined){
    element.innerHTML = html;
  }
  return element;
}
let uname = sessionStorage.getItem("uname");
let scrollTop = 0;

window.onload = function () {
 if(uname === ""||uname === null){
    window.location.href = "login.html";
 }else{
   document.getElementById("uname").innerHTML = uname;
   menu();
   getDate("html");
 }
};
window.onresize = function () {
  menu();
};
function menu() {
  let  winWidth = 0;
  if (window.innerWidth) {
    winWidth = window.innerWidth;
  } else if ((document.body) && (document.body.clientWidth)){
    winWidth = document.body.clientWidth;
  }
  if(winWidth <= 750){
    if(document.getElementById("topBtn")){
      let topBtn = document.getElementById("topBtn");
      topBtn.parentNode.removeChild(topBtn);

      document.getElementById("menuBtn").onclick = function () {
        let arr = this.childNodes;
        for (let i = 0,len = arr.length;i < len;i++){
          if(arr[i].nodeType === 1){
            if(arr[i].style.display === "block" ){
              arr[i].style.display = "none";
            }else{
              arr[i].style.display = "block";
            }
          }
        }
      };
      addBtn();
      quitBtn();
    }

  }else{
    if(!document.getElementById("topBtn")){
      let topBtn = element(
        "div",
        {"id":"topBtn"},
        '<div class="username">\n' +
        '\t\t\t<span id="uname" class="name">'+uname+'</span>\n' +
        '\t\t\t<span class="icon-arrow">&lsaquo;</span>\n' +
        '\t\t\t<ul class="user-operation">\n' +
        '\t\t\t\t<li class="quit">退出登录</li>\n' +
        '\t\t\t</ul>\n' +
        '\t\t</div>\n' +
        '\t\t<a class="btn-add">添加</a>'
      );
      let nav = document.getElementsByClassName("nav-list")[0];
      document.body.insertBefore(topBtn,nav);

      addBtn();
      quitBtn();
    }
  }
}

//滚动条事件
window.onscroll = function () {
  scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  floatNav(document.getElementsByClassName("nav-list")[0],50);
  backTop(document.getElementsByClassName("back-top")[0]);
};
//返回顶部
function backTop(elem) {
  if(scrollTop > 150){
    elem.style.display = "block";
  }else{
    elem.style.display = "none";
  }
  elem.addEventListener("click",function () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });
}
//导航栏悬浮
function floatNav(elem,top) {
  if(scrollTop >= top){
    elem.classList.add("nav-float");
  }else{
    elem.classList.remove("nav-float");
  }
}
//tab切换
function tab() {
  document.getElementsByClassName("nav-list")[0].addEventListener("click",function (e) {
    if(e.target.getAttribute('class').indexOf('nav-item') > -1){
      let className = e.target.className;
      let added = className;
      if(className.indexOf("active") <= -1){
        added = className + " active";
      };
      function siblings(elm) {
        let p = elm.parentNode.children;
        for(let i =0,pl= p.length;i<pl;i++) {
          if(p[i] !== elm) {
            p[i].className = "nav-item";
          };
        };
      };
      siblings(e.target);
      e.target.className = added;

      let type = e.target.innerHTML;
      getDate(type);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  })
}
tab();
//获取当前type 的数据
function getDate(type) {
  let ajax = new XMLHttpRequest();
  ajax.open('get','data/get.php?uname='+uname+'&type='+type);
  ajax.send();
  ajax.onreadystatechange = function () {
    if (ajax.readyState===4 &&ajax.status===200) {
      let arr = JSON.parse(ajax.responseText);
      let frag = document.createDocumentFragment();
      for(let i = 0,len = arr.length;i<len;i++){
        let item = element(
          "div",
          {"class":"item","id":arr[i].lid,"type":arr[i].type},
          "<div class=\"title\">"+(i+1)+"、"+arr[i].title+"</div>\n" +
          "\t\t\t<div class=\"solution\">解决方案："+arr[i].solution+"</div>\n" +
          "\t\t\t<div class=\"bottom clearfix\">\n" +
          "\t\t\t\t<span class=\"time\">"+arr[i].ltime+"</span>\n" +
          "\t\t\t\t<a class=\"btn-edit\">编辑</a><a class=\"btn-delete\">删除</a>\n" +
          "</div>"
        );
        frag.appendChild(item);
      }
      document.getElementsByClassName("container")[0].innerHTML = "";
      document.getElementsByClassName("container")[0].appendChild(frag);
    }
  };
}
function showModal() {
  let modal = element(
    "div",
    {"class":"modal"},
    "<div class=\"modal-content\">\n" +
    "\t\t\t<a class=\"btn-close\">×</a>\n" +
    "\t\t\t<div class=\"modal-title\">添加note</div>\n" +
    "\t\t\t<form class=\"add-form\">\n" +
    "\t\t\t\t<div class=\"form-group\">\n" +
    "\t\t\t\t\t<label for=\"addType\">类型:</label>\n" +
    "\t\t\t\t\t<select class=\"input\" id=\"addType\" name=\"type\">\n" +
    "\t\t\t\t\t\t<option value=\"html\">html</option>\n" +
    "\t\t\t\t\t\t<option value=\"css\">css</option>\n" +
    "\t\t\t\t\t\t<option value=\"javascript\">javascript</option>\n" +
    "\t\t\t\t\t</select>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"form-group\">\n" +
    "\t\t\t\t\t<label for=\"addTitle\">问题:</label>\n" +
    "\t\t\t\t\t<textarea class=\"input\" id=\"addTitle\" type=\"text\" name=\"title\" required placeholder='你的遇到的问题。。。'></textarea>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"form-group\">\n" +
    "\t\t\t\t\t<label for=\"addSolution\">解决方案:</label>\n" +
    "\t\t\t\t\t<textarea class=\"input\" id=\"addSolution\" type=\"text\" name=\"solution\" required placeholder='你的解决方案。。。'></textarea>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</form>\n" +
    "\t\t\t<div class=\"btns\">\n" +
    "\t\t\t\t<a class=\"btn-confirm\">确认</a>\n" +
    "\t\t\t\t<a class=\"btn-cancel\">取消</a>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>"
  );
  document.body.appendChild(modal);
}
function removeModal() {
  document.body.removeChild(document.getElementsByClassName("modal")[0]);
}
//添加按钮
addBtn();
function addBtn() {
  document.getElementsByClassName("btn-add")[0].onclick = function () {
    showModal();
    // 关闭modal
    document.getElementsByClassName("btn-cancel")[0].onclick = function () {
      removeModal();
    };
    document.getElementsByClassName("btn-close")[0].onclick = function () {
      removeModal();
    };
    document.getElementsByClassName("btn-confirm")[0].onclick = function () {
      let type = document.getElementById("addType").value;
      let title = document.getElementById("addTitle").value;
      let solution = document.getElementById("addSolution").value;
      let data = "uname="+uname+"&type="+type+"&title="+title+"&solution="+solution;
      addNote(data);
      getDate(type);
    };
  };
}
function addNote(data) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "data/add-note.php");
  xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xhr.onreadystatechange = function(){
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        let text = xhr.responseText;
        if(JSON.parse(text).msg.indexOf("添加成功") > -1){
          alert(JSON.parse(text).msg);
          removeModal();
        }else{
          alert(JSON.parse(text).msg);
        }
      }
    }
  };
  xhr.send(data);
}
//编辑note
function setNote(data) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "data/set-note.php");
  xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xhr.onreadystatechange = function(){
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        let text = xhr.responseText;
        if(JSON.parse(text).msg.indexOf("编辑成功") > -1){
          alert(JSON.parse(text).msg);
          removeModal();
        }else{
          alert(JSON.parse(text).msg);
        }
      }
    }
  };
  xhr.send(data);
}
//退出按钮
function quitBtn() {
  //退出登录
  if(document.getElementsByClassName("username")[0]){
    document.getElementsByClassName("username")[0].onclick = function () {
      let state = document.getElementsByClassName("user-operation")[0].style.display;
      if(state === "none" || state === ""){
        document.getElementsByClassName("user-operation")[0].style.display = "block";
      }else {
        document.getElementsByClassName("user-operation")[0].style.display = "none";
      }
    };
  }
  document.getElementsByClassName("quit")[0].onclick = function (e) {
    let q = confirm("确定要退出登录吗?");
    if(q===true){
      window.location.href = "login.html";
      sessionStorage.setItem("uname","");
    }
  };
}
quitBtn();
//编辑按钮
function edit() {
  document.onclick = function (e) {
    let elem = e.toElement;
    if(elem.className.indexOf("btn-edit") > -1){
      let parent = elem.parentNode.parentNode;
      if(parent.className.indexOf("item") > -1){
        showModal();
        document.getElementsByClassName("modal-title")[0].innerHTML = "编辑note";
        let xhr = new XMLHttpRequest();
        xhr.open("get", "data/get-note.php?lid="+parent.id);
        xhr.send();
        xhr.onreadystatechange = function(){
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              let data = JSON.parse(xhr.responseText)[0];
              document.getElementById("addType").value = data.type;
              document.getElementById("addTitle").value = data.title;
              document.getElementById("addSolution").value = data.solution;

              document.getElementsByClassName("btn-confirm")[0].onclick = function () {
                let type = document.getElementById("addType").value;
                let title = document.getElementById("addTitle").value;
                let solution = document.getElementById("addSolution").value;
                let data = "uname="+uname+"&type="+type+"&title="+title+"&solution="+solution+"&lid="+parent.id;
                setNote(data);
                getDate(type);
              };
            }
          }
        };

        // 关闭modal
        document.getElementsByClassName("btn-cancel")[0].onclick = function () {
          removeModal();
        };
        document.getElementsByClassName("btn-close")[0].onclick = function () {
          removeModal();
        };
      }
    }else if(elem.className.indexOf("btn-delete") > -1){
      let r=confirm("确定要删除这条记录吗？");
      if (r===true) {
        let parent = elem.parentNode.parentNode;
        if(parent.className.indexOf("item") > -1){
          let xhr = new XMLHttpRequest();
          xhr.open("get", "data/delete.php?lid="+parent.id);
          xhr.send();
          xhr.onreadystatechange = function(){
            if (xhr.readyState === 4) {
              if (xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                let type = document.getElementsByClassName("nav-item active")[0].innerHTML;
                alert(data.msg);
                getDate(type);
              }
            }
          };
        }
      }
    }
  }
}
edit();









