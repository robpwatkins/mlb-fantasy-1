const faunadb = require('faunadb')

const faunaClient = new faunadb.Client({ secret: process.env.FAUNADB_SERVER_SECRET })

const { Map, Paginate, Match, Index, Lambda, Get, Var } = faunadb.query

const handler = async (event) => {
  try {
    const req = await faunaClient.query(
      Map(
        Paginate(
          Match(Index("all_players"))
          ),
          Lambda("X", Get(Var("X")))))
    return { statusCode: 200, body: JSON.stringify(req.data) }
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) }
  }
}

module.exports = { handler }