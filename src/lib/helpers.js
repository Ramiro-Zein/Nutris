const bcrypt = require('bcryptjs');

const helpers = {};

helpers.encrypt = async (password) => {
    const salt = await bcrypt.genSalt(5);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

helpers.matchPassword = async (password, savedPasword) => {
    return await bcrypt.compare(password, savedPasword);
};

module.exports = helpers;

