let message_field=document.getElementById("message_field");
let status=document.getElementById("status");
let file_btn=document.getElementById("file_btn");
let file_btn_upload=document.getElementById("file_btn_upload");
let mainprogress=document.getElementById("mainprogress");
let uploading_overlay=document.getElementById("uploading_overlay");
let uploadingsts=document.getElementById("uploadingsts");

document.getElementById("question").innerHTML="you are connected to "+id+" via network"

let msg="";
let filename="";
let filedownloadurl="";
let b=false;
let clvar;
firebase.database().ref('session/' + id).update({
    Message:"",
    SendingFile:false,                    
    FileUrl:"",
    FileName:""
});  
document.getElementById("message_btn").onclick= function() {
if(message_field.value==""){
    status.innerHTML="Write something";
}
else{
    b=false
    let mainmsg=(message_field.value)
    msg=msg+mainmsg+"|~|";
    firebase.database().ref('session/' + id).update({
        Message:msg,
        SendingFile:true
    });  
    status.innerHTML="Sent Sussefully";
    message_field.value="";
}
setTimeout(function(){
    status.innerHTML="sent your message or files";
},3000);

return false;
}

document.getElementById("file_btn").onclick = function(e) {
    var input = document.createElement('input');
    input.type = 'file';
    input.onchange = e => {
        files = e.target.files;
        reader = new FileReader();
        reader.onload = function() {
            //   document.getElementById("myimg").src=reader.result;
        }
        reader.readAsDataURL(files[0]);
        //   console.log(files[0])
        file_btn_upload.disabled=false;
        file_btn_upload.style.cursor="pointer";
        status.innerHTML=files[0].name+" ready to upload"

    }
    input.click();
}

document.getElementById("file_btn_upload").onclick = function() {
    uploadingsts.innerHTML="uploading file "+files[0].name
    uploading_overlay.style.display="block";
    firebase.database().ref('session/').once('value', function(snapshot) {
        filename=filename+files[0].name+"|~|";
        var uploadTask = firebase.storage().ref('Files/' + id).put(files[0]);
        uploadTask.on('state_changed', function(snapshot) {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                progress = parseInt(progress)
                // console.log(progress)
                mainprogress.style.width=progress+"%";
                mainprogress.innerHTML=progress+"%";
            },
    
            function(error) {
                //   alert("ERROR IN SAVING IMAGE");
            },
    
            function() {
                uploadTask.snapshot.ref.getDownloadURL().then(function(url) {
                    filedownloadurl=filedownloadurl+url+"|~|";
                    firebase.database().ref('session/' + id).update({
                        FileUrl:filedownloadurl,
                        FileName:filename,
                        SendingFile:true
                    });
                    //   alert("SUCCESSFULL")
                    uploadingsts.innerHTML="uploading complete wait";
    status.innerHTML="sent your message or files";
        setTimeout(function(){
            uploading_overlay.style.display="none";
        },3000);

                    
    file_btn_upload.disabled=true;
    file_btn_upload.style.cursor="not-allowed";

                });
            });
    });
}



window.onbeforeunload = function () {
    return 'Are you really want to perform the action?';
}

setTimeout(function(){console.clear();}, 5000);