import QuestionList from './Components/QuestionList/QuestionList';
import { QuestionListType } from './types';

function App() {
	return <QuestionList questions={questions} />;
}

export default App;

/**
 * QUESTIONS
 */
const questions: QuestionListType = [
	{
		question: 'What are the ideal conditions inside an office?',
		optionGroups: [
			{ options: ['good pay', 'bad pay'], answer: 'good pay' },
			{ options: ['lots of meetings', 'less meetings'], answer: 'less meetings' },
			{ options: ['free coffee', 'expensive coffee'], answer: 'free coffee' }
		]
	},
	{
		question: 'Which are the best sports people & teams?',
		optionGroups: [
			{ options: ['Liverpool', 'chelsea', 'Man UTD'], answer: 'chelsea' },
			{ options: ['Serena Williams', 'Naomi Osaka'], answer: 'Naomi Osaka' }
		]
	}
];
