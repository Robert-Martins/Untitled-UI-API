const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
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
    /* adress:{
        cep:{
            type: String,
            required: true,
            minlength: 7,
        },
        uf:{
            type: String,
        },
        city:{
            type: String,
        }
    },
    socials:{
        facebook:{
            type: String,
        },
        instagram:{
            type: String,
        },
        linkedin:{
            type: String,
        },
        twitter:{
            type: String,
        }
    }, 
    */
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
    
    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;

/*"adress":{
        "cep": "75400-160",
        "uf": "Goiás",
        "city": "Inhumas"
    },
    "socials":{
        "facebook": "Robert Martins",
        "instagram": "@robert_ccm",
        "linkedin": "@robertmartins",
        "twitter": "@robertcantares"
    } */