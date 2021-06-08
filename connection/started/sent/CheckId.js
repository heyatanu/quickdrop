var url_string = window.location.href
var url = new URL(url_string);
var id = url.searchParams.get("id");
let checking_overlay=document.getElementById("checking_overlay");
let checkingsts=document.getElementById("checkingsts");
if (id==""||id==null){
    checkingsts.innerHTML="id not found rediracting to homepage";
    setTimeout(function(){document.getElementById("homepage").click();},3000);

}

// console.log("CHECKING")
firebase.database().ref('session/' + id).on('value', function(snapshot) {
    if (snapshot.val().Id == id ) {
        // console.log(id)
        checking_overlay.style.display="none";
        document.title="Sent File - "+id;

    } else {
        checkingsts.innerHTML="id not found rediracting to homepage";
        
        setTimeout(function(){document.getElementById("homepage").click();},3000);
    }
});
