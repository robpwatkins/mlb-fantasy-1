const faunadb = require('faunadb')

const faunaClient = new faunadb.Client({ secret: process.env.FAUNADB_SERVER_SECRET })

const q = faunadb.query

const handler = async (event) => {
  try {
    const { email, newScore } = JSON.stringify(event.body);
    console.log(email, newScore);
    // faunaClient.query(
    //   q.Create(
    //     q.Collection("players"),
    //     {
    //       data: {
    //         email: email,
    //         high_score: newScore
    //       }
    //     }
    //   )
    // )
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Hello ${subject}` }),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
