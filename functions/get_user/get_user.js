const faunadb = require('faunadb')

const faunaClient = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET,
  domain: 'db.us.fauna.com',
  scheme: 'https'
});

const { Map, Paginate, Match, Index, Lambda, Get, Var } = faunadb.query;

const handler = async (event) => {
  try {
    const { nickname } = JSON.parse(event.body);
    const req = await faunaClient.query(
      Map(
        Paginate(Match(Index("users_by_nickname"), nickname)),
        Lambda("X", Get(Var("X")))
      )
    );
    console.log('req: ', req);
    return { statusCode: 200, body: JSON.stringify(req.data) }
  } catch (error) {
    console.log('error: ', error.message);
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) }
  }
}

module.exports = { handler }