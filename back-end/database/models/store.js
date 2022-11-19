const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.promise = Promise

// Define userSchema
const storeSchema = new Schema({

	item_id  : { type: Number, unique: false, required: false },
	name: { type: String, unique: false, required: false },
	type: { type: String,  unique: false, required: false },
    cost: { type: Number, unique: false, required: false },
    _stat_00: { type: Number, unique: false, required: false },
    _stat_01: { type: Number, unique: false, required: false },
    _stat_02: { type: Number, unique: false, required: false },
    _stat_03: { type: Number, unique: false, required: false },
    iconfile: { type: String, unique: false, required: false }
})

const Store = mongoose.model('items', storeSchema)
module.exports = Store