<?php
    header("Content-Type:application/json;charset:utf-8");
    $conn=mysqli_connect("127.0.0.1","root","","note",3306);

    $cname=$_REQUEST["cname"];
    $types = $_REQUEST["types"];

    $sql = "SET NAMES UTF8";
    mysqli_query($conn,$sql);

    $output = array();

    $sql = "update noteClassify set classify='$types' where cname='$cname'";
    $result=mysqli_query($conn,$sql);
    if(!$result){
        $output["msg"]="添加失败。。。";
    }else{
        $output["msg"]="添加成功";
    }

    echo json_encode($output);
?>