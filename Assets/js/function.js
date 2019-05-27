// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// phần code của Hà


var idpr = document.getElementById("showsp");
var sp = document.getElementById("cacsp");

function showProduct(index) {
  var bookperpage = 12;
  var dssp = "";
  if (loadedData.length != 0) {
    for (var i = (index - 1) * bookperpage; i < Math.min(index * bookperpage, loadedData.length); i++) {
      dssp += `

                        <div class="unselectable item">
                        <div class="col-md-3 col-sm-6 product" id - ${loadedData[i].id} id="boxA" draggable="true" 
     ondragstart="return dragStart(event,${loadedData[i].id})">
                            <div class="single-shop-product">
                                <div class="product-upper">
                                    <a href="single-product.html?id=${loadedData[i].id}"><img style= "width = "src="${loadedData[i].img}" alt=""></a>
                                </div>
                                <h2><a href="single-product.html?id=${loadedData[i].id}">${loadedData[i].tenSP}</a></h2>
                                <div class="product-carousel-price">
                                    <ins>${MoneyShow(data[i].sale)}</ins> <del>${MoneyShow(data[i].gia)}</del>
                                </div>  `;
                              if (loadedData[i].TT == true) {
                              dssp += ` <div class="product-option-shop ">
                                    <button id = "myBtn" href = "#" class="btn btn-outline-secondary bynow btn-block changecolor " loadedData-idpr="${loadedData[i].id}" onclick = "addElementShop('${loadedData[i].id}')">Mua Ngay</button>
                                </div>  `;
                              } else {
                                dssp += ` <div class="product-option-shop">
                                    <button href = "#" class="btn btn-outline-secondary disabled btn-block">Hết Hàng</button>
                                </div>  `;
                              }
                            dssp += `
                            </div>
                        </div>
                        </div>
                    `;
    }
    showPages(index, bookperpage);
  }
  //console.log(loadedData);
  sp.innerHTML = dssp;
  //console.log(dssp + "hh");
  //alert(dssp);
}

function showPages(index, bookperpage) {
  var txt = "";
  var maxPage = Math.floor(loadedData.length/bookperpage) + (loadedData.length%bookperpage>0 ? 1 : 0);
  console.log(maxPage);
  txt += `<li><a href="#" class="active" aria-hidden="true" onclick="showProduct(${Math.max(1,index-1)})">&laquo; </a></li>`;
  for (var i = 1; i <= maxPage; ++i) {
    txt += `<li><a href="#" onclick="showProduct(${i});">${i}</a></li>`;
  }
  txt += `<li><a href="#" class="active" aria-hidden="true" onclick="showProduct(${Math.min(maxPage,index+1)})">&raquo;</a></li>`;
  $("#pageid").html(txt);
}

function showCategories(category) {
  var categories = new Set(data.filter(i => i.category != 'Khác').map(i => i.category));
  categories.add('Khác');
  var txt = "";
  txt += `<option value="">Tất cả</option>`;
  categories.forEach(function(i) {
    txt += `<option value="${i}">${i}</option>`;
  })
  $("#selectOpt").html(txt);
  $("#selectOpt").val(category);
}

function shopFilter(searchStr, category) {
  searchStr = searchStr.toLocaleLowerCase();
  filteredData = data.filter(i => (
    (category == "" ? true : (i.category == category)) &&
    (i.tenSP.toLocaleLowerCase().includes(searchStr)) //|| i.category.toLocaleLowerCase().includes(searchStr))
  ))

  return filteredData;
}

function searchData(searchStr) {
  loadedData = shopFilter(searchStr, $("#selectOpt").val());
  showProduct(1);
}

function showFooterCate(){
  var categories = new Set(data.filter(i => i.category != 'Khác').map(i => i.category));
  categories.add('Khác');
  var txt = "";
  categories.forEach(function(i) {
    txt += `<li class="pNT" onclick = "window.location.href = 'shop.html?category=${i}' ">${i}</li>`;
  })
  $("#hotcategr").html(txt);
}


 $(document).ready(function() {
              showFooterCate();
            
        })
// var myselect = document.getElementById("selectOpt");

// function categories() {
//   // console.log(typeof myselect.options[myselect.selectedIndex].value);
//   var ans = "";

//   var n = data.length - 1;
//   for (var i = n; i > 0; i--) {
//     // console.log(data[i].category);
//     if (myselect.options[myselect.selectedIndex].value == data[i].category) {
//       ans += `
//                         <div class="col-md-3 col-sm-6 product" id - ${data[i].id}>
//                             <div class="single-shop-product">
//                                 <div class="product-upper">
//                                     <img style= "width = "src="${data[i].img}" alt="">
//                                 </div>
//                                 <h2><a href="single-product.html?id=${data[i].id}">${data[i].tenSP}</a></h2>
//                                 <div class="product-carousel-price">
//                                     <ins>${data[i].sale} đ</ins> <del>${data[i].gia} đ</del>
//                                 </div>  `;
//       if (data[i].TT == true) {
//         ans += ` <div class="product-option-shop ">
//                                     <button id = "myBtn" href = "#" class="btn btn-outline-secondary bynow btn-block changecolor " data-idpr="${data[i].id}" onclick = "addElementShop('${data[i].id}')">Mua Ngay</button>
//                                 </div>  `;
//       } else {
//         ans += ` <div class="product-option-shop">
//                                     <button href = "#" class="btn btn-outline-secondary disabled btn-block">Hết Hàng</button>
//                                 </div>  `;
//       }
//       ans += `
//                             </div>
//                         </div>

//                     `;
//     }
//   }


//   document.getElementById("cacsp").innerHTML = ans;
// };
// console.log($('.option').offset().top);





$(window).scroll(function () {
  var cart = $('.shopping-cart');
  if (window.pageYOffset >= 300 && window.pageYOffset <= 1500) {
    cart.addClass('shopping');
    $('.gh').hide();
  } else {
    cart.removeClass('shopping');
    $('.gh').show();
  }

});


// $(document).ready(function(){ 

// var search = $("#idsearch"); 
// // console.log(search);
// var items = $(".unselectable,.item"); 

// $("#search").on("click", function(e){ 

//  var v = search.val().toLowerCase(); 
//  if(v == "") { 
//   items.show(); 
//  } 
//  $.each(items, function(){ 
 
//   var n = data.length-1;
//   for (var i = 1; i <= n; i++) {
//      var it = $(this); 
//   var lb = it.find("a").text().toLowerCase(); 
 
//   if (lb.indexOf (v) == -1) {
//     it.hide(); 
//   } 
//   else {
//     it.show(); 
//   }
//    }; 
//  }); 
// });   
// });
// chuyển array thành JSON
//     var jsonProduct = JSON.stringify(data);
//     var originArray = JSON.parse(jsonProduct);
//    // console.log(jsonProduct);
//     for(let originObject of originArray){
//       console.log(originObject.tenSP);
//     }

//    $(document).ready(function() {
//     var $dragging = null;

//     $(document.body).on("mousemove", function(e) {
//         if ($dragging) {
//             $dragging.offset({
//                 top: e.pageY-50,
//                 left: e.pageX-50
//             });
//         }
//     });

//     $(document.body).on("mousedown", "div.item", function (e) {
//         $dragging = $(e.target);
//     });

//     $(document.body).on("mouseup", function (e) {
//         $dragging = null;
//     });
// });
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// phần code của Duy

var idpr = document.getElementById("showsp");
var sp = document.getElementById("cacsp");
var CurrentCart = [];
var Total = 0;

function MoneyShow(val) {
  return val.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + ' VNĐ';
}

function showLike(index, cnt = 4) {
  var dssp = "";
  if (data.length != 0) {
    var c = Math.max((Math.random() * data.length - cnt) | 0, 1);
    // console.log(c);
    // console.log(data[c]);
    for (var i = c; i < data.length && cnt > 0; i++) {
      if (data[i].TT == true) {
        cnt--;
        // dssp += `<div class="single-product">
        //          <div class="product-f-image">
        //            <img style=" height: 200px;" src="${data[i].img}"alt="">
        //            <div class="product-hover">
        //              <a href="javascript:addToCart(${data[i].id})" class="add-to-cart-link">
        //                  <i class="fa fa-shopping-cart"></i>Thêm vào giỏ</a>
        //              <a class="view-details-link" href="single-product.html?id=${data[i].id}">
        //              <i class="fa fa-link"></i>Thông tin</a>
        //            </div>
        //          </div>
        //          <h2><a href="single-product.html?id=${data[i].id}">${data[i].tenSP}</a></h2>
        //          <div class="product-carousel-price">
        //            <ins>${MoneyShow(data[i].gia)}</ins>
        //            <del>${MoneyShow(data[i].sale)}</del>
        //          </div>
        //        </div>`;
        dssp += `
                <div style="width: 200px;height: 320px;px;margin-left: 15px;" class="col-md-3 col-sm-6 product" id - ${data[i].id}>
                    <div class="single-shop-product">
                        <div class="product-upper">
                            <a href="single-product.html?id=${data[i].id}"><img style= "width = "src="${data[i].img}" alt=""></a>
                        </div>
                        <h2 style="text-transform: none; height: 50px;"><a href="single-product.html?id=${data[i].id}">${data[i].tenSP}</a></h2>
                        <div class="product-carousel-price">
                            <ins>${MoneyShow(data[i].sale)}</ins> <del>${MoneyShow(data[i].gia)}</del>
                        </div>  `;
        if (data[i].TT == true) {
          dssp += ` <div class="product-option-shop ">
                            <button id = "myBtn" href = "#" class="btn btn-outline-secondary bynow btn-block changecolor " data-idpr="${data[i].id}" onclick = "addElement('${data[i].id}')">Mua Ngay</button>
                        </div>  `;
        } else {
          dssp += ` <div class="product-option-shop">
                            <button href = "#" class="btn btn-outline-secondary disabled btn-block">Hết Hàng</button>
                        </div>  `;
        }
        dssp += `
                    </div>
                </div>

            `;
      }
    }
  }
  sp.innerHTML = dssp;
}

function productLeft(val = data, index = 0, cnt = 4) {
  var ans = "";
  for (var i = index; i < index + cnt; i++) {
    ans += `
            <div style = "width: 90%;" class="thubmnail-recent">
              <img src="${val[i].img}" class="recent-thumb" alt="">
              <h2><a href="single-product.html?id=${data[i].id}">${val[i].tenSP}</a></h2>
              <div class="product-sidebar-price">
                  <ins>${MoneyShow(val[i].sale)}</ins> <del>${MoneyShow(val[i].gia)}</del>
              </div>                             
            </div>
          `;
  }
  ListLeft.innerHTML = ans;
}

function recemtPost(cnt = 4) {
  var ans = "<ul>";
  for (var i = 0; i < data.length && cnt > 0; i++) {
    cnt--;
    ans += `
        <li><a href="single-product.html?id=${data[i].id}">${data[i].tenSP}</a></li>
    `
  }
  ans += "</ul>"
  RecentPost.innerHTML = ans;
}

$(document).ready(function () {
  if (typeof (Storage) !== 'undefined')
    if (localStorage.carts)
      CurrentCart = JSON.parse(localStorage.carts);
  if (!localStorage.Ship)
    localStorage.setItem('Ship', '[{"country":"VN"},{"state":""},{"postcode":""}]');
  if (document.URL.substring(document.URL.lastIndexOf('?')).toString().search('cart.html') != -1) {
    showLike();
    productLeft();
    recemtPost();
    showBill();
  }
  if (document.URL.substring(document.URL.lastIndexOf('?')).toString().search('checkout.html') != -1) {
    productLeft();
    recemtPost();
    CheckoutInfo();
  }
  if (document.URL.substring(document.URL.lastIndexOf('?')).toString().search('contact.html') != -1) {

  }
  if (document.URL.substring(document.URL.lastIndexOf('?')).toString().search('myaccount.html') != -1) {

  }
  if (document.URL.substring(document.URL.lastIndexOf('?')).toString().search('index.html') != -1) {
    // ListProductsLast();
    ListProduct1();
    ListProduct2();
    ListProduct3();
  }
  if (document.URL.substring(document.URL.lastIndexOf('?')).toString().search('shop.html') != -1) {

  }
  if (document.URL.substring(document.URL.lastIndexOf('?')).toString().search('single-product.html') != -1) {

  }
  LoadUser();
  RefreshShopCart();
});

function checkLog() {
  if (localStorage.user)
    document.location = "myaccount.html";
  else
    alert('Bạn chưa đăng nhập.')

}

function LoadUser() {
  if (localStorage.user) {
    // console.log(`<a href="myaccount.html"><img width=30 src="`+accounts[accounts.findIndex(function(val){return val.username == localStorage.user;})].img+`"> `+localStorage.user+`</a>`);
    // accounts.findIndex(function(val){return val.username == localStorage.user;});
    document.getElementById('UserLog').innerHTML = `<a href="#" class="btn-lg" id="LogOut"><i class="fa fa-user"></i> Đăng xuất(` + localStorage.user + `)</a>`;
    document.getElementById('UserLogged').innerHTML = `<a style="text-transform: none; height: 65px;padding: 9px;" href="myaccount.html"><img style="border-radius: 50%;" width=50 src="` + accounts[accounts.findIndex(function (val) {
      return val.username == localStorage.user;
    })].img + `"> ` + localStorage.user + `</a>`;
  } else {
    document.getElementById('UserLog').innerHTML = `<a href="#" class="btn-lg" data-toggle="modal" data-target="#myModal"><i class="fa fa-user"></i> Đăng nhập</a>`;
  }
}

function ApplyCoupon() {
  var index = coupons.findIndex(function (val) {
    return val.code == document.getElementById('coupon_code').value;
  });
  if (index == -1)
    alert('Mã giảm giá không hợp lệ.');
  else {
    if (coupons[index].status) {
      localStorage.setItem('coupon', coupons[index].values);
      alert('Sử dụng mã giảm giá thành công.');
    } else
      alert('Mã giảm giá đã hết hạn.');
  }
  showBill();
}

function RemoveCoupon() {
  localStorage.removeItem('coupon');
  showBill();
}

function RemoveCart() {
  if (!confirm("Bạn có chắc chắn muốn xóa đơn hàng?")) {
    event.preventDefault();
    return;
  }
  CurrentCart = [];
  localStorage.setItem('carts', JSON.stringify(CurrentCart));
  showBill();
}

function ToCheckout() {
  event.preventDefault();
  document.location = "checkout.html";
}

function showBill(user = "duynm619") {
  var current = Bills.find(function (bill) {
    return bill.user == user && bill.deal == false;
  });
  if (typeof (Storage) !== 'undefined') {
    if (!localStorage.carts) {
      for (var i = 0; i < current.products.length; i++) {
        var a = {};
        a[current.products[i]] = current.number[i];
        CurrentCart.push(a);
      }
      localStorage.setItem('carts', JSON.stringify(CurrentCart));
    }
  }
  if (typeof current === "undefined" || JSON.parse(localStorage.carts).length == 0) {
    document.getElementById("NumProduct").innerHTML = 0;
    document.getElementById("TotalMoney").innerHTML = 0 + " VNĐ";
    STotal.innerHTML = 0 + " VNĐ";
    CartShow.innerHTML = `<tr><td colspan = 6><h2 class="mauchu">Bạn chưa thêm gì vào giỏ hàng cả.<br><a href="shop.html">Mua hàng nào</a><br><a href="#" onclick="ToHistory()">Xem lịch sử giao dịch</a></h2></td></tr>`;
    return;
  }
  CurrentCart = JSON.parse(localStorage.carts);
  var ans = "", cp = "";
  Total = 0;
  for (var i = 0; i < CurrentCart.length; i++) {
    var val = data.find(function (book) {
      return book.id == Object.keys(CurrentCart[i])
    });
    Total += Math.min(val.sale, val.gia) * Object.values(CurrentCart[i]);
    ans += `
            <tr class="cart_item">
              <td class="product-remove">
                  <input type="button" title="Remove this item" value="X" onclick='delElement("${val.id}")'>
              </td>
              <td class="product-thumbnail">
                  <a href="single-product.html?id=${data[data.findIndex(function(book){return book.tenSP == val.tenSP;})].id}"><img width="145" height="145" alt="poster_1_up" class="shop_thumbnail" src="${val.img}"></a>
              </td>

              <td class="product-name" width="30%" id - ${val.tenSP}.replace(' ','')>
                  <a href="single-product.html?id=${data[data.findIndex(function(book){return book.tenSP == val.tenSP;})].id}">${val.tenSP}</a> 
              </td>

              <td class="product-price">
                  <span class="amount">${MoneyShow(Math.min(val.sale,val.gia))}</span> 
              </td>

              <td class="product-quantity">
                  <div class="quantity buttons_added">
                      <input type="button" class="minus" value="-" onclick='minusNumberElement("${val.id}")'>
                      <input type="number" size="4" class="input-text qty text" title="Số lượng sản phẩm" value="${Object.values(CurrentCart[i])}" min="0" step="1">
                      <input type="button" class="plus" value="+" onclick='plusNumberElement("${val.id}")'>
                  </div>
              </td>

              <td class="product-subtotal">
                  <span class="amount">${MoneyShow(Object.values(CurrentCart[i])*Math.min(val.sale,val.gia))}</span> 
              </td>
            </tr>
         `;
  }
  ans += `
        <tr>
          <td class="actions" colspan="4">
              <div class="coupon">
                  <label for="coupon_code" class="CPLabel">Giảm giá :</label>
                  <input  size=15% type="text" placeholder="Mã giảm giá" value="" id="coupon_code" class="CPInput input-text" name="coupon_code">
                  <input type="submit" value="Áp dụng" name="apply_coupon" class="button PadLeft" onclick="ApplyCoupon()">
              </div>
          </td>
          <td colspan="2" style="border-left:0">
              <!-- <input type="submit" value="Cập nhật giỏ hàng" name="update_cart" class="button"> -->
              <input type="submit" value="Bỏ coupon" name="deapply_coupon" class="checkout-button button alt wc-forward" onclick="RemoveCoupon()">
          </td>
        </tr>
        <tr>
          <td colspan="3">
              <input type="submit" value="Xóa đơn hàng" name="deleteCart" class="checkout-button button alt wc-forward" onclick="RemoveCart()">
          </td> 
          <td colspan="3" style="border-left:0">
              <input type="submit" value="Thanh toán" name="proceed" class="checkout-button button alt wc-forward" onclick="ToCheckout()">
          </td> 
        </tr>
  `;

  // flag = false;
  // for (var i = +flag; i < localStorage.length; i++)
  //     if (localStorage[localStorage.key(i)] != -1){ flag = true; break;}
  // if (typeof current === "undefined" || (!flag && localStorage.length != 0)){
  //   document.getElementById("NumProduct").innerHTML = +flag;
  //   document.getElementById("TotalMoney").innerHTML = +flag+" VNĐ";
  //   CartShow.innerHTML = `<tr><td colspan = 6><h2>Bạn chưa thêm gì vào giỏ hàng cả.<br><a href="shop.html">Mua hàng nào</a><br><a href="#">Xem lịch sử giao dịch</a></h2></td></tr>`;
  //   return;
  // }
  // var ans = "";
  // var Total = 0;
  // if (localStorage.length == 0)
  //   for(var i = 0; i < current.products.length; i++)
  //     if (localStorage.getItem(current.products[i]) === null)
  //       localStorage.setItem(current.products[i],current.number[i]);

  // for(var i = 0; i < localStorage.length; i++)
  // {
  //   if(localStorage[localStorage.key(i)] == -1) continue;
  //   var val = data.find(function (book) {return book.tenSP == localStorage.key(i)});
  //   Total+=Math.min(val.sale,val.gia)*localStorage[localStorage.key(i)];
  //   ans+=`
  //           <tr class="cart_item">
  //             <td class="product-remove">
  //                 <input type="button" title="Remove this item" value="X" onclick='delElement("${val.tenSP}")'>
  //             </td>
  //             <td class="product-thumbnail">
  //                 <a href="#"><img width="145" height="145" alt="poster_1_up" class="shop_thumbnail" src="${val.img}"></a>
  //             </td>

  //             <td class="product-name" width="30%" id - ${val.tenSP}.replace(' ','')>
  //                 <a href="#">${val.tenSP}</a> 
  //             </td>

  //             <td class="product-price">
  //                 <span class="amount">${MoneyShow(Math.min(val.sale,val.gia))} VNĐ</span> 
  //             </td>

  //             <td class="product-quantity">
  //                 <div class="quantity buttons_added">
  //                     <input type="button" class="minus" value="-" onclick='minusNumberElement("${val.tenSP}")'>
  //                     <input type="number" size="4" class="input-text qty text" title="Số lượng sản phẩm" value="${localStorage[localStorage.key(i)]}" min="0" step="1">
  //                     <input type="button" class="plus" value="+" onclick='plusNumberElement("${val.tenSP}")'>
  //                 </div>
  //             </td>

  //             <td class="product-subtotal">
  //                 <span class="amount">${MoneyShow(localStorage[localStorage.key(i)]*Math.min(val.sale,val.gia))} VND</span> 
  //             </td>
  //           </tr>
  //        `;
  // }

  // console.log(MoneyShow(Total));
  if (localStorage.Ship) {
    var a = JSON.parse(localStorage.Ship);
    document.getElementById('calc_shipping_country').value = Object.values(a[0]);
    document.getElementById('calc_shipping_state').value = Object.values(a[1]);
    document.getElementById('calc_shipping_postcode').value = Object.values(a[2]);
  }
  if (localStorage.coupon) {
    cp = 'Đã dùng mã giảm giá ';
    if (localStorage.coupon.slice(-1) == '%') {
      Total = (Total / 100) * (+localStorage.coupon.slice(0, -1));
      cp += localStorage.coupon;
    } else {
      Total = Math.max(Total - +localStorage.coupon, 0);
      cp += MoneyShow(localStorage.coupon);
    }
    cp += " (mã khác)";
  } else
    cp = "Nhập mã giảm giá (chỉ giảm giá hàng)";

  if (document.getElementById('calc_shipping_country').value == 'VN')
    FeeShip.innerHTML = 'Miễn Phí';
  else {
    FeeShip.innerHTML = '500.000';
    Total += 500000;
  }
  CartShow.innerHTML = ans;
  STotal.innerHTML = MoneyShow(Total);
  document.getElementById("TotalMoney").innerHTML = MoneyShow(Total);
  // document.getElementById("NumProduct").innerHTML = Object.values(CurrentCart).reduce((a,b) => (-~+a?+a:-~+a)+(-~+b?+b:-~+b));
  document.getElementById("NumProduct").innerHTML = CurrentCart.length;
  document.getElementById('coupon_code').placeholder = cp;
}

function RefreshShopCart(user = "duynm619") {
  var current = Bills.find(function (bill) {
    return bill.user == user && bill.deal == false;
  });
  if (typeof (Storage) !== 'undefined') {
    if (!localStorage.carts) {
      for (var i = 0; i < current.products.length; i++) {
        var a = {};
        a[current.products[i]] = current.number[i];
        CurrentCart.push(a);
      }
      localStorage.setItem('carts', JSON.stringify(CurrentCart));
    }
  }

  if (typeof current === "undefined" || JSON.parse(localStorage.carts).length == 0) {
    document.getElementById("NumProduct").innerHTML = 0;
    document.getElementById("TotalMoney").innerHTML = 0 + " VNĐ";
    return;
  }
  CurrentCart = JSON.parse(localStorage.carts);
  var ans = "";
  Total = 0;
  for (var i = 0; i < CurrentCart.length; i++) {
    var val = data.find(function (book) {
      return book.id == Object.keys(CurrentCart[i])
    });
    Total += Math.min(val.sale, val.gia) * Object.values(CurrentCart[i]);
  }
  if (localStorage.coupon) {
    if (localStorage.coupon.slice(-1) == '%')
      Total = (Total / 100) * (+localStorage.coupon.slice(0, -1));
    else
      Total = Math.max(Total - +localStorage.coupon, 0);
  }
  if (JSON.parse(localStorage["Ship"])[0]["country"] != 'VN')
    Total += 500000;
  document.getElementById("TotalMoney").innerHTML = MoneyShow(Total);
  document.getElementById("NumProduct").innerHTML = CurrentCart.length;
}

function plusNumberElement(val, user = "duynm619") {
  // var val = "5 Centimet Trên giây", user = "duynm619";
  var currentBill = Bills.findIndex(function (valid) {
    return valid.user == user && valid.deal == false
  });
  var currentProduct = Bills[currentBill].products.findIndex(function (valid) {
    return valid == val;
  });
  var index = CurrentCart.findIndex(function (valid) {
    return Object.keys(valid) == val
  });
  // localStorage.setItem(val, Math.max(+localStorage.getItem(val)+1,1));
  CurrentCart[index][val] = Math.max(+Object.values(CurrentCart[index]) + 1, 1);
  // Bills[currentBill].number[currentProduct] = localStorage.getItem(val);
  localStorage.setItem('carts', JSON.stringify(CurrentCart));
  // Bills[Bills.findIndex(function (valid) { return valid.user == user && valid.deal == false })].number[Bills[Bills.findIndex(function (valid) { return valid.user == user && valid.deal == false })].products.findIndex(function (valid) { return valid == val; })]++;
  showBill(user);
}

function minusNumberElement(val, user = "duynm619") {
  var currentBill = Bills.findIndex(function (valid) {
    return valid.user == user && valid.deal == false
  });
  var currentProduct = Bills[currentBill].products.findIndex(function (valid) {
    return valid == val;
  });
  var index = CurrentCart.findIndex(function (valid) {
    return Object.keys(valid) == val
  });
  // localStorage.setItem(val, Math.max(+localStorage.getItem(val)+1,1));
  CurrentCart[index][val] = Math.max(+Object.values(CurrentCart[index]) - 1, 1);
  // Bills[currentBill].number[currentProduct] = localStorage.getItem(val);
  localStorage.setItem('carts', JSON.stringify(CurrentCart));
  // Bills[Bills.findIndex(function (valid) { return valid.user == user && valid.deal == false })].number[Bills[Bills.findIndex(function (valid) { return valid.user == user && valid.deal == false })].products.findIndex(function (valid) { return valid == val; })]++;
  showBill(user);


  // var currentBill = Bills.findIndex(function (valid) { return valid.user == user && valid.deal == false });
  // var currentProduct =  Bills[currentBill].products.findIndex(function (valid) { return valid == val; });
  // localStorage.setItem(val, Math.max(+localStorage.getItem(val)-1,1));
  // Bills[currentBill].number[currentProduct] = Math.max(Bills[currentBill].number[currentProduct]-1,0);
  // // Bills[currentBill].number[currentProduct] = Math.max(Bills[currentBill].number[currentProduct]-1, 0);
  // // Bills[Bills.findIndex(function (valid) { return valid.user == user && valid.deal == false })].number[Bills[Bills.findIndex(function (valid) { return valid.user == user && valid.deal == false })].products.findIndex(function (valid) { return valid == val; })] = Math.max(Bills[Bills.findIndex(function (valid) { return valid.user == user && valid.deal == false })].number[Bills[Bills.findIndex(function (valid) { return valid.user == user && valid.deal == false })].products.findIndex(function (valid) { return valid == val; })]-1, 0);
  // showBill(user);
}

function delElement(val, user = "duynm619") {
  var currentBill = Bills.findIndex(function (valid) {
    return valid.user == user && valid.deal == false
  });
  var currentProduct = Bills[currentBill].products.findIndex(function (valid) {
    return valid == val;
  });
  CurrentCart.splice(index = CurrentCart.findIndex(function (valid) {
    return Object.keys(valid) == val
  }), 1);
  localStorage.setItem('carts', JSON.stringify(CurrentCart));
  // localStorage.setItem(val, -1);
  // Bills[currentBill].number[currentProduct] = -1;
  // Bills[currentBill].products.splice(currentProduct, 1);
  // localStorage.setItem(val,-1);
  // localStorage.removeItem(val);

  // console.log(val,currentBill,currentProduct);
  showBill(user);
}

function addElement(val, user = "duynm619") {
  // var currentBill = Bills.findIndex(function (valid) { return valid.user == user && valid.deal == false });
  // var currentProduct =  Bills[currentBill].products.findIndex(function (valid) { return valid == val; });
  var index = CurrentCart.findIndex(function (valid) { return Object.keys(valid) == val;});
  if (index != -1)
    plusNumberElement(val, user);
  else {
    var a = {};
    a[val] = 1;
    CurrentCart.push(a);
    localStorage.setItem('carts', JSON.stringify(CurrentCart));
    // localStorage.setItem(val, 1);
    // Bills[currentBill].products.push(val);
    // Bills[currentBill].number.push(1);
  }
  showBill(user);
}

function addElementShop(val, user = "duynm619") {
  // event.preventDefault();
  // var currentBill = Bills.findIndex(function (valid) { return valid.user == user && valid.deal == false });
  // var currentProduct =  Bills[currentBill].products.findIndex(function (valid) { return valid == val; });
  var CurrentBook = data.find(function (valid) { return valid.id == val;});
  if (CurrentBook.TT == false)
    return alert('Sản phẩm ' + CurrentBook.tenSP + ' hiện đang hết hàng.'),0;

  alert('Đã thêm sản phẩm vào giỏ hàng.')
  var index = CurrentCart.findIndex(function (valid) {
    return Object.keys(valid) == val
  });
  if (index != -1) {
    // plusNumberElement(val,user);
    CurrentCart[index][val] = Math.max(+Object.values(CurrentCart[index]) + 1, 1);
    localStorage.setItem('carts', JSON.stringify(CurrentCart));
  } else {
    var a = {};
    a[val] = 1;
    CurrentCart.push(a);
    localStorage.setItem('carts', JSON.stringify(CurrentCart));
    // localStorage.setItem(val, 1);
    // Bills[currentBill].products.push(val);
    // Bills[currentBill].number.push(1);
  }
  RefreshShopCart(user);
}

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// phần code của Đạt
var idpr = document.getElementById("showsp");
var sp = document.getElementById("cacsp");

function SliderArea(cnt = 4) {
  var ans = "<ul>";
  for (var i = 0; i < data.length && cnt > 0; i++) {
    cnt--;
    ans += `
        <li>
          <img src="${data[i].img}" alt="Slide" class="icon">
          <div class="caption-group">
            <h2 class="caption title">
              <span class="primary"><strong>${data[i].tenSP}</strong></span>
            </h2>
          <h4 class="caption subtitle">${data[i].category}</h4>
          <a class="caption button-radius" href="#"><span class="icon"></span>Shop now</a>
          </div>
        </li>
    `
  }
  ans += "</ul>"
  Slider.innerHTML = ans;
}

// function ListProductsLast(index = 1, cnt = 6) {
//   var ars = "";
//   for (var i = index; i <= index + cnt; i++) {
//     ars += `
//             <div class="single-product">
//               <div class="product-f-image">
//                 <img src="${data[i].img}" alt="">
//                 <div class="product-hover">
//                   <a href="#" class="add-to-cart-link"><i class="fa fa-shopping-cart"></i> Add to cart</a>
//                   <a href="single-product.html" class="view-details-link"><i class="fa fa-link"></i> See details</a>
//                 </div>
//                 <h2><a href="">${data[i].tenSP}</a></h2>
//                 <div class="product-wid-price">
//                   <ins>${data[i].gia} VNĐ</ins> <del>${data[i].sale} VNĐ</del>
//                 </div>                                             
//             </div>
//           `;
//   }
//   ListItem.innerHTML = ars;
// }

function ListProduct1(index, cnt = 3) {
  var ars = "";
  for (var i = 0; i < cnt; i++) {
    ars += `
            <div class="single-wid-product">
              <a href="single-product.html"><img src="${data[i].img}" alt="" class="product-thumb"></a>
              <h2><a href="">${data[i].tenSP}</a></h2>
              <div class="product-wid-rating">
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
              </div>
              <div class="product-wid-price">
                <ins>${data[i].gia} VNĐ</ins> <del>${data[i].sale} VNĐ</del>
              </div>                                             
            </div>
          `;
  }
  ListView1.innerHTML = ars;
}

function ListProduct2(index, cnt = 6) {
  var ars = "";
  for (var i = 3; i < cnt; i++) {
    ars += `
            <div class="single-wid-product">
              <a href="single-product.html"><img src="${data[i].img}" alt="" class="product-thumb"></a>
              <h2><a href="">${data[i].tenSP}</a></h2>
              <div class="product-wid-rating">
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
              </div>
              <div class="product-wid-price">
                <ins>${data[i].gia} VNĐ</ins> <del>${data[i].sale} VNĐ</del>
              </div>                                             
            </div>
          `;
  }
  ListView2.innerHTML = ars;
}

function ListProduct3(index, cnt = 9) {
  var ars = "";
  for (var i = 6; i < cnt; i++) {
    ars += `
            <div class="single-wid-product">
              <a href="single-product.html"><img src="${data[i].img}" alt="" class="product-thumb"></a>
              <h2><a href="">${data[i].tenSP}</a></h2>
              <div class="product-wid-rating">
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
              </div>
              <div class="product-wid-price">
                <ins>${data[i].gia} VNĐ</ins> <del>${data[i].sale} VNĐ</del>
              </div>                                             
            </div>
          `;
  }
  ListView3.innerHTML = ars;
}


// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// phần code của Lộc
function findId() {
  var tmp = new URLSearchParams(window.location.search).get('id') || "";
  if (tmp == "")
    tmp = 1;
  var ans = "";
  ans += `
    <div class="product-breadcroumb">
      <a href="index.html">Trang chủ</a>
      <a href="shop.html?category=${data[tmp-1].category}">${data[tmp-1].category}</a>
      <a href="">${data[tmp-1].tenSP}</a>
    </div>
    <div class="row">
      <div class="col-sm-6">
        <div class="product-images">
          <div class="product-main-img">
            <img src="${data[tmp-1].img}" alt="">
          </div>                          
        </div>
       </div>
                            
    <div class="col-sm-6">
      <div class="product-inner">
        <h2 class="product-name">${data[tmp-1].tenSP}</h2>
        <div class="product-inner-price">
          <ins>${data[tmp-1].gia} VNĐ</ins> <del>${data[tmp-1].sale} VNĐ</del>
        </div>    
                                    
        <form action="" class="cart">
          <div class="quantity">
            <input type="number" size="4" class="input-text qty text" title="Qty" value="1" name="quantity" min="1" step="1">
          </div>
          <button class="add_to_cart_button" type="submit" onclick = "event.preventDefault();addElementShop('${data[tmp-1].id}')">Thêm vào giỏ</button>
        </form>   
                                    
          <div class="product-inner-category">
            <p>Category: <h style="color:blue;text-decoration: underline;">Summer</h>. Tags: <h style="color:blue;text-decoration: underline;">${data[i].Tag[0]}</h>, <h style="color:blue;text-decoration: underline;">${data[i].Tag[1]}</h>, <h style="color:blue;text-decoration: underline;">${data[i].Tag[2]}</h></p>
          </div> 
                                    
          <div role="tabpanel">
            <ul class="product-tab" role="tablist">
              <li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">Mô tả</a></li>
              <li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">Đánh giá</a></li>
            </ul>
          <div class="tab-content">
            <div role="tabpanel" class="tab-pane fade in active" id="home">
              <h2>Chi tiết sản phẩm</h2>  
               <p>${data[tmp-1].ND}</p>

               <p>${data[tmp-1].TG}</p>
            </div>
          <div role="tabpanel" class="tab-pane fade" id="profile">
            <h2>Đánh giá</h2>
            <div class="submit-review">
              <p><label for="name">Tên</label> <input name="name" type="text"></p>
              <p><label for="email">Email</label> <input name="email" type="email"></p>
            <div class="rating-chooser">
            <p>Xếp hạng</p>

            <div class="rating-wrap-post">
             <i class="fa fa-star"></i>
             <i class="fa fa-star"></i>
             <i class="fa fa-star"></i>
             <i class="fa fa-star"></i>
             <i class="fa fa-star"></i>
            </div>
           </div>
          <p><label for="review">Đánh giá của bạn</label> <textarea name="review" id="" cols="30" rows="10"></textarea></p>
          <p><input type="submit" value="Gửi"></p>
        </div>
       </div>
  `
  test.innerHTML = ans;
}

function changeContact() {
  var tmp = new URLSearchParams(window.location.search).get('id') || "";
  var ans = "";
  switch (tmp) {
    case "account":
      ans += `
      <li><a href="#">Làm thế nào để đăng nhập khi tôi quên mật khẩu?</a></li>
      <li><a href="#">Làm thế nào để thay đổi số điện thoại đăng ký tài khoản?</a></li>
      <li><a href="#">Làm thế nào để cập nhật email gắn với tài khoản của tôi?</a></li>
      <li><a href="#">CHÍNH SÁCH BẢO HÀNH TẠI SHOP</a></li>
      <li><a href="#">Làm thế nào để liên hệ với bộ phận Chăm Sóc Khách Hàng của Shop?</a></li>
      <li><a href="#">Làm thế nào để đổi được mật khẩu?</a></li>
    `
      break;
    case "bill":
      ans += `
      <li><a href="#">Hướng dẫn mua hàng tại Shop</a></li>
      <li><a href="#">Shop hỗ trợ những hình thức thanh toán nào?</a></li>
      <li><a href="#">Làm sao liên kết tài khoản ngân hàng với Ví Airpay?</a></li>
      <li><a href="#">Làm sao để nạp tiền vào Ví AirPay?</a></li>
      <li><a href="#">Ví Điện tử AirPay là gì?</a></li>
    `
      break;
    case "transpot":
      ans += `
      <li><a href="#">Làm thế nào để kích hoạt đơn vị vận chuyển?</a></li>
      <li><a href="#">Tôi có thể sử dụng dịch vụ vận chuyển của những đơn vị nào?</a></li>
      <li><a href="#">Làm thế nào để sử dụng tính năng ‘Khuyến mãi phí vận chuyển’?</a></li>
      <li><a href="#">Khi có sự cố vận chuyển xảy ra, tôi nên liên hệ bộ phận nào?</a></li>
      <li><a href="#">Quy cách đóng gói hàng hóa để vận chuyển như thế nào?</a></li>
    `
      break;
    case "refund":
      ans += `
      <li><a href="#">Tôi có thể tự gửi hàng về cho Shop không?</a></li>
      <li><a href="#">Tôi phải làm gì khi muốn trả hàng hoàn tiền?</a></li>
      <li><a href="#">Tôi cần cung cấp những bằng chứng gì cho Shop để hỗ trợ giải quyết tranh chấp?</a></li>
      <li><a href="#">Tôi không có tài khoản ngân hàng, làm sao để nhận được tiền hoàn lại?</a></li>
      <li><a href="#">Tôi đồng ý với yêu cầu trả hàng/hoàn tiền của Người mua. Tôi cần phải làm gì?</a></li>
      <li><a href="#">Tôi nên làm gì nếu nhận được yêu cầu trả hàng/hoàn tiền từ Người mua vì không nhận được hàng?</a></li>
    `
      break;
    default:
      ans += `
        <li><a href="#">Hướng dẫn mua hàng tại Shop</a></li>
        <li><a href="#">Chính sách trả hàng của Shop là gì?</a></li>
        <li><a href="#">Vì sao tôi không thể lựa chọn hình thức thanh toán khi nhận hàng (COD)?</a></li>
        <li><a href="#">Tôi không đăng nhập Shopee được với số điện thoại đã đăng kí?</a></li>
        <li><a href="#">Thời gian vận chuyển hàng qua Shopee là bao lâu?</a></li>
      `
  }
  ques.innerHTML = ans;
}