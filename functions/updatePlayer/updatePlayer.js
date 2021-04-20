const faunadb = require('faunadb')

const faunaClient = new faunadb.Client({ secret: process.env.FAUNADB_SERVER_SECRET })

const q = faunadb.query

const handler = async (event) => {
  try {
    const { currentPlayer, highScore } = JSON.parse(event.body);
    const playerId = currentPlayer.ref['@ref'].id;
    faunaClient.query(
      q.Update(
        q.Ref(q.Collection('players'), playerId),
          { data: { high_score: highScore } }
      )
    )
    return { statusCode: 200 };
  } catch (error) {
    console.log(error);
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
