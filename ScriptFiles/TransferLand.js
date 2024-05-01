      //transfering land data
      function transferringLand(event){
        event.preventDefault();
        const url = 'http://localhost:8000/transferringLand';
        const landID = document.getElementById("landIdToTransfer").value;
        const newOwner= document.getElementById("newOwner").value;
        if(landID ==="" || newOwner ===""){
          console.log("No data provided");
          document.body.innerHTML+=("<h3>Please enter all details correctly</h3>");
        }else if(!(/^\d{5}$/.test(landID))){
          console.log("PID can contain only 5 digit number");
          document.body.innerHTML+=("<h3>Please enter PID correctly</h3>");
        }else if(typeof newOwner !== 'string' || newOwner.length !== 42 || !/^0x[0-9a-fA-F]{40}$/.test(newOwner)) {
          console.log("Incorrect Eth Address");
          document.body.innerHTML+=("<h3>Please enter eth address correctly</h3>");
        }else{
        const transferData = {
          "landID":landID,
          "newOwner":newOwner
        };
        jQuery.ajax({
          url:url,
            type:'POST',
            contentType:"application/json",
            dataType:"json",
            data: JSON.stringify(transferData),
            complete:function(response){
              console.log(response.responseJSON);
              console.log('Land successfully transfered');
            }
          });
      }
    }