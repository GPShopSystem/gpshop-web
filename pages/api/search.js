import db from '../../libs/db'
import escape from 'sql-template-strings'

export default async function handler(req, res) {
  const {
    query: { limit = 15, q },
    method,
  } = req

  switch (method) {
    case 'GET':
      try {
        const products = await db.queryOpt(escape`
          SELECT product.*, category.title as catTitle, category.slug as catSlug,
          product.price as original_price, 
          product.price - (product.price * (product.discount/100)) AS price
          FROM product
          LEFT JOIN category ON product.category_id = category.id
          where product.title like ?  
          order by product.id desc
          limit ?`, [`%${q}%`, Number(limit)])
        if (!products || !q) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: products })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}