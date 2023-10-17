const config = require('../configs/database');
const mysql = require('mysql');
const connection = mysql.createConnection(config);
connection.connect();

const getDataBarang = async (req,res) => {
    const data = await new Promise((resolve,reject) => {
        connection.query('SELECT * FROM barang', function(error,rows){
            if(rows) {
                resolve(rows)
            } else{
                reject([]);
            }
        });
    });
    if (data) {
        res.send({
            success: true,
            message: 'Berhasil ambil data',
            data: data
        });
    } else {
        res.send({
            success: false,
            message: 'Gagal ambil data!',
        });
    }
}
//menambah data
const addDataBarang = async(req,res) => {
    let data = {
        no : req.body.no,
        nama_barang : req.body.nama_barang,
        merek : req.body.merek,
        tipe : req.body.tipe,
        model : req.body.model,
        ruangan_id : req.body.ruangan_id,
        jumlah : req.body.jumlah,
        tahun_peroleh : req.body.tahun_peroleh,
        nilai_peroleh : req.body.nilai_peroleh,
        nilai_perbaikan : req.body.nilai_perbaikan,
        no_inventaris : req.body.no_inventaris,
        kondisi : req.body.kondisi,
    }
    const result = await new Promise((resolve,reject) => {
        connection.query('INSERT INTO barang SET ?;',[data],function(error,rows){
            if (rows) {
                resolve(true)
            }else{
                reject(false)
            }
        });
    });
    if(result){
        res.send({
            success : true,
            message : 'Berhasil menambah data!'
        });
    } else {
        res.send({
            success: false,
            message: 'Gagal menambah data'
        });
    }
}
//mengubah data
const editDataBarang = async(req,res) => {
    let id_barang = req.params.id_barang;

    let dataEdit= {
        no : req.body.no,
        nama_barang : req.body.nama_barang,
        merek : req.body.merek,
        tipe : req.body.tipe,
        model : req.body.model,
        ruangan_id : req.body.ruangan_id,
        jumlah : req.body.jumlah,
        tahun_peroleh : req.body.tahun_peroleh,
        nilai_peroleh : req.body.nilai_peroleh,
        nilai_perbaikan : req.body.nilai_perbaikan,
        no_inventaris : req.body.no_inventaris,
        kondisi : req.body.kondisi,
    }
    const result = await new Promise((resolve,reject) => {
        connection.query('UPDATE barang SET ? WHERE id_barang = ?;', [dataEdit,id_barang],function(error,rows){
            if(rows) {
                resolve(true);
            } else {
                reject(false);
            }
        });
    });
    if(result){
        res.send({
            success: true,
            message: 'Berhasil edit data'
        });
    } else{
        res.send({
            success: false,
            message: 'Gagal edit data'
        });
    }
}
//menghapus data
const deleteDataBarang = async(req,res) => {
    let id_barang = req.params.id_barang;
    const result = await new Promise((resolve,reject) => {
        connection.query('DELETE FROM barang WHERE id_barang = ?;',[id_barang],function(error,rows){
            if(rows){
                resolve(true)
            } else{
                reject(false)
            }
        });
    });
    if(result){
        res.send({
            success: true,
            message: 'Berhasil Hapus Data'
        });
    } else {
        res.send({
            success: false,
            message: 'Gagal Hapus Data'
        });
    }
}
module.exports = {
    getDataBarang,
    addDataBarang,
    editDataBarang,
    deleteDataBarang
}