<?php
    header("Content-Type:application/json;charset:utf-8");
    $conn=mysqli_connect("127.0.0.1","root","","hometown",3306);

    $lid=$_REQUEST["lid"];
    $title=$_REQUEST["title"];
    $type=$_REQUEST["type"];
    $solution=$_REQUEST["solution"];

    $sql = "SET NAMES UTF8";
    mysqli_query($conn,$sql);

    $output = array();

    $sql = "update noteList set title='$title',solution='$solution',type='$type' where lid='$lid'";
    $result=mysqli_query($conn,$sql);

    if(!$result){
      $output["msg"]="编辑失败，有些引号和符号要添加转义符：\\";
    }else{
      $output["msg"]="编辑成功";
    }

    echo json_encode($output);
?>