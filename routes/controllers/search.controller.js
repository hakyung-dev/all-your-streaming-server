const axios = require('axios');
const Genre = require('../../data/genre.json');

exports.getResult = async (req, res, next) => {
  try {
    const results = [];
    const movieInfo = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${
        process.env.TMDB_KEY
      }&query=${encodeURI(req.body.query)}&language=ko`
    );

    movieInfo.data.results.map((result) => {
      results.push({
        type: `movie`,
        ...result,
      });
    });

    const tvInfo = await axios.get(
      `https://api.themoviedb.org/3/search/tv?api_key=${
        process.env.TMDB_KEY
      }&query=${encodeURI(req.body.query)}&language=ko`
    );

    tvInfo.data.results.map((result) => {
      results.push({
        type: `tv`,
        ...result,
      });
    });

    res.status(200).json({
      result: results,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.getGenre = async (req, res, next) => {
  try {
    let genre = [];
    const { type, ids } = req.body;
    const genreData = Genre[type];
    ids.map((id) => {
      const string = genreData.filter((g) => g.id === id)[0];
      if (string) return genre.push(string.name);
    });
    res.status(200).json({
      result: genre,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
