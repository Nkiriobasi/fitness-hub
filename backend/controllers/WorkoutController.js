const Workout = require('../models/WorkoutModel')
const mongoose = require('mongoose')

// get all works
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})

    res.status(200).json(workouts)
}


// get a single workout
const getWorkout = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid()){
        return res.status(400).json({error: 'No such workout'})
    }

    const workout = Workout.findById(id)

    if(!workout){
        return res.status(400).json({error: 'No such workout'})
    }

    res.status(200).json(workout)
}


// create a new workout
const createWorkout = async (req, res) => {
    const {title, reps, load} = req.body
    
    // add doc to db
    try {
        const workout = await Workout.create({title, reps, load})
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


// delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'No such workout'})
    }

    const workout = await Workout.findOneAndDelete({_id: id})

    if(!workout){
        return res.status(400).json({error: 'No such workout'})
    }

    res.status(200).json(workout)
}


// update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid()){
        return res.status(400).json({error: 'No such workout'})
    }

    const workout = Workout.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!workout){
        return res.status(400).json({error: 'No such workout'})
    }

    res.status(200).json(workout)
}

module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}
