<?php
    header("Content-Type:application/json;charset:utf-8");
    $conn=mysqli_connect("127.0.0.1","root","","hometown",3306);

    $uname=$_REQUEST["uname"];
    $type = $_REQUEST["type"];
    $title = $_REQUEST["title"];
    $solution = $_REQUEST["solution"];
    date_default_timezone_set("Asia/Shanghai");
    $ltime = date("Y-m-d H:i:s");

    $sql = "SET NAMES UTF8";
    mysqli_query($conn,$sql);

    $output = array();

    if(empty($title)){
      $output["msg"]="问题不能为空。。。";
    }else{
      $sql = "INSERT INTO noteList VALUES (NULL,'$uname','$type','$title','$solution','$ltime')";
      $result=mysqli_query($conn,$sql);
      if(!$result){
        $output["msg"]="添加失败，有些引号和符号要添加转义符：\\";
      }else{
        $output["msg"]="添加成功";
      }
    }
    echo json_encode($output);
?>