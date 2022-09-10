const faunadb = require('faunadb')

const faunaClient = new faunadb.Client({ secret: process.env.FAUNADB_SERVER_SECRET })

const { Create, Collection } = faunadb.query;

const handler = async (event) => {
  try {
    const { nickname } = JSON.parse(event.body);
    console.log('nickname: ', nickname);
    const req = await faunaClient.query(
      Create(Collection('users'), { data: { nickname } })
    );
    return {
      statusCode: 200,
      body: JSON.stringify(req),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
