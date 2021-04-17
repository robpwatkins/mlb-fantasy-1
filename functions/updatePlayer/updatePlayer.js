const faunadb = require('faunadb')

const faunaClient = new faunadb.Client({ secret: process.env.FAUNADB_SERVER_SECRET })

const q = faunadb.query

const handler = async (event) => {
  try {
    const { playerToUpdate, newData } = JSON.parse(event.body);
    const playerId = playerToUpdate.ref['@ref'].id;
    const req = await faunaClient.query(
      q.Update(
        q.Ref(`classes/players/${playerId}`), { data }
      )
    )
    // return {
    //   statusCode: 200,
    //   body: JSON.stringify({ message: `Hello ${subject}` }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
