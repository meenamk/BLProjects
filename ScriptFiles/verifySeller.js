        //verifying seller
        function verifySeller(event){
            event.preventDefault();
            const url = 'http://localhost:8000/verifySeller';
            console.log(`requesting ${url}`);
            const sellerAddress = document.getElementById("sellerAddress").value;
            console.log(sellerAddress);
            if (typeof sellerAddress !== 'string' || sellerAddress.length !== 42 || !/^0x[0-9a-fA-F]{40}$/.test(sellerAddress)) {
              console.log("Incorrect Eth Address");
              document.body.innerHTML+=("<h3>Please enter eth address correctly</h3>");
            }else{
            const sellerData = {"sellerAddress":sellerAddress};
            jQuery.ajax({
                url:url,
                type:'POST',
                contentType:"application/json",
                //dataType:"json",
                data: JSON.stringify(sellerData),
                complete:function(response){
                  console.log(response.responseJSON);
                  console.log('Seller successfully verified');
                },
                error:function(xhr, status, error) {
                    console.log("Encountered error is:",error);
                }
              }); 
            }
          }