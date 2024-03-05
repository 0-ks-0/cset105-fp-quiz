import { Helper } from "./JSModules/helper.js"

export class Question
{
	/**
	 *
	 * @param {string} display The question to be displayed
	 * @param {Object} options The options to the question
	 */
	constructor(display, options)
	{
		Helper.assignToObject(this)

		this.question = display
		this.options = options
	}
	/**
	 *
	 * @returns {string} The question
	 */
	getQuestion()
	{
		return this.question
	}

	/**
	 *
	 * @returns {Object} The options
	 */
	getOptions()
	{
		return this.options
	}

	/**
	 * Checks if the selected option is correct or not
	 * @param {String} answer The selected option
	 * @returns {Boolean} true if the selected option is correct, false otherwise
	 */
	testAnswer(answer)
	{
		return this.getHelper().getBoolean(this.getOptions()[answer])
	}
}

export class Quiz
{
	constructor()
	{
		Helper.assignToObject(this)

		this.questions = []
		this.shuffledQuestions = null
		this.score = 0
	}


	/*
	* Getters
	*/


	/**
	 * Gets the list of questions
	 * @param {boolean} [isShuffled=false] Whether to return a shuffled order of questions or not. false by default
	 * @returns {Array} The original order of questions if isShuffled is false or a shuffled order does not exist. Otherwise the shuffled order
	 */
	getQuestions(isShuffled = false)
	{
		if (!isShuffled)
			return this.questions

		if (!this.shuffledQuestions)
			return this.questions

		return this.shuffledQuestions
	}


	/**
	 *
	 * @returns {number} The score
	 */
	getScore()
	{
		return this.score
	}

	/**
	 *
	 * @param {string} question The question
	 * @returns {number} The question number
	 */
	getQuestionNumber(question)
	{
		return this.questions.indexOf(question) + 1
	}


	/*
	* Setters
	*/

	/**
	 * Adds the question to the quiz
	 * @param {Question} question The question to be added
	 */
	addQuestion(question)
	{
		if (!question) return

		this.questions.push(question)
	}

	/**
	 * Increments the score by 1
	 */
	incrementScore()
	{
		this.score++
	}

	/**
	 * Shuffles the order of questions
	 */
	shuffle()
	{
		this.shuffledQuestions = this.getHelper().shuffleArray(this.questions)
	}
}