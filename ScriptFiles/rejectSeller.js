        //rejecting seller
        function rejectSeller(event){
            event.preventDefault();
            const url = 'http://localhost:8000/rejectSeller';
            const sellerAddress = document.getElementById("sellerAddress").value;
            const sellerData = {"sellerAddress":sellerAddress};
            if (typeof sellerAddress !== 'string' || sellerAddress.length !== 42 || !/^0x[0-9a-fA-F]{40}$/.test(sellerAddress)) {
              console.log("Incorrect Eth Address");
              document.body.innerHTML+=("<h3>Please enter eth address correctly</h3>");
            }else{
            jQuery.ajax({
              url:url,
                type:'POST',
                contentType:"application/json",
                dataType:"json",
                data: JSON.stringify(sellerData),
                complete:function(response){
                  console.log(response.responseJSON);
                  console.log('Seller successfully rejected');
                },
                error:function(xhr, status, error) {
                    console.log("Encountered error is:",error);
                }
              });
          }
        }