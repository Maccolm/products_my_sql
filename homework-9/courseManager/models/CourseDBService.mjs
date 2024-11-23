import { Course } from "./courseAndStudent.mjs"
import MongooseCRUDManager from "./MongooseCRUDManager.mjs"

class CourseDBService extends MongooseCRUDManager {
	static async create(courseData) {
		try {
			const course = new Course(courseData)
			const savedCourse = await course.save()
			return savedCourse
		} catch (err) {
			console.error('Error creating course', err);
			return null
		}
	}

	 async getList(filters) {
		try {
			const res = await super.getList(filters, null,
				[
					{
						fieldForPopulation: 'students',
						requiredFieldsFromTargetObject: 'name',
					},
					{
						fieldForPopulation: 'seminars.responsibleStudent',
						requiredFieldsFromTargetObject: 'name',
					}
				]
			)
			return res
		} catch (error) {
			console.error(error);
			return []
		}
	}

	static async getById(id) {
		try {
			const course = await Course.findById(id)
			return course
		} catch (error) {
			console.error('Error get course by id', error)
			return null
		}
	}
	static async updateById(id, updateData) {
		try {
			const updatedCourse = await Course.findByIdAndUpdate(id, updateData, {
				new: true,
			})
			return updatedCourse
		} catch (error) {
			console.error('error updating course', error)
			return null
		}
	}
	static async deleteById(id) {
		try {
		  const deletedCourse = await Course.findByIdAndDelete(id);
		  return deletedCourse;
		} catch (error) {
		  console.error("Error deleting course:", error);
		  return null;
		}
	 }
}
export default new CourseDBService(Course)