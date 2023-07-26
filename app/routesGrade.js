const objectGrade = require('./models/grades'); //Import database model
const multer  = require('multer')

module.exports = function(app, passport) {

  app.get('/grades',async (req, res) => {

    const degrees = await objectGrade.find({}).exec();
    //objectGrade:objectGrade exports model grade to the template
    //user:req.user exports logged user info to the template
    //message:req.flash exports personalized alerts
    res.json({
      success: true,
      degrees
    });
  });

  app.post("/createGrade", async (req,res) => {
    const datetime = new Date().toJSON().slice(0,10); // Captura AAAA-MM-DD actual
    const grades = new objectGrade();

    grades.code         = req.body.code
    grades.name         = req.body.name
    grades.creationDate = datetime
    await grades.save();

    res.json({success: true});

   });

  app.get('/get-grade/:id', async (req, res) => {

    const id = req.param("id");

    const grade = await objectGrade.findById(id).exec();
    res.json({
      success: true,
      grade
    });
  });


  app.post('/modifyGrade/:id', async (req, res) => {

    const id = req.param("id");

    const objGrade = await objectGrade.findById(id).exec()
      objGrade.code         = req.body.code;
      objGrade.name         = req.body.name;

      await objGrade.save();
      res.json({success:true});
  });

  app.get('/destroyGrade/:id', async (req, res) => {

    const id = req.param("id");

    await objectGrade.findByIdAndRemove(id).exec();
    res.json({success:true});
  });

};
