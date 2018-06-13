<?php
    header("Content-Type:application/json;charset:utf-8");
    $conn=mysqli_connect("127.0.0.1","root","","hometown",3306);

    $lid=$_REQUEST["lid"];

    $sql = "SET NAMES UTF8";
    mysqli_query($conn,$sql);

    $noteList = array();

    $sql = "SELECT * FROM noteList where lid='$lid'";
    $result=mysqli_query($conn,$sql);

    while(($row=mysqli_fetch_assoc($result))!==null){
      $noteList[]=$row;
    }

    echo json_encode($noteList);
?>