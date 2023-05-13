function performOp()
{
    db.collection('admin').get().then((snapshot) => {
	let consoleClear= (snapshot.docs[0].data()	)
    if(consoleClear.deleteOlder.sureToDelete){
        deleteFiles(consoleClear.deleteOlder.hours,consoleClear.deleteOlder.connectionDelete)
    }


    if(consoleClear.deleteOlder.allDelete){
        allDelete()
    }

    

    }).catch(err => {
        // console.log(err)
    });


    function allDelete(){
        deleteFiles(0,true)

        firebase.database().ref('session/').once('value', function(snapshot) {
            if (snapshot.val() != null) {
                snapshot.forEach(function(childSnapshot) {
                    if (childSnapshot.val() != null) {
                        Id = childSnapshot.val().Id;
                    if(Id!=7548 || Id != '7548'){
                    firebase.database().ref('session/' + Id).remove();
                    }

                    }
                });
            }
        });
    }

    function deleteFiles(hours,connectionDelete){
        var listRef = firebase.storage().ref().child('Files/');


    listRef.listAll().then(function(res){
        res.items.forEach(function(itemRef){
            itemRef.getMetadata().then(function (link) {
                t=(link.timeCreated)
                t=t.split("T")
                dateS=t[0].split("-")
                ds=dateS[1]+"/"+dateS[2]+"/"+dateS[0]
                dt1 = new Date(ds);
                currentDate = new Date();
                hoursOld=(getTheDifference(dt1,currentDate))
                if(hours<hoursOld){
                    var desertRef = firebase.storage().ref('Files/' + link.name);
                    desertRef.delete().then(() => {
                        console.log("DLETE FILE")
                    }).catch((error) => {
                        // console.log("SOME EROR OCC")
                    });
                }
                if(connectionDelete && hours<hoursOld ){
                    id=((((link.name).split(".")[0]).split("-")).slice(-1)[0])
                    if(id!=7548 || id != '7548'){
                    firebase.database().ref('session/' + id).remove();
                    }
                }
                

            })
        
    })
    })

    }






    function getTheDifference(dt1, dt2){

    var diff =(dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60);
    return Math.abs(Math.round(diff));
    
    }




}