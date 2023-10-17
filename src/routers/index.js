const router = require('express').Router();

const routeBarang = require('./barang');
const routeRuangan = require('./ruangan');


//
router.use('/barang', routeBarang);
router.use('/ruangan', routeRuangan);


module.exports = router;