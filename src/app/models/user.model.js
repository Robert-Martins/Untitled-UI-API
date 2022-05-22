const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    documentId:{
        type: Number
    },
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    telephone:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
        minlength: 7,
        select: false
    },
    adressId:{
        type: Number
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
    updateAt:{
        type: Date,
    }
});

userSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    
    this.documentId = (await User.find({})).length + 1;

    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;