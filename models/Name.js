const mongoose = require('mongoose');

const NamesSchema = new mongoose.Schema({
	gender: {
		type: String
	},
	name: {
		type: String
	},
	number: {
		type: Number
	},
	state: {
		type: String
	},

	year: {
		type: Number
	}
});

module.exports = mongoose.models.Name || mongoose.model('Name', NamesSchema);
