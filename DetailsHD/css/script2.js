var credentials = JSON.parse(localStorage.getItem("credentials"));
document.querySelector('.name_detail_user').innerHTML=credentials.name;

document.querySelector('.close_1').addEventListener("click", function() {
    document.querySelector('.modal_product').style.display="none";
})
document.querySelector(".modal_1").addEventListener("click",function()
{
    document.querySelector('.modal_product').style.display="block";
})
document.querySelector(".modal_2").addEventListener("click",function()
{
    document.querySelector('.open').style.display="block";
})
document.querySelector('.close_2').addEventListener("click", function() {
    document.querySelector('.modal_product.open').style.display="none";
})
