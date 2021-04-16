import faunadb from 'faunadb'

const client = new faunadb.Client({ secret: process.REACT_APP_FAUNADB_KEY });
const q = faunadb.query;

export { client, q }