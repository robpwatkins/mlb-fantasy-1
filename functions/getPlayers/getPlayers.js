const faunadb = require('faunadb')

const faunaClient = new faunadb.Client({ secret: process.env.FAUNADB_SERVER_SECRET })

const q = faunadb.query

const handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 500, body: 'GET OUTTA HERE!' }
  }

  try {
    const req = await faunaClient.query(
      q.Map(
        q.Paginate(
          q.Match(
            q.Index("all_players"))), q.Lambda("X", q.Get(q.Var("X")))))
            console.log(JSON.stringify(req.data));
    return { statusCode: 200, body: JSON.stringify(req.data) }
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) }
  }
}

module.exports = { handler }