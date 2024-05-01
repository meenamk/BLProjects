const {expect} = require ('chai');
const {ethers} = require('hardhat');
let seller;
let buyer;
let landInspector;

describe("Land Management contract", function(){
    it("User is to be registered as seller", async function(){
        const name ='Meena';
        const age = 29;
        const aadhar =123456789123;
        const pan = 'KLMRT5362M';
        seller = await ethers.getSigners();
        const LandManagement= await ethers.getContractFactory('LandRegistration');
        const hardhatLMcontract = await LandManagement.deploy();
        const result = await hardhatLMcontract.addSellers(name,age,aadhar,pan);
        console.log(result.from);
    });
    it("Land is to be registered", async function(){
        const area = 800;
        const city ="chennai";
        const state = "TN";
        const price =10000;
        const pid=23651;
        const surveyNumber=456123;
        const [owner] = await ethers.getSigners();
        const LandManagement= await ethers.getContractFactory('LandRegistration');
        const hardhatLMcontract = await LandManagement.deploy();
        const result = expect(hardhatLMcontract.connect(seller).addLand(area,city, state, price, pid, surveyNumber));
        console.log(result);
    });
    it("User is to be registered as buyer", async function(){
        const name ='Logesh';
        const age = 26;
        const aadhar =123456789000;
        const pan = 'KLMRT5552M';
        buyer = await ethers.getSigners();
        const LandManagement= await ethers.getContractFactory('LandRegistration');
        const hardhatLMcontract = await LandManagement.deploy();
        const result = await hardhatLMcontract.addBuyers(name,age,aadhar,pan);
        console.log(result.from);
    });
    it("User is to be registered as land inspector", async function(){
        const name ='Harish';
        const age = 35;
        const aadhar =123456789111;
        const pan = 'KLMRT5559K';
        landInspector = await ethers.getSigners();
        const LandManagement= await ethers.getContractFactory('LandRegistration');
        const hardhatLMcontract = await LandManagement.deploy();
        const result = await hardhatLMcontract.addLandInspector(name,age,aadhar,pan);
        console.log(result.from);
    });
    it("Checking is verified land", async function(){
        const pid=23651;
        //const [owner] = await ethers.getSigners();
        const LandManagement= await ethers.getContractFactory('LandRegistration');
        const hardhatLMcontract = await LandManagement.deploy();
        const result = expect(hardhatLMcontract.connect(seller).isVerifiedLand(pid));
        console.log(result);
})
})