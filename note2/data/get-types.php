<?php
    header("Content-Type:application/json;charset:utf-8");
    $conn=mysqli_connect("127.0.0.1","root","","note",3306);

    $cname=$_REQUEST["cname"];

    $sql = "SET NAMES UTF8";

    mysqli_query($conn,$sql);

    $types = "";

    $sql = "SELECT classify FROM noteClassify where cname='$cname'";
    $result=mysqli_query($conn,$sql);

    while(($row=mysqli_fetch_assoc($result))!==null){
      $types=$row['classify'];
    }

    echo json_encode($types);
?>