import Product from './Product.mjs'
import mongoose from 'mongoose' 
 
class ProductsDBService { 
  static async getList() { 
    try { 
      const exists = await Product.checkCollectionExists 
      if (exists) { 
        const data = await mongoose.model(collectionName).find().exec() 
        return data 
      } 
 
      return (await Product.find({})) ?? [] 
    } catch (error) { 
      return [] 
    } 
  } 
 
  static async create(data) { 
	try{
		const product = new Product(data) 
		return await product.save() 
	} catch (error) {
		return error
	}
  } 
 
  static async getById(id) { 
	try{
		return await Product.findById(id) 
	} catch (error) {
		return error
	}
  } 
 
  static async update(id, data) { 
	try {
		return await Product.findByIdAndUpdate(id, data, { 
		  new: true, 
		  runValidators: true, 
		}) 
	} catch (error) {
		return error
	}
  } 
 
  static async deleteById(id) { 
	try{
		return await Product.findByIdAndDelete(id) 
	} catch (error) {
		console.error('couldn\'t delete', error)
	}
  } 
} 
 
export default ProductsDBService 