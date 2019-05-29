<?php 
    $open = "category";
    require_once __DIR__. "/../../autoload/autoload.php";

    $category =$db->fetchAll('category');

?>
<!-- http://localhost:8080/adwebphp/admin/modules/category/ -->
<!-- http://localhost:8080/adwebsite/admin/modules/category -->

<?php require_once __DIR__. "/../../layouts/header.php"; ?>

    <ol class="breadcrumb">
        <li class="breadcrumb-item">
            <a href="index.html">Dashboard</a>
        </li>   
        <li class="breadcrumb-item active">Danh mục</li>
    </ol>
    <!-- Page Content -->
    <h1>Danh sách danh mục</h1>
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
                                <th class="sorting" tabindex="0" aria-controls="dataTable" rowspan="1" colspan="1" aria-label="Slug: activate to sort column ascending" style="width: 170.004px;">Slug</th>
                                <th class="sorting" tabindex="0" aria-controls="dataTable" rowspan="1" colspan="1" aria-label="Created_at: activate to sort column ascending" style="width: 86.0039px;">Created_at</th>
                                <th class="sorting" tabindex="0" aria-controls="dataTable" rowspan="1" colspan="1" aria-label="Action: activate to sort column ascending" style="width: 164.004px;">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php $stt = 1; foreach ($category as $item):?>
                                <tr>
                                    <td><?php echo $stt ?></td>
                                    <td><?php echo $item['name'] ?></td>
                                    <td><?php echo $item['slug'] ?></td>
                                    <td><?php echo $item['created_at'] ?></td>
                                    <td>
                                        <a class="btn btn-xs btn-info" href="edit.php?id=<?php echo $item['id'] ?>"><i class="fa fa-edit"></i>Sửa</a>
                                        <a class="btn btn-xs btn-danger" href="delete.php?id=<?php echo $item['id'] ?>"><i class="fa fa-times"></i>Xóa</a>
                                    </td>
                                </tr>
                            <?php $stt++; endforeach ?>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="row">
                
                <div class="col-sm-12 col-md-7">
                    <div class="dataTables_paginate paging_simple_numbers" id="dataTable_paginate">
                        <ul class="pagination">
                            <li class="paginate_button page-item previous disabled" id="dataTable_previous"><a href="#" aria-controls="dataTable" data-dt-idx="0" tabindex="0" class="page-link">Previous</a></li>
                            <li class="paginate_button page-item active"><a href="#" aria-controls="dataTable" data-dt-idx="1" tabindex="0" class="page-link">1</a></li>
                            <li class="paginate_button page-item "><a href="#" aria-controls="dataTable" data-dt-idx="2" tabindex="0" class="page-link">2</a></li>
                            <li class="paginate_button page-item "><a href="#" aria-controls="dataTable" data-dt-idx="3" tabindex="0" class="page-link">3</a></li>
                            <li class="paginate_button page-item "><a href="#" aria-controls="dataTable" data-dt-idx="4" tabindex="0" class="page-link">4</a></li>
                            <li class="paginate_button page-item "><a href="#" aria-controls="dataTable" data-dt-idx="5" tabindex="0" class="page-link">5</a></li>
                            <li class="paginate_button page-item "><a href="#" aria-controls="dataTable" data-dt-idx="6" tabindex="0" class="page-link">6</a></li>
                            <li class="paginate_button page-item next" id="dataTable_next"><a href="#" aria-controls="dataTable" data-dt-idx="7" tabindex="0" class="page-link">Next</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<?php require_once __DIR__. "/../../layouts/footer.php"; ?>
    