


    $(document).ready(function(){

	
        var element = $("#captureForimg"); // global variable
        var getCanvas; // global variable
         
            $("#btn-Preview-Image").on('click', function () {

                document.getElementById("forRevveseModelBtn").click();

                 html2canvas(element, {
                 onrendered: function (canvas) {
                        $("#previewImage").append(canvas);
                        getCanvas = canvas;
                     }

                 });
            });
        
            $("#btn-Convert-Html2Image").on('click', function () {
                var nameFIlee='QuickDrop-QR-'+document.getElementById("username").value+'.png';
            var imgageData = getCanvas.toDataURL("image/png");
            // Now browser starts downloading it instead of just showing it
            var newData = imgageData.replace(/^data:image\/png/, "data:application/octet-stream");
            $("#btn-Convert-Html2Image").attr("download", nameFIlee).attr("href", newData);
            });
        
        });
        
