const config = require('../configs/database');
const mysql = require('mysql2');
const pool = mysql.createPool(config);


pool.on('error', (err) => {
    console.log(err)
});

module.exports = {
    
    getDataRuangan(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            const query = 'SELECT * FROM ruangan';
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

    getDetailRuangan(req, res) {
        const id_ruangan = req.params.id_ruangan;
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            const query = 'SELECT * FROM ruangan WHERE id_ruangan = ? ';
            connection.query(query ,[id_ruangan], function (err, result) {
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

    addDataRuangan(req, res) {
        // parse data
        const {
            id_ruangan,
            nama_ruangan,
            lantai_id,
        } = req.body

        pool.getConnection(function (err, connection) {
            if (err) console.log(err);

            const query = 'INSERT INTO ruangan (id_ruangan, nama_ruangan, lantai_id) VALUES (?, ?, ?,)';
            connection.query(query, [
                id_ruangan,
                nama_ruangan,
                lantai_id,
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

    editDataRuangan(req, res) {
        const id_ruangan = req.params.id_ruangan;

        // parse data
        const data = {
            id_ruangan: req.body.id_ruangan,
            nama_ruangan: req.body.nama_ruangan,
            lantai_id: req.body.lantai_id,
        }

        pool.getConnection(function (err, connection) {
            if (err) throw err;

            const query = 'UPDATE ruangan SET ? WHERE id_ruangan = ? ';
            connection.query(query, [data, id_ruangan], function (err, result) {
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

    deleteDataRuangan(req, res) {
        const id_ruangan = req.params.id_ruangan;

        pool.getConnection(function (err, connection) {
            if (err) throw err;

            const query = 'DELETE FROM ruangan WHERE id_ruangan = ?';
            connection.query(query, [id_ruangan], function (err, result) {
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