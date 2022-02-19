import { FC, useState, useEffect } from 'react';
import { OptionGroupSelectionType, OptionGroupType, QuestionListType, QuestionType, QuestionSelectionType } from '../../types';
import Question from '../Question/Question';
import './QuestionList.css';

const QuestionList: FC<{ questions: QuestionListType }> = props => {
	const [questions, setQuestions] = useState<QuestionListType>([]);
	const [targetQuestion, setTargetQuestion] = useState<number>(0);
	const [selections, setSelections] = useState<QuestionSelectionType[]>([]);

	/**
	 * INITIALIZE AND RANDOMIZE QUESTIONS
	 */
	useEffect(() => {
		const newQuestions: QuestionListType = randomizeData(props.questions);
		setQuestions(newQuestions);
		initializeDefaultSelections(newQuestions);
	}, [props.questions]);

	/**
	 * INITIALIZE DEFAULT SELECTIONS
	 * All selections are stored in the parent component's state, for easy accessibility and debugging.
	 * @param newQuestions Questions - List of questions (passed as argument because setQuestions in the useEffect hook doesn't have callback)
	 */
	const initializeDefaultSelections = (newQuestions: QuestionListType) => {
		let newSelections: QuestionSelectionType[] = [];

		// Initialize default selections
		for (let i = 0; i < newQuestions.length; i++) {
			let optionSelections: OptionGroupSelectionType[] = [];
			for (let j = 0; j < newQuestions[i].optionGroups.length; j++) optionSelections.push({ optionGroupIndex: j, selectedOptionIndex: 0 });
			newSelections.push({ questionIndex: i, selections: optionSelections });
		}
		setSelections(newSelections);
	};

	/**
	 * UPDATE THE SELECTION OBJECT WHEN A QUESTION'S OPTION IS CHANGED
	 * @param {QuestionSelectionType} questionSelection - The modified question and its selections
	 */
	const handleChange = (questionSelection: QuestionSelectionType) => {
		let newSelections = selections;
		const position = newSelections.findIndex(item => item.questionIndex === questionSelection.questionIndex);
		newSelections[position].selections = questionSelection.selections;
		setSelections([...newSelections]);
	};

	/**
	 *
	 */
	const reset = () => {
		initializeDefaultSelections(questions);
		moveQuestion(0);
	};

	/**
	 * AUTO-SOLVE QUESTIONS
	 */
	const solve = () => {
		let newSelections: QuestionSelectionType[] = selections;

		// Loop through the questions and set the right selections
		for (let i = 0; i < questions.length; i++) {
			let question: QuestionType = questions[i];
			for (let j = 0; j < question.optionGroups.length; j++)
				newSelections[i].selections[j].selectedOptionIndex = question.optionGroups[j].options.indexOf(question.optionGroups[j].answer);
		}
		setSelections([...newSelections]);
		moveQuestion(0);
	};

	/**
	 * SWITCH QUESTION (LEFT OR RIGHT)
	 * @param {number} position - Position (left (-1) or right(1))
	 */
	const moveQuestion = (position: number) => {
		if (position < 0) return;
		if (position > questions.length - 1) return;
		setTargetQuestion(position);
		document.querySelector(`#question_${position}`)?.scrollIntoView({ behavior: 'smooth' });
	};

	/**
	 * UI
	 */
	return (
		<div className='QuestionList'>
			{/* OPTIONS */}
			<div className='options'>
				<button onClick={reset}>Reset</button>
				<button onClick={solve}>Solve</button>
			</div>

			{/* QUESTIONS */}
			<div className='questionSection'>
				<div className='questions'>
					{questions.map((item, index) => (
						<div key={index} className='questionWrapper' id={`question_${index}`}>
							<Question {...item} index={index} selections={selections[index].selections} onChange={handleChange} />
						</div>
					))}
				</div>
			</div>

			{/* NAVIGATION BUTTONS */}
			<div className='questionNavBar'>
				{targetQuestion !== 0 && (
					<div className='switchButton' onClick={() => moveQuestion(targetQuestion - 1)}>
						Previous
					</div>
				)}
				{targetQuestion !== 1 && (
					<div className='switchButton' onClick={() => moveQuestion(targetQuestion + 1)}>
						Next
					</div>
				)}
			</div>
		</div>
	);
};

export default QuestionList;

/**
 * RANDOMIZE THE QUESTIONS, OPTION GROUPS, AND OPTION POSITIONS
 * @param {QuestionListType} questions - Original Question list
 * @returns {QuestionListType} - Shuffled/Randomized Questions
 */
const randomizeData = (questions: QuestionListType): QuestionListType => {
	questions = shuffleArray(questions) as QuestionListType;
	for (let i = 0; i < questions.length; i++) {
		questions[i].optionGroups = shuffleOptionGroups(questions[i].optionGroups);
	}
	return questions;
};

/**
 * SHUFFLE THE OPTION GROUP AND OPTION POSITIONS
 * @param {OptionGroupType[]} optionGroups - The option groups
 * @returns {OptionGroupType[]} Option group
 */
const shuffleOptionGroups = (optionGroups: OptionGroupType[]): OptionGroupType[] => {
	let totalCorrectDefaultAnswers = 0;
	for (let j = 0; j < optionGroups.length; j++) {
		optionGroups[j].options = shuffleArray(optionGroups[j].options) as [string, string, string?];
		if (optionGroups[j].options[0] === optionGroups[j].answer) totalCorrectDefaultAnswers++;
	}

	// Making sure that all the options in position 0 aren't the correct answers
	if (totalCorrectDefaultAnswers === optionGroups.length) return shuffleOptionGroups(optionGroups);

	return shuffleArray(optionGroups);
};

/**
 * SHUFFLE ARRAY
 * @param {Array<any>} array - Array
 * @returns {Array<any>} - Shuffled Array
 */
const shuffleArray = (array: Array<any>): Array<any> => {
	let currentIndex = array.length;
	let newIndex;

	// While there remain elements to shuffle...
	while (currentIndex !== 0) {
		// Pick a remaining element...
		newIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[newIndex]] = [array[newIndex], array[currentIndex]];
	}

	return array;
};
