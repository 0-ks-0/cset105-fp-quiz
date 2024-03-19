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

// --------------------------------------------------------


/////////////////////////////////////////////////////
helper.hookEvent(window, "load", false, () =>
{

})