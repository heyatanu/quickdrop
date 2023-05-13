let randomid = Math.floor(Math.random() * 9999999);
document.getElementById("username").value=randomid;
let create_con_id=document.getElementById("create_con_id");
var myVar;
create_con_id.innerHTML=randomid;
var dateobj = new Date();
uplodedate = ((dateobj.getMonth())+1) + "/" + dateobj.getDate() + "/" + dateobj.getFullYear() ;

firebase.database().ref('session/' + randomid).set({
    Id: randomid ,
    ConnectionStarted: false,
    SendingFile: false,
    Message: "",
    FileUrl:"",
    FileName:"",
    reverse:false,
    accpectreverse:false,
    createDate:uplodedate
});

myVar =setInterval(function(){ 
    console.clear();
    firebase.database().ref('session/' + randomid).on('value', function(snapshot) {
        if (snapshot.val() != null ) {
            if(snapshot.val().ConnectionStarted){
                // console.log("UPDATED");
                clearInterval(myVar);
                document.getElementById("rereceive").href="./../started/receive/?id="+randomid;
                document.getElementById("rereceive").click();
            }
            else{
                // console.log("STILL FALSE")
            }
        }
    });
 }, 1000);


