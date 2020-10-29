const inquirer = require('inquirer');
const questions = [
	{
		type: 'input',
		name: 'displayName',
		message: 'Admin Display Name',
	},
	{
		type: 'input',
		name: 'email',
		message:
			'Admin Email Address (Please use Custom Email Address eg. admin@store.com)',
	},
	{
		type: 'input',
		name: 'phoneNumber',
		message: 'Admin Phone Number',
	},
	{
		type: 'password',
		name: 'password',
		message: 'Admin Password',
	},
];

const prompt = inquirer.createPromptModule();

module.exports = {
	prompt,
	questions,
};
