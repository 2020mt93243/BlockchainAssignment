import { Injectable } from '@angular/core';
import Web3 from 'web3';
import {Contract} from 'web3-eth-contract';
const contractAbi= require("./contractABI.json");
declare var window:any
@Injectable({
  providedIn: 'root'
})
export class Web3Service {
private Appweb3:Web3;
private contract:Contract;
// private contractAddress='0x603c795685d6c1B2a90aE57E41f0c09Dc1d18610'
  constructor() { 
    const web3 = new Web3(new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545'));
    this.Appweb3 = web3;
    this.contract =  new web3.eth.Contract(contractAbi, '0xd0a5685a4ba479D0FF4E86Ca8300738573816c63');
    
    // if(window.web3){
    //   this.Appweb3=new Web3(window.ethereum);
    //   this.contract=new this.Appweb3.eth.Contract(
    //     contractAbi,
    //     this.contractAddress
    //   );
    //   window.ethereum.enable().catch((err: any)=>{
    //     console.log(err)
    //   });

    // }else{
    //   console.warn('Metamask not found.Install or enable Metamask.')
    // }
  }
  getAccount():Promise<string>{
   return this.Appweb3.eth.getAccounts().then((accounts)=>accounts[0] || '');
  }
  async executeTransaction(fnName:string,...args:any[]):Promise<void>{
    // const acc=await this.getAccount()
    // this.contract.methods[fnName](...args).send({from:acc});
     const acc=await this.getAccount()
     this.contract.methods[fnName](...args).send({from:acc});
  }

}
