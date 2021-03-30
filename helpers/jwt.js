const jtw = require('jsonwebtoken');

const generarJWT = (uid) => {


    return new Promise((resolve, reject) => {

        const payload = {
            uid,
        }

        jtw.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '12h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el JTW');
            } else {
                resolve(token);
            }
        });
    });
}
module.exports = {
    generarJWT,
}