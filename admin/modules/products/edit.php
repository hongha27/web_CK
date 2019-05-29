<?php 
    $open = "category";
    require_once __DIR__. "/../../autoload/autoload.php";


    $id = intval(getInput('id'));

    $Editproduct = $db->fetchID("products",$id);
    if (empty($Editproduct)){
        $_SESSION['error']  = "Dữ liệu không tồn tại";
        redirectAdmin("products");

    }

    $category = $db->fetchAll("category");

    if ($_SERVER["REQUEST_METHOD"] == "POST"){
            $data = 
            [
                "name" => postInput("name"),
                "slug" => to_slug(postInput('name')),
                "category_id" => postInput("category_id"),
                "price" => postInput("price"),
                "number" => postInput("number"),
                "content" => postInput("content")
            ];
            $error = [];
            if (postInput('name')==''){
                $error['name'] = 'Mời bạn nhập đầy đủ tên sản phẩm';
            }
            if (postInput('category_id')==''){
                $error['category_id'] = 'Mời bạn chọn tên danh mục';
            }
            if (postInput('price')==''){
                $error['price'] = 'Mời bạn nhập giá sản phẩm';
            }
            if (postInput('number')==''){
                $error['number'] = 'Mời bạn nhập số lượng sản phẩm';
            }
            if (postInput('content')==''){
                $error['content'] = 'Mời bạn nhập nội dung sản phẩm';
            }
            if (empty($error)){
                if (isset($_FILES['thunbar'])){
                    $file_name = $_FILES['thunbar']['name'];
                    $file_tmp = $_FILES['thunbar']['tmp_name'];
                    $file_type = $_FILES['thunbar']['type'];
                    $file_erro = $_FILES['thunbar']['error'];

                    if ($file_erro ==0){
                        $part = ROOT."product/";
                        $data['thunbar'] = $file_name;
                    }
                }
                
                $update = $db->update("products",$data,array("id"=>$id));
                if ($update > 0){
                    move_uploaded_file($file_tmp, $part.$file_name);
                    $_SESSION['success'] = "Cập nhật thành công";
                    redirectAdmin("products");
                }
                else{
                    $_SESSION['error'] = "Cập nhật thất bại";
                    redirectAdmin("products");
                }

            }
    }
?>

<?php require_once __DIR__. "/../../layouts/header.php"; ?>

    <ol class="breadcrumb">
        <li class="breadcrumb-item">
            <a href="index.html">Dashboard</a>
        </li>
        <li class="breadcrumb-item">
            <a href="">Sản phẩm</a>
        </li>
        <li class="breadcrumb-item active">Sửa mới sản phẩm</li>
    </ol>
    <!-- Page Content -->
    <h1>Sửa mới sản phẩm</h1>
    <hr>
    <div class="clearfix"></div>
        <?php if(isset($_SESSION['error'])) : ?>
            <div class="alert alert-danger">
                <?php echo $_SESSION['error']; unset($_SESSION['error']) ?>
            </div>  
        <?php endif; ?>
    <div class="row">
        <div class="col-md-12">
            <form class="form-horizontal" action="" method="POST" enctype="multipart/form-data">
                <div class="form-group">
                    <label for="inputEmail3" class="col-sm-2 control-label">Danh mục sản phẩm</label>
                    <div class="col-sm-10">
                        <select class="form-control" name="category_id">
                            <option value="">- Mời bạn chọn danh mục sản phẩm</option>
                            <?php foreach ($category as $item): ?>
                                <option value="<?php echo $item['id'] ?>" <?php echo $Editproduct['category_id'] == $item['id'] ? "selected = 'selected'" : ''?>>
                                <?php echo $item['name'] ?>
                                </option>
                            <?php endforeach ?>
                        </select>
                        <p style="color: red">
                            <?php if (isset($error['category_id'])): ?>
                                <?php echo $error['category_id']; ?>
                            <?php endif; ?>
                        </p>
                    </div>

                </div>
                <div class="form-group">
                    <label for="inputEmail3" class="col-sm-2 control-label">Tên sản phẩm</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="inputEmail3" placeholder="Tên sản phẩm" name="name" value="<?php echo $Editproduct['name'] ?>">
                        <p style="color: red">
                            <?php if (isset($error['name'])): ?>
                                <?php echo $error['name']; ?>
                            <?php endif; ?>
                        </p>
                    </div>

                </div>
                
                <div class="form-group">
                    <label for="inputEmail3" class="col-sm-2 control-label">Giá sản phẩm</label>
                    <div class="col-sm-10">
                        <input type="number" class="form-control" id="inputEmail3" placeholder="50000" name="price" value="<?php echo $Editproduct['price'] ?>">
                        <p style="color: red">
                            <?php if (isset($error['price'])): ?>
                                <?php echo $error['price']; ?>
                            <?php endif; ?>
                        </p>
                    </div>
                    
                </div>
                
                <div class="form-group">
                    <label for="inputEmail3" class="col-sm-2 control-label">Số lượng</label>
                    <div class="col-sm-10">
                        <input type="number" class="form-control" id="inputEmail3" placeholder="100" name="number" value="<?php echo $Editproduct['number'] ?>">
                        <p style="color: red">
                            <?php if (isset($error['number'])): ?>
                                <?php echo $error['number']; ?>
                            <?php endif; ?>
                        </p>
                    </div>
                    
                </div>

                <div class="form-group">
                    <label for="inputEmail3" class="col-sm-2 control-label">Giảm giá</label>
                    <div class="col-sm-10">
                        <input type="number" class="form-control" id="inputEmail3" placeholder="50000" name="sale" value="<?php echo $Editproduct['sale'] ?>">
                        <?php if (isset($error['sale'])): ?>
                            <?php echo $error['sale']; ?>
                        <?php endif; ?>
                    </div>
                </div>

                <div class="form-group">
                    <label for="inputEmail3" class="col-sm-2 control-label">Hình ảnh</label>
                    <div class="col-sm-10">
                        <input type="file" class="form-control" id="inputEmail3" name="thunbar">
                        <p style="color: red">
                            <?php if (isset($error['thunbar'])): ?>
                                <?php echo $error['thunbar']; ?>
                            <?php endif; ?>
                        </p>
                        <img src="<?php echo uploads() ?>product/<?php echo $Editproduct['thunbar'] ?>" width="50px" height="50px">
                    </div>
                </div>

                <div class="form-group">
                    <label for="inputEmail3" class="col-sm-2 control-label">Nội dung</label>
                    <div class="col-sm-10">
                        <textarea class="form-control" name="content" rows="4"><?php echo $Editproduct['content'] ?></textarea>
                        <p style="color: red" >
                            <?php if (isset($error['content'])): ?>
                                <?php echo $error['content']; ?>
                            <?php endif; ?>
                        </p>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-offset-2 col-sm-10">
                        <button type="submit" class="btn btn-success">Lưu</button>
                    </div>
                </div>
            </form>
        </div>
    </div>

<?php require_once __DIR__. "/../../layouts/footer.php"; ?>
    