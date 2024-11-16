import mongoose from 'mongoose'
const { Schema } = mongoose

const seminarSchema = new Schema({
	topic: { type: String, required: true},
	responsibleStudent: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
	duration: Number
})

const courseSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	duration: {
		type: Number,
		required: true
	},
	students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
	seminars: [seminarSchema]
})

const studentSchema = new Schema({
	name: {
		type: String,
		required: true,
		minlength: [3, 'Name must be at least 3 characters long'],
		maxlength: [50, 'Name must be at most 50 characters long'],
		trim: true,
	},
	age: {
		type: Number,
		required: [true, 'Age is required'],
		min: [18, 'Age must be at least 18'],
		max: [120, 'Age must be at most 120'],
		toInt: true,
	},
	averageScore: {
		type: Number,
		required: true
	}
})


const Student = mongoose.model('Student', studentSchema)
const Course = mongoose.model('Course', courseSchema)

export { Student, Course };