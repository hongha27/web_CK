<?php 
	require_once __DIR__. "/autoload/autoload.php";
	$category =$db->fetchAll("accounts");
	var_dump($category)
?>

<?php require_once __DIR__. "/layouts/header.php"; ?>

                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <a href="index.html">Dashboard</a>
                        </li>
                        <li class="breadcrumb-item active">Blank Page</li>
                    </ol>
                    <!-- Page Content -->
                    <h1>Blank Page</h1>
                    <hr>
                    <p>This is a great starting point for new custom pages.</p>

<?php require_once __DIR__. "/layouts/footer.php"; ?>
    