<?php
    header("Content-Type:application/json;charset:utf-8");
    $conn=mysqli_connect("127.0.0.1","root","","note",3306);

    $uname=$_REQUEST["uname"];
    $type = $_REQUEST["type"];

    $sql = "SET NAMES UTF8";

    mysqli_query($conn,$sql);
    $data = (object)array();
    $noteList = array();
    $types = "";

    $sql = "SELECT * FROM noteList where uname='$uname' AND type='$type'";
    $result=mysqli_query($conn,$sql);

    while(($row=mysqli_fetch_assoc($result))!==null){
      $noteList[]=$row;
    }

    $data -> noteList = $noteList;

    echo json_encode($data);
?>