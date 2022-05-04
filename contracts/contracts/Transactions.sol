// SPDX-License-Identifier: UNLICENSED
// Ropsten Test Network Contract Address: 0xc6F39fF3a9aeDf2DD8f99181c0aa5cbA6C48b425

pragma solidity ^0.8.0;

contract Transactions {
    uint256 transactionCount;
    struct TransferStruct {
        address AddressFrom;
        address AddressTo;
        uint Amount;
        string Message;
        uint256 Timestamp;
        string Keyword;
    }

    event Transfer(address addressFrom, address addressTo, uint amount, string message, uint256 timestamp, string keywordGif);
    TransferStruct[] transactions;

    function addToBlockchain(address payable addressTo, uint amount, string memory message, string memory keyword) public {
        transactionCount++;
        transactions.push(TransferStruct(msg.sender, addressTo, amount, message, block.timestamp, keyword));
        emit Transfer(msg.sender, addressTo, amount, message, block.timestamp, keyword);
    }

    function getAllTransactions() public view returns (TransferStruct[] memory) {
        return transactions;
    }

    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }
}
