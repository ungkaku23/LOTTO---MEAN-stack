const bitcore = require('bitcore-lib');
const bitcore_explorer = require('bitcore-explorers');
 const Mnemonic = require('bitcore-mnemonic');
 const HDPrivateKey = bitcore.HDPrivateKey;

const request = require('request');

const W3CWebSocket = require('websocket').w3cwebsocket;

const BitGoJS = require('bitgo');
const bitgo = new BitGoJS.BitGo({env: 'prod', accessToken: 'v2x6e5ca5beec2ff2690024546ac73cec65ccf7ae9dba9f79eb70d64110ac818773'});

console.log("BitGoJS library version: " + bitgo.version());
bitgo.session({})
.then(function(res) {
  console.log(res);
})
.catch(function(err) {
  console.log(err);
});
/*
const bcoin = require('bcoin').set('testnet');
const WalletDB = bcoin.WalletDB;
const WalletKey = bcoin.wallet.WalletKey;
const KeyRing = bcoin.keyring;
const Mnemonic = bcoin.hd.Mnemonic;
const HD = bcoin.hd;*/

// walletExample().catch(console.error.bind(console));

function getUTXO(addr) {
    return new Promise((resolve, reject) => {
        const Insight = bitcore_explorer.Insight;
        let insight = new Insight('testnet');

        console.log('xx address : ' + addr);
        insight.getUnspentUtxos(addr, function(err, utxos) {
            if (err) {
                console.log(err);
                resolve({ result: false });
            } else {
                if(utxos == '') {
                    console.log('error!!! -- empty');
                    resolve({ result: false });
                } else {
                    resolve({ result: true, utxos: utxos });
                }
            }
        });
    });
}

async function walletExample() {
    //for demonstration purposes, we'll be creating a temporary wallet in memory
    const wdb = new WalletDB({ db: 'memory' });
    await wdb.open();


    const mnemonic24 = new Mnemonic({bits: 256});
    const mnemonic = new Mnemonic('again choose noble warrior print thrive post glare movie glove animal legal');
    const masterKey = HD.fromMnemonic(mnemonic);

    const wallet = await wdb.create({master: masterKey});

    const jdAccount = await wallet.createAccount({name: 'Mkg'});
    console.log('jdAccount : ' + JSON.stringify(jdAccount));

    //console.log('main wallet addr : ' + jdAccount.wid);
    const depositAddressesToPrint = 10;
    for(var i=0; i<depositAddressesToPrint; i++) {
        console.log('HD CHilds : ' + jdAccount.deriveReceive(i).getAddress('string'));
        console.log('a ind : ' + jdAccount.accountIndex);
        
        const jdExtendedPrivateKey = wallet.master.key.deriveAccount(44, jdAccount.accountIndex);
        const jdPrivateKey0 = jdExtendedPrivateKey.derive(0).derive(i);
        const jdWalletKey0 = WalletKey.fromHD(jdAccount, jdPrivateKey0, 0, i);
        console.log('Prv key : ' + jdWalletKey0.getPrivateKey('base58')); 

    }
}

module.exports.BtcToSatoshi = function(btc) {
    return parseInt(100000000 * btc);
}

module.exports.getBalanceByAddress = function(addr) {
    return new Promise(function(resolve, reject) {
        request.get('https://blockchain.info/balance?active=' + addr , (error, response, body) => {
            if(error) reject(error);
            
            let jbody = JSON.parse(body);    
            resolve(jbody[addr].final_balance);
        });
    });
}

module.exports.generateBitcoinWalletAddress = function() {

    let address = '3C3keibcza3s8DEjcxrnBBGKun48F7XSbZ';
    bitgo.coin('btc').wallets().getWalletByAddress({ address: address })
    .then(function(wallet) {
    // print the wallet
    console.log('---wallet---');
    console.log(wallet._wallet.label);

    console.log('**created address**');
    wallet.createAddress({ label: 'mkg1' })
        .then(function(address) {
        // print new address
        console.log(address);
        });
    });

    /*this.getBalanceByAddress('1PpXkicJKHyryooiWsjL1zgQWay36bJYXG').then((data) => {
        console.log('balance : ' + data);
    });*/

    /*let privateKeyWIF = bitcore.PrivateKey('livenet').toWIF();
    let privateKey = bitcore.PrivateKey.fromWIF(privateKeyWIF);
    let address = privateKey.toAddress();

    let BtcAddrObj = { privateKey: privateKey,
                       address: address };
    
    return BtcAddrObj;*/

    /*let myWordList = [ 'mr', 'mun', 'is', 'super', 'man'];
    var customCode = new Mnemonic(myWordList);
    var xpriv = customCode.toHDPrivateKey('neverland', 'testnet'); // using a passphrase
    
    console.log('xpriv : ' + xpriv);

    let root = new HDPrivateKey(xpriv);
    let child1 = root.derive("m/44'/0'/0'/0/1");
    let child2 = root.derive("m/44'/0'/0'/0/2");
    let child3 = root.derive("m/44'/0'/0'/0/3");

    console.log('child1 private key : ' + child1.privateKey.toString());
    console.log('child1 address : ' + child1.privateKey.toAddress());

    console.log('child2 private key : ' + child2.privateKey.toString());
    console.log('child2 address : ' + child2.privateKey.toAddress());

    console.log('child3 private key : ' + child3.privateKey.toString());
    console.log('child3 address : ' + child3.privateKey.toAddress());*/

    /*const wdb = new WalletDB({ db: 'memory' });
    wdb.open();
    const wallet = wdb.create();

    const jdAccount = wallet.createAccount({name: 'john_doe'});

    const depositAddressesToPrint = 10;
    for(let i=0; i<depositAddressesToPrint; i++) {
        console.log('hd ' + i + ' > ' + jdAccount.deriveReceive(i).getAddress('string'));
    }*/

    return {};

}

function doTransaction(tx, from, to, amount, fee, mine) {
    if(from.length == 0) {
        tx.to(to, mine.BtcToSatoshi(amount));
        tx.fee(mine.BtcToSatoshi(fee));

        if(tx.getSerializationError()) {
            let txerr = tx.getSerializationError().toString().split(':')[0];
            console.log('texerr : ' + txerr);
            if(txerr == 'bitcore.ErrorTransactionInvalidOutputAmountSum') {
                console.log('overflow the amount');
            } else if(txerr == 'bitcore.ErrorTransactionFeeErrorTooSmall'){
                console.log('fee is too small');
            } else {
                console.log('amount is too small');
            }
        } else {
            console.log('serialize success');

            console.log(JSON.stringify(tx.toObject()));

            tx.serialize();
            
            // let scriptIn = bitcore.Script(tx.toObject().inputs[0].script);
            // console.log('input script string: ');
            // console.log(scriptIn.toString());
            // let scriptOut = bitcore.Script(tx.toObject().outputs[0].script);
            // console.log('output script string: ');
            // console.log(scriptOut.toString());

            insight.broadcast(tx.toString(), function(err, returnedTxId) { // txid - withdraw id
                if(err) {
                    console.log(err);
                } else {
                    console.log('*successful broadcast*: ' + returnedTxId);
                }
            });
        }
    }
    
    if(from.length != 0) {
        let fromData = from.pop();
        getUTXO(fromData.address).then( cbdata => {
            console.log('cb res : ' + cbdata.result);
            if(cbdata.result == true) {
                
                console.log('cbdata utxos-' + ' : ' + cbdata.result);
                console.log('prv key-' + ' : ' + fromData.privateKey);
                tx.from(cbdata.utxos);
                // tx.to('1F6cEe8VikvevRNmdbWaAR6VEfyqWhe8n3', 10000); // 0.0001 btc
                tx.change(fromData.address);
                
                tx.sign(fromData.privateKey);
            }
            doTransaction(tx, from, to, amount, fee, mine);
        });
    }
    
        
}

module.exports.makeTransaction = function(from, to, amount, fee = 0.00001) { 

    let mine = this;
    let tx = bitcore.Transaction();

    doTransaction(tx, from, to, amount, fee, this);

    /*const Insight = bitcore_explorer.Insight;
    let insight = new Insight('testnet');

    insight.getUnspentUtxos(from, function(err, utxos) {
        if (err) {
            console.log(err);
        } else {
            console.log('ff : ' + utxos);
            if(utxos == '') {
                console.log('error!!! -- empty');
            } else {
                console.log('go');
                let tx = bitcore.Transaction();
                tx.from(utxos);
                // tx.to('1F6cEe8VikvevRNmdbWaAR6VEfyqWhe8n3', 10000); // 0.0001 btc
                tx.to(to, mine.BtcToSatoshi(amount));
                tx.change(from);
                tx.fee(mine.BtcToSatoshi(fee));
                tx.sign(from_privatekey);
                console.log('transaction: ');
                console.log(tx.toObject());
                if(tx.getSerializationError()) {
                    let txerr = tx.getSerializationError().toString().split(':')[0];
                    console.log('texerr : ' + txerr);
                    if(txerr == 'bitcore.ErrorTransactionInvalidOutputAmountSum') {
                        console.log('overflow the amount');
                    } else if(txerr == 'bitcore.ErrorTransactionFeeErrorTooSmall'){
                        console.log('fee is too small');
                    } else {
                        console.log('amount is too small');
                    }
                } else {
                    console.log('serialize success');

                    console.log(JSON.stringify(tx.toObject()));

                    tx.serialize();
                    
                    // let scriptIn = bitcore.Script(tx.toObject().inputs[0].script);
                    // console.log('input script string: ');
                    // console.log(scriptIn.toString());
                    // let scriptOut = bitcore.Script(tx.toObject().outputs[0].script);
                    // console.log('output script string: ');
                    // console.log(scriptOut.toString());

                    insight.broadcast(tx.toString(), function(err, returnedTxId) { // txid - withdraw id
                        if(err) {
                            console.log(err);
                        } else {
                            console.log('*successful broadcast*: ' + returnedTxId);
                        }
                    });
                }
            }
        }
    });*/
}

module.exports.transactionListener = function() { 
    const wclient = new W3CWebSocket('wss://ws.blockchain.info/inv');

    wclient.onopen = function() {
        console.log('WebSocket Transaction Listener connected ');
        wclient.send('{"op":"unconfirmed_sub"}');
    };

    let tii = 0;

    wclient.onmessage = function(e) { 
        let txData = JSON.parse(e.data);
        tii++;
        if(tii == 1) {
            console.log('txid*' + tii + ' --------------- : ' + txData.x.tx_index);
            console.log('tx_hash*' + tii + ' --------------- : ' + txData.x.hash);

            const blockclient = new W3CWebSocket('wss://ws.blockchain.info/inv');
            blockclient.onopen = function() {
                console.log('WebSocket block Listener connected ');
                blockclient.send('{"op":"blocks_sub"}');
            };
            blockclient.onmessage = function(be) { 
                let btxData = JSON.parse(be.data);
                let indexes = btxData.x.txIndexes;
                console.log('height : ' + btxData.x.height); // number of this fired is the number of confirmation.
                if(indexes.includes(txData.x.tx_index)) {
                    console.log('target index fired!!!');
                }
            };
            /*if(txData.x.out[0].addr == '1PpXkicJKHyryooiWsjL1zgQWay36bJYXG') { // deposit - user's wallet address
                console.log('txData -- Input addr : ' + 
                            txData.x.inputs[0].prev_out.addr);
                console.log('txData -- Output addr : ' + 
                            txData.x.out[0].addr);
                console.log('txData -- Output addr : ' + 
                            txData.x.out[0].value);
            }*/

        }
    } 
}

module.exports.tester = function() { 

    let privateKey = '5e918cee3c47506f5a4d25412d86b14e95e21e3200132a26877a02e409f04f87';
    let address = '1PpXkicJKHyryooiWsjL1zgQWay36bJYXG';


    //let rand = this.generateBitcoinWalletAddress();
    //console.log('address-- : ' + rand.address);
    //console.log('private key-- : ' + rand.privateKey);
    this.generateBitcoinWalletAddress();

    /*let hds = [{
                address: 'mv36Mgjkq1PCNtxRs1Evzf2pvTiuaf9bGU',
                privateKey: '61fb9fef160b9b866e4e239e1f99918d2f7c818af735f541853dbf5c7418bd05'
               },
               {
                address: 'mxNmVpirFL6MCULCvUv9T3kNSdiPsbrQzN',
                privateKey: 'a0a983e86fbc6bc721eb76fc78338bdf1f520c8d96de5aacc4e998bbb89094de'
               },
               {
                address: 'mpDyeQ11D2NA56ozqdLAfepQHQetpXg7Sr',
                privateKey: '857e703d09faf54f5c0af5eb32b4dced1a4abfce1678be645e11b612a44815b6'
               }
    ];

    this.makeTransaction(hds,'mjeap35f4r7ZKrNM4P5Wp4mbknJKsCjcZh', 1.5, 0.01);*/
}