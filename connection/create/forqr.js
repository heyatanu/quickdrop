let genqr=document.getElementById("genqr");
let crurl=document.getElementById("rediracttojoin").href;
let mainjoin=crurl;
crurl=crurl+"?id="+document.getElementById("username").value;
var qr;
(function() {
        qr = new QRious({
        element: document.getElementById('qr-code'),
        size: 200,
        value: crurl
    });
})();
document.getElementById("downloadqr").onclick = function() {
    var canvas = document.getElementById("qr-code");
      var image = canvas.toDataURL();  
      var tmpLink = document.createElement( 'a' );  
      tmpLink.download = 'QuickDrop-QR-'+document.getElementById("username").value+'.png';
      tmpLink.href = image;  
      document.body.appendChild( tmpLink );  
      tmpLink.click();  
      document.body.removeChild( tmpLink ); 
}
document.getElementById("gogo").value=crurl;