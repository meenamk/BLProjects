// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./buyAndSell.sol";

contract LandRegistration is buyAndSell {

     //Land inspector details
    struct LandInspector{
        bytes name;
        uint8 age;
        uint256 aadhar;
        bytes pan;
    }
    mapping(address => bool) allLandInspectors;
    mapping(address=>LandInspector) allLandInspectorsData;
    address[] totalLandinspectors;
    
    //Land details
    struct Land {
        uint256 area;
        bytes city;
        bytes state;
        uint256 price;
        uint256 PID;
        uint256 surveyNumber;
        address owner;
        bool isVerified;
        bool saleStatus;
    }
    mapping(uint256 => bool) public allLands;
    mapping(uint256=>Land) allLandsData;

    //seller details
    struct Seller{
        bytes name;
        uint8 age;
        uint256 aadhar;
        bytes pan;
        bool isVerified;
    }
    mapping(address => bool) allSellers;
    mapping(address=>Seller) allSellersData;
    
    //buyer details
    struct Buyer{
        bytes name;
        uint8 age;
        uint256 aadhar;
        bytes pan;
        bool isVerified;
    }
    mapping(address => bool) allBuyers;
    mapping(address=>Buyer) allBuyersData;

    //connecting land and land owner

    mapping(address=>uint256[]) landOwners; // mapping Land owners address with land's PID
    mapping(address=>uint256) indexLandOwners;
    address[] landOwnersList;

    address[] verifiedSellers;
    mapping (address=>uint256) indexVerifiedSellers;

    address[] verifiedBuyers;
    mapping (address=>uint256) indexVerifiedBuyers;
    
    address[] rejectedSellers;
    mapping (address=>uint256) indexRejectedSellers;

    address[] rejectedBuyers;
    mapping (address=>uint256) indexRejectedBuyers;
    
    uint256[] verifiedLand;
    mapping(uint256=>uint256) indexVerifiedLands;

    uint256[] rejectedLand;
    mapping(uint256=>uint256) indexRejectedLands;

    mapping(address=>uint256[]) requestedLands;

    modifier onlyUnregisteredBuyers(){
        require(msg.sender !=address(0), "Invalid address");
        require(!allBuyers[msg.sender], "Only unregistered buyers can register");
        _;
    }

    modifier onlyUnregisteredSellers(){
        require(msg.sender !=address(0), "Invalid address");
        require(!allSellers[msg.sender], "Only unregistered sellers can register");
        _;
    }

    modifier onlyUnregisteredLandInspectors(){
        require(msg.sender!=address(0), "Invalid address");
        require(!allLandInspectors[msg.sender], "Only unregistered land inspector can register");
        _;
    }

    modifier onlyOwner() {
         require(msg.sender !=address(0), "Invalid address");
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    modifier onlySeller() {
        require(msg.sender!=address(0), "Invalid address");
        require(allSellers[msg.sender], "Only registered sellers can call this function");
        _;
    }

    modifier onlyBuyer() {
        require(msg.sender!=address(0), "Invalid address");
        require(isVerifiedBuyer(msg.sender),"Not a verified buyer");
        require(allBuyers[msg.sender], "Only registered buyers can call this function");
        _;
    }

    modifier onlyLandInspector() {
         require(msg.sender !=address(0), "Invalid address");
        require(allLandInspectors[msg.sender], "Only land inspectors can call this function");
        _;
    }

    modifier onlyValidLandID(uint256 PID){
        require(allLands[PID], "Invalid PID");
        _;
    }
    event LandInspectorAdded(address indexed,string indexed, uint256 indexed);
    event LandAdded(address indexed,uint256 indexed, uint256 indexed);
    event SellerAdded(address indexed,uint256 indexed);
    
    //checked
    function addLandInspector(string memory _name, uint8 _age, uint256 _aadhar, string memory _pan) external onlyUnregisteredLandInspectors{
        //require(!allLandInspectors[msg.sender], "Land Inspector already registered");
        // bytes memory name = bytes(_name);
        // bytes memory pan = bytes(_pan);
        allLandInspectors[msg.sender]=true;
        allLandInspectorsData[msg.sender]=LandInspector({name:bytes(_name),age:_age,aadhar:_aadhar,pan:bytes(_pan)});
        totalLandinspectors.push(msg.sender);
        emit LandInspectorAdded(msg.sender,_name,_aadhar);
    }

    //checked
    function addLand(uint256 _area, string memory _city, string memory _state, uint256 _price, uint256 _PID, uint256 _surveyNumber) external onlySeller{
        //require(!allLands[_PID],"This land is registered already");
        allLands[_PID]=true;
        //uint256 landEthPrice = _price/(10**18);
        // bytes memory city =bytes(_city);
        // bytes memory state = bytes (_state);
        allLandsData[_PID]=Land({area:_area,city:bytes(_city),state:bytes(_state),price:_price/(10**18) ,PID:_PID,surveyNumber:_surveyNumber,owner:msg.sender, isVerified:false,saleStatus:false});
        landOwners[msg.sender].push(_PID);
        indexLandOwners[msg.sender]=landOwners[msg.sender].length;
        emit LandAdded(msg.sender,_PID,_surveyNumber);
    }
    //checked
    function addSellers(string memory _name, uint8 _age, uint256 _aadhar, string memory _pan) external onlyUnregisteredSellers{
        //require(!allSellers[msg.sender], "This seller is already registered");
        allSellers[msg.sender]=true;
        // bytes memory name = bytes (_name);
        // bytes memory pan = bytes (_pan);
        allSellersData[msg.sender]=Seller({name:bytes(_name), age:_age, aadhar:_aadhar, pan:bytes(_pan),isVerified:false});
        //verifiedSellers.push(msg.sender);
        emit SellerAdded(msg.sender,_aadhar);
    }
    //checked
    function addBuyers(string memory _name, uint8 _age, uint256 _aadhar, string memory _pan) external onlyUnregisteredBuyers {
        //require(!allBuyers[msg.sender], "This buyer is already registered");
        allBuyers[msg.sender]=true;
        // bytes memory name = bytes (_name);
        // bytes memory pan = bytes (_pan);
        allBuyersData[msg.sender]=Buyer({name:bytes(_name), age:_age, aadhar:_aadhar, pan:bytes(_pan),isVerified:false});
        //verifiedBuyers.push(msg.sender);
    }

    //checked
    function getOwner(uint256 _PID) external  onlyValidLandID(_PID) view returns(address _owner){
        //require(allLands[_PID], "Invalid PID");
        return allLandsData[_PID].owner;
    }
    //checked
    // function getLandDetails(uint256 _PID) external  onlyValidLandID(_PID) view returns(Land memory _landData){
    //     //require(allLands[_PID], "Invalid PID");
    //     return allLandsData[_PID];
    // }
    
    //checked
    function verifyLand(uint256 _PID) external onlyLandInspector {
        //require(alllands[_id].id != 0, "Invalid land ID");
        require(allLands[_PID], "Invalid PID");
        require(!allLandsData[_PID].isVerified, "Land already verified");
        allLandsData[_PID].isVerified = true;
        verifiedLand.push(_PID);
        indexVerifiedLands[_PID]=verifiedLand.length;
        if(indexRejectedLands[_PID] != 0){

            delete rejectedLand[indexRejectedLands[_PID]-1];
            //rejectedLand=remove(indexRejectedLands[_PID]-1,rejectedLand);

        }
    }
    //checked
    function rejectLand(uint256 _PID) external onlyLandInspector{
        // require(alllands[_id].id != 0, "Invalid land ID");
        require(allLands[_PID], "Invalid PID");
        //require(allLandsData[_PID].isVerified, "Land already rejected");
        allLandsData[_PID].isVerified = false;
        rejectedLand.push(_PID);
        indexRejectedLands[_PID]=rejectedLand.length;
        if(indexVerifiedLands[_PID] !=0 ){
                delete verifiedLand[indexVerifiedLands[_PID]-1];
                 //verifiedLand=remove(indexVerifiedLands[_PID]-1,verifiedLand);
        }
    }

    //checked
    function verifySeller(address _seller) external onlyLandInspector {
        // require(alllands[_id].id != 0, "Invalid land ID");
        require(_seller != address(0),"Invalid seller address");
        require(allSellers[_seller], "Not a registered seller");
        require(!allSellersData[_seller].isVerified, "Land already verified");
        allSellersData[_seller].isVerified = true;
        verifiedSellers.push(_seller);
        indexVerifiedSellers[_seller]=verifiedSellers.length;
        if(indexRejectedSellers[_seller] != 0){

            delete rejectedSellers[indexRejectedSellers[_seller]-1];
            //rejectedLand=remove(indexRejectedLands[_PID]-1,rejectedLand);

        }
    }
    //checked
    function rejectSeller(address _seller) external onlyLandInspector {
        // require(alllands[_id].id != 0, "Invalid land ID");
        require(_seller != address(0),"Invalid seller address");
        require(allSellers[_seller], "Not a registered seller");
        require(allSellersData[_seller].isVerified, "Seller already rejected");
        allSellersData[_seller].isVerified = false;
        rejectedSellers.push(_seller);
        indexRejectedSellers[_seller]=rejectedSellers.length;
        if(indexVerifiedSellers[_seller] != 0){

            delete verifiedSellers[indexVerifiedSellers[_seller]-1];
            //rejectedLand=remove(indexRejectedLands[_PID]-1,rejectedLand);

        }
    }   
    //checked
    function verifyBuyer(address _buyer) external onlyLandInspector {
        // require(alllands[_id].id != 0, "Invalid land ID");
        require(_buyer != address(0),"Invalid seller address");
        require(allBuyers[_buyer], "Not a registered buyer");
        //require(!allBuyersData[_buyer].isVerified, "Buyer already verified");
        allBuyersData[_buyer].isVerified = true;
        verifiedBuyers.push(_buyer);
        indexVerifiedBuyers[_buyer]=verifiedBuyers.length;
        if(indexRejectedBuyers[_buyer] != 0){

            delete rejectedBuyers[indexRejectedBuyers[_buyer]-1];
            //rejectedLand=remove(indexRejectedLands[_PID]-1,rejectedLand);

        }
    }
    //checked
    function rejectBuyer(address _buyer) external onlyLandInspector {
        // require(alllands[_id].id != 0, "Invalid land ID");
        require(_buyer != address(0),"Invalid seller address");
        require(allBuyers[_buyer], "Not a registered buyer");
        //require(allBuyersData[_buyer].isVerified, "Buyer already rejected");
        allBuyersData[_buyer].isVerified = false;
        //verifiedBuyers.pop(_buyer);
        rejectedBuyers.push(_buyer);
        indexRejectedBuyers[_buyer]=rejectedBuyers.length;
        if(indexVerifiedBuyers[_buyer] != 0){

            delete verifiedBuyers[indexVerifiedBuyers[_buyer]-1];
            //rejectedLand=remove(indexRejectedLands[_PID]-1,rejectedLand);
        }
    }
    //chekced
    function isVerifiedLand(uint256 _PID) public  onlyValidLandID(_PID) view returns(bool){
        //require(allLands[_PID], "Invalid PID");
        return allLandsData[_PID].isVerified;
    }
    //chekced
    function isVerifiedBuyer(address _buyer) public view returns(bool){
        require(_buyer != address(0),"Invalid seller address");
        require(allBuyers[_buyer], "Not a registered buyer");
        return allBuyersData[_buyer].isVerified;
    }
    //checked
    function isVerifiedSeller (address _seller) public view returns(bool){
        require(_seller != address(0),"Invalid seller address");
        require(allSellers[_seller], "Not a registered buyer");
        return allSellersData[_seller].isVerified;
    }
    //********Works correctly****
    function getArea(uint256 _PID) external onlyValidLandID(_PID) view returns(uint256 _area) {
        //require(allLands[_PID], "Invalid PID");
        return allLandsData[_PID].area;
      }

    function getCity(uint256 _PID) external  onlyValidLandID(_PID) view returns(string memory _city){
        //require(allLands[_PID], "Invalid PID");
        return string(allLandsData[_PID].city);
      }
    function getPrice(uint256 _PID) external  onlyValidLandID(_PID) view returns(uint256 _price){
        //require(allLands[_PID], "Invalid PID");
        return allLandsData[_PID].price;
    }
    function setSale(uint256 _PID) external onlySeller{
        // require(msg.sender!=address(0), "Invalid address");
        // require(allLands[_PID], "Invalid PID");
        // require(allLandsData[_PID].isVerified,"Not a verified Land");
        require(isVerifiedLand(_PID), "Invalid Land ID");
        require(isVerifiedSeller(allLandsData[_PID].owner),"Not a verified seller");
        require(!allLandsData[_PID].saleStatus, "This land is already on sale");
        allLandsData[_PID].saleStatus=true;
    }
    //checked
    function requestLand(uint256 _PID) external onlyBuyer(){
        // require(msg.sender!=address(0), "Invalid address");
        // require(isVerifiedBuyer(msg.sender),"Not a verified buyer");
        require(allLands[_PID], "Invalid PID");
        require(allLandsData[_PID].isVerified,"Not a verified Land");
        require(isVerifiedSeller(allLandsData[_PID].owner),"Not a verified seller");
        require(allLandsData[_PID].saleStatus, "This land is not on sale");
        if(requestedLands[msg.sender].length==0){
            requestedLands[msg.sender].push(_PID);
        }else{
        for (uint i=0; i<requestedLands[msg.sender].length;i++){
            require(requestedLands[msg.sender][i]!=_PID, "Already requested for this land");
        }
            requestedLands[msg.sender].push(_PID);
        }
    }
    function _purchaseLand(uint256 _PID) external payable onlyBuyer() {
        // require(msg.sender!=address(0), "Invalid address");
        // require(isVerifiedBuyer(msg.sender),"Not a verified buyer");
        //require(allLands[_PID], "Invalid PID");
        require(isVerifiedLand(_PID),"Invalid PID");
        require(requestedLands[msg.sender].length!=0, "This land is not requested by you");
        require(allLandsData[_PID].owner!=address(0),"Invalid address");
        require(isVerifiedSeller(allLandsData[_PID].owner),"Not a verified seller");
        require(balanceOf(msg.sender)>=allLandsData[_PID].price, "Insufficient balance");
        purchaseLand(msg.sender, allLandsData[_PID].owner, allLandsData[_PID].price);
        // transfer(allLandsData[_PID].owner,allLandsData[_PID].price);
        allLandsData[_PID].owner=msg.sender;
        delete landOwners[msg.sender][indexLandOwners[msg.sender]-1];
        landOwners[msg.sender].push(_PID); 
        indexLandOwners[msg.sender]=landOwners[msg.sender].length;
    }
        function transferLand(address _to, uint256 _PID) external onlySeller{
        // require(msg.sender!=address(0), "Invalid address");
        require(_to!=address(0), "Invalid address");
        require(allLands[_PID], "Invalid PID");
        require(msg.sender == allLandsData[_PID].owner,"Only owner can transfer land"); 
        allLandsData[_PID].owner =_to;
        delete landOwners[msg.sender][indexLandOwners[msg.sender]-1];
        landOwners[msg.sender].push(_PID); 
        indexLandOwners[msg.sender]=landOwners[msg.sender].length;
    }
}
    