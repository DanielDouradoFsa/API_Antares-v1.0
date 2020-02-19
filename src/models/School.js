const connection = require("../services/database/connection");

exports.add = function add(idVisitante, nomeResponsavel, telefoneResponsavel, Login, idPessoa, callback){
    var sql = "INSERT INTO escolas (idVisitante, nomeResponsavel, telefoneResponsavel, Login, idPessoa) VALUES ?"
    var values = [[idVisitante, nomeResponsavel, telefoneResponsavel, Login, idPessoa]]

    conection.query(sql, [values], function(err, result){
        if (err) throw err;
        callback(result);
    })
}

exports.getByIdVisitante = function getByIdVisitante(idVisitante, callback){
    var sql = "SELECT * FROM escolas WHERE idVisitante = ?"
    connection.query(sql, idVisitante, function(err, result){
        if (err) throw err;
        callback(result);
    });
}

exports.getByNome = function getByNome(nomeResponsavel, callback){
    var sql = "SELECT * FROM escolas WHERE nomeResponsavel = ?"
    connection.query(sql, nomeResponsavel, function(err, result){
        if (err) throw err;
        callback(result);
    });
}

exports.getByTelefone = function getByTelefone(telefoneResponsavel, callback){
    var sql = "SELECT * FROM escolas WHERE telefoneResponsavel = ?"
    connection.query(sql, telefoneResponsavel, function(err, result){
        if (err) throw err;
        callback(result);
    });
}

exports.getByLogin = function getByLogin(Login, callback){
    var sql = "SELECT * FROM escolas WHERE Login = ?"
    connection.query(sql, Login, function(err, result){
        if (err) throw err;
        callback(result);
    });
}

exports.getByIdPessoa = function getByIdPessoa(idPessoa, callback){
    var sql = "SELECT * FROM escolas WHERE idPessoa = ?"
    connection.query(sql, idPessoa, function(err, result){
        if (err) throw err;
        callback(result);
    });
}

exports.getByIdEscola = function getByidEscola(idEscola, callback){
    var sql = "SELECT * FROM escolas WHERE idEscola = ?"
    connection.query(sql, idEscola, function(err, result){
        if(err) throw err;
        callback(result);
    });
}

exports.setLogin = function setLogin(idEscola, Login, callback){
    var sql = "UPDATE escolas Login = ? WHERE idEscola = ?"
    var values = [Login, idEscola];
    connection.query(sql, values, function(err, result){
        if (err) throw err;
        callback(result);
    });
}

exports.setNome = function setNome(idEscola, nomeResponsavel, callback){
    var sql = "UPDATE escolas nomeResponsavel = ? WHERE idEscola = ?"
    var values = [nomeResponsavel, idEscola];
    connection.query(sql, values, function(err, result){
        if (err) throw err;
        callback(result);
    });
}

exports.setTelefone = function setTelefone(idEscola, telefoneResponsavel, callback){
    var sql = "UPDATE escolas telefoneResponsavel ? WHERE idEscola = ?"
    var values = [telefoneResponsavel, idEscola];
    connection.query(sql, values, function(err, result){
        if (err) throw err;
        callback(result);
    });
}

exports.remove = function remove(idEscola, callback){
    var sql = "DELET FROM escolas WHERE idEscola = ?"
    connection.query(sql, idEscola, function(err, result){
        if (err) throw err;
        callback(result);
    });
}