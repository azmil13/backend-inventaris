const router = require('express').Router();
const { barang } = require('../controllers');

//Get localhost:8080/produk => Ambil Semua Data
router.get('/', barang.getDataBarang);


// //Get localhost:8080/produk/2 => Ambil data semua produk berdasarkan id = 2
// router.get('/:id', produk.getDetailProduk);

// POST lcalhost:8080/produk/add => Tambah data produk ke database
router.post('/add', barang.addDataBarang);

// // POST lcalhost:8080/produk/2 => Edit data produk
router.put('/edit/:id_barang', barang.editDataBarang);

// // POST lcalhost:8080/produk/delete => Delete data produk
router.delete('/delete/:id_barang', barang.deleteDataBarang);

module.exports = router;