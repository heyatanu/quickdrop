var url_string_new = window.location.href
var url_new = new URL(url_string_new);
var id_new = url_new.searchParams.get("id");

let checking_overlay=document.getElementById("checking_overlay");
let checkingsts=document.getElementById("checkingsts");
if (id_new=="" || id_new==null){
    checkingsts.innerHTML="id not found rediracting to homepage";
    setTimeout(function(){document.getElementById("homepage").click();},3000);
}
firebase.database().ref('session/' + id_new).on('value', function(snapshot) {
    if (snapshot.val().Id == id_new ) {
        checking_overlay.style.display="none";
        document.title="Receive File - "+id_new;

    } else {
        checkingsts.innerHTML="id not found rediracting to homepage";
        setTimeout(function(){document.getElementById("homepage").click();},3000);
    }
});

let remyVar;
let b=false;
let msgarray=[];
let filearray=[];
let fileurlarray=[];
var d = new Date();
let status=document.getElementById("status");
status.innerHTML="you are connected to "+id_new+" via network"
remyVar =setInterval(function(){ 
    console.clear();
    b=false;
    let msgQ=``;
    let fileQ=``;
    let fileurlQ=``;

    
    firebase.database().ref('session/' + id_new).on('value', function(snapshot) {
        if (snapshot.val() != null ) {
            if(snapshot.val().SendingFile){
                if(b==false){
                    b=true
                    let y=(snapshot.val().Message)
                    let x=(snapshot.val().FileName)
                    let z=(snapshot.val().FileUrl)
                    msgarray=y.split("|~|");
                    filearray=x.split("|~|");
                    fileurlarray=z.split("|~|");
                document.getElementById("maindivformsg").innerHTML="";
                document.getElementById("mainfilediv").innerHTML="";
                msgQ=``;
                msgarray.reverse();
                    for (var i=1;i<msgarray.length;i++){
                        msgQ=msgQ+`
                        <div class="chat-container">
                    <img src="./../../images/text.png" alt="text" style="width:100%;">
                    <p>`+msgarray[i]+`</p>
                    <span class="time-right">`+d.getHours()+`:`+d.getMinutes()+`:`+d.getSeconds()+`</span>
                    <button value="`+msgarray[i]+`" onclick="copyText(this.value)" >Copy</button>
                    <button value="`+msgarray[i]+`" onclick="shareText(this.value)">Share</button>
                  </div>
                        `;
                    }

                fileQ=``;
                filearray.reverse();
                fileurlarray.reverse();
                    for (var i=1;i<filearray.length;i++){
                        fileQ=fileQ+`
                        <div class="chat-container darker">
                        <img src="./../../images/file.png" alt="file" style="width:100%;">
                        <p><strong>GotIT!</strong> You file `+filearray[i]+` ready for download  <a href="`+fileurlarray[i]+`" target="about:blank" rel="noreferrer noopener" class="alert-link">DOWNLOAD</a>.</p>
                        <span class="time-right">`+d.getHours()+`:`+d.getMinutes()+`:`+d.getSeconds()+`</span>
                        <button value="`+fileurlarray[i]+`" onclick="copyFileLink(this.value)">Copy</button>
                        <button value="`+fileurlarray[i]+`" onclick="shareFileLinkNew(this.value)">Share</button>
                      </div>
                        `;
                    }
                    firebase.database().ref('session/' + id_new).update({
                        SendingFile:false
                    });
                }
                document.getElementById("maindivformsg").innerHTML=msgQ;
                document.getElementById("mainfilediv").innerHTML=fileQ;

            }
            else{
                // console.log("STILL FALSE")
            }
        }
    });
 }, 5000);


 window.onbeforeunload = function () {
    return 'Are you really want to perform the action?';
}

document.getElementById("reverse-connection").addEventListener("click",function(){
    firebase.database().ref('session/' + id_new).update({
        reverse:true
    });
    var accpectreversevar;
    var closethisint=setInterval(function(){
        firebase.database().ref('session/' + id_new).on('value', function(snapshot) {
            if (snapshot.val() != null ) {
                accpectreversevar=snapshot.val().accpectreverse;
                reverseCancelByU=snapshot.val().reverseCancelByU;
                if(reverseCancelByU){
                alert("Request cancel by sender")
                firebase.database().ref('session/' + id_new).update({
                    reverseCancelByU:false
                    });
                }
            }
        });
        if (accpectreversevar){
            clearInterval(closethisint);
            // alert("Reverse request accpected")
            location.replace(document.getElementById("homepage").href+"connection/started/sent/?id="+id_new);
        }
        
    }, 1000);


});

firebase.database().ref('session/' + id_new).update({
    accpectreverse:false,
    reverse:false
});


function copyText(e){
    document.getElementById("forCopyInput").value=e
    var copyText = document.getElementById("forCopyInput");
    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);

    // Alert the copied text
    alert("Copied");
}
function shareText(e){
    if (navigator.share) {
        navigator.share({
            
                text:e
               
            }).then(() => {
                // console.log('Thanks for sharing!');
            })
            .catch(err => {
                console.log(`Couldn't share because of some error`);
            });
    }
}


function createShortLink(){
    url=document.getElementById("homepage").href
    url=url+"/q/?id="+id_new
    // console.log(url)
    return url
}

function shareFileLink(e){
    firebase.database().ref('session/' + id_new).update({
        currentLink:e
    });
}


function copyFileLink(e){
    shareFileLink(e)
    copyText(createShortLink())
}

function shareFileLinkNew(e){
    shareFileLink(e)
    url=createShortLink()
    if (navigator.share) {
        navigator.share({
            
                url:url,
                text:url
               
            }).then(() => {
                // console.log('Thanks for sharing!');
            })
            .catch(err => {
                // console.log(`Couldn't share because of some error`);
            });
    }

}