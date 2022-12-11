var credentials = JSON.parse(localStorage.getItem("credentials"));
 var name_user = document.querySelectorAll('.name_detail_user');
 document.querySelector('.username_customer').innerHTML = credentials.name;
 document.querySelector('.name_detail_user_1').innerHTML = credentials.name + `<i class="fa-solid fa-pen-to-square"></i>`;
 document.querySelector('.email_detail_user').innerHTML =credentials.email + `<i class="fa-solid fa-pen-to-square"></i>`;
 document.querySelector('.password_detail_user').value =credentials.password ;
for(let i=0;i<name_user.length;i++)
{
    name_user[i].innerHTML=credentials.name;
}

function setWidth()
        {
            //Set width span nav_user
            const widthOfname=document.querySelector('.username_customer').offsetWidth;
            const usertNameElement = document.querySelector('.span');
            usertNameElement.style.width=widthOfname+'px';
        }
        setWidth();

document.querySelector('.name_detail_user').innerHTML=credentials.name;



