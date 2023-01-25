const path = require("path");
const express = require("express"); // npm installed
const axios = require("axios");
const bodyParser = require("body-parser");

const config = require("../config.js");
// console.log(API_KEY)

const app = express();

app.use(express.static(path.join(__dirname, "../public/dist")));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
// other configuration...

app.listen(3000);

// PRODUCTS API

app.get('/products', (req, res) => {
    axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products', {
      headers: {
        'Authorization': `${config.API_KEY}`
        }
      })
      .then((response) => {
        console.log('GET products returned: ')
        console.log(response.data);
        res.status(200).send(response.data);
      })
      .catch((err) => {
        console.log('GET products errored: ');
        console.log(err);
        res.status(500).send(err);
      })
  });

  app.get('/products/:product_id', (req, res) => {
    console.log('/products/:product_id', req.params)
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${req.params.product_id}`, {
      headers: {
        'Authorization': `${config.API_KEY}`
        }
      })
      .then((response) => {
        console.log('GET products/:product_id returned: ')
        console.log(response.data);
        res.status(200).send(response.data);
      })
      .catch((err) => {
        console.log('GET products errored: ');
        console.log(err);
        res.status(500).send(err);
      })
  });





// REVIEWS API

app.get('/reviews/:id', (req, res) => {
    console.log(req.params.id);
    axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews?product_id=' + req.params.id, {
      headers: {
        'Authorization': `${config.API_KEY}`
        }
      })
      .then((response) => {
        console.log('GET reviews returned: ')
        console.log(response.data);
        res.status(200).send(response.data);
      })
      .catch((err) => {
        console.log('GET reviews errored: ');
        console.log(err);
        res.status(500).send(err);
      })
});

app.get('/products/:product_id/related', (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${req.params.product_id}/related/`, {
    headers: {
      'Authorization': `${config.API_KEY}`
      }
    })
    .then((response) => {
      console.log('response.data', response.data);
      res.status(200).send(response.data);
      res.end();
    })
    .catch((err) => {
      console.log('GET related errored: ');
      console.log(err);
      res.status(500).send(err);
    })
});






// Questions and Answers API
// List Questions
// GOOD
app.get('/questions/:product_id', (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions?product_id=${req.params.product_id}&count=10000`, {
    headers: {
      'Authorization': `${config.API_KEY}`
      }
    })
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
})

// List Answers
// GOOD
app.get('/answers/:question_id', (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions/${req.params.question_id}/answers`, {
    headers: {
      'Authorization': `${config.API_KEY}`
      }
    })
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
})

// Post Question
// GOOD
app.post('/questions', (req, res) => {
  const correctReqBody = {
    ...req.body,
    product_id: Number(req.body.product_id),
  };
  axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions`, correctReqBody, {
    headers: {
      'Authorization': `${config.API_KEY}`,

      },
    })
    .then((response) => {
      res.status(201).send(response.data);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
})

// Post Answer
// GOOD
app.post('/answers/:question_id', (req, res) => {
  axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions/${req.params.question_id}/answers`, req.body, {
    headers: {
      'Authorization': `${config.API_KEY}`
      },
    })
    .then((response) => {
      res.status(201).send(response.data);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
})

// Mark question/answer as helpful
// GOOD
app.put('/questions/helpful', (req, res) => {
  const id = req.body.question_id || req.body.answer_id;
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions/${id}/helpful`, req.body, {
    headers: {
      'Authorization': `${config.API_KEY}`
      },
    })
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      res.status(500).send(err);
    })
})

// Report question/answer
// GOOD
app.put('/questions/report', (req, res) => {
  const id = req.body.question_id || req.body.answer_id;
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions/${id}/report`, req.body, {
    headers: {
      'Authorization': `${config.API_KEY}`
      },
    })
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      res.status(500).send(err);
    })
})


// Report question



// CART APIs





// INTERACTIONS APIs



