const config = require('../configs/database');
const mysql = require('mysql2');
const pool = mysql.createPool(config);


pool.on('error', (err) => {
    console.log(err)
});

module.exports = { 
    getDataBarang(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            const query = 'SELECT * FROM barang';
            connection.query(query, function (err, result) {
                if (err) throw err;

                res.send({ 
                    success: true,
                    message: 'Fetch data successfully',
                    data: result
                })
            })

            connection.release();
        })
    },

    getDetailBarang(req, res) {
        const id_barang = req.params.id_barang;
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            const query = 'SELECT * FROM barang WHERE id_barang = ? ';
            connection.query(query ,[id_barang], function (err, result) {
                if (err) throw err;

                res.send({
                    success: true,
                    message: 'Fetch data successfully',
                    data: result
                })
            })

            connection.release();
        })
    },

    addDataBarang(req, res) {
        // parse data
        const {
            no,
            nama_barang,
            merek,
            tipe,
            model,
            ruangan_id,
            jumlah,
            tahun_peroleh,
            nilai_peroleh,
            nilai_perbaikan,
            no_inventaris,
            kondisi
        } = req.body

        pool.getConnection(function (err, connection) {
            if (err) console.log(err);

            const query = 'INSERT INTO barang ( no,nama_barang,merek,tipe,model,ruangan_id,jumlah,tahun_peroleh,nilai_peroleh,nilai_perbaikan,no_inventaris,kondisi) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            connection.query(query, [
                no,
                nama_barang,
                merek,
                tipe,
                model,
                ruangan_id,
                jumlah,
                tahun_peroleh,
                nilai_peroleh,
                nilai_perbaikan,
                no_inventaris,
                kondisi,
                cover], function (err, result) {
                    if (err) console.log(err);

                    res.send({
                        success: true,
                        message: 'Your record has been saved successfully',
                    })
                })

            connection.release();
        })
    },

    editDataBarang(req, res) {
        const id_barang = req.params.id_barang;

        // parse data
        const data = {
            no: req.body.no,
            nama_barang: req.body.nama_barang,
            merek: req.body.merek,
            tipe: req.body.tipe,
            model: req.body.model,
            ruangan_id: req.body.ruangan_id,
            jumlah: req.body.jumlah,
            tahun_peroleh: req.body.tahun_peroleh,
            nilai_peroleh: req.body.nilai_peroleh,
            nilai_perbaikan: req.body.nilai_perbaikan,
            no_inventaris: req.body.no_inventaris,
            kondisi: req.body.kondisi,
        }

        pool.getConnection(function (err, connection) {
            if (err) throw err;

            const query = 'UPDATE barang SET ? WHERE id_barang = ? ';
            connection.query(query, [data, id_barang], function (err, result) {
                if (err) throw err;

                if (result['affectedRows'] === 0) res.send({
                    message: 'There is no record with that id'
                })

                res.send({
                    success: true,
                    message: 'Updated successfully',
                })
            })

            connection.release();
        })
    },

    deleteDataBarang(req, res) {
        const id_barang = req.params.id_barang;

        pool.getConnection(function (err, connection) {
            if (err) throw err;

            const query = 'DELETE FROM barang WHERE id_barang = ?';
            connection.query(query, [id_barang], function (err, result) {
                if (err) throw err;

                if (result['affectedRows'] === 0) res.send({
                    message: 'There is no record with that id'
                })

                res.send({
                    success: true,
                    message: 'Deleted successfully',
                })
            })
            connection.release();
        })
    }
}