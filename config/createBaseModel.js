// const properties = require('@schemas/properties');
// const DynamoDB = require('@dynamoDB');

// const builders = {
//   operator: buildOperator,
//   condition: buildCondition,
//   parenthesis: buildParenthesis,
// };

// function buildParenthesis({ query, params: { conditions } }) {
//   return query.parenthesis( condition => buildConditionalQuery({ model: condition, conditions }) );
// }

// function buildOperator({ query, params: { operator } }) {
//   return query[operator]();
// }

// function buildCondition({ query, params: condition }) {
//   if (condition.condition === 'between') {
//     return query.where(condition.field).between(...condition.value);
//   }
//   if (condition.condition === 'in') {
//     return query.where(condition.field).in(condition.value);
//   }
//   return query.where(condition.field)[condition.condition](condition.value);
// }

// function buildConditionalQuery({ conditions = [], model }) {
//   return conditions.reduce( (query, condition) => {
//     return builders[condition.type]({ query, params: condition })
//   }, model);
// }

// function createBaseModel(tableName, schema) {
//   const Dynamoose = DynamoDB.Dynamoose;
//   const model = Dynamoose.model(`${process.env.STAGE}-${tableName}`, schema, properties);
  
//   model.methods.set('findByConditions', async function({ conditions = [] }) {
//     try {
//       const query = buildConditionalQuery({ conditions, model: this.scan() });
//       const results = await query.exec();
//       while (results.lastKey) {
//         const query = buildConditionalQuery({ conditions, model: this.scan() });
//         const moreResults = await query.startAt(results.lastKey).exec();
//         results.push(...moreResults);
//         results.lastKey = moreResults.lastKey;
//       }
//       return results;
//     } catch(e) {
//       console.log(`Error on model ${tableName}. Method findByConditions`)
//       throw new Error(e)
//     }
//   });

//   model.methods.set('find', async function ({ filters = {} } = {}) {
//     try {
//       const results = await this.scan(filters).exec();
//     while (results.lastKey) {
//       const moreResults = await this.scan(filters).startAt(results.lastKey).exec();
//       results.push(...moreResults);
//       results.lastKey = moreResults.lastKey;
//     }
//     return results;  
//     } catch(e) {
//       console.log(`Error on model ${tableName}. Method find`)
//       throw new Error(e)
//     }
//   });

//   model.methods.set('doUpdate', async function ({ id, fields = {} }) {
//     try {
//       const exists = await this.findById(id);
//     if (!exists) {
//       return Promise.resolve();
//     }
//     return await this.update({ id }, fields);  
//     } catch(e) {
//       console.log(`Error on model ${tableName}. Method doUpdate`)
//       throw new Error(e)
//     }
//   });

//   model.methods.set('delete', async function ({ id }) {
//     try {
//       const exists = await this.findById(id);
//     if (!exists) {
//       return Promise.resolve();
//     }
//     return await this.delete({ id });  
//     } catch(e) {
//       console.log(`Error on model ${tableName}. Method delete`)
//       throw new Error(e)
//     }
//   });

//   model.methods.set('findOne', async function ({ filters } = {}) {
//     try {
//       const results = await this.scan(filters).exec();
//     while (results.lastKey) {
//       const moreResults = await this.scan(filters).startAt(results.lastKey).exec();
//       results.push(...moreResults);
//       results.lastKey = moreResults.lastKey;
//     }
//     return (results || []).shift();
//     } catch(e) {
//       console.log(`Error on model ${tableName}. Method findOne`)
//       throw new Error(e)
//     }
//   });

//   model.methods.set('findById', async function (id) {
//     try {
//       if (!id) return {}
//     const results = await this.query({ id }).exec();
//     while (results.lastKey) {
//       const moreResults = await this.query({ id }).startAt(results.lastKey).exec();
//       results.push(...moreResults);
//       results.lastKey = moreResults.lastKey;
//     }
//     return (results || []).shift();
//     } catch(e) {
//       console.log(`Error on model ${tableName}. Method findById`)
//       throw new Error(e)
//     }
//   });

//   model.methods.set('getAll', async function () {
//     try {
//       const results = await this.scan().exec();
//     while (results.lastKey) {
//       const moreResults = await this.scan().startAt(results.lastKey).exec();
//       results.push(...moreResults)
//       results.lastKey = moreResults.lastKey;
//     }
//     return results;  
//     } catch(e) {
//       console.log(`Error on model ${tableName}. Method getAll`)
//       throw new Error(e)
//     }
//   });

//   return model;
// }

// module.exports = createBaseModel;
