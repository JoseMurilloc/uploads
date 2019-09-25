const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
/**
 * Funções de cada modulo nesse configuração
 * Multer: Pega o arquivo e encaminhar ao seu destino.
 * Path: Mostra ao multer qual e o caminho para chegar ao destino.
 * Cryoto: Pega as informações do nick arquivo que multer irá encaminhar logo em
 *      seguida da hash no criando uma nick com hash 16, (como se fosse um id)
 */

module.exports = {
    dest: path.resolve(__dirname,'..', '..', 'tmp', 'uploads'),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname,'..', '..', 'tmp', 'uploads'));
        },
        filename: (req, file, cb) => {
            /**
             *  filename: Garante que as imagens que chegarão não se sobreponha
             * por causa de ter o mesmo nome.
             */
            crypto.randomBytes(16, (err, hash) => {
                if(err) cb(err);

                const fileName = `${hash.toString('hex')}-${file.originalname}`;
                console.log('FileName -> ' + fileName);
                cb(null, fileName);
            })
        },
    }),
    limits: {
        fileSize: 2 * 1024 * 1025,
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            "image/jpeg",
            "image/pjpeg",
            "image/png",
            "image/gif"
        ];
        /**
         * Condicional para saber se o tipo da imagem e suportada pela
         * aplicação de acordo com que definimos acima.
         */
        if(allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type.'));
        }
    },
}