var ERC20 = artifacts.require("./ERC20.sol");
var myNFT = artifacts.require("./myNFT.sol");
var Labor = artifacts.require("./LaborContract.sol");

module.exports = function(deployer) {
  deployer.deploy(ERC20,"Money", "WON");
  deployer.deploy(myNFT);
  deployer.deploy(Labor);
};
