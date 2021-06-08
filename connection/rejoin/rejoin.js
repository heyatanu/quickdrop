
var url_string = window.location.href
var url = new URL(url_string);
var id = url.searchParams.get("id");
// console.log(id)
// let ed=ocument.getElementById("re-sent");
let mainsts=document.getElementById("main-sts");
let checkingstsre=document.getElementById("checkingstsre");
let checking_overlay=document.getElementById("checking_overlay");
if (id==""||id==null){
    checkingstsre.innerHTML="id not found rediracting to homepage";
    // setTimeout(function(){document.getElementById("homepagemain").click();},3000);
}
else{
    firebase.database().ref('session/' + id).on('value', function(snapshot) {
        if (snapshot.val().Id == id ) {
            checking_overlay.style.display="none";
            document.title="Rejoin - "+id;
            mainsts.innerHTML="Rejoin The Connection with ID:- "+id;
            document.getElementById("re-sent").href=document.getElementById("re-sent").href+"?id="+id;
            document.getElementById("re-receive").href=document.getElementById("re-receive").href+"?id="+id;
    
        } else {
            checkingstsre.innerHTML="id not found rediracting to homepage";
                setTimeout(function(){document.getElementById("homepagemain").click();},3000);
        }
    });
    
}