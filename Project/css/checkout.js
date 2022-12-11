const orderBtn = document.querySelector('.button-alt');
             //when scroll, header will change
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
               
                



                function showSuccessToast() {
                toast({
                title: "Successfully!",
                message: "You have successfully paid for your order.",
                type: "success",
                duration: 5000
                });
                orderBtn.innerHTML=`<a href="/Product-List-main/index_productList.html">Return To Product Page</a>`
               
                }
                
                function toast({ title = "", message = "", type = "info", duration = 3000 }) {
                const main = document.getElementById("toast");
                if (main) {
                const toast = document.createElement("div");

                // Auto remove toast
                const autoRemoveId = setTimeout(function () {
                main.removeChild(toast);
                }, duration + 1000);

                // Remove toast when clicked
                toast.onclick = function (e) {
                if (e.target.closest(".toast__close")) {
                main.removeChild(toast);
                clearTimeout(autoRemoveId);
                }
                };

                // const icons = {
                // success: "fas fa-check-circle",
                // info: "fas fa-info-circle",
                // warning: "fas fa-exclamation-circle",
                // error: "fas fa-exclamation-circle"
                // };
                // const icon = icons[type];
                const delay = (duration / 1000).toFixed(2);

                toast.classList.add("toast", `toast--${type}`);
                toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;
                //Có thể thêm dòng này vào thay chỗ icon
                // <i class="${icon}"></i>
                toast.innerHTML = `
                <div class="toast__icon">
                <i class="fas fa-check-circle"></i>
                </div>
                <div class="toast__body">
                <h3 class="toast__title">${title}</h3>
                <p class="toast__msg">${message}</p>
                </div>
                <div class="toast__close">
                <i class="fas fa-times"></i>
                </div>
                `;
                main.appendChild(toast);
                }
                }
                function setWidth()
        {
            //Set width span nav_user
            const widthOfname=document.querySelector('.username_customer').offsetWidth;
            const usertNameElement = document.querySelector('.span');
            
            usertNameElement.style.width=widthOfname+'px';
        }
        var credentials = JSON.parse(localStorage.getItem("credentials"));
            document.querySelector('.username_customer').innerHTML=credentials.name;
            setWidth();

            var detailsProduct =JSON.parse(localStorage.getItem("DetailHD"));
            var htmls = detailsProduct.ObjectItem.join('')
                document.querySelector('.parent').innerHTML = htmls;
                document.querySelector(".js-total").innerHTML=detailsProduct.total;
           
            