const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs');
mongoose.promise = Promise

// Define userSchema
const userSchema = new Schema({

	username: { type: String, unique: false, required: false },
	password: { type: String, unique: false, required: false },
	items: {type: Array, unique: false, required: false},
	hashed: {type: Boolean, unique: false, require: false}

})

// Define schema methods
userSchema.methods = {
	checkPassword: function (inputPassword) {
		return bcrypt.compareSync(inputPassword, this.password)
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10)
	}
}

// Define hooks for pre-saving
userSchema.pre('save', function (next) {
	if (this.password === undefined) {
		console.log('models/user.js =======NO PASSWORD PROVIDED=======')
		next()
	} else {
		
		if(!this.hashed){
			console.log('models/user.js hashPassword in pre save');
			this.password = this.hashPassword(this.password)
			this.hashed = true;
		}
		
		next()
	}
})



const User = mongoose.model('users', userSchema)
module.exports = User