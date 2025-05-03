const Meal = require('../models/Meal')
const fs = require('fs')

const getAllMeals = async (req, res) => {
    try {
        const meals = await Meal.find()
        res.json(meals)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

const getMealById = async (req, res) => {
    try {
        const meal = await Meal.findById(req.params.id)
        if (!meal) return res.status(404).json({message: 'Meal not found'})
        res.json(meal)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

const createMeal = async (req, res) => {
    try {
        const meal = new Meal({
            name: req.body.name,
            description: req.body.description,
            date: req.body.date,
            price: req.body.price,
            image: req.file ? `uploads/${req.file.filename}` : null,
        })

        const newMeal = await meal.save()
        res.status(201).json(newMeal)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
}

const updateMeal = async (req, res) => {
    try {
        const meal = await Meal.findById(req.params.id)
        if (!meal) return res.status(404).json({message: 'Meal not found'})

        meal.name = req.body.name || meal.name
        meal.description = req.body.description || meal.description
        meal.date = req.body.date || meal.date
        meal.price = req.body.price || meal.price
        if (req.file) {
            if (meal.image && fs.existsSync(`./${meal.image}`)) {
                fs.unlinkSync(`./${meal.image}`)
            }
            meal.image = `uploads/${req.file.filename}`
        }
        const updatedMeal = await meal.save()
        res.json(updatedMeal)
    } catch (err) {
        console.log(err)
        res.status(400).json({message: err.message})
    }
}

const deleteMeal = async (req, res) => {
    try {
        const meal = await Meal.findById(req.params.id)
        console.log(meal)
        if (!meal) return res.status(404).json({message: 'Meal not found'})

        if (meal.image && fs.existsSync(`./${meal.image}`)) {
            fs.unlinkSync(`./${meal.image}`)
        }

        await meal.deleteOne()
        res.json({message: 'Meal deleted'})
    } catch (err) {
        console.log(err)
        res.status(500).json({message: err.message})
    }
}

module.exports = {
    getAllMeals,
    getMealById,
    createMeal,
    updateMeal,
    deleteMeal,
}
