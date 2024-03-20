import { DOMBuilder } from "./JSModules/dom_builder.js"
import { Helper } from "./JSModules/helper.js"
import { Question } from "./quiz.js"
import { Quiz } from "./quiz.js"

const builder = new DOMBuilder()
const helper = new Helper()
const quiz = new Quiz()

// --------------------------------------------------------
// Questions
/*
quiz.addQuestion(new Question("", {
	"": false,
	"": false,
	"": false,
	"": false
}))
*/

quiz.addQuestion(new Question("What does “www” stand for in a website browser?", {
	"World Wide Web": true,
	"Warm Winter Wishses": false,
	"World Wide Waiting": false,
	"World War Wan": false
}))

quiz.addQuestion(new Question("How long is an Olympic swimming pool (in meters)?", {
	"200": false,
	"50": true,
	"25": false,
	"100": false
}))

quiz.addQuestion(new Question("Which country do cities of Perth, Adelade & Brisbane belong to?", {
	"Austrialia": true,
	"Germany": false,
	"Canada": false,
	"United Kingdom": false
}))

quiz.addQuestion(new Question("What geometric shape is generally used for stop signs?", {
	"Nanogon": false,
	"Decagon": false,
	"Octagon": true,
	"Hexagon": false
}))

/** @type {Array} questions in quiz */
const questions = quiz.getQuestions()

// --------------------------------------------------------
/**
 * Adds the question and options to the form
 * @param {Question} question The question
 */
function loadQuestion(question)
{
	// sets up the asked question
	const questionHeader = document.querySelector("#question")

	if (!questionHeader) return false

	questionHeader.innerHTML = `${quiz.getQuestionNumber(question)}) `
	questionHeader.innerHTML += question.getQuestion()

	// sets up the options
	/** @type {object} options object */
	const optionsObj = question.getOptions()

	/** @type {Array} keys to the options object */
	const keysArray = Object.keys(optionsObj)

	// creates each option to be displayed
	for (let i = 0; i < keysArray.length; i++)
	{
		builder.start(document.querySelector("#options"))
		{
			builder.startElement("div")
			{
				builder.addClass("option_div")

				// radio button
				builder.startElement("input")
				{
					builder.setAttribute("type", "radio")
					builder.setAttribute("id", String(i))
					builder.setAttribute("value", keysArray[i])
					builder.setAttribute("name", "options")
				}
				builder.endElement()

				// label
				builder.startElement("label")
				{
					builder.setAttribute("for", String(i))
					builder.setProperty("innerHTML", keysArray[i])
				}
				builder.endElement()
			}
			builder.endElement()
		}
		builder.end()
	}
}

/**
 * Removes all the options from the question
 */
function clearOptions()
{
	const divs = document.querySelectorAll(".option_div")

	if (!divs) return

	for (const div of divs)
		div.remove()
}

/**
 *
 * @param {object} radios The group of radios to check
 * @returns {boolean} true if a radio has been checked. false otherwise
 */
function isAnswered(radios)
{
	for (const radio of radios)
	{
		if (radio.checked)
			return true
	}
	return false
}

/**
 * Submits the answer to the current question
 *
 * Checks the correctness of the answer and loads the next question
 * @param {Question} question
 */
const submitAnswer = (question) =>
{
	const radios = document.querySelectorAll("#form input")

	if (!radios) return

	// forces the user to select an answer. Otherwise, the next question will not load
		if (!isAnswered(radios))
		{
			alert("Please select an option")
			return
		}

	// gets the selected option and increments score if selected option is correct
		for (const radio of radios)
		{
			if (radio.checked)
			{
				const selectedAnswer = radio.value

				if (question.testAnswer(selectedAnswer))
					quiz.incrementScore()
			}
		}

	clearOptions()

	// loads the next question if there are still questions. otherwise, displays the final score
		const questionNum = quiz.getQuestionNumber(question)

		if (questionNum == questions.length)
		{
			alert(`You scored ${quiz.getScore()}/${questions.length} or ${(quiz.getScore() / questions.length * 100).toFixed(2)}%`)
			window.location.reload()
		}

		else
		{
			loadQuestion(questions[questionNum])
		}
}

/////////////////////////////////////////////////////
helper.hookEvent(window, "load", false, () =>
{
	loadQuestion(questions[0])

	const form = document.querySelector("#form")

	if (!form) return

	form.onsubmit = (event) =>
	{
		if (!event || !event.target) return

		const questionElement = event.target.childNodes[1]

		if (questionElement.id != "question") return

		// gets the question number
			const questionNum = questionElement.innerHTML.substring(0, questionElement.innerHTML.indexOf(")"))

			if (!questionNum) return

		// gets the question object using the question number
			const questionObj = quiz.getQuestionObject(questionNum)

		submitAnswer(questionObj)

		return false
	}
})