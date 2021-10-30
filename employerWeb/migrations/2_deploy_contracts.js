var ERC20 = artifacts.require("./ERC20.sol");
var Labor = artifacts.require("./LaborContract.sol");

module.exports = function(deployer) {
  deployer.deploy(ERC20,"money", "WON");
  deployer.deploy(Labor);
};
