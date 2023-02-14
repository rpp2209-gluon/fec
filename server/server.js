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

// ROUTING APIs =========================================================================================

// to /:id add router
const router = express.Router();

app.get("/:id", function (req, res) {
  console.log('req.params.id', req.params.id);
  res.sendFile(path.join(__dirname, "../public/dist",'index.html'));
})
app.use('/:id', router);


// PRODUCTS API =========================================================================================

app.get('/:id/products', (req, res) => {
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



// RELATED PRODUCTS APIs ========================================================================================

// product
app.get('/:id/products/:product_id', (req, res) => {
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
app.get('/:id/products/:product_id/styles', (req, res) => {
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


//related products
app.get('/:id/products/:product_id/related', (req, res) => {
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



// REVIEWS API  ========================================================================================

app.get('/:id/reviews', (req, res) => {
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

app.get('/:id/reviews/meta', (req, res) => {
console.log('this is the meta reviews params id', req.params.id);
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

app.post('/:id/reviews', (req, res) => {
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

app.put('/:id/reviews/:review_id/helpful', (req, res) => {
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

app.put('/:id/reviews/:review_id/report', (req, res) => {
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






// Questions and Answers API ========================================================================================
// List Questions
// GOOD
app.get('/:id/questions/:product_id', (req, res) => {
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


// List Answers
// GOOD
app.get('/:id/answers/:question_id', (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions/${req.params.question_id}/answers?count=10000`, {
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
app.post('/:id/questions', (req, res) => {
  // const correctReqBody = {
  //   ...req.body,
  //   product_id: Number(req.body.product_id),
  // };
  axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions`, req.body, {
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
app.post('/:id/answers/:question_id', (req, res) => {
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
app.put('/:id/questions/helpful', (req, res) => {
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions/${req.body.question_id}/helpful`, req.body, {
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
// GOOD
app.put('/:id/questions/report', (req, res) => {
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions/${req.body.question_id}/report`, req.body, {
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

// Mark answer as helpful
// GOOD
app.put('/:id/answers/helpful', (req, res) => {
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/answers/${req.body.answer_id}/helpful`, req.body, {
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

// Report answer
// GOOD
app.put('/:id/answers/report', (req, res) => {
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/answers/${req.body.answer_id}/report`, req.body, {
    headers: {
      'Authorization': `${config.API_KEY}`
      },
    })
    .then(data => {
      res.status(204).send();
    })
    .catch(err => {
      res.status(500).send(err);
    })
})









// INTERACTIONS APIs



//related products
app.get('/:id/relatedproducts', (req, res) => {
  axios({
    method: 'get',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${req.query.currentId}/related`,
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
          console.log("this is the error in getstuff", err)
        })
      }
    }

    getStuff(relatedProds, data.data, 0, (result) => {
      res.send(result)
    })

  })
});

app.get('/:id/mergedfeatures', (req, res) => {
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
  .catch(err => {console.log('merged features err')})
});

app.get('/:id/avgRating', (req, res) => {
  axios({
    method: 'get',
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/meta?product_id=' + req.query.id,
    params: {
      id: req.query.id
    },
    headers: {
      'Authorization': `${config.API_KEY}`
    }
  })
  .then(data => {
    var ratings = data.data.ratings;
    var avgRating = (((1 * ratings['1']) + (2 * ratings['2']) + (3 * ratings['3']) + (4 * ratings['4']) + (5 * ratings['5'])) / ((ratings['1'] *1) + (ratings['2'] *1) + (ratings['3'] *1) + (ratings['4'] *1) + (ratings['5'] *1)));
    res.send([Math.floor(avgRating / 0.5) * 0.5])
  })
  .catch(err => {'avgRating error'})
})