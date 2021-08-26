const path = require("path");
const HDWalletProvider = require("truffle-hdwallet-provider");
const mnemonic = "bind spawn fame segment accident snack bird rich face drastic search jewel";

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      host: "localhost",
      port: 8545,
      network_id: "*"
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/f0949157acf446bd8e348d7daa0ee416")
      },
      network_id: 4,
      gas: 4000000,
      gasPrice: 21000000000
    }
  }
};
