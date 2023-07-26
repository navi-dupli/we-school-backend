const objectUser = require('./models/user'); //Import database model
const objectCourse = require('./models/courses'); //Import database model
const console = require('console-prefix');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

module.exports = function(app, passport) {
// =====================================
// USERS ROUTES ======================
// =====================================

  app.get('/users', async (req, res) => {
    const users = await objectUser.find({}).exec();
    //objectUser:objectUser exports model user to the template
    //user:req.user exports logged user info to the template
    //message:req.flash exports personalized alerts
    res.json({
      success: true,
      users
    });
  });

  app.post("/createUser", async (req,res)=> {
    const email = req.body.email;
    const code = req.body.code;
    const users = new objectUser();

    let user = await objectUser.findOne({ 'local.email' :  email }).exec();
    if (user) {
      res.json({success: false, message: 'El email ingresado ya se encuentra registrado'});
    } else {
      user = await objectUser.findOne({ 'local.code' :  code }).exec();
      if (user) {
        res.json({success: false, message: 'El código ingresado ya se encuentra registrado'});
      } else {
        users.local.code     = req.body.code;
        users.local.email    = req.body.email;
        users.local.password = users.generateHash(req.body.password); //Encrypt password
        users.local.role     = req.body.role;
        users.local.name     = req.body.name;
        users.local.status   = req.body.status;

        //Save user
        await users.save();
        res.json({success: true});
      }
    }
  });


  //Recibe como parametro un Id y devuelve un objeto User
  app.get('/get-user/:id', async (req, res)=> {
    const id = req.param("id");
    //Busca en la BD un usuario con el Id ingresado como parametro
    const user = await objectUser.findById(id).exec();
    res.json({success: true, user: user});
  });

  //Recibe como parametro un Id y modifica el objeto User relacionado
  app.post('/modifyUser/:id', async (req, res) => {

    const id = req.param("id");
    const users = new objectUser();

    //Busca en la BD un usuario con el Id ingresado como parametro
    const objUser = await objectUser.findById(id).exec()
      //Reemplaza la información del usuario
      objUser.local.code     = req.body.code;
      objUser.local.email    = req.body.email;
      objUser.local.password = users.generateHash(req.body.password); //Encrypt password
      objUser.local.role     = req.body.role;
      objUser.local.name     = req.body.name;
      objUser.local.status   = req.body.status;

      //Guarda las modificaciones
      await objUser.save();
      res.json({success: true})
  });


  //Recibe como parametro un Id y elimina el objeto User relacionado
  app.get('/destroyUser/:id', async (req, res)=> {

    const id = req.param("id");
    await objectUser.findByIdAndDelete(id).exec();

    res.json({success:true});
  });
};
