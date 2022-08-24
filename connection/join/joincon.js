let user_join_btn=document.getElementById("user_join_btn");
user_join_btn.onclick = function() {
    let user_in_id=document.getElementById("user_in_id").value;
    if (user_in_id!=""){
            // console.log("WAIT CHECKING")
    firebase.database().ref('session/' + user_in_id).on('value', function(snapshot) {
        if (snapshot.exists() && snapshot.val().Id == user_in_id ) {
            firebase.database().ref('session/' + user_in_id).update({
                ConnectionStarted:true
            });    
            document.getElementById("status").innerHTML="wait connecting"
            document.getElementById("resent").href="./../started/sent/?id="+user_in_id;
            document.getElementById("resent").click();
        } else {
            // console.log("NO ID DATA")
            document.getElementById("status").innerHTML="not a valid id"
            checking_overlay.style.display="none";
        }
    });
    // return false;
    }
    
}

