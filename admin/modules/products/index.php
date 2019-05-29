<?php 
    $open = "products";
    require_once __DIR__. "/../../autoload/autoload.php";

    if (isset($_GET['page'])){
        $p = $_GET['page'];
    }
    else{
        $p=1;
    }

    $sql = "SELECT products.*,category.name as namecate FROM products LEFT JOIN category on category.id = products.category_id";
    $products = $db->fetchJone('products',$sql,$p,2,true);
    if (isset($products['page'])){
        $sotrang = $products['page'];
        unset($products['page']);
    }
?>
<!-- http://localhost:8080/adwebphp/admin/modules/category/ -->
<!-- http://localhost:8080/adwebsite/admin/modules/category -->

<?php require_once __DIR__. "/../../layouts/header.php"; ?>

    <ol class="breadcrumb">
        <li class="breadcrumb-item">
            <a href="index.html">Dashboard</a>
        </li>   
        <li class="breadcrumb-item active">Sản phẩm</li>
    </ol>
    <!-- Page Content -->
    <h1>Danh sách sản phẩm</h1>
    <a href="add.php" class="btn btn-success">Thêm mới</a>
    <hr>
    <div class="clearfix"></div>
    <?php if(isset($_SESSION['success'])) : ?>
        <div class="alert alert-success">
            <?php echo $_SESSION['success']; unset($_SESSION['success']) ?>
        </div>  
    <?php endif; ?>
    <?php if(isset($_SESSION['error'])) : ?>
        <div class="alert alert-danger">
            <?php echo $_SESSION['error']; unset($_SESSION['error']) ?>
        </div>  
    <?php endif; ?>

<div class="row">
    <div class="card-body">
    <div class="table-responsive">
        <div id="dataTable_wrapper" class="dataTables_wrapper dt-bootstrap4">
            <div class="row">
                <div class="col-sm-12">
                    <table class="table table-bordered dataTable" id="dataTable" width="100%" cellspacing="0" role="grid" aria-describedby="dataTable_info" style="width: 100%;">
                        <thead>
                            <tr role="row">
                                <th class="sorting_asc" tabindex="0" aria-controls="dataTable" rowspan="1" colspan="1" aria-label="STT: activate to sort column descending" aria-sort="ascending" style="width: 232.004px;">STT</th>
                                <th class="sorting" tabindex="0" aria-controls="dataTable" rowspan="1" colspan="1" aria-label="Name: activate to sort column ascending" style="width: 347.004px;">Name</th>
                                <th class="sorting" tabindex="0" aria-controls="dataTable" rowspan="1" colspan="1" aria-label="Name: activate to sort column ascending" style="width: 347.004px;">Category</th>
                                <th class="sorting" tabindex="0" aria-controls="dataTable" rowspan="1" colspan="1" aria-label="Slug: activate to sort column ascending" style="width: 170.004px;">Slug</th>
                                <th class="sorting" tabindex="0" aria-controls="dataTable" rowspan="1" colspan="1" aria-label="Slug: activate to sort column ascending" style="width: 170.004px;">Thunbar</th>
                                <th class="sorting" tabindex="0" aria-controls="dataTable" rowspan="1" colspan="1" aria-label="Created_at: activate to sort column ascending" style="width: 86.0039px;">Info</th>
                                <th class="sorting" tabindex="0" aria-controls="dataTable" rowspan="1" colspan="1" aria-label="Action: activate to sort column ascending" style="width: 164.004px;">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php $stt = 1; foreach ($products as $item):?>
                                <tr>
                                    <td><?php echo $stt ?></td>
                                    <td><?php echo $item['name'] ?></td>
                                    <td><?php echo $item['namecate'] ?></td>
                                    <td><?php echo $item['slug'] ?></td>
                                    <td>
                                        <img src="<?php echo uploads() ?>product/<?php echo $item['thunbar']?>" width="80px" height="80px">
                                    </td>
                                    <td>
                                        <ul>
                                            <li>Giá : <?php echo $item['price'] ?></li>
                                            <li>Số lượng : <?php echo $item['number'] ?></li>
                                        </ul>
                                    </td>
                                    <td>
                                        <a class="btn btn-xs btn-info" href="edit.php?id=<?php echo $item['id'] ?>"><i class="fa fa-edit"></i>Sửa</a>
                                        <a class="btn btn-xs btn-danger" href="delete.php?id=<?php echo $item['id'] ?>"><i class="fa fa-times"></i>Xóa</a>
                                    </td>
                                </tr>
                            <?php $stt++; endforeach ?>
                        </tbody>
                    </table>
                    <div class="pull-right">
                        <nav aria-label="Page navigation" class="clearfix">
                            <ul class="pagination">
                                <li>
                                    <a href="" arial-label="Previous">
                                        <span arial-hidden="true">&laquo;</span>
                                    </a>
                                </li>
                                <?php for($i = 1;$i <= $sotrang; $i++) : ?>
                                    <?php 
                                        if (isset($_GET['page'])){
                                            $p = $_GET['page'];
                                        }
                                        else{
                                            $p = 1;
                                        }
                                     ?>
                                     <li class="<?php echo ($i == $p) ? 'active' : '' ?>">
                                         <a href="?page=<?php echo $i ; ?>"><?php echo $i; ?></a>
                                     </li>
                                <?php endfor; ?>
                                <li>
                                    <a href="" arial-label="Next">
                                        <span arial-hidden="true">&laquo;</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</div>

<?php require_once __DIR__. "/../../layouts/footer.php"; ?>
    