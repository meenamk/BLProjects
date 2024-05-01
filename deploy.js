async function main(){
    const LandManagement = await ethers.getContractFactory("LandRegistration");
    const contractDeployed = await LandManagement.deploy();
    await contractDeployed.deployed();
    console.log(`Deployed Token address ${contractDeployed}`);

}

main().then(()=>process.exit(0)).catch((error)=>{
    console.error(error);
    process.exit(1);
})