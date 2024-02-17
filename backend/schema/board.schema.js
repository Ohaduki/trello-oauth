const { object, string } = require('yup');

const boardSchema = object({
    name: string().required(),
    desc: string().optional()
});

module.exports = {boardSchema};