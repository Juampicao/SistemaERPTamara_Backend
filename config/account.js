const tableNames = require('@tableNames');
const { createBaseSchema, createBaseModel } = require('@utils');
const schema = require('@schemas/account.js');

const baseSchema = createBaseSchema({ schema });

const model = createBaseModel(tableNames.ACCOUNTS, baseSchema);
module.exports = model;
