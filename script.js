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
	/** @type {Object} options object */
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

/////////////////////////////////////////////////////
helper.hookEvent(window, "load", false, () =>
{
	loadQuestion(questions[0])
})