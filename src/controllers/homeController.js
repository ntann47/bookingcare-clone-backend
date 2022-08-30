import { request } from 'express'
import db from '../models/index.js'

import crudServices from '../services/crudServices.js'

const getHomePage = async (req, res) => {
    try{
    let data = await db.User.findAll()
    return res.render('homePage.ejs')  
    }catch(err){
        console.log(err)
    }
}
const getCRUD = async (req, res) => {
    try{
    return res.render('crud.ejs')  
    }catch(err){
        console.log(err)
    }
}
const postCRUD = async (req, res) => {
    const message =  await crudServices.createNewUser(req.body)
    return res.send(message)
}   
const displayCRUD = async (req, res) => {
    let data = await crudServices.getAllUsers()
    return res.render('displayUser.ejs',{
        data: data
    })
}

module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayCRUD: displayCRUD
}
