<?php
    header("Content-Type:application/json;charset:utf-8");
    $conn=mysqli_connect("127.0.0.1","root","","note",3306);

    $uname=$_REQUEST["uname"];
    $old=$_REQUEST["oldKey"];
    $new=$_REQUEST["newKey"];

    $sql = "SET NAMES UTF8";
    mysqli_query($conn,$sql);

    $output = array();

    $sql = "update noteList set type='$new' where uname='$uname' AND type = '$old'";
    $result=mysqli_query($conn,$sql);

    if(!$result){
      $output["msg"]="编辑失败。。。";
    }else{
      $output["msg"]="编辑成功";
    }

    echo json_encode($output);
?>