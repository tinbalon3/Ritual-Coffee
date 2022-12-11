function setWidth()
        {
            //Set width span nav_user
            const widthOfname=document.querySelector('.username_customer').offsetWidth;
            const usertNameElement = document.querySelector('.span');
           
            usertNameElement.style.width=widthOfname+'px';
        }
        // Check xem có phải admin hay không
       var isUser = JSON.parse(localStorage.getItem("IsUser"))
        //Nếu không thì là set name là customer
        var list = document.querySelectorAll('.header__navbar-list-item');
        if(isUser.value)
        {
            list[6].style.display="none";
            list[7].classList.remove('login')
           var credentials = JSON.parse(localStorage.getItem("credentials"));
            document.querySelector('.username_customer').innerHTML=credentials.name;
            if(document.querySelector(".slider__button"))
            {
                document.querySelector(".slider__button").href='/Product-List-main/index_productList.html'
            }
            
            document.querySelector(".product").href ="/Product-List-main/index_productList.html"
            setWidth();
        }
        function setConfig(value)
                {
                    localStorage.setItem(
                        "IsUser",
                        JSON.stringify({ value: value })
                    );
                }
        function logout()
        {
            list[6].style.display="block";
            list[7].classList.add('login')
            setConfig(false)
        }