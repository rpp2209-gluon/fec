const path = require("path");
const express = require("express"); // npm installed
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");

const config = require("../config.js");
// console.log(API_KEY)

const app = express();

app.use(express.static(path.join(__dirname, "../public/dist")));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// other configuration...

app.listen(3000);

// to /:id add router
const router = express.Router();

app.get("/:id", function (req, res) {
  console.log('req.params.id', req.params.id);
  res.sendFile(path.join(__dirname, "../public/dist",'index.html'));
  // res.status(200).send({'idtest':123});
})
app.use('/:id', router);



// product
app.get('/products/:product_id', (req, res) => {
  console.log('get product', req.query);
  axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/'+req.query.id, {
    headers: {
      'Authorization': `${config.API_KEY}`
      }
    })
    .then((response) => {
      console.log('GET product', req.query.id)
      res.status(200).send(response.data);
    })
    .catch((err) => {
      console.log('GET product error ', req.query.id);
      res.status(500).send(err);
    })
});
//product style
app.get('/products/:product_id/styles', (req, res) => {
  console.log('get styles', req.query.id);
  axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/'+req.query.id+'/styles', {
    headers: {
      'Authorization': `${config.API_KEY}`
      }
    })
    .then((response) => {
      console.log('GET style', req.query.id)
      res.status(200).send(response.data);
    })
    .catch((err) => {
      console.log('GET style error ', req.query.id);
      res.status(500).send(err);
    })
});


app.get('/reviews/meta', (req, res) => {
console.log('GET review meta', req.query.id);
axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/meta?product_id=' + req.query.id, {
  headers: {
    'Authorization': `${config.API_KEY}`
    }
  })
  .then((response) => {

    res.status(200).send(response.data);
  })
  .catch((err) => {
    console.log('GET reviews error ', err);
    res.status(500).send(err);
  })
});


