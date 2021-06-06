function copylink(){
    var copyText = document.getElementById("gogo");
    copyText.select();
    copyText.setSelectionRange(0, 99999)
    document.execCommand("copy");
    alert("Copied the link");

}
let sharetext=`Hey, join with me in QuickDrop , With ID:-` +randomid +`  -------  OR join by link Click here : -- >  `+crurl;

function sharelinkfun(){
    if (navigator.share) {
        navigator.share({
            title: 'QuickDrop Share',
                text:sharetext,
                url: crurl
            }).then(() => {
                // console.log('Thanks for sharing!');
            })
            .catch(err => {
                console.log(`Couldn't share because of some error`);
            });
    }

}