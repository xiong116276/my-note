// var url = location.search;
// url.slice(1).split('=');
Vue.component('list-component',{
  props: ['listmsg','editFun','deleteFun'],
  template:'<div>' +
    '<div v-for="(item, index) in listmsg" class="item" v-bind:id=\'item.lid\' v-bind:type=\'item.type\'>\n' +
    '\t\t\t\t<div class="title">{{index+1}}、{{item.title}}</div>\n' +
    '\t\t\t  <div class="solution">内容：<span v-html="item.solution"></span></div>\n' +
    '\t\t\t  <div class="bottom clearfix">\n' +
    '\t\t\t\t  <span class="time">{{item.ltime}}</span>\n' +
    '\t\t\t\t  <a class="btn-edit" @click="editFun(item.lid)">编辑</a><a class="btn-delete" @click="deleteFun(item.lid,item.type)">删除</a>\n' +
    '\t\t\t  </div>\n' +
    '\t\t\t</div>' +
    '</div>',
  data:function () {
    return{

    }
  },
  methods:{

  }
});

const app = new Vue({
  el:"#app",
  data:{
    navList:[],
    add:{
      'lid':"",
      'type':'html',
      'title':'',
      'solution':''
    },
    uname:"",
    msg:[],
    scrollTop:0,
    num:0,
    menuBtn:false,
    quitBtn:false,
    modalShow:false,
    addModal:false,
    editModal:false,
    goTop:false,
    isEditClassify:false,
    classifyAddType:'',
    searchKeys:'',
    isSearch:false
  },
  created:function () {
    this.uname = sessionStorage.getItem("uname");
    if(this.uname === ""||this.uname === null){
      window.location.href = "login.html";
    }else{
      axios.get('data/get-types.php?cname='+this.uname).then((response) => {
        this.navList = response.data.split(',');
        this.getData(this.navList[0]);
        if(window.innerWidth < 769){
          document.getElementsByClassName('scroll-content')[0].style.width=this.navList.length * 100 +'px';
        }
      }).catch((error) => {console.log(error)});
    }
  },
  mounted:function () {
    window.addEventListener('scroll', this.handleScroll);
  },
  methods:{
    //获取当前type 的数据
    getData:function (type) {
      this.num = this.navList.indexOf(type);
      axios.get('data/get.php?uname='+this.uname+'&type='+type)
        .then((response) => {
          // 响应成功回调
          var oldData = response.data.noteList;
          var newData = [];
          for (var i = 0,len = oldData.length;i<len;i++){
            for (var j = 0,item;j<len-1;j++){
              if(parseFloat(oldData[j].lid) < parseFloat(oldData[j+1].lid)){
                item = oldData[j+1];
                oldData[j+1] = oldData[j];
                oldData[j] = item;
              }
            }
          }
          this.msg = oldData;

          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
        })
        .catch((error) => {
          // 响应错误回调
          console.log(error);
        });
    },
    //滚动条事件
    handleScroll:function () {
      this.scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      this.goTop = this.scrollTop > 150?true:false;
    },
    //返回顶部
    backTop:function () {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    //退出按钮
    quitShow:function () {
      this.quitBtn = this.quitBtn===true?false:true;
    },
    quitClick:function () {
      let q = confirm("确定要退出登录吗?");
      if (q === true) {
        window.location.href = "login.html";
        sessionStorage.setItem("uname", "");
      }
    },
    //小屏幕下菜单按钮
    smallMenu:function () {
      this.menuBtn = this.menuBtn == false?true:false;
    },
    //modalClose
    modalClose:function () {
      this.modalShow = false;
      this.addModal = false;
      this.editModal = false;
      this.add={'type':'html', 'title':'', 'solution':''};
    },
    //添加
    addNote:function () {
      this.modalShow = true;
      this.addModal = true;
    },
    addConfirm:function (data) {
      let params = new URLSearchParams();
      params.append('uname', this.uname);
      params.append('type', data.type);
      params.append('title', data.title);
      params.append('solution', data.solution);
      if(data.title!==null&&data.title!==""){
        axios.post("data/add-note.php",params).then((response)=>{
          alert(response.data.msg);
          if(response.data.msg.indexOf("成功") > -1){
            this.modalShow = false;
            this.addModal = false;
            this.add={'type':'html', 'title':'', 'solution':''};
            this.getData(data.type);
          }
        }).catch((error)=>{
          console.log(error)
        })
      }else{
        alert("问题不能为空。。。")
      }
    },
    //编辑分类
    editClassify:function () {
      this.isEditClassify = this.isEditClassify?false:true;
      this.menuBtn = false;
    },
    //删除分类
    classifyDelete(index){
      let isDelete = window.confirm("确定删除？");
      if(isDelete){
        let arr = [];
        let types = "";
        for(let i = 0;i<this.navList.length;i++){
          if(i !== index){
            arr.push(this.navList[i]);
          }
        }
        types = arr.join(',');
        let params = new URLSearchParams();
        params.append('cname', this.uname);
        params.append('types', types);

        axios.post("data/classify-delete.php",params).then((response)=>{
          if(response.data.msg.indexOf("成功") > -1){
            alert("删除成功！");
            window.location.reload();
          }
        }).catch((error)=>{
          console.log(error)
        })
      }else{
        // this.isEditClassify = false;
      }
    },
    classifyAdd(){
      if(this.classifyAddType.trim().length > 0){
        this.navList[this.navList.length] = this.classifyAddType;
        let params = new URLSearchParams();
        params.append('cname', this.uname);
        params.append('types', this.navList);

        axios.post("data/classify-delete.php",params).then((response)=>{
          if(response.data.msg.indexOf("成功") > -1){
            alert("添加成功！");
            window.location.reload();
          }
        }).catch((error)=>{
          console.log(error)
        })
      }else{
        alert("添加的标题不能为空！")
      }
    },
    addKeyDown(){
      document.onkeydown = (event) => {
        let e = event || window.event;
        if(e && e.keyCode === 13){
          this.classifyAdd();
        }
      }
    },
    //编辑note
    editFun:function (lid) {
      this.modalShow = true;
      this.editModal = true;
      axios.get("data/get-note.php?lid="+lid)
        .then(response =>{
          this.add.type = response.data[0].type;
          this.add.title = response.data[0].title;
          this.add.solution = response.data[0].solution;
          this.add.lid = lid;
        })
        .catch(error => {
          console.log(error);
        })
    },
    editConfirm:function(data){
      let params = new URLSearchParams();
      params.append('uname', this.uname);
      params.append('type', data.type);
      params.append('title', data.title);
      params.append('solution', data.solution);
      params.append('lid', data.lid);
      axios.post("data/set-note.php",params)
        .then(response =>{
          alert(response.data.msg);
          if(response.data.msg.indexOf("成功") > -1){
            this.modalShow = false;
            this.editModal = false;
            this.add={'type':'html', 'title':'', 'solution':''};
            this.getData(data.type);
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    //删除note
    deleteFun:function (lid,type) {
      let r=confirm("确定要删除这条记录吗？");
      if(r===true){
        axios.get("data/delete.php?lid="+lid)
          .then((response) => {
            // 响应成功回调
            alert(response.data.msg);
            this.getData(type);
          })
          .catch((error) => {
            // 响应错误回调
            console.log(error);
          });
      }
    },
    //搜索
    search(){
      this.isSearch = this.isSearch?false: true;
      document.onkeydown = (event) => {
        var e = event || window.event;
        if(e && e.keyCode === 13){
          this.searchContent(this.searchKeys);
          this.num = -1;
        }
      }
    },
    searchContent(keys){
      axios.get('data/search.php?uname='+this.uname+'&keys='+keys)
        .then((response) => {
          // 响应成功回调
          var oldData = response.data;
          var newData = [];
          for (var i = 0,len = oldData.length;i<len;i++){
            for (var j = 0,item;j<len-1;j++){
              if(parseFloat(oldData[j].lid) < parseFloat(oldData[j+1].lid)){
                item = oldData[j+1];
                oldData[j+1] = oldData[j];
                oldData[j] = item;
              }
            }
          }
          this.msg = oldData;

          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
        })
        .catch((error) => {
          // 响应错误回调
          console.log(error);
        });
    }
  }
});