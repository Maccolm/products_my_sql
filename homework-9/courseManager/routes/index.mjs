import { Router } from 'express'
import { Course } from '../models/courseAndStudent.mjs'
const router = Router()
router.get('/', async (req, res) => {
	try {
		const courses = await Course.find()
		if(courses.length === 0) {
			res.render("general/generalList", {
				pageTitle: 'Courses',
				headerTitle: 'List of Courses',
				fields: { title: 'Title', duration: 'Duration' },
				data: courses,
				addNewRoute: 'courses/register',
				addNewStudent: 'students/register',
				editLinkBase: '/courses/register',
				deleteRoute: '/courses',
				message: courses && courses.length === 0 ? 'List is empty, create a course' : null
			 });
		  } else {
			 res.render("general/generalList", { courses, message: null });
		  }
		} catch (error) {
			res.status(500).send({ error: error.message })
		}
})
export default router