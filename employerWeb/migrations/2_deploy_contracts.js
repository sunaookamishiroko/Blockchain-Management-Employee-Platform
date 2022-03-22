var ERC20 = artifacts.require("./ERC20.sol");
var ERC721 = artifacts.require("./ERC721.sol");
var Labor = artifacts.require("./LaborContract.sol");

module.exports = function(deployer) {
  deployer.deploy(ERC20,"Money", "WON");
  deployer.deploy(ERC721,"Badge", "BDG");
  deployer.deploy(Labor);
};
