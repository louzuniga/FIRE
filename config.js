exports.DATABASE_URL = process.env.DATABASE_URL || global.DATABASE_URL || 'mongodb://Lou:lou123@ds133875.mlab.com:33875/fire-app';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL ||
    'mongodb://Lou:lou123@ds133875.mlab.com:33875/fire-app';
exports.PORT = process.env.PORT || 8080;

exports.JWT_SECRET = process.env.JWT_SECRET || 'secret';
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '3d';