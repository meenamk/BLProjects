      //registering land
      function LandRegistration(event){
        event.preventDefault();
        const url = 'http://localhost:8000/registeringLand';
        const area = document.getElementById("area").value;
        const city = document.getElementById("city").value;
        const state = document.getElementById("state").value;
        const price = document.getElementById("price").value;
        const pid = document.getElementById("pid").value;
        const surveryNumber = document.getElementById("surveyNumber").value;
        // const ipfsHash = document.getElementById("ipfsHash").value;
        // const file = document.getElementById("document").value;
        if(area ==="" || city ==="" || state ==="" || price==="" || pid ===""||surveryNumber ===""){
          console.log("No data provided");
          document.body.innerHTML+=("<h3>Please enter all details correctly</h3>");
        }else if(!(/^[A-Za-z]+$/.test(city)) || !(/^[A-Za-z]+$/.test(state))){
          console.log("city and state can contain only alphabets");
          document.body.innerHTML+=("<h3>Please enter city, state correctly</h3>");
        }else if (!(/^\d{4}$/.test(area))){
          console.log("area can contain only 4 digit number");
          document.body.innerHTML+=("<h3>Please enter area correctly</h3>");
        }else if(!(/^\d{5}$/.test(price))){
          console.log("price can contain only 5 digit number");
          document.body.innerHTML+=("<h3>Please enter price correctly</h3>");
        }else if(!(/^\d{5}$/.test(pid))){
          console.log("PID can contain only 5 digit number");
          document.body.innerHTML+=("<h3>Please enter PID correctly</h3>");
        }else if(!(/^\d{6}$/.test(surveryNumber))){
          console.log("surveynumber can contain only 6 digit number");
          document.body.innerHTML+=("<h3>Please enter surveynumber correctly</h3>");
        }else{
        const landData = {
          "area":area,
          "city":city,
          "state":state,
          "price":price,
          "pid":pid,
          'surveyNumber':surveryNumber,
          // 'ipfsHash':ipfsHash,
          // 'file':file
        };
        console.log(landData);
        jQuery.ajax({
          url:url,
            type:'POST',
            contentType:"application/json",
            dataType:"json",
            data: JSON.stringify(landData),
            complete:function(response){
              console.log(response.responseJSON);
              console.log('Land successfully registered');
              
            }
          });   
      }
      }