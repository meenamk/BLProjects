      //verifing buyer
      function verifyBuyer(event){
        event.preventDefault();
        event.preventDefault();
        const url = 'http://localhost:8000/verifyBuyer';
        const buyerAddress = document.getElementById("buyerAddress").value;
        const buyerData = {"buyerAddress":buyerAddress};
        if (typeof buyerAddress !== 'string' || buyerAddress.length !== 42 || !/^0x[0-9a-fA-F]{40}$/.test(buyerAddress)) {
          console.log("Incorrect Eth Address");
          document.body.innerHTML+=("<h3>Please enter eth address correctly</h3>");
        }else{
        jQuery.ajax({
          url:url,
            type:'POST',
            contentType:"application/json",
            dataType:"json",
            data: JSON.stringify(buyerData),
            complete:function(response){
              console.log(response.responseJSON);
              console.log('Buyer successfully verified');
            }
          });
      }
    }