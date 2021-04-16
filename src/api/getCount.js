import { client, q } from '../config/db'

const getCount = client.query(
  q.Paginate(
    q.Match(
      q.Ref('indexes/all')
    )
  )
)