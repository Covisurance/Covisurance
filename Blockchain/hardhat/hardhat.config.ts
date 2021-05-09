import "@nomiclabs/hardhat-waffle";

// import {
//   GOERLI_PRIVATE_KEY,
//   GOERLI_PRIVATE_KEY_2,
//   GOERLI_PRIVATE_KEY_3,
// } from "./privateKey";
const GOERLI_PRIVATE_KEY = "317df996dc481153a4fe9478d8cf41c175811c158bed98b8a25db32c5a205170";
const GOERLI_PRIVATE_KEY_2  = "b32e1708e8c81f2bcc8cd807a899581f79ac44915f7f75e19d8e80acc938b9e1";
const GOERLI_PRIVATE_KEY_3  = "3159638510ed445c1dedae6e92ea73fee2167ab0f003ff2c79b71f8ec8d96308";

const INFURA_PROJECT_ID = "8a81e96e69f94615ab1ea21174854947";
// "98b0477e69b1415cbaf0c6b49da3206a";

module.exports = {
  solidity: { compilers: [{ version: "0.7.6" }, { version: "0.6.6" }] },
  hardhat: {
    forking: {
      url:
        "https://eth-mainnet.alchemyapi.io/v2/fUVJj3gZ-AKWaPE1L7Jm8Tx_bgbd1wwn",
    },
  },
  networks: {
    goerli: {
      url: `https://goerli.infura.io/v3/${INFURA_PROJECT_ID}`,
      accounts: [
        `0x${GOERLI_PRIVATE_KEY}`,
        `0x${GOERLI_PRIVATE_KEY_2}`,
        `0x${GOERLI_PRIVATE_KEY_3}`,
      ],
    },
    matic: {
      url: "https://rpc-mumbai.matic.today",
      accounts: [
        `0x${GOERLI_PRIVATE_KEY}`,
        `0x${GOERLI_PRIVATE_KEY_2}`,
        `0x${GOERLI_PRIVATE_KEY_3}`,
      ],
      chainId: 80001,
    },
  },
};
