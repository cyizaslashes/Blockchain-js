const { HmacSHA256 } = require('crypto-js');

class block {
  constructor(index, data, timestamp, previousHash = '') {
    this.index = index;
    this.data = data;
    this.timestamp = timestamp;
    this.previousHash = previousHash;
    this.Hash = this.CalculateHash();
  }

  CalculateHash() {
    return HmacSHA256(this.index + this.timestamp + this.previousHash + JSON.stringify(this.data)).toString();
  }
}

class BlockChain {
  constructor() {
    this.chain = [this.CreateGenesisBlock()]; // Use "this.CreateGenesisBlock()"
  }

  CreateGenesisBlock() {
    return new block(0, "Block one", "8/1/2023", "000");
  }

  ShowLastBlock() {
    return this.chain[this.chain.length - 1];
  }

  addNewBlock(newBlock) {
    newBlock.previousHash = this.ShowLastBlock().Hash;
    newBlock.Hash = newBlock.CalculateHash();
    this.chain.push(newBlock);
  }
}

let chrisCoin = new BlockChain(); // Use parentheses to call the constructor
chrisCoin.addNewBlock(new block(1, "29/7/2023", { amount: 3 }));
chrisCoin.addNewBlock(new block(1, "29/7/2023", { amount: 10 }));

console.log(JSON.stringify(chrisCoin, null, 3));
