var url_string = window.location.href
var url = new URL(url_string);
var id = url.searchParams.get("id");
// console.log(id)
let checking_overlay=document.getElementById("checking_overlay");
if (id==""||id==null){
    // document.getElementById("status").innerHTML="can't find the ID from url"
    checking_overlay.style.display="none";
}
else{
    checking_overlay.style.display="block";
    document.getElementById("user_in_id").value=id;
    document.getElementById("user_join_btn").click();
}