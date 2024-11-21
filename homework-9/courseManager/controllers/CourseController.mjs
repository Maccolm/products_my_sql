import CourseDBService from "../models/CourseDBService.mjs"
import StudentDBService from '../models/StudentDBService.mjs'
import { validationResult } from 'express-validator';


class CourseController {
	static getFields(students) {
		return [
			{ name: 'title', type: 'text', required: true, label: 'Title' },
			{ name: 'duration', type: 'number', required: true, label: 'Duration (hours)' },
			{ 
				name: 'students', 
				type: 'select', 
				multiple: true,
				options: students.map(student => ({
					id: student._id,
					name: `${student.name}`
				})), 
				label: 'Select Students' 
			},
			{
				name: 'seminars',
				type: 'dynamic',
				label: 'Seminars',
				fields: [
					{
						name: 'topic',
						type: 'text',
						label: 'Seminar Topic',
					},
					{ name: 'responsibleStudent',
						type: 'select',
						label: 'Responsible Student',
						options: students.map(student => ({
							id: student._id,
							name: `${student.name}`,
						})),
					 },
					 { name: 'duration',  type: 'number', label: 'Lecture Duration', required: true},
				]
			}
		]
	}
	static async getList(req, res) {
		try {
			const filters = {}
			for (const key in req.query) {
				if(req.query[key]) filters[key] = req.query[key]
			}
			const courses = await CourseDBService.getList(filters, null, ['students', 'seminars'])

			return res.render('general/generalList', {
				pageTitle: 'Courses',
				headerTitle: 'List of Courses',
				fields: { title: 'Title', duration: 'Duration', students: 'Students' , seminars: 'Seminars' },
				data: courses.map(course => ({
					...course,
					students: course.students.map(student => student.name).join(', '),
					seminars: course.seminars.map(seminar => `${seminar.topic} (Duration: ${seminar.duration} hours, ${seminar.responsibleStudent?.name})`).join(', ')
				})),
				addNewRoute: 'courses/register',
				addNewStudent: 'students/register',
				editLinkBase: '/courses/register',
				deleteRoute: '/courses',
				message: courses && courses.length === 0 ? 'List is empty, create a course' : null
			})
		} catch (err) {
			console.error(err)
			res.status(500).json({ error: err.message })
		}
	}

	static async registerForm(req, res) {
		try {
			const id = req.params.id
			let courseItem = {}
			if (id) {
				courseItem = await CourseDBService.getById(id, ['students', 'seminars.responsibleStudent'])
			} 
			const students = await StudentDBService.getList()
			res.render('general/generalEditForm', {
				pageTitle: 'Course Form',
				headerTitle: id ? 'Edit Course' : 'Create Course',
				fields: CourseController.getFields(students),
				initialValues: courseItem,
				errors: [],
				submitUrl: '/courses/register' + (id ? `/${id}` : ''),
				redirectUrl: '/courses',
			})
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}

	static async register(req, res) {
		const errors = validationResult(req)
		const data = req.body
		const isEdit = Boolean(req.params.id)
		const submitUrl = `/courses/register${isEdit ? `/${req.params.id}` : ''}`
		if(!errors.isEmpty()) {
			if (req.params.id) data.id = req.params.id
			return  res.status(400).render('general/generalEditForm', {
				pageTitle: 'Course Form',
				headerTitle: req.params.id ? 'Edit course' : 'Create course',
				fields: CourseController.getFields(students),
				initialValues: data,
				errors: errors.array(),
				submitUrl: '/courses/register' + (req.params.id ? `/${req.params.id}` : ''),
				redirectUrl: '/courses',
			})
		}
		try {
			const { title, duration, students } = req.body
			const seminars = []
			Object.keys(req.body).forEach(key => {
				if(key.startsWith('seminars[') && key.endsWith(']')) {
					const match = key.match(/seminars\[(\d+)]\[(\w+)]/)
					if (!match) return

					const [_, index, fieldName] = match
					const seminarIndex = parseInt(index, 10)
					if(!seminars[seminarIndex]) {
						seminars[seminarIndex] = {}
					}
					seminars[seminarIndex][fieldName] = req.body[key]
				}
			})
			const filteredSeminars = seminars.flat().filter(seminar => seminar && Object.keys(seminar).length > 0)
			
			const dataObj = { title, duration, students, seminars: filteredSeminars }
			if (req.params.id) {
				await CourseDBService.update(req.params.id, dataObj)
			} else {
				await CourseDBService.create(dataObj)
			}
			res.redirect('/courses')
		} catch (err) {
			const { students } = req.body
			res.status(500).render('general/generalEditForm', {
				pageTitle: 'Course Form',
				headerTitle: req.params.id ? 'Edit Course' : 'Create Course',
				fields: CourseController.getFields(students),
				initialValues: data,
				errors: [{ msg: err.message }],
				submitUrl: '/courses/register' + (req.params.id ? `/${req.params.id}` : ''),
				redirectUrl: '/courses',
			})
		}
	}

	static async delete(req, res) {
		try {
			const { id } = req.params;
			if (!ObjectId.isValid(id)) {
				 return res.status(400).json({ error: 'Invalid course ID' });
			}
			const course = await CourseDBService.getById(id);
			if (!course) {
				 return res.status(404).json({ error: 'Course not found' });
			}
			await CourseDBService.deleteById(req.body.id)
			res.status(200).json({ success: true })
		} catch (error) {
			res.status(500).json({ success: false, message: 'Failed to delete course' })
		}
	}
}
export default CourseController 