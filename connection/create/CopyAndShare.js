function copylink(){
    var copyText = document.getElementById("gogo");
    copyText.select();
    copyText.setSelectionRange(0, 99999)
    document.execCommand("copy");
    alert("Copied the link");

}
let mainurltohome=document.getElementById("rediracttomain").href;
let rejoinmain=document.getElementById("rejoinmain");
let rejoinmainhref=rejoinmain.href+"?id="+randomid;
// let sharetext=`Hey, to join with me in QuickDrop, click this link: `+crurl+`     > To join by ID instead, click this link: `
//  +mainjoin +` and enter this ID: `+randomid+`    >Want to try QuickDrop click this link: `+mainurltohome;

 
let sharetext=`To join with me in QuickDrop, With ID:- `+randomid+` or click this link to join: `

let sharetextlater=`To join with me in QuickDrop later, With ID:- `+randomid+` or click this link to join later or rejoin: `

function sharelinkfun(){
    if (navigator.share) {
        navigator.share({
            title: 'QuickDrop',
            url: crurl,
                text:sharetext
               
            }).then(() => {
                // console.log('Thanks for sharing!');
            })
            .catch(err => {
                console.log(`Couldn't share because of some error`);
            });
    }

}


function sharelinkfunrejoin(){
    if (navigator.share) {
        navigator.share({
            title: 'QuickDrop',
            url: rejoinmainhref,
                text:sharetextlater
               
            }).then(() => {
                // console.log('Thanks for sharing!');
            })
            .catch(err => {
                console.log(`Couldn't share because of some error`);
            });
    }

}