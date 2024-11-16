import { Student } from "./courseAndStudent.mjs"
import MongooseCRUDManager from "./MongooseCRUDManager.mjs"

class StudentDBService extends MongooseCRUDManager {
	async getList(filters) {
		try {
			const res = await super.getList(filters, null, ['type'])
			return res
		} catch (error) {
			return []
		}
	}
}
export default new StudentDBService(Student)