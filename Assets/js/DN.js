/* -------------------------------------------- File code của Duy -------------------------------------------- */
class Tuple extends Array { 
    constructor(...items) { 
        super(...items); 
        Object.freeze(this);
    } 
}

$(function(){
    $('#PlaceOrder').click(function(event) {
        event.preventDefault();
        if (!localStorage.user)
            return alert('Bạn chưa đăng nhập.'),0;
        // if ($('#BillingFirstName').val() == "")
        //     return alert('Bạn chưa nhập họ.'),0;
        if ($('#BillingLastName').val() == "")
            return alert('Bạn chưa nhập tên.'),0;
        if ($('#BillingAddress1').val() == "")
            return alert('Bạn chưa nhập địa chỉ giao hàng.'),0;
        if ($('#BillingState').val() == "")
            return alert('Bạn chưa nhập quận.'),0;
        if ($('#BillingCity').val() == "")
            return alert('Bạn chưa nhập thành phố.'),0;
        if ($('#BillingEmail').val() == "")
            return alert('Bạn chưa nhập email.'),0;
        if ($('#BillingPhone').val() == "")
            return alert('Bạn chưa nhập số điện thoại.'),0;
        if ($('#BillingPassword').val() == "")
            return alert('Bạn chưa nhập mật khẩu để xác nhận đặt hàng.'),0;
        if ($('#BillingPassword').val() != accounts.find(function(val){ return val.username == localStorage.user }).password)
            return alert('Mật khẩu không chính xác.'),0;
        
        alert('Bạn đã đặt hàng thành công.');
        localStorage.setItem('CRBill', new Tuple('#'+Math.round(Math.random()*1000000),localStorage.carts,localStorage.coupon,localStorage.Ship.slice(13,15)));
        localStorage.removeItem('Ship');
        localStorage.removeItem('carts');
        localStorage.removeItem('coupon');
        document.location = "myaccount.html?tab=OldBills";
    });
    $('#USD').click(function(event) {
        if ($('#TotalBill').text().slice(-1) == 'D')
        {
            if (localStorage.user)
            {
                var CurrentUser = accounts.find(function (valid) { return valid.username == localStorage.user; });
                var name = CurrentUser.name.split(' ');
                var total = 0, ship = 0;
                if (Object.values(JSON.parse(localStorage.Ship)[0]).toString() != 'VN') ship = 500000;
                for (var i = 0; i < CurrentCart.length; i++) {
                    var val = data.find(function (book) { return book.id == Object.keys(CurrentCart[i]);});
                    total += +Math.min(val.sale, val.gia) * +Object.values(CurrentCart[i]);
                }
                if (localStorage.coupon){
                    if (localStorage.coupon.slice(-1) == '%')
                        total = (total / 100) * (+localStorage.coupon.slice(0, -1));
                    else
                        total = Math.max(total - +localStorage.coupon, 0);
                }
                $('#TotalBill').text(MoneyShow(total+ship));
            }
            else
            {
                var total = 0, ship = 0;
                if (Object.values(JSON.parse(localStorage.Ship)[0]).toString() != 'VN') ship = 500000;
                for (var i = 0; i < CurrentCart.length; i++) {
                    var val = data.find(function (book) { return book.id == Object.keys(CurrentCart[i]);});
                    total += +Math.min(val.sale, val.gia) * +Object.values(CurrentCart[i]);
                }
                if (localStorage.coupon){
                    if (localStorage.coupon.slice(-1) == '%')
                        total = (total / 100) * (+localStorage.coupon.slice(0, -1));
                    else
                        total = Math.max(total - +localStorage.coupon, 0);
                }

                $('#TotalBill').text(MoneyShow(total+ship));
            }

            $('#USD').val('Hiện giá bằng USD');
        }
        else
        {
            var usd = +$('#TotalBill').text().split(' ').shift().replace('.','')/1000/21;
            $('#TotalBill').text(Math.round(usd*100)/100 +' USD');
            $('#USD').val('Hiện giá bằng VNĐ');
        }
        
    });
	$('#ToTop').click(function(event) {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	});
	$('#BtnDKmail').click(function(event) {
		if ($('#DKMail').val() == "" || /.+@.+\.com/.exec($('#DKMail').val()) == null)
		{
			event.preventDefault();
			alert('Mail không hợp lệ (vd: xyz@gmail.com)');
		}
		else
		{
			event.preventDefault();
			alert('Bạn đã đăng ký thành công.\nNhững tin tức mới nhất của chúng tôi sẽ luôn được gửi đến '+$('#DKMail').val());
			$('#DKMail').val("");
		}
	});
	$('#UpdateShip').click(function(event) {
		localStorage.setItem('Ship', JSON.stringify([{"country":$('#calc_shipping_country').val()},{"state":$('#calc_shipping_state').val()},{"postcode":$('#calc_shipping_postcode').val()}]));
	});
	$('#calc_shipping_country').change(function(event) {
		localStorage.setItem('Ship', JSON.stringify([{"country":$('#calc_shipping_country').val()},{"state":$('#calc_shipping_state').val()},{"postcode":$('#calc_shipping_postcode').val()}]));
		showBill(localStorage.user);
	});
	$('#LogOut').click(function(event) {
		localStorage.removeItem('user');
		LoadUser(); 
		location.reload();
		if (document.URL.substring(document.URL.lastIndexOf('?')).toString().includes('myaccount.html') != -1)
			document.location = "index.html";
	});
	$('.QPw').click(function(event) {
		var mail = prompt("Hãy nhập mail đăng ký của bạn, chúng tôi sẽ gửi link khôi phục mật khẩu cho bạn", "xyz@gmail.com");
		if (mail != null) {
		    alert('Thông tin khôi phục đã được gửi đến: ' + mail);
		}
	});
	$('.DK').click(function(event) {
		$('#dangKy').css('display', 'block');
		$('#dangNhap').css('display', 'none');

	});
	$('.DN').click(function(event) {
		$('#dangKy').css('display', 'none');
		$('#dangNhap').css('display', 'block');
	});
	$('.DNn').click(function(event) {
		if ($('#DN_Name').val() == "" || $('#DN_Pw').val() == "")
		{
			alert("Bạn chưa nhập tài khoản hoặc mật khẩu.");
			if ($('#DN_Name').val() == "")
				$('#DN_Name').css('border', 'solid 2px red');
			else
				$('#DN_Name').css('border', '0');

			if ($('#DN_Pw').val() == "")
				$('#DN_Pw').css('border', 'solid 2px red');
			else
				$('#DN_Pw').css('border', '0');
		}
		else
		{
			$('#DN_Name').css('border', '0');
			$('#DN_Pw').css('border', '0');
			var index = accounts.findIndex(function (valid) {return valid["username"] == $('#DN_Name').val();});
			if (index == -1)
				alert('Tài khoản không tồn tại.');
			else
			{
				if (accounts[index]["password"] != $('#DN_Pw').val())
					alert('Mật khẩu không chính xác.')
				else
				{
					alert('Đăng nhập thành công.')
					document.getElementById('UserLog').innerHTML = `<a href="#"  class="btn-lg" data-toggle="modal" data-target="#myModal"><i class="fa fa-user"></i> Đăng xuất(`+$('#DN_Name').val()+")</a>";
					localStorage.setItem('user',  $('#DN_Name').val());
					location.reload();
				}
			}
		}
	});
	$('.DKk').click(function(event) {
		if ($('#DK_Name').val() == "" || $('#DK_Pw').val() == "" || $('#DK_RPw').val() == "" || $('#DK_Email').val() == "" || $('#DK_Mobile').val() == "" || $('#DK_Birth').val() == "" || $('[type="radio"]:checked').val() == undefined)
		{
			alert("Bạn chưa nhập đủ thông tin.");
			if ($('#DK_Name').val() == "")
				$('#DK_Name').css('border', 'solid 2px red');
			else
				$('#DK_Name').css('border', '0');

			if ($('#DK_Pw').val() == "")
				$('#DK_Pw').css('border', 'solid 2px red');
			else
				$('#DK_Pw').css('border', '0');


			if ($('#DK_RPw').val() == "")
				$('#DK_RPw').css('border', 'solid 2px red');
			else
				$('#DK_RPw').css('border', '0');


			if ($('#DK_Email').val() == "")
				$('#DK_Email').css('border', 'solid 2px red');
			else
				$('#DK_Email').css('border', '0');


			if ($('#DK_Mobile').val() == "")
				$('#DK_Mobile').css('border', 'solid 2px red');
			else
				$('#DK_Mobile').css('border', '0');


			if ($('#DK_Birth').val() == "")
				$('#DK_Birth').css('border', 'solid 2px red');
			else
				$('#DK_Birth').css('border', '0');

		}
		else
		{
			$('#DK_Name').css('border', '0');
			$('#DK_Pw').css('border', '0');
			$('#DK_RPw').css('border', '0');
			$('#DK_Email').css('border', '0');
			$('#DK_Mobile').css('border', '0');
			$('#DK_Birth').css('border', '0');
			if (/(\d[a-zA-Z])|([a-zA-Z]\d)/.exec($('#DK_Pw').val()) == null || $('#DK_Pw').val().length < 8)
			{
				alert('Mật khẩu tối đa phải có 8 ký tự gồm số và chữ.');
				return;
			}
			if($('#DK_Pw').val() != $('#DK_RPw').val())
			{
				alert('Mật khẩu nhập lại không đúng.');
				return;
			}
			if(/.+@.+\.com/.exec($('#DK_Email').val()) == null)
			{
				alert('Email không hợp lệ.\n (vd: xyz@gmail.com)');
				return;
			}
			if(/0[\d]{9,13}/.exec($('#DK_Mobile').val()) == null || $('#DK_Mobile').val().length > 12)
			{
				alert('Số điện thoại không hợp lệ.');
				return;
			}
			alert('Đăng ký tài khoản thành công.');
		}
	});
});

function ToHistory () {
	if (localStorage.user)
		document.location = "myaccount.html?tab=OldBills";
	else
		alert('Bạn chưa đăng nhập.')
}

function MyProfileType () {
	var val = "", page = new URLSearchParams(window.location.search).get('tab');
	var CurrentUser = accounts.find(function (valid) { return valid.username == localStorage.user; });
	var CurrentBills = [];
	var TotalMoney = 0;
	// console.log(CurrentUser);
	for(var i = 0; i < Bills.length; i++)
		if (Bills[i].user == CurrentUser.username)
			CurrentBills.push(i);
	// console.log(CurrentBills)
	if (page == 'OldBills')
	{
		var ans = "";
		ans+=`<div id="left">
            <h1>Quản lý tài khoản</h1>
            <div>
                <ul>
                    <li class="accType"><a href="myaccount.html?tab=MyProfile">Thông tin tài khoản</a></li>
                    <li class="accType SelectedLi"><a href="myaccount.html?tab=OldBills">Lịch sử mua hàng</a></li>
                    <li class="accType"><a href="myaccount.html?tab=WishList">Danh sách yêu thích</a></li>
                </ul>
            </div>
        </div>
        
        <div id="HistoryBills">
            <div id="right">
                <form class="ProHeight" id="LSMHF">
                    <h1>Lịch sử mua hàng</h1>
                    <hr class="bold"><br>`;
        if (localStorage.CRBill)
        {
            var total = 0;
            var mem = localStorage.CRBill.split(',');
            var ship = mem.pop() == 'VN' ? 0 : 500000;
            var tmp = mem.pop();
            var coupon = "";
            if (tmp == "" || tmp == 0) coupon = "0";
            else coupon = tmp;
            ans += `<div>
                        <div class="AutoWidth container">
                            <div class="row">
                                <div class="LabelBillCode col-md-2">Mã đơn hàng: </div>
                                <div class="BillCode col-md-2">${mem.shift()}</div>
                                <div class="col-md-3"><input type="submit" value="hủy đơn hàng" onclick="CancelCart()"></div>
                                <div class="col-md-2">Trạng thái: </div>
                                <div class="BillCode col-md-2">${'Đang giao hàng'}</div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="TextAlign BoderLeft BoderTop Border col-md-2">Hình ảnh</div>
                                <div style="" class="BoderTop Border col-md-4">Tên sản phẩm</div>
                                <div class="width12 BoderTop Border col-md-2">số lượng</div>
                                <div class="width18 BoderTop Border col-md-2">đơn giá</div>
                                <div class="width20 BoderTop Border col-md-2">Tổng</div>
                            </div>`;
            for (var i = 0; i < mem.length; i++)
            {
                var s = (mem[i].match(/\d+/g)+'').split(',');
                ans += `<div class="row">
                        <a href="single-product.html?id=${s[0]}"><div class="TextAlign OldBill BoderLeft Border col-md-2">
                            <img style="height:95%;" src="${data[+s[0]-1].img}" alt="">
                        </div></a>
                        <a href="single-product.html?id=${s[0]}"><div class="OldBill Border col-md-4">${data[+s[0]-1].tenSP}</div></a>
                        <div class="width12 OldBill Border col-md-2">${s[1]}</div>
                        <div class="width18 OldBill Border col-md-2">${MoneyShow(data[+s[0]-1].sale)}</div>
                        <div class="width20 OldBill Border col-md-2">${MoneyShow(data[+s[0]-1].sale*s[1])}</div>
                    </div>`;
                total += data[+s[0]-1].sale*s[1];
            }

            ans+=`
                            <div class="row">
                                <div class="BoderLeft Border col-md-6">
                                    ${+coupon == 0 ? 'Không có mã giảm giá.' : 'Đã áp dụng mã giảm giá: ' + (coupon.slice(-1)=='%'?coupon:MoneyShow(coupon))}
                                </div>
                                <div class="Border col-md-6">
                                    ${ship == 0 ? 'Miễn phí vận chuyển' : 'Phí vận chuyển: ' + MoneyShow(ship)}
                                    
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-3"> </div>
                                <div class="BorderLeft Border col-md-6">
                                    Tổng đơn hàng: ${MoneyShow(+ship+(coupon.slice(-1)=='%'?(total/100)*(+coupon.slice(0,-1)):total-+coupon))}
                                </div>
                                <div class="col-md-3"> </div>
                            </div>
                        </div>
                        <br><hr class="half"><br>
                    </div>`;
        }            
        
        for(var i = 0; i < CurrentBills.length; i++, TotalMoney = 0)
        {
            if (Bills[CurrentBills[i]].products.length == 0) continue;
        	ans+=`<div>
                        <div class="AutoWidth container">
                            <div class="row">
                                <div class="LabelBillCode col-md-2">Mã đơn hàng: </div>
                                <div class="BillCode col-md-2">${Bills[CurrentBills[i]].id}</div>
                                <div class="col-md-3"></div>
                                <div class="col-md-2">Trạng thái: </div>
                                <div class="BillCode col-md-2">${Bills[CurrentBills[i]].deal?'Đã giao hàng':'Đang giao hàng'}</div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="TextAlign BoderLeft BoderTop Border col-md-2">Hình ảnh</div>
                                <div style="" class="BoderTop Border col-md-4">Tên sản phẩm</div>
                                <div class="width12 BoderTop Border col-md-2">số lượng</div>
                                <div class="width18 BoderTop Border col-md-2">đơn giá</div>
                                <div class="width20 BoderTop Border col-md-2">Tổng</div>
                            </div>`;
                  	for(var j = 0; j < Bills[CurrentBills[i]].products.length; j++)
                  	{
                  		// console.log(Bills[i].products[j]+1)
                  		ans += `<div class="row">
                                <a href="single-product.html?id=${Bills[CurrentBills[i]].products[j]}"><div class="TextAlign OldBill BoderLeft Border col-md-2">
                                    <img style="height:95%;" src="${data[+Bills[CurrentBills[i]].products[j]-1].img}" alt="">
                                </div></a>
                                <a href="single-product.html?id=${Bills[CurrentBills[i]].products[j]}"><div class="OldBill Border col-md-4">${data[+Bills[CurrentBills[i]].products[j]-1].tenSP}</div></a>
                                <div class="width12 OldBill Border col-md-2">${Bills[i].number[j]}</div>
                                <div class="width18 OldBill Border col-md-2">${MoneyShow(data[+Bills[CurrentBills[i]].products[j]-1].gia)}</div>
                                <div class="width20 OldBill Border col-md-2">${MoneyShow(data[+Bills[CurrentBills[i]].products[j]-1].gia*Bills[CurrentBills[i]].number[j])}</div>
                            </div>`;
                        TotalMoney += data[+Bills[CurrentBills[i]].products[j]-1].gia*Bills[CurrentBills[i]].number[j];
                  	}
                    ans+=`
                            <div class="row">
                                <div class="BoderLeft Border col-md-6">
                                    ${+Bills[CurrentBills[i]].coupon == 0 ? 'Không có mã giảm giá.' : 'Đã áp dụng mã giảm giá: ' + (Bills[CurrentBills[i]].coupon.slice(-1)=='%'?Bills[CurrentBills[i]].coupon:MoneyShow(Bills[CurrentBills[i]].coupon))}
                                </div>
                                <div class="Border col-md-6">
                                    ${+Bills[CurrentBills[i]].ship == 0 ? 'Miễn phí vận chuyển' : 'Phí vận chuyển: ' + MoneyShow(Bills[CurrentBills[i]].ship)}
                                    
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-3"> </div>
                                <div class="BorderLeft Border col-md-6">
                                    Tổng đơn hàng: ${MoneyShow(+Bills[CurrentBills[i]].ship+(Bills[CurrentBills[i]].coupon.slice(-1)=='%'?(TotalMoney/100)*(+Bills[CurrentBills[i]].coupon.slice(0,-1)):TotalMoney-+Bills[CurrentBills[i]].coupon))}
                                </div>
                                <div class="col-md-3"> </div>
                            </div>
                        </div>
                        <br><hr class="half"><br>
                    </div>`;
        }            
        

        ans+=   `</form>
            </div>
        </div>`;
        MyAccountPage.innerHTML = ans;
	}
	else if (page == 'WishList')
	{
		var ans = "";
		ans += `<div id="left">
            <h1>Quản lý tài khoản</h1>
            <div>

                <ul>
                    <li class="accType"><a href="myaccount.html?tab=MyProfile">Thông tin tài khoản</a></li>
                    <li class="accType"><a href="myaccount.html?tab=OldBills">Lịch sử mua hàng</a></li>
                    <li class="accType SelectedLi"><a href="myaccount.html?tab=WishList">Danh sách yêu thích</a></li>
                </ul>
            </div>
        </div>

		<div id="WishList">
            <div id="right">
                <form  class="ProHeight">
                    <h1>Danh sách yêu thích</h1>
                    <hr class="bold"><br>
                    <div>
                    	<div class="AutoWidth container">
                    		<div class="row">
                                <div class="TextAlign BoderLeft BoderTop Border col-md-2">Hình ảnh</div>
                                <div style="" class="BoderTop Border col-md-4">Tên sản phẩm</div>
                                <div class="width20 BoderTop Border col-md-2">Giá hiện tại</div>
                                <div class="BoderTop Border col-md-3">Trạng thái</div>
                            </div>

        `;
        for (var i = 0; i < CurrentUser.wishlist.length; i++)
        {
        	CurrentBook = data.find(function(val){return val.id == CurrentUser.wishlist[i];});

        	ans += `<div class="row">
        						<a href="single-product.html?id=${1+data.findIndex(function (valid){return valid.id == CurrentBook.id;})}"><div class="TextAlign OldBill BoderLeft Border col-md-2">
                                    <img style="height:95%;" src="${CurrentBook.img}" alt="">
                                </div></a>
                                <a href="single-product.html?id=${1+data.findIndex(function (valid){return valid.id == CurrentBook.id;})}"><div class="OldBill Border col-md-4">${CurrentBook.tenSP}</div></a>
                                
                                <div class="width20 OldBill Border col-md-2">${MoneyShow(CurrentBook.gia)}</div>
                                <div class="${CurrentBook.TT?"":"Red "}OldBill Border col-md-3">${CurrentBook.TT?"Còn hàng":"Hết hàng"}</div>
                            </div>`;
        }



                    ans+=    `</div>
                        <br><hr class="half"><br>
                    </div>
                    
                    
                </form>
            </div>
        </div>`;

        MyAccountPage.innerHTML = ans;
	}

	else
		MyAccountPage.innerHTML = `<div id="left">
            <h1>Quản lý tài khoản</h1>
            <div>
                <ul>
                    <li class="accType SelectedLi"><a href="myaccount.html?tab=MyProfile">Thông tin tài khoản</a></li>
                    <li class="accType"><a href="myaccount.html?tab=OldBills">Lịch sử mua hàng</a></li>
                    <li class="accType"><a href="myaccount.html?tab=WishList">Danh sách yêu thích</a></li>
                </ul>
            </div>
        </div>
        <div id="ProfileInfo">
        	<div id="right">
        		<form class="height700">
        			<h1>Thông tin tài khoản</h1>
        			<hr class="bold"><br>
                    <div class="avataProfileForm">
                        <img src="${CurrentUser.img}" class="imgAva" alt="">
                        <br>
                        <a href="#" onclick="alert('Chức năng này chưa có sẵn.')" class="UndLine">Thay đổi ảnh đại diện.</a>
                    </div>
                    
                    <div class="ProfileInfo container">
                        <div class="height50 row">
                            <div class="col-md-3">Họ và tên:</div> 
                            <div class="col-md-3">
                                <input type="text" size="45" placeholder="Nhập tên mới" class="Profile" value="${CurrentUser.name}">
                            </div>
                        </div> 
                        <div class="height50 row">
                            <div class="col-md-3">Số điện thoại:</div> 
                            <div class="col-md-3">
                                <input type="text" size="45" placeholder="Nhập số điện thoại mới" class="Profile" value="${CurrentUser.phone}">
                            </div>
                        </div> 
                        <div class="height50 row">
                            <div class="col-md-3">Email:</div> 
                            <div class="col-md-3">
                                <input type="text" size="45" placeholder="Nhập email mới" class="Profile" value="${CurrentUser.email}">
                            </div>
                        </div> 
                        <div class="height50 row"> 
                            <div class="col-md-3">Ngày sinh:</div> 
                            <div class="col-md-3">
                                <input type="date" class="Profile width350" value="${CurrentUser.born.split('/').reverse().join("-")}">
                            </div>
                        </div> 
                        <div class="height50 row">
                            <div class="col-md-3">Giới tính:</div> 
                            <div class="col-md-2">
                                <input type="radio" name='gender' ${CurrentUser.gender=='Nam'?'checked':''}> Nam
                            </div>
                            <div class="col-md-2">
                                <input type="radio" name='gender' ${CurrentUser.gender=='Nữ'?'checked':''}> Nữ 
                            </div>
                        </div>
                        <div class="height50 row">
                            <div class="col-md-3">Số thẻ ngân hàng:</div> 
                            <div class="col-md-3">
                                <input type="text" size="45" placeholder="Nhập số thẻ ngân hàng mới" class="Profile" value="${CurrentUser.card}">
                            </div>
                        </div> 
                        <div class="row">
                            <div class="col-md-10 width570">
                                <form method="post" action="#" class="shipping_calculator">
                                    <h2><a class="UndLine shipping-calculator-button" data-toggle="collapse" href="#calcalute-shipping-wrap" aria-expanded="false" aria-controls="calcalute-shipping-wrap">Thay đổi mật khẩu</a></h2>

                                    <section id="calcalute-shipping-wrap" class="shipping-calculator-form collapse">
                                    <div class="height50 row">
                                        <div class="col-md-4">Mật khẩu hiện tại:</div> 
                                        <div class="col-md-8">
                                            <input type="password" placeholder="Nhập mật khẩu hiệu tại" size="45" class="Profile">
                                        </div>
                                    </div>
                                    <div class="height50 row">
                                        <div class="col-md-4">Mật khẩu mới:</div> 
                                        <div class="col-md-8">
                                            <input type="password" placeholder="Nhập mật khẩu mới" size="45" class="Profile">
                                        </div>
                                    </div>
                                    <div class="height50 row"> 
                                        <div class="col-md-4">Nhập lại mật khẩu:</div> 
                                        <div class="col-md-8">
                                            <input type="password" placeholder="Nhập lại mật khẩu mới" size="45" class="Profile">
                                        </div>
                                    </div>
                                    </section>
                                </form>
                            </div>
                            <div class="LineBtnUpdate height50 row">
                                <div class="col-md-5"></div>
                                <div style="" class="col-md-2">
                                    <input type="button" class="BtnUpdate" onclick="alert('Bạn đã cập nhật thông tin thàng công.')" value="Cập nhật">
                                </div>
                                <div class="col-md-5"></div>
                            </div> 
                        </div>
                    </div>
                    
        		</form>
        	</div>
        </div>`;
    $('#MyAccountPage').css('height', $('#right').height()+100);
}

function ToWishList () {
    if(localStorage.user)
        document.location = "myaccount.html?tab=WishList";
    else
        alert('Bạn chưa đăng nhập.');
}

function CheckoutInfo () {
    if (localStorage.user)
    {
        var CurrentUser = accounts.find(function (valid) { return valid.username == localStorage.user; });
        var name = CurrentUser.name.split(' ');
        var total = 0, ship = 0;
        if (Object.values(JSON.parse(localStorage.Ship)[0]).toString() != 'VN') ship = 500000;
        for (var i = 0; i < CurrentCart.length; i++) {
            var val = data.find(function (book) { return book.id == Object.keys(CurrentCart[i]);});
            total += +Math.min(val.sale, val.gia) * +Object.values(CurrentCart[i]);
        }
            
        $('#BillingFirstName').val(name.shift());
        $('#BillingLastName').val(name.join(' '));
        $('#BillingEmail').val(CurrentUser.email);
        $('#BillingPhone').val(CurrentUser.phone);
        $('#CheckoutMoney').text(MoneyShow(total));
        if (localStorage.coupon){
            if (localStorage.coupon.slice(-1) == '%')
                total = (total / 100) * (+localStorage.coupon.slice(0, -1));
            else
                total = Math.max(total - +localStorage.coupon, 0);
        }
        $('#CheckoutCoupon').text(localStorage.coupon? "Đã dùng mã giảm giá: "+ (localStorage.coupon.slice(-1) == '%' ? localStorage.coupon : MoneyShow(localStorage.coupon)) : "Không");
        $('#ShippingMethod').text(ship == 0 ? 'Miễn phí vận chuyển' : MoneyShow(ship));
        $('#TotalBill').text(MoneyShow(total+ship));
    }
    else{
        var total = 0, ship = 0;
        if (Object.values(JSON.parse(localStorage.Ship)[0]).toString() != 'VN') ship = 500000;
        for (var i = 0; i < CurrentCart.length; i++) {
            var val = data.find(function (book) { return book.id == Object.keys(CurrentCart[i]);});
            total += +Math.min(val.sale, val.gia) * +Object.values(CurrentCart[i]);
        }
        $('#CheckoutMoney').text(MoneyShow(total));
        if (localStorage.coupon){
            if (localStorage.coupon.slice(-1) == '%')
                total = (total / 100) * (+localStorage.coupon.slice(0, -1));
            else
                total = Math.max(total - +localStorage.coupon, 0);
        }
        $('#CheckoutCoupon').text(localStorage.coupon? "Đã dùng mã giảm giá: "+ (localStorage.coupon.slice(-1) == '%' ? localStorage.coupon : MoneyShow(localStorage.coupon)) : "Không");
        $('#ShippingMethod').text(ship == 0 ? 'Miễn phí vận chuyển' : MoneyShow(ship));
        $('#TotalBill').text(MoneyShow(total+ship));
    }
}

function CancelCart () {
    event.preventDefault();
    if (!confirm("Bạn có chắc chắn muốn hủy bỏ đơn hàng?")) {
        return;
    }
    localStorage.removeItem('CRBill');
    document.location = "myaccount.html?tab=OldBills";
}