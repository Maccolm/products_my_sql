import StudentDBService from "../models/StudentDBService.mjs"
import { validationResult } from 'express-validator';


class StudentController {
	static async getList(req, res) {
		try {
			const students = await StudentDBService.getList()
			res.render('students/studentsList', { 
				pageTitle: 'Students', 
				students,
				addNewStudent: 'students/register',
				message: students && students.length === 0 ? 'List is empty, add a new student' : null
			 })
		} catch (err) {
			res.status(500).send('Error to get students ' + err.message)
		}
	}
	static async registerForm(req, res) {
		try {
			const student = req.params.id ? await StudentDBService.getById(req.params.id) : {}
			res.render('general/generalEditForm', {
				pageTitle: 'Student Form',
				headerTitle: req.params.id ? 'Edit Student' : 'Add Student', student,
				fields: [
					{ name: 'name', type: 'text', required: true, label: 'Name' },
					{ name: 'age', type: 'number', required: true, label: 'Age' },
					{ name: 'averageScore', type: 'number', required: true, label: 'Average Score' },
				],
				initialValues: student,
				submitUrl: '/students/register' + (req.params.id ? `/${req.params.id}` : ''),
				redirectUrl:'/students',
				errors: []
			})
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}
	static async register(req, res) {
		const errors = validationResult(req)
		const data = req.body
		if(!errors.isEmpty()) {
			if (req.params.id) data.id = req.params.id
			return res.status(400).render('general/generalEditForm', {
				pageTitle: 'Student Form',
				headerTitle: req.params.id ? 'Edit Student' : 'Add Student', student,
				fields: [
					{ name: 'name', type: 'text', required: true, label: 'Name' },
					{ name: 'age', type: 'number', required: true, label: 'Age' },
					{ name: 'averageScore', type: 'number', required: true, label: 'Average Score' },
				],
				initialValues: student,
				submitUrl: '/students/register' + (req.params.id ? `/${req.params.id}` : ''),
				redirectUrl:'/students',
			})
		}
		try {
			const { name, age, averageScore } = req.body
			const dataObj = { name, age, averageScore }
			if (req.params.id) {
				await StudentDBService.update(req.params.id, dataObj)
			} else {
				await StudentDBService.create(dataObj)
			}
			res.redirect('/students')
		} catch (err) {
			res.status(400).render('general/generalEditForm', {
				pageTitle: 'Student Form',
				headerTitle: req.params.id ? 'Edit Student' : 'Add Student', student,
				fields: [
					{ name: 'name', type: 'text', required: true, label: 'Name' },
					{ name: 'age', type: 'number', required: true, label: 'Age' },
					{ name: 'averageScore', type: 'number', required: true, label: 'Average Score' },
				],
				initialValues: student,
				submitUrl: '/students/register' + (req.params.id ? `/${req.params.id}` : ''),
				redirectUrl:'/students',
			})
		}
	}
	static async delete(req, res) {
		try {
			await StudentDBService.deleteById(req.params.id)
			res.json({ success: true })
		} catch (error) {
			res.status(500).json({ success: false, message: 'Failed to delete student' })
		}
	}
}
export default StudentController