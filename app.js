const INFURA_API_KEY = undefined //need to add infura link
const SIGNER_PRIVATE_KEY=undefined; // need to add private key
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const { ethers } = require("ethers");
app.use(cors());
app.use(bodyParser.json());
const port = 8000;

const contractAddress = "0x73726d437394902b5307c5820086484b82d1029c";
const contractABI = JSON.parse(fs.readFileSync("./artifacts/contracts/LandManagement.sol/LandRegistration.json", 'utf-8'));

const provider = new ethers.getDefaultProvider(INFURA_API_KEY)
const signer = new ethers.Wallet(SIGNER_PRIVATE_KEY, provider);

const landManagementContract = new ethers.Contract(contractAddress, contractABI.abi, signer);
app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/userRegistration", function(req, res){
    res.sendFile(path.join(__dirname,"UserManagement.html"));
});

function waitForSeconds(secs){
    const milliseconds =secs * 1000;
    return new Promise(resolve=>{
        setTimeout(resolve, milliseconds)
    })
}

app.post("/sellerRegistration",function(req,res){
    try{
    console.log("Received req:",req.body)
    const sellerData = req.body;
    if(!sellerData){
        res.status(406).send({"status":"failed",
    'Reason': "No data provided"});
    }
    else{
        const {name, age,aadhar,pan}=sellerData;
        const tx= landManagementContract.addSellers(name,age,aadhar,pan);
        waitForSeconds(10);
        console.log(tx)
        console.log(tx.hash);
        provider.getTransactionReceipt(tx.hash).then((receipt) => {
            if (receipt === null) {
            console.log("Transaction is not mined yet");
            } else if (receipt.status === 0) {
            console.log("Transaction failed");
            } else {
            console.log("Transaction successful");
            }
        }).catch((error) => {
                console.error("Error occurred:", error);});
        res.status(200).send({"status":"completed"});
    }
    }catch(error) {
        console.error(error);}
})
app.post("/buyerRegistration",function(req,res){
    console.log("Received req:",req.body)
    const buyerData = req.body;
    console.log(buyerData);
    const {name, age,aadhar,pan}=buyerData;
    if(!buyerData){
        res.status(406).send({"status":"failed",
    'Reason': "No data provided"}); 
    }else{
        const tx= landManagementContract.addBuyers(name, age,aadhar,pan);
        console.log(tx)
        res.status(200).send({"status":"completed"});
    }
});
app.get("/LandInspectorRegistration", function(req, res){
    res.sendFile(path.join(__dirname,"AddLandInspector.html"));
});
app.post("/addLandInspector",function(req,res){
    console.log("Received req:",req.body);
    const landInsData = req.body;
    if(!landInsData){
        res.status(406).send({"status":"failed",
    'Reason': "No data provided"}); 
    }else{
        const {name, age,aadhar,pan}=landInsData;
        const tx= landManagementContract.addLandInspector(name, age,aadhar,pan);
        console.log(tx)
        res.status(200).send({"status":"completed"});
    }
});
app.get("/verifyOrRejectSeller", function(req, res){
    console.log('receiving http://localhost:8000/verifyOrRejectSeller')
    res.sendFile(path.join(__dirname,"SellerVerification.html"));
});
app.post("/verifySeller",function(req, res){
    console.log("receiving http://localhost:8000/verifySeller");
    console.log("Received req:", req.body);
    const sAddress=req.body;
    if(!req.body){
        res.status(406).send({"status":"failed",
    'Reason': "No data provided"}); 
    }else{
        const tx= landManagementContract.verifySeller(sAddress.sellerAddress);
        console.log(tx)
        res.status(200).send({"status":"completed"});
    }
});
app.post("/rejectSeller",function (req, res){
    console.log("receiving http://localhost:8000/verifyReject");
    console.log("Received req:",req.body);
    const sAddress=req.body;
    if(!req.body){
        res.status(406).send({"status":"failed",
    'Reason': "No data provided"}); 
    }else{
        const tx= landManagementContract.rejectSeller(sAddress.sellerAddress);
        console.log(tx)
        res.status(200).send({"status":"completed"});
    }
});
app.get("/verifyOrRejectBuyer", function(req, res){
    res.sendFile(path.join(__dirname,"BuyerVerification.html"));
});
app.post("/verifyBuyer",function (req, res){
    console.log("Received req:",req.body);
    const bAddress=req.body
    if(!req.body){
        res.status(406).send({"status":"failed",
    'Reason': "No data provided"}); 
    }else{
        const tx= landManagementContract.verifyBuyer(bAddress.buyerAddress);
        console.log(tx)
        res.status(200).send({"status":"completed"});
    }
});
app.post("/rejectBuyer",function (req, res){
    console.log("Received req:",req.body)
    const bAddress=req.body;
    if(!req.body){
        res.status(406).send({"status":"failed",
    'Reason': "No data provided"}); 
    }else{
        1
        console.log(tx)
        res.status(200).send({"status":"completed"});
    }
});
app.get("/landRegistration", function(req, res){
    res.sendFile(path.join(__dirname,"LandRegistration.html"));
});
app.post("/registeringLand",function (req, res){
    console.log("Received req:",req.body);
    if(!req.body){
        res.status(406).send({"status":"failed",
    'Reason': "No data provided"}); 
    }else{
        const LandData=req.body;
        const tx= landManagementContract.addLand(LandData.area,LandData.city, LandData.state,LandData.price, LandData.pid, LandData.surveyNumber);
        console.log(tx)
        res.status(200).send({"status":"completed"});
}});
app.get("/viewLand",function (req, res){
    console.log("Received req:",req.body)
    res.sendFile(path.join(__dirname,"LandDetails.html"));
});
app.post('/fetchLandData',function(req,res){
    if(!req.body){
        res.status(406).send({"status":"failed",
    'Reason': "No data provided"}); 
    }else{
        const transferData=req.body
        const tx= landManagementContract.addLand(transferData.landID);
        console.log(tx)
        res.status(200).send({"status":"completed"});
}
});

app.get("/requestLand",function (req, res){
    console.log("Received req:",req.body)
    res.sendFile(path.join(__dirname,"RequestLand.html"));
});

app.post('/requestingLand',function(req,res){
    if(!req.body){
        res.status(406).send({"status":"failed",
    'Reason': "No data provided"}); 
    }else{
        const transferData=req.body
        const tx= landManagementContract.addLand(transferData.landID);
        console.log(tx)
        res.status(200).send({"status":"completed"});
}
});

app.get("/landTransfer", function(req, res){
    res.sendFile(path.join(__dirname,"TransferLand.html"));
});
app.post("/transferringLand",function (req, res){
    console.log("Received req:",req.body);
    if(!req.body){
        res.status(406).send({"status":"failed",
    'Reason': "No data provided"}); 
    }else{
        const transferData=req.body
        const tx= landManagementContract.addLand(transferData.landID,transferData.newOwner);
        console.log(tx)
        res.status(200).send({"status":"completed"});
}
});
app.listen(port, ()=>{
    console.log(`server has been started ${port}`);
});