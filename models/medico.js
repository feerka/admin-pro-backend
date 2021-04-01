const { Schema, model } = require('mongoose');

const MedicoSchema = Schema({
    nombre: {
        type: String,
        require: true
    },

    img: {
        type: String
    },
    usuario: {
        //Indicar a mongoose que hay una relación entre este esquema y usuario
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    hospital: {
        //Indicar a mongoose que hay una relación entre este esquema y usuario
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    }
    //Esto hace que en MongoDb la tabla salga con esta nombre
}, { collection: 'Medicos' });

MedicoSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model('Medico', MedicoSchema)