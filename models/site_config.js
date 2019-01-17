const mongoose = require('mongoose');

// Draw Schema
const SiteConfigSchema = mongoose.Schema({
    bit3_draw_start_time: {
        type: String
    },
    bit4_draw_start_time: {
        type: String
    },
    draw_period: {
        type: Number
    }
}, {collection: 'site_config'});

const SiteConfig = module.exports = mongoose.model('SiteConfig', SiteConfigSchema);

module.exports.getSiteConfigs = function(param, callback) {
    SiteConfig.find({}, callback);
}