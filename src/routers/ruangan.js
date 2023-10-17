const router = require('express').Router();
const { ruangan } = require('../controllers');

//Get localhost:8080/produk => Ambil Semua Data
router.get('/', ruangan.getDataRuangan);


// //Get localhost:8080/produk/2 => Ambil data semua produk berdasarkan id = 2
// router.get('/:id', produk.getDetailProduk);

// POST lcalhost:8080/produk/add => Tambah data produk ke database
router.post('/add', ruangan.addDataRuangan);

// // POST lcalhost:8080/produk/2 => Edit data produk
router.put('/edit/:id_ruangan', ruangan.editDataRuangan);

// // POST lcalhost:8080/produk/delete => Delete data produk
router.delete('/delete/:id_ruangan', ruangan.deleteDataRuangan);

module.exports = router;