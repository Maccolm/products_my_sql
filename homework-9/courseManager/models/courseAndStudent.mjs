import mongoose from 'mongoose'
const { Schema } = mongoose

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
		required: true
	},
	age: {
		type: Number,
		required: true
	},
	averageScore: {
		type: Number,
		required: true
	}
})

const seminarSchema = new Schema({
	topic: { type: String, required: true},
	responsibleStudent: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
	duration: Number
})

const Student = mongoose.model('Student', studentSchema)
const Course = mongoose.model('Course', courseSchema)

export { Student, Course };