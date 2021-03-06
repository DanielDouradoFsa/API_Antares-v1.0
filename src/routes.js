const { Router } = require('express');
const School = require('./controllers/SchoolController');
const User = require('./controllers/UserController');
const Visitor = require("./controllers/VisitorController");
const Scholarship = require("./controllers/ScholarshipController");
const Employee = require("./controllers/EmployeeController");
const Auth = require('./auth/Auth');
const Passport = require('./auth/Passport')
const { ROLES } = require('./auth/Roles')
const Utils = require('./auth/Utils')
const correio = require("./services/mail/email");
const backupManager = require("./services/backup/BackupManager");

const routes = Router();

Passport.initialize()

routes.get("/", (request, response) => {
  response.json({
      status: "connected",
      message: "Hello world"
  });
});
 
/*
routes.post("/adicionarEscola", (request, response) => {
  School.addNewSchool(request, response);
});
 

routes.post("/adicionarVisitante", (request, response) =>{
  Visitor.addNewVisitor(request, response, result =>{
    if(result){
      response.sendStatus(200);
    }else{
      response.json({
        status: "Erro ao cadastrar."
      });
    }
  });
});

*/

routes.post("/authUser", (request, response) => {
  Auth.signIn(request, response)
});

/*
routes.post("/adicionarFuncionario", (request, response) => {
  Employee.addNewEmployee(request, response)
})
*/

routes.get("/employeePerfil",
  Passport.authenticate(),
  Utils.checkIsInRole(ROLES.Employee),
  (request, response) => {
    response.json({
      worked: true,
      type: 'Employee'
    });
  }
);
/**
 * Rota: /backup
 *  - Tipo: post
 * 
 * Params: Não recebe.
 * Retorna: 200 como sinal de sucesso.
 */
routes.post("/backup", (request, response) =>{
  backupManager.createNewBackup().then(()=>{
    response.sendStatus(200);
  });
});

/**
 * Rota: /backup
 *  Tipo: get
 * 
 * Params: Não recebe.
 * Retorna: Lista de todos os arquivos backups encontrados.
 */
routes.get("/backup", (request, response)=>{
  backupManager.getAllBackups().then((nameFiles)=>{
    response.json({
      files: nameFiles
    });
  });
});

/**
 * Rota: /backup
 *  - Tipo: delete
 * 
 * Params: 
 *  - fileName: Nome do arquivo que deverá ser deletado.
 *  -- Vem pelo corpo da requisição: body
 *
 *  Retorna: Sucesso em todos os casos.
 */
routes.delete("/backup", (request, response) =>{
  backupManager.deleteBackup(request.body.fileName, response);
  response.sendStatus(200);
});

/**
 * Rota: /backup/download/ 
 *  - Tipo: get
 * Params
 *  - Nome do arquivo que deverá ser baixado.
 *  -- Vem pela query/url: query
 * 
 * Retorna: Uma solicitação para downloads;
 */
routes.get("/backup/download", (request, response)=>{
  const fileName = request.query.fileName;
  response.download(backupManager.getCompletePath(fileName), fileName, (err)=>{
    if(err){
      console.log(err);
    }
  });
});


module.exports = routes;