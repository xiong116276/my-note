<?php
    header("Content-Type:application/json;charset:utf-8");
    $conn=mysqli_connect("127.0.0.1","root","","note",3306);

    $uname=$_REQUEST["uname"];

    $sql = "SET NAMES UTF8";
    mysqli_query($conn,$sql);

    $output = array();

    $sql = "SELECT uname FROM noteAccount";
    $result=mysqli_query($conn,$sql);

    while(($row = mysqli_fetch_assoc($result))!==null){
      $output[] = ($uname == $row['uname']);
    }

    echo json_encode($output);
?>