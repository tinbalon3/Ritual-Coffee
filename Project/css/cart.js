       

var prevScrollpos = window.pageYOffset;
            window.onscroll = function() {
            var currentScrollPos = window.pageYOffset;
            if (prevScrollpos > currentScrollPos) {
            document.querySelector('.header').style.top = "0";
            document.querySelector('.header').classList.add('thaydoiheader');
            } else {
            document.querySelector('.header').style.top = "-96px";
            }
            if(currentScrollPos == 0)
            {
                document.querySelector('.header').classList.remove('thaydoiheader');
            }
            prevScrollpos = currentScrollPos;
            }

            var button_remove=document.querySelectorAll('.js-remove');
            var total_item=document.querySelectorAll('.js-total');
            var contentbox=document.querySelector('.js-content_1');
            var contentbox_2=document.querySelector('.js-content_2');
           
            var modal=document.querySelector('.modal_empty');
            var count=0;
            for(let i=0;i<button_remove.length;i++)
            {
                button_remove[i].addEventListener('click',function()
                {
                    count++;
                    console.log(count);
                    item[i].style.display='none';
                    if(count==button_remove.length)
                    {
                        modal.style.display='block';
                        setTimeout(function()
                        {
                            contentbox.classList.add('close');
                            contentbox_2.classList.add('open');
                            modal.style.display='none';
                        },1500);
                    }
                })
            
            }
            function resetConfig()
            {
            localStorage.removeItem("DetailHD");
            }
            // chạy hàm
            var qtyCurrent = [];
            resetConfig();
            addProduct();
            
            function addProduct()
            {
            var arrProduct =JSON.parse(localStorage.getItem("arrProduct"));
            for(var i=0;i<arrProduct.Item.length;i++)
            {
                const newElemnt = document.createElement('tr');
                newElemnt.classList.add("list-items");
                newElemnt.classList.add("js-item");
                newElemnt.innerHTML=arrProduct.Item[i];
                document.querySelector('.table_parent').appendChild(newElemnt);
                qtyCurrent.push(1);
            }
            }
           
            // Tính tổng đơn hàng
            var item=document.querySelectorAll('.js-item');
            var qtyProduct = document.querySelectorAll("#qtyProduct");
            var subtotal = document.querySelectorAll('#totalProduct'); 
            var nameProduct = document.querySelectorAll("#nameProduct");
            var subtotal_1 = document.querySelectorAll('#priceProduct'); 
            var total = 0;
            for(var i=0;i<subtotal.length;i++)
            {
                
                total = total + parseInt(subtotal_1[i].innerHTML.slice(1).split('.')[0]) ;
            }
            for(let i=0;i<total_item.length;i++)
            {
                total_item[i].innerHTML='$' + `${total}` + '.00';
            }
            function plus(element)
            {
                 
                var parent = element.closest('.body__product-detail-quantity-button');
                var value=parent.querySelector('.js-qty').value;
                var count=parseInt(value)+1;
                parent.querySelector('.js-qty').value=count;
            }
            function minus(element)
            {
                var parent = element.closest('.body__product-detail-quantity-button');
                var value=parent.querySelector('.js-qty').value;
                var count=parseInt(value)-1;
                if(count<1)
                    count=1;
                parent.querySelector('.js-qty').value=count;
            }
            function update()
            {
                var values=document.querySelectorAll('.js-qty');
                var totalCurrent;
                for(let i=0;i<values.length;i++)
                {

                     if(values[i].value != qtyCurrent[i])
                     {
                        qtyCurrent[i]=values[i].value;
                        qtyProduct[i].innerHTML = `${values[i].value}`
                        totalCurrent = values[i].value*parseInt(subtotal_1[i].innerHTML.slice(1).split('.')[0]);
                        subtotal[i].innerHTML = '$' + `${totalCurrent}` + '.00';

                            for(let j=0;j<values.length;j++)
                            {
                            if(j!=i)
                            {
                                totalCurrent+=parseInt(subtotal[j].innerHTML.slice(1).split('.')[0])
                            }
                        }
                        total_item[0].innerHTML='$' + `${totalCurrent}` + '.00';    
                        total_item[1].innerHTML='$' + `${totalCurrent}` + '.00';

                }
            }
        }
        
        function detail()
        {
            
            var ObjectItem = [];
            for(let i=0;i<item.length;i++)
            {
                // var details = document.createElement('tr');
                // details.classList.add("cart-items");
                var details = `
                <tr class="cart-items">
                <th class="product-name">
                <span class="js-name">${nameProduct[i].innerHTML}</span>
                <strong class="product-quantity">x <span class="js-qty">${qtyProduct[i].innerHTML}</span></strong>
            </th>
           
            <th class="product-total">
                <span class="price-amout">
                    <span class="js-price">${subtotal[i].innerHTML}</span>
                </span>
            </th>
            </tr>`;
            console.log(details)
                ObjectItem.push(details);
            }
            localStorage.setItem("DetailHD",JSON.stringify({ ObjectItem: ObjectItem, total: total_item[0].innerHTML}))
        }
       
        var checked = document.querySelector('.check-button');
       
        
        
        