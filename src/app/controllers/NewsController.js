class NewsController {
  // [GET] /news
  index(req, res) {
    res.send('news');
  }

  // [GET] /news/:slug
  show(req, res) {
    res.send('news details');
  }
}

module.exports = new NewsController();
