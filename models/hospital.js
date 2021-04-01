const { Schema, model } = require('mongoose');

const HospitalSchema = Schema({
    nombre: {
        type: String,
        require: true
    },

    img: {
        type: String
    },
    usuario: {
        //No quiero que nigún hospital se vaya a grabar sin el usuario
        required: true,
        //Indicar a mongoose que hay una relación entre este esquema y usuario
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
    //Esto hace que en MongoDb la tabla salga con esta nombre
}, { collection: 'Hospitales' });

HospitalSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model('Hospital', HospitalSchema)