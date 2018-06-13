<?php
    header("Content-Type:application/json,charset=utf-8");
    $conn=mysqli_connect("127.0.0.1","root","","note",3306);

    $uname=$_REQUEST["uname"];
    $upassword=$_REQUEST["upassword"];

    $sql = "SET NAMES UTF8";
    mysqli_query($conn,$sql);

    $output=array();

    $sql = "SELECT upassword FROM noteAccount where uname='$uname'";
    $result = mysqli_query($conn,$sql);

    $row=mysqli_fetch_assoc($result);

    if(empty($row)){
        $output['state']=0;
    }else if($row['upassword'] === $upassword){
        $output['state']=1;
    }else{
        $output['state']=2;
    }

    echo json_encode($output);
?>