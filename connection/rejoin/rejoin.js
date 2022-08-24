
var url_string = window.location.href
var url = new URL(url_string);
var id = url.searchParams.get("id");
res=false
// console.log(id)
// let ed=ocument.getElementById("re-sent");
let mainsts=document.getElementById("main-sts");
let checkingstsre=document.getElementById("checkingstsre");
let checking_overlay=document.getElementById("checking_overlay");
if (id==""||id==null){
    checkingstsre.innerHTML="id not found rediracting to homepage";
    setTimeout(function(){document.getElementById("homepagemain").click();},3000);
    
}
else{
    console.log(id)

    firebase.database().ref('session/' + id).on('value', function(snapshot) {
        if (snapshot.exists() && snapshot.val().Id == id  ) {
            res=true
            checking_overlay.style.display="none";
            document.title="Rejoin - "+id;
            mainsts.innerHTML="Rejoin The Connection with ID:- "+id;
            document.getElementById("re-sent").href=document.getElementById("re-sent").href+"?id="+id;
            document.getElementById("re-receive").href=document.getElementById("re-receive").href+"?id="+id;
    
        } else {
            console.log("NOO")
            checkingstsre.innerHTML="id not found rediracting to homepage";
                setTimeout(function(){document.getElementById("homepagemain").click();},3000);
        }
    });
    console.log(res)
    
}