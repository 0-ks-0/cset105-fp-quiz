import { DOMBuilder } from "./JSModules/dom_builder.js"
import { Helper } from "./JSModules/helper.js"
import { Question } from "./quiz.js"
import { Quiz } from "./quiz.js"

const builder = new DOMBuilder()
const helper = new Helper()
const quiz = new Quiz()



/////////////////////////////////////////////////////
helper.hookEvent(window, "load", false, () =>
{
	builder.start()
	{
		// Form
		builder.startElement("form")
		{
			builder.setAttribute("id", "form")
			builder.setAttribute("class", "glassmorphism")
			builder.setAttribute("onsubmit", "return false")


			// Question
			builder.startElement("h3")
			{
				builder.setAttribute("id", "question")
				builder.setProperty("innerHTML", "1)")
				builder.setAttribute("class", "glassmorphism")

			}
			builder.endElement()

			// Options
			builder.startElement("div")
			{
				builder.setAttribute("id", "options")
				builder.setAttribute("class", "glassmorphism")

			}
			builder.endElement()

			// Submit button
			builder.startElement("input")
			{
				builder.setAttribute("type", "submit")
				builder.setAttribute("id", "submit_btn")
				builder.setAttribute("class", "glassmorphism")
			}
			builder.endElement()
		}
		builder.endElement()
	}
	builder.end()
})