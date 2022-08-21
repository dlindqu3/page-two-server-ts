import { RequestHandler } from 'express'; 
require('dotenv').config();
import axios from 'axios'; 
import Bestseller, { BestsellerInt } from '../models/Bestsellers'; 
import { Types } from 'mongoose';

interface listsResponse {
  status: string,
  copyright: string, 
  num_results: number, 
  results: { list_name_encoded: String }[]
}

interface book {
  rank: number, 
  title: string, 
  author: string
}

interface listByCategory {
  num_results: number, 
  results: { 
    books: book[] }
}


// RequestHandler simplifies type annotation, assumes first 3 args are req, res, next
// get list names for bestsellers 
export const getBestsellerLists: RequestHandler = async (req, res, next) => {
  let baseUrl = 'https://api.nytimes.com/svc/books/v3/lists/names.json?api-key='
  let nytKey = process.env.apiKey
  try {
    await axios.get(baseUrl + nytKey)
      .then(response => {
        const lists = response.data as listsResponse; 
        const firstListName = lists.results[0].list_name_encoded
        res.status(200).send({ firstList: firstListName, AllLists: lists })
      })
  } catch (error){
    res.status(500).send({error})
  }
}; 

// get current bestseller lists by list/category name
export const getBestsellersByCategory: RequestHandler = async(req, res, next) => {
  let url = `https://api.nytimes.com/svc/books/v3/lists/current/${req.params.category}.json?api-key=${process.env.apiKey}`
  try {
    await axios.get(url)
      .then(response => {
        const items = response.data as listByCategory; 
        let firstBook = items.results.books[0].title
        res.status(200).send({ firstBookTitle: firstBook, bestsellerItems: items})
      })
  } catch (error){
    res.status(500).send({error})
  }
}

// CRUD of bestseller objects in db 

let testObj: BestsellerInt = {
  "title": "Thud!", 
  "author": "Terry Pratchett", 
  "list": "combined-print-and-e-book-fiction" 
}

// create 
export const createBestseller: RequestHandler = async (req, res, next) => {

  let newObj: BestsellerInt = {
    title: req.body.title,
    author: req.body.author, 
    list: req.body.list
  }

  try {
    const bestseller = await Bestseller.create(newObj);
    res.status(200).json(bestseller);
    console.log("item added to db");
  } catch (error) {
    res.status(400).send({error})
  }
}

// read all 
export const getAllBestsellers: RequestHandler = async(req, res, next) => {
  try{
    const bestsellers = await Bestseller.find({}); 
    res.status(200).json(bestsellers)
  } catch (error) {
    res.status(400).send({error})
  }
}

// read, given owner _id 
// pass for now 

// update 
// can add "notes" with an update
export const updateBestseller: RequestHandler = async(req, res, next) => {
  let id = req.params.id; 
  if(!Types.ObjectId.isValid(id)){
    return res.status(404).json({error: 'No such item in database'})
  }
  const bestseller = await Bestseller.findOneAndUpdate({_id: id}, {
    ...req.body
  })
  if(!bestseller){
    return res.status(400).json({error: 'No such item in database'})
  }
  res.status(200).json(bestseller)
}

// delete 
export const deleteBestseller: RequestHandler = async (req, res, next) => {
  let id = req.params.id; 
  if(!Types.ObjectId.isValid(id)){
    return res.status(404).json({error: 'No such item in database'})
  }
  const bestseller = await Bestseller.findOneAndDelete({_id: id})
  if (!bestseller){
    return res.status(400).json({error: 'No such item in database'})
  }
  res.status(200).json(bestseller)
}


// available bestseller/list categories, will add as a dropdown select on frontend: 
const bookCategories = [
  'select',
  "combined-print-and-e-book-fiction",
  "combined-print-and-e-book-nonfiction",
  "hardcover-fiction",
  "hardcover-nonfiction",
  "trade-fiction-paperback",
  "paperback-nonfiction", 
  "advice-how-to-and-miscellaneous",
  "childrens-middle-grade-hardcover",
  "picture-books", 
  "series-books",
  "young-adult-hardcover",
  "audio-fiction",
  "audio-nonfiction",
  "business-books",
  "graphic-books-and-manga",
  "mass-market-monthly",
  "middle-grade-paperback-monthly",
  "young-adult-paperback-monthly"
]