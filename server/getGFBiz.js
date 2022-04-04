const Business = require('./models/Business');

module.exports = async function getGFBiz(id) {
    const response = await Business.find({id: id}).lean();
    return response;
}