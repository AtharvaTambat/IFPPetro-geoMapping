const express = require('express')
const app = express()
const cors = require('cors')
const { spawn } = require('child_process');
var router   =   express.Router();
const mongoose = require('mongoose')
const User = require('./models/user.model')
const CollectionStatus = require('./models/collectionstatus')
const RequestStatus = require('./models/requeststatus');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');

app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    next();
  });

mongoose.connect('mongodb://localhost:27017/ifp-petro-webapp')
var IFPaddress = "Ghaziabad, Uttar Pradesh, India"

app.post('/api/register', async (req,res) => {
    console.log(req.body)
    try{
        const newPassword = await bcrypt.hash(req.body.password, 10)
        await User.create({
            name: req.body.name,
            compname: req.body.compname,
            contact: req.body.contact,
            email: req.body.email,
            password: newPassword,
            address: req.body.compname + ", " + req.body.city +", "+ req.body.state +", "+ req.body.zipcode +", "+req.body.country,
        })
        res.json({status: 'ok'})
    }
    catch (err){
        res.json({status: 'error', error: 'Duplicate email'})
    }
})

app.post('/api/recyclerdash', async (req,res) => {
    console.log(req.body)
    console.log("TRANSFER OF USER DATA")
    try{
        await CollectionStatus.create({
            customer_id: req.body.customer_id.replace(/\n/g, ''),
            customer: req.body.customer.replace(/\n/g, ''),
            category: req.body.category.replace(/\n/g, ''),
            packet_type: req.body.packet_type.replace(/\n/g, ''),
            quantity: req.body.quantity.replace(/\n/g, ''),
        })
        res.json({status: 'ok'})
    }
    catch (err){
        res.json({status: 'error', error: 'Invalid Collection Data'})
    }
})

app.get("/api/recyclerdash", (req, res) => {
    RequestStatus.find({})
        .then((items) => res.json(items))
        .catch((err) => console.log(err.Message)); // DO NT FORGET TO CHANGE TO RequestStatus
    });

app.post('/api/login', async (req,res) => {
    
    const user = await User.findOne({
        email: req.body.email,
    })
    if(!user){
        return { status: 'error', error: 'User not found' }
    }
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password)
    if(isPasswordValid) {
        const token = jwt.sign({
            name: user.name,
            email: user.email,
        }, 'secret123') // this secret123 should be something very secure
        return res.json({status: 'ok', user: token})
    }
    else{
        return res.json({status: 'error', user: false})
    }
})

app.post('/api/userdashboard/orders', async (req,res) => {
    console.log(req.body)
    try{
        await RequestStatus.create({
            customer_id: req.body.e3,
            customer:req.body.e4 + " " + req.body.e5,
            category: req.body.e0,
            packet_type: req.body.e1,
            quantity: req.body.e2,
        })
        res.json({status: 'ok'})
    }
    catch (err){
        res.json({status: 'error', error: 'incorrect supplier data'})
    }
})

const executePython = async (script, args) => {
    const arguments = args.map(arg => arg.toString());

    const py = spawn("python3", [__dirname + script, ...arguments]);

    const result = await new Promise((resolve, reject) => {
        let output;

        // Getting the result from the python script
        py.stdout.on('data', (data) => {
            output = JSON.parse(data);
        });

        // Handling errors
        py.stderr.on("data", (data) => {
            console.error(`[python] Error occured: ${data}`);
            reject(`Error occured in ${script}`);
        });

        py.on("exit", (code) => {
            console.log(`Child process exited with code: ${code}`);
            resolve(output);
        });
    });
    return result;
}

app.get('/api/optimizeroutes', async (req,res) => {
    try{
        var query = await CollectionStatus.find({});
        console.log("OPTIMIZING ROUTES");
        var address_list = "";
        var volume_list = "";

        for (let i = 0; i < query.length-1; i++) {
            var address_string = await User.find({'name' : query[i].customer});
            console.log( query[i].customer);
            address_list+=address_string[0].address + "#";
            volume_list+=query[i].quantity + "#";
        }
        var address_string = await User.find({'name' : query[query.length-1].customer});
        address_list+=address_string[0].address;
        volume_list+=query[query.length-1].quantity;

        address_list = IFPaddress + "#" + address_list; // Adding depot address

        console.log(address_list);
        console.log(volume_list);

        const result = await executePython('/optimizeroutes.py',[5,50,address_list, volume_list]); //MAX NUMBER OF AVAILABLE TRUCKS AND CAPACITY OF EACH TRUCK IS HARDCODED
        res.json({result: result});
    }
    catch(error){
        res.status(500).json({error: 'error'});
    }    
});


app.listen(1337, () => {
    console.log('server started on port 1337')
})


