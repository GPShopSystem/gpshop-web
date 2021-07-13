import db from '../../../libs/db'
import escape from 'sql-template-strings'

export default async function handler(req, res) {
  const {
    query: { category },
    method,
  } = req

  switch (method) {
    case 'GET':
      try {
        let products = null

        if(category){
          const categoryData = await db.query(escape`
            SELECT category.id
            FROM category
            where category.slug = ${category}
          `)

          const getAllCategories = await db.query(escape`
            SELECT id
              FROM category
              WHERE FIND_IN_SET(ID, (
                SELECT GROUP_CONCAT(Level SEPARATOR ',') FROM (
                    SELECT @Ids := (
                        SELECT GROUP_CONCAT(ID SEPARATOR ',')
                        FROM category
                        WHERE FIND_IN_SET(parent_id, @Ids)
                    ) Level
                    FROM category
                    JOIN (SELECT @Ids := ${categoryData[0].id}) temp1
                ) temp2
            ))
          `)
          let catsChilds = [...getAllCategories.flatMap(e=> e.id), categoryData[0].id]

          products = await db.query(escape`
            SELECT product.*, category.title as catTitle, category.slug as catSlug,
            product.price as original_price, 
            product.price - (product.price * (product.discount/100)) AS price
            FROM product
            LEFT JOIN category ON product.category_id = category.id
            where product.category_id IN (${catsChilds}) 
            order by product.id desc
          `)
        } else {
          products = await db.query(escape`
            SELECT product.*, category.title as catTitle, category.slug as catSlug,
            product.price as original_price ,
            product.price - (product.price * (product.discount/100)) AS price
            FROM product
            LEFT JOIN category ON product.category_id = category.id
            order by product.id desc
          `)
        }

        if (!products) {
          return res.status(400).json({ success: false, data: [] })
        }
        res.status(200).json({ success: true, data: products })
      } catch (error) {
        res.status(400).json({ success: false, data: [] })
      }
      break

    case 'PUT' /* Edit a model by its ID */:
      
      break

    case 'DELETE' /* Delete a model by its ID */:
      
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}