import { Student } from "./courseAndStudent.mjs"
import MongooseCRUDManager from "./MongooseCRUDManager.mjs"

class StudentDBService extends MongooseCRUDManager {
	static async create(studentData) {
		try {
			const student = new Student(studentData)
			const savedStudent = await student.save()
			return savedStudent
		} catch (err) {
			console.error('Error creating student', err);
			return null
		}
	}
	static async getList(filters) {
		try {
			const res = await super.getList(filters, null, ['type'])
			return res
		} catch (error) {
			return []
		}
	}
	static async getById(id) {
		try {
			const student = await Student.findById(id)
			return student
		} catch (error) {
			console.error('Error get student by id', error)
			return null
		}
	}
	static async updateById(id, updateData) {
		try {
			const updatedStudent = await Student.findByIdAndUpdate(id, updateData, {
				new: true,
			})
			return updatedStudent
		} catch (error) {
			console.error('error updating student', error)
			return null
		}
	}
}
export default new StudentDBService(Student)