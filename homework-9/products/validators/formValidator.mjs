class FormValidator {
	static formSchema = {
		username: {
			notEmpty: {
				errorMessage: "Title is required",
			},
			isLength: {
				options: { min: 3 },
				errorMessage: "Username must be at least 3 characters long",
			},
			trim: true,
			escape: true,
		},
		password: {
			notEmpty: {
				errorMessage: "Password is required",
			},
			isLength: {
				options: { min: 3 },
				errorMessage: "Password must be at least 3 characters long",
			},
			trim: true,
			escape: true,
		},
	}
}
export default FormValidator