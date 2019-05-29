<?php 
	
	$open = "category";
	require_once __DIR__. "/../../autoload/autoload.php";

    $id = intval(getInput('id'));

    $Editproduct = $db->fetchID("products",$id);
    if (empty($Editproduct)){
        $SESSION['error']  = "Dữ liệu không tồn tại";
        redirectAdmin("products");

    }
    $num = $db->delete("products",$id);
    if ($num > 0){
    	$_SESSION['success'] = "Xóa thành công";
    	redirectAdmin("products");
    }
    else{
    	$_SESSION['error'] = "Xóa thất bại";
    	redirectAdmin("products");
    }

 ?>