// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const faunadb = require('faunadb')

const faunaClient = new faunadb.Client({ secret: process.env.FAUNADB_SERVER_SECRET })

const handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 500, body: 'GET OUTTA HERE!' }
  }

  try {
    // const req = await faunadb.query(q.Map(q.Paginate(q.Match(q.Index("count")))))
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Helloooo you` }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
