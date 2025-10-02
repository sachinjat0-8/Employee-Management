const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    profileImage: {
        type: String
    },
    salary: {
        type: Number,
        required: true
    }
}, 
{ timestamps: true 

}); 

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;
