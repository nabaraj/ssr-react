import express from 'express'
import path from 'path'
import template from './src/template'
import ssr from './src/server'
import data from './assets/data.json'
import axios from "axios"

const app = express()

// Serving static files
app.use('/assets', express.static(path.resolve(__dirname, 'assets')));
app.use('/media', express.static(path.resolve(__dirname, 'media')));

// hide powered by express
app.disable('x-powered-by');
// start the server
app.listen(process.env.PORT || 3000);

let initialState = {
  isFetching: false,
  apps: data,
  currentPage: 1
}

// server rendered home page
app.get('/', (req, res) => {
  console.log("##### ", req.query.page);
  let pageNo = req.query.page;
  axios.get(`https://hn.algolia.com/api/v1/search_by_date?page=${pageNo}`).then(result => {
    // console.log(result.data.hits);
    const hits = result.data.hits;
    initialState.apps = hits;
    initialState.currentPage = result.data.page;
    const { preloadedState, content } = ssr(initialState)
    const response = template("Server Rendered Page", preloadedState, content)
    res.setHeader('Cache-Control', 'assets, max-age=604800')
    res.send(response);
  })
});

// Pure client side rendered page
app.get('/client', (req, res) => {
  let response = template('Client Side Rendered page')
  res.setHeader('Cache-Control', 'assets, max-age=604800')
  res.send(response)
});
