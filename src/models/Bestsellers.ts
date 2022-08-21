import { Schema, model } from 'mongoose';

// the '?' means that owner, notes are optional fields 
export interface BestsellerInt {
  owner?: string,
  title: string, 
  author: string, 
  list: string, 
  notes?: string
}

// create schema 
export const BestsellerSchema = new Schema<BestsellerInt>({
  owner: {type: String, required: false }, 
  title: {type: String, required: true }, 
  author: {type: String, required: true }, 
  list: {type: String, required: true }, 
  notes: {type: String, required: false }
})

// this automatically builds a "Bestsellers" collection in the db that matches the BestsellerSchema
export default model<BestsellerInt>('Bestseller', BestsellerSchema)

// in DB, documents will have: 
  // _id (provided by mongoDB)
  // owner (not required)
  // title (required)
  // author (required)
  // list (required)
  // notes (not required)