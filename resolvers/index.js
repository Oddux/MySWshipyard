const pilotResolver = require('./pilots');
const shipResolver = require('./ships');
const ownerResolver = require('./owners');

const rootResolver = {
    ...pilotResolver,
    ...shipResolver,
    ...ownerResolver
};
module.exports = rootResolver;