/* middleware multer per l'upload delle immagini */
var multer  = require('multer');

const storage = multer.diskStorage({ //setting multer
    destination : (req, file, callback) => { 
        callback(null, 'public/files') //destinazione in cui salvare le immagini
    },
    filename : (req, file, callback) => {
        callback(null, file.originalname) //definisce il nome da dare al file che viene caricato
    }
})

const fileFilter = ((req, file, callback) => { //definizione tipi di file validi 
    if(file.mimetype == 'image/pgn' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/jfif' 
        || file.mimetype == 'doc' || file.mimetype == '.docx' || file.mimetype == '.pdf' || file.mimetype == '.txt'){
        callback(null, true); //restituisce true se il file ricevuto è di un tipo valido
    }
    else{
        callback(null, true);
    }
})

var upload = multer({storage : storage, fileFilter, fileFilter}) //setta la destinazione(storage) e il fileFilter per i tipi di file validi


module.exports = upload;