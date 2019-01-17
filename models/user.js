const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const UserSchema = mongoose.Schema({
    first_name: {
        type: String
    },
    sur_name: {
        type: String
    },
    nickname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    origin_password: {
        type: String
    },
    country: {
        type: String
    },
    date_of_birth: {
        type: String
    },
    gender: {
        type: String
    },
    avatar: {
        type: String
    },
    notifications: {
        type: Object
    },
    verified: {
        type: Number
    },
    phonenumber: {
        type: String
    },
    phonenumber_verified: {
        type: Boolean
    },
    two_step_verification: {
        type: Boolean
    },
    ts_code: {
        type: String
    },
    facebook: {
        type: String
    },
    twitter: {
        type: String
    },
    google: {
        type: String
    },
    w_address: {
        type: String
    },
    w_private_key: {
        type: String
    }
}, {collection: 'user'});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}

module.exports.getUserByEmail = function(email, callback) {
    const query = {email: email};
    User.findOne(query, callback);
}

module.exports.getUserByNickname = function(nickname, callback) {
    const query = {nickname: nickname};
    User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            console.log('pw : ' + newUser.password);
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
    console.log('compare : ' + candidatePassword);
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
}

module.exports.checkExistNickname = function(nickname, callback) {
    const query = {nickname: nickname};
    User.count(query, callback);
}
module.exports.checkExistEmail = function(email, callback) {
    const query = {email: email};
    User.count(query, callback);
}

module.exports.updateVerifiedById = function(id, callback) {
    User.findOneAndUpdate({_id: id}, {verified: 1}, callback);
}

module.exports.updatePasswordById = function(pwdata, callback) {
    
    console.log('mypwdata : ' + JSON.stringify(pwdata));

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(pwdata.password, salt, (err, hash) => {
            console.log('pw : ' + pwdata.password);
            if(err) throw err;
            User.findOneAndUpdate({_id: pwdata.id}, {password: hash , origin_password: pwdata.password}, callback);
        });
    });
}

module.exports.updateProfile = function(profileData, callback) {
    console.log('doUpdate!!! : ' + JSON.stringify(profileData));
    User.findOneAndUpdate({_id: profileData.id}, profileData, (err, data) => {
        User.findById(profileData.id, callback);
    });
}