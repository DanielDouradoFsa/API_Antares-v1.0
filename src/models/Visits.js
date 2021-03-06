const pool = require("../services/database/connection");

exports.add = function add(idVisitante, agendamento, numAlunos, Responsavel, status, serie, observacao, atracoes, hora, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "INSERT INTO visitas (idVisitante, agendamento, numAlunos, Responsavel, status, serie, observacao, atracoes, hora ) VALUES  ?"
        var values  = [[idVisitante, agendamento, numAlunos, Responsavel, status, serie, observacao, atracoes, hora]];
        connection.query(sql, [values], function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });
    });
}

//Retorna todas as pessoas presentes em tbl_pessoa. Retorna um objeto no finals
exports.getVisitas = function getVisitas(callback){
    pool.getConnection(function(err, connection){
        if(err) throw err;
        var sql = "SELECT * FROM visits";
        connection.query(sql, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release()
        });
    });   
}

exports.getByResponsavel = function getByResponsavel(Responsavel, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT * FROM visitas WHERE Responsavel = ?"
        connection.query(sql, Responsavel, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });
    })
}

exports.getByIdVisitante = function getByIdVisitante(idVisitante, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT * FROM visitas WHERE idVisitante = ?"
        connection.query(sql, idVisitante, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });
    })
}

exports.getByStatus = function getByStatus(status, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT * FROM visitas WHERE status = ?"
        connection.query(sql, status, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });
    });
}

exports.getByAgendamento = function getByResponsavel(agendamento, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "SELECT * FROM visitas WHERE status = ?"
        connection.query(sql, agendamento, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });
    });
}


exports.remove = function remove(nome, callback){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "DELETE FROM visitas WHERE nome = ?"
        connection.query(sql, nome, function(err, result){
            if(err) throw err;
            callback(result);
            connection.release();
        }); 
    });
}


exports.setConfirmado = function setConfirmado(idVisitante){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "UPDATE visitas SET status = 1 WHERE idVisitante = ?"
        connection.query(sql, idVisitante, function (err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });
    })
}


exports.setRealizado = function setRealizado(idVisitante){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "UPDATE visitas SET status = 2 WHERE idVisitante = ?"
        connection.query(sql, idVisitante, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });
    })
}

exports.setCancelado = function setCancelado(idVisitante){
    pool.getConnection(function(err, connection){
        if (err) throw err;
        var sql = "UPDATE visitas SET status = 3 WHERE idVisitante = ?"
        connection.query(sql, idVisitante, function(err, result){
            if (err) throw err;
            callback(result);
            connection.release();
        });
    });
}