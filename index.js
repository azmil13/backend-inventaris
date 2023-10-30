const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//definis enviroment secara global (.env)
require('dotenv').config();

// convert data ke json
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('https://inventaris-stfi.vercel.app/barang/ruangan_id', (req, res) => {
  const ruangan_id = req.params.ruangan_id; // Ambil ID dari parameter URL


  const data = {
      no: no,
      nama_barang: nama_barang,
      merek: merek,
      tipe: tipe,
      model: model,
      ruangan_id: ruangan_id,
      jumlah: jumlah,
      tahun_peroleh: tahun_peroleh,
      nilai_peroleh: nilai_peroleh,
      nilai_perbaikan: nilai_perbaikan,
      no_inventaris: no_inventaris,
      kondisi: kondisi,
  };

  res.json(data);
});

app.get('/ambil_data', (req, res) => {
  // Di sini Anda dapat melakukan pengambilan data dari database atau sumber data lainnya
  const data = {
    no: no,
    nama_barang: nama_barang,
    merek: merek,
    tipe: tipe,
    model: model,
    ruangan_id: ruangan_id,
    jumlah: jumlah,
    tahun_peroleh: tahun_peroleh,
    nilai_peroleh: nilai_peroleh,
    nilai_perbaikan: nilai_perbaikan,
    no_inventaris: no_inventaris,
    kondisi: kondisi,
  };

  res.json(data);
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Ini mengizinkan akses dari semua origin. Gantilah sesuai kebutuhan Anda.
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    // res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

//memanggil route produk
const appRoute = require('./src/routers');
app.use('/', appRoute);

//menjalankan server sesuai dengan port yang terdaftar di .env (8080)
app.listen(process.env.APP_PORT, () => {
    console.log(`Server Berjalan http://localhost:${process.env.APP_PORT}`);
}); 