const faunadb = require('faunadb')

const faunaClient = new faunadb.Client({ secret: process.env.FAUNADB_SERVER_SECRET })

const q = faunadb.query

const handler = async (event) => {
  try {
    const { email, newScore } = JSON.parse(event.body);
    console.log(email, newScore);
    faunaClient.query(
      q.Create(
        q.Collection("players"),
        {
          data: {
            email,
            high_score: 0
          }
        }
      )
    )
    return {
      statusCode: 200,
      body: JSON.stringify(req.data),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
