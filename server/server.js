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
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${req.params.product_id}`, {
      headers: {
        'Authorization': `${config.API_KEY}`
        }
      })
      .then((response) => {
        // console.log('GET products/:product_id returned: ')
        // console.log(response.data);
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

// product

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



//related products
app.get('/relatedproducts', (req, res) => {
  axios({
    method: 'get',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${req.query.id}/related`,
    params: {
      product_id: req.query.id
    },
    headers: {
      'Authorization': `${config.API_KEY}`
      },
  })
  .then((data) => {
    var relatedProds = [];

    function getStuff (array, productId, loc, callback) {
      if (loc === productId.length) {
        callback(array)
      } else {
        axios({
          method: 'get',
          url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${productId[loc]}`,
          params: {
            product_id: productId[loc]
          },
          headers: {
            'Authorization': `${config.API_KEY}`
            },
        })
        .then((data) => {
          array.push(data.data);
          getStuff(array, productId, (loc + 1), callback)
        })
        .catch((err) => {
          console.log(err.data)
        })
      }
    }

    getStuff(relatedProds, data.data, 0, (result) => {
      res.send(result)
    })

  })
});

app.get('/mergedfeatures', (req, res) => {
  var mergedFeatures = [];
  axios({
    method: 'get',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${req.query.currentId}`,
    headers: {
      'Authorization': `${config.API_KEY}`
    }
  })
  .then(data => {
    axios({
      method: 'get',
      url:  `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${req.query.selectedId}`,
      headers: {
        'Authorization': `${config.API_KEY}`
      }
    })
    .then(selected => {
      //console.log('data.data selected.data', data.data.features, selected.data.features)
      for (var i=0; i<data.data.features.length; i++) {
        //console.log('current[i]', data.data.features[i], selected.data.features[i])
        for (var j=0; j<selected.data.features.length; j++) {
          //console.log('JJJJ', data.data.features[i], selected.data.features[j])
          if (data.data.features[i].feature === selected.data.features[j].feature) {
            mergedFeatures.push({feature: data.data.features[i].feature, value: [data.data.features[i].value, selected.data.features[j].value]});
            data.data.features.splice(i, 1);
            selected.data.features.splice(j, 1);
          } else {
            mergedFeatures.push({feature: data.data.features[i].feature, value: [data.data.features[i].value, ' ']});
            mergedFeatures.push({feature: selected.data.features[j].feature, value: [' ', selected.data.features[j].value]});
            data.data.features.splice(i, 1);
            selected.data.features.splice(j, 1);
          }
        }
      }
    })
    .then(() => {
      res.send(mergedFeatures)
    })
  })
})