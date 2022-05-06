var WonToken = artifacts.require("./WonToken.sol");
var myNFT = artifacts.require("./myNFT.sol");
var Labor = artifacts.require("./LaborContract.sol");

module.exports = function(deployer) {
  deployer.deploy(WonToken);
  deployer.deploy(myNFT);
  deployer.deploy(Labor);
};
