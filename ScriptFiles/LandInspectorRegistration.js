function LandInsReg(){
    const url = 'http://localhost:8000/addLandInspector';
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const aadhar = document.getElementById("aadhar").value;
    const pan = document.getElementById("pan").value;
    // const inspectorAddress = document.getElementById("inspectorAddress").value;
    if(name ==="" || age ==="" || aadhar ==="" || pan===""){
        console.log("No data provided");
        document.body.innerHTML+=("<h3>Please enter all details correctly</h3>");
      }else if(!(/^[A-Za-z]+$/.test(name))){
        console.log("Name can contain only alphabets");
        document.body.innerHTML+=("<h3>Please enter name correctly</h3>");
      }else if(Number(age)<18){
        console.log("Incorrect age entered");
        document.body.innerHTML+=("<h3>Please enter age correctly</h3>");
      }else if(/^[A-Za-z]+$/.test(aadhar)|| aadhar.length !== 12){
        console.log("Incorrect aadhar number");
        document.body.innerHTML+=("<h3>Please enter aadhar detail correctly</h3>");
      }else if(pan.length!==10 || !(/^[A-Za-z]+$/.test(pan.substring(0,5))) || !(/^\d{4}$/.test(pan.substring(5,9))) || !(/^[A-Za-z]+$/.test(pan.substring(9)))){
        console.log("Incorrect pan number");
        document.body.innerHTML+=("<h3>Please enter pan detail correctly</h3>");
      }else{
    const landInsData = {"name":name,
        "age":age,
        "aadhar":aadhar,
        "pan":pan};
    jQuery.ajax({
      url:url,
        type:'POST',
        contentType:"application/json",
        dataType:"json",
        data: JSON.stringify(landInsData),
        complete:function(response){
          console.log(response.responseJSON);
          console.log('Registered land inspector successfully');
        }
      });
    };
  }