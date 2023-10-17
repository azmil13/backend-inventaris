const config = require('../configs/database');
const mysql = require('mysql');
const connection = mysql.createConnection(config);
connection.connect();

const getDataRuangan = async (req,res) => {
    const data = await new Promise((resolve,reject) => {
        connection.query('SELECT * FROM ruangan', function(error,rows){
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
const addDataRuangan = async(req,res) => {
    let data = {
        id_ruangan : req.body.id_ruangan,
        nama_ruangan : req.body.nama_ruangan,
        lantai_id : req.body.lantai_id
    }
    const result = await new Promise((resolve,reject) => {
        connection.query('INSERT INTO ruangan SET ?;',[data],function(error,rows){
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
const editDataRuangan = async(req,res) => {
    let id_ruangan = req.params.id_Ruangan;

    let dataEdit= {
        id_ruangan : req.body.id_ruangan,
        nama_ruangan : req.body.nama_ruangan,
        lantai_id : req.body.lantai_id
    }
    const result = await new Promise((resolve,reject) => {
        connection.query('UPDATE ruangan SET ? WHERE id_ruangan = ?;', [dataEdit,id_ruangan],function(error,rows){
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
const deleteDataRuangan = async(req,res) => {
    let id_ruangan = req.params.id_Ruangan;
    const result = await new Promise((resolve,reject) => {
        connection.query('DELETE FROM ruangan WHERE id_ruangan = ?;',[id_ruangan],function(error,rows){
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
    getDataRuangan,
    addDataRuangan,
    editDataRuangan,
    deleteDataRuangan
}