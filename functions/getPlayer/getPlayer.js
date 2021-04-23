const faunadb = require('faunadb')

const faunaClient = new faunadb.Client({ secret: process.env.FAUNADB_SERVER_SECRET })

const q = faunadb.query

const handler = async (event) => {
  try {
    const { nickname } = JSON.parse(event.body);
    const req = await faunaClient.query(
      q.Map(
        q.Paginate(
          q.Match(q.Index("player_by_nickname"), nickname)
          ),
          q.Lambda("X", q.Get(q.Var("X")))))
    return { statusCode: 200, body: JSON.stringify(req.data) }
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) }
  }
}

module.exports = { handler }