const mongoose = require('mongoose');

const WithdrawWalletsSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId
    },
    name: {
        type: String
    },
    address: {
        type: String
    },
    usage_status: {
        type: Number // 0: default not use, 1: use
    }
}, {collection: 'withdraw_wallet'});

const WithdrawWallets = module.exports = mongoose.model('WithdrawWallets', WithdrawWalletsSchema);

module.exports.saveAddress = function(data, callback) {
    let newOne = new WithdrawWallets(data);

    newOne.save(callback);
}

module.exports.loadAddressByParam = function(data, callback) {
    WithdrawWallets.find(data, callback);
}

module.exports.updateAddressByParam = function(data, callback) {
    WithdrawWallets.findOneAndUpdate({_id: data._id}, data, callback);
}

module.exports.removeAddressById = function(data, callback) {
    WithdrawWallets.remove({_id: data._id}, callback);
}

module.exports.updateUsage = function(data, callback) {
    WithdrawWallets.update({user_id: data.user_id}, {usage_status: 0}, {multi: true}, (err, result1) => {
        // callback();
        WithdrawWallets.update({_id: data._id}, {usage_status: 1}, callback);
    });
}