const Joi = require('joi')


const pattern =/^(?=.*[a-z])(?=.*[A-Z])(?=.+[0-9][0-9])(?=.*[!@#\$%\^&\*])(?=.{6,10})/




function validateUser(user)
{
	const JoiSchema = Joi.object({
	
		username: Joi.string()
				.min(5)
				.max(30)
				.required(),
					
		email: Joi.string()
			.email()
			.min(5)
			.max(50)
			.optional(),
			password: Joi.string()
			.regex(RegExp(pattern)) // you have to put it in this way and it will work :)
			.required()
			.min(8)
			.max(20),
		date_of_birth: Joi.date()
					.optional(),
		account_status: Joi.string()
						.valid('activated')
						.valid('unactivated')
						.optional(),
	}).options({ abortEarly: false });
	return JoiSchema.validate(user)
}

const user = {
	username: 'david',
	email: 'pritish@gmail.com',
    password:'David@13',
	date_of_birth: '2020-8-11',
	account_status: 'activated'
}
response = validateUser(user)

if(response.error)
{
	console.log(response.error.details)
}
else
{
	console.log("Validated Data")
}
