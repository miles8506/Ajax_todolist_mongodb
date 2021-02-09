const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.connect('mongodb://localhost:27017/todo', { useNewUrlParser: true, useUnifiedTopology: true });   //連結到mongod數據庫的test
const TodoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
}, { versionKey: false });
module.exports = mongoose.model('Todo', TodoSchema);
// const test = mongoose.model('Todo', TodoSchema);
// test({
//     title: "打豆豆"
// }).save();
// test.find((err, data) => {
//     if (err) {
//         return console.log('err');
//     }
//     console.log(data);
// })