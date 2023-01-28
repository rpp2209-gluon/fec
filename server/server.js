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

app.get('/reviews', (req, res) => {
  console.log('here is the params id', req.params.id);
  console.log('here is the request query', req.query.id);
  axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews?product_id=' + req.query.id, {
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


app.get('/reviews/meta', (req, res) => {
console.log(req.params.id);
axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/meta?product_id=' + req.query.id, {
  headers: {
    'Authorization': `${config.API_KEY}`
    }
  })
  .then((response) => {
    console.log('GET review metadata returned: ')
    console.log(response.data);
    res.status(200).send(response.data);
  })
  .catch((err) => {
    console.log('GET reviews metadata errored: ');
    console.log(err);
    res.status(500).send(err);
  })
});

app.post('/reviews', (req, res) => {
axios.post('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews', req.body, {
  headers: {
    'Authorization': `${config.API_KEY}`
    }
  })
  .then((response) => {
    console.log('POST review success: ')
    res.status(201).send('CREATED');
  })
  .catch((err) => {
    console.log('POST reviews errored: ');
    console.log(err);
    res.status(500).send(err);
  })
});

app.put('/reviews/:review_id/helpful', (req, res) => {
axios.put('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/' + req.params.review_id + '/helpful',
  {review_id: req.params.review_id},
  {headers: {
    'Authorization': `${config.API_KEY}`
    }
  }
)
  .then((response) => {
    console.log('PUT review helpful success: ')
    res.status(204).send('NO CONTENT');
  })
  .catch((err) => {
    console.log('PUT review helpful errored: ');
    console.log(err);
    res.status(500).send(err);
  })
})

app.put('/reviews/:review_id/report', (req, res) => {
axios.put('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/' + req.params.review_id + '/report',
  {review_id: req.params.review_id},
  {headers: {
    'Authorization': `${config.API_KEY}`
    }
  }
)
  .then((response) => {
    console.log('PUT review report success: ')
    res.status(204).send('NO CONTENT');
  })
  .catch((err) => {
    console.log('PUT review report errored: ');
    console.log(err);
    res.status(500).send(err);
  })
});

//related products
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



Courtney Walker
  4:35 PM
Hi @channel checking in on this team, and how you are doing with your deliverables, or if you need any support? I know we have had some unexpected circumstances come up on the team and making sure there isn't anything myself or Alex.


Alex [RPP 2209]
  4:55 PM
I think ok with the circumstances. It’s been a slow week for me considering how it started but I have updated my links for the rough structure of what I do have. I may be behind in maybe detail and amount of tests but the structure is there and it is being served by the server and I have also started a testing framework. I’m hoping to catch up this weekend into next week barring any other things that come up.


Patty Long [RPP2209]
  11:45 PM
Thanks Courtney for checking in, I think we have some catching up to do but are planning to use tomorrow's class time to make progress on the deliverables, and will be able to assess where we are after our group session tomorrow and create a plan for additional catching up as needed
New


Katy Ouyang
  12:03 PM
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
  console.log('get styles', req.query);
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
});

//product style
app.get('/products/:product_id/styles', (req, res) => {
  console.log('get styles', req.query);
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



