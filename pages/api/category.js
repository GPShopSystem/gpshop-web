import db from '../../libs/db'
import escape from 'sql-template-strings'

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  switch (method) {
    case 'GET':
      try {
        const categories = await db.query(escape`
          SELECT *
          FROM category
          ORDER BY id
        `)

        if (!categories) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: categories })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}