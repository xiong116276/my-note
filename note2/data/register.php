<?php
    header("Content-Type:application/json;charset:utf-8");
    $conn=mysqli_connect("127.0.0.1","root","","note",3306);

    $uname=$_REQUEST["uname"];
    $upassword = $_REQUEST["upassword"];
    date_default_timezone_set("Asia/Shanghai");
    $ltime = date("Y-m-d H:i:s");

    $sql = "SET NAMES UTF8";
    mysqli_query($conn,$sql);

    $output = array();

    $sql = "INSERT INTO noteAccount VALUES (NULL,'$uname','$upassword')";
    $result1=mysqli_query($conn,$sql);

    $sql = "INSERT INTO noteClassify VALUES (NULL,'$uname','标题一,标题二')";
    $result2=mysqli_query($conn,$sql);

    $sql = "INSERT INTO noteList VALUES (NULL,'$uname','标题一','笔记标题','解决方案','$ltime')";
    $result3=mysqli_query($conn,$sql);

    $sql = "INSERT INTO noteList VALUES (NULL,'$uname','标题二','你的问题','解决方案','$ltime')";
    $result4=mysqli_query($conn,$sql);

    if(!$result1 && !$result2&&!$result3&&!$result4){
        $output["msg"]="注册失败。。。";
    }else{
        $output["msg"]="注册成功";
    }

    echo json_encode($output);
?>