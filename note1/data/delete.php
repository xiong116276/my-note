<?php
    header("Content-Type:application/json;charset:utf-8");
    $conn=mysqli_connect("127.0.0.1","root","","hometown",3306);

    $lid=$_REQUEST["lid"];

    $sql = "SET NAMES UTF8";
    mysqli_query($conn,$sql);

    $output = array();

    $sql = "delete from noteList where lid='$lid'";
    $result=mysqli_query($conn,$sql);

    if(!$result){
      $output["msg"]="删除失败。。。";
    }else{
      $output["msg"]="删除成功";
    }

    echo json_encode($output);
?>