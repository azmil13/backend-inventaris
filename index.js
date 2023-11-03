const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//definis enviroment secara global (.env)
require('dotenv').config();

// convert data ke json
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// app.get('/barang', (req, res) => {
//   const { filterParameter } = req.query; // Ambil parameter filter dari query string

//   let sql = 'SELECT barang.no, barang.nama_barang, barang.Merek, barang.Tipe, barang.Model, barang.Jumlah, barang.Tahun_peroleh, barang.Nilai_peroleh, barang.Nilai_perbaikan, barang.No_inventaris, barang.Kondisi, ruangan.nama_ruangan FROM barang INNER JOIN ruangan ON barang.ruangan_id = ruangan.ID_ruangan;';
  
//   if (filterParameter) {
//     // Jika filterParameter diberikan, tambahkan klausa WHERE untuk filter
//     sql += ` WHERE ID_Ruangan = ${db.escape(filterParameter)}`;
//   }

//   db.query(sql, (err, results) => {
//     if (err) {
//       console.error('Terjadi kesalahan saat mengambil data:', err);
//       res.status(500).send('Terjadi kesalahan');
//     } else {
//       res.json(results); // Kirim data yang telah difilter sebagai respons JSON
//     }
//   });
// });


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Ini mengizinkan akses dari semua origin. Gantilah sesuai kebutuhan Anda.
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    // res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

//memanggil route produk
const appRoute = require('./src/routers');
app.use('/', appRoute);

app.listen(process.env.APP_PORT, () => {
    console.log(`Server Berjalan http://localhost:${process.env.APP_PORT}`);
}); 