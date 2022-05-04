require('@nomiclabs/hardhat-waffle');

module.exports = {
    solidity: '0.8.0',
    networks: {
        ropsten: {
            url: 'https://eth-ropsten.alchemyapi.io/v2/DAXndX5lIaolssjz4O6UnepQr7f2YOSh',
            accounts: ['39e7f8fce38053de4b400151f7bbaa3446d3b16b8a5781239f075ef21e79d15a']
        }
    }
}