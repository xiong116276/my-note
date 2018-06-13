<?php
    header("Content-Type:application/json;charset:utf-8");
    $conn=mysqli_connect("127.0.0.1","root","","note",3306);

    $uname=$_REQUEST["uname"];
    $keys =$_REQUEST["keys"];
    $sql = "SET NAMES UTF8";

    mysqli_query($conn,$sql);
    $noteList = array();

    $sql = "SELECT * FROM noteList where uname='$uname' AND title LIKE '%$keys%'";
    $result=mysqli_query($conn,$sql);

    while(($row=mysqli_fetch_assoc($result))!==null){
      $noteList[]=$row;
    }

    echo json_encode($noteList);
?>