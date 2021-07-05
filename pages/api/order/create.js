/* eslint-disable no-case-declarations */
/* eslint-disable consistent-return */
import { nanoid } from 'nanoid'
import db from '../../../libs/db'
import MailController from '../../../controllers/mail'
import AbortController  from  'node-abort-controller'; 
global.AbortController = AbortController;

export default async function handler(req, res) {
  const { method, body } = req

  const  findOrUpdate  =  async (table, identify, obj) => {
        let toReturn 
        const search = await db.queryOpt(`Select * from ${table} where ${identify} = ?`, [obj[identify]])
        if(search[0]) {
            toReturn = search[0]
            await db.queryOpt(`UPDATE ${table} SET ? WHERE id = ?`, [obj, toReturn.id])
        } else { 
            toReturn = await db.queryOpt(`INSERT INTO ${table} SET ?`, obj)
        }
        return toReturn
  }
  switch (method) {
    case 'POST':
      try {
        const data = JSON.parse(body)
        const order_code = nanoid(10);
        // insert client
        const clientObj = {
            name: data.name,
            last_name: data.last_name,
            type_doc: 1,
            num_doc: data.num_doc,
            phone: data.phone,
            email: data.email
        }
        const clientData = await findOrUpdate('client', 'num_doc', clientObj)
        
        // insert client_address
        const clientAddressObj = {
            id_client: clientData.id,
            departament: data.departament,
            province: data.province,
            district: data.district,
            address: data.address
        }
        const clientAddressData = await findOrUpdate('client_address', 'id_client', clientAddressObj)
        
        // insert order
        const orderObj = {
            id_client: clientData.id,
            id_client_address: clientAddressData.id,
            amount: data.total,
            code: order_code,
            status: 1
        }
        const orderData = await db.queryOpt('INSERT INTO `order` SET ?', orderObj)
        // inser detail order

        data.products.forEach( async (product) => {
            const orderDetailObj = {
                id_order: orderData.insertId,
                id_product: product.id,
                quantity: product.quantity,
                price_paid: product.price_paid,
                discount: product.discount,
                active_discount: product.active_discount
            }
            await db.queryOpt('INSERT INTO `order_detail` SET ?', orderDetailObj)
        });

        // To send Info
        const discounts = data.products.reduce( function(a, b){
            return a + ((b['original_price'] * b['quantity']) * (b['discount'] / 100));
          }, 0);
    
        const original = data.products.reduce( function(a, b){
            return a + (b['original_price'] * b['quantity']);
        }, 0);

        MailController.sendOrder(data.email, order_code, data.products, data.total, discounts, original)
        MailController.sendOrderAdmin("wjharil@gmail.com", order_code, data.products, data.total, discounts, original, {...clientObj, ...clientAddressObj})
        // Creo la orden
        return res.status(201).json({
          success: true,
          data: 'Orden creada satisfactoriamente.',
          step: 1,
        })
      } catch (error) {
          console.log(error)
        return res.status(400).json({
          success: false,
          message: 'Ocurrió un error al crear la orden'
        })
    }
    default:
      return res.status(400).json({ success: false })
  }
}