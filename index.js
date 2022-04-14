const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//Set view ejs
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

//workers arrays
const workersPresentList = [];
const workersAbsentList = [];

//get present workers page
app.get('/', (req,res)=>{
  //get date 
  const today = new Date().toLocaleDateString('en-US', {weekday:'long', day:'numeric', month:'long'});
  //render ejs 
  res.render('index', {today, workersPresentList});
})

//get absents page
app.get('/absents', (req,res)=>{
  //get date 
  const today = new Date().toLocaleDateString('en-US', {weekday:'long', day:'numeric', month:'long'});
  //render ejs 
  res.render('absents', {today, workersAbsentList});
})

//Add new worker to list
app.post('/', (req, res)=>{
  if(req.body.workerName !== ''){
    if(req.body.absents !== "absents"){
    workersPresentList.push(req.body.workerName)
    res.redirect('/')
    }else{
      workersAbsentList.push(req.body.workerName)
      res.redirect('/absents')
    }
  }else{
    res.redirect('/')
  }
})
//Add absent workers to workersAbsentList
app.post('/absents', (req, res)=>{
    if(req.body.workerName !== ''){
    workersAbsentList.push(req.body.workerName);
    res.redirect('/absents')
  }else{
    res.redirect('/absents')
  }
})



//Run the server
app.listen(5000, () => console.log('Server Running'));