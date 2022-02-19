import React, { useState, FC, useEffect } from 'react';
import './Question.css';
import {
	QuestionType,
	BackgroundsType,
	BackgroundKeyTypes,
	OptionGroupSelectionType,
	QuestionSelectionType,
	OptionGroupType
} from '../../types';
import OptionGroupList from '../OptionGroupList/OptionGroupList';

type PropTypes = QuestionType & {
	backgrounds?: BackgroundsType; // Custom background color
	selections: OptionGroupSelectionType[];
	index: number;
	onChange: (selections: QuestionSelectionType) => void;
};

const Question: FC<PropTypes> = props => {
	const [correctness, setCorrectness] = useState<BackgroundKeyTypes>('0-25%');
	const [isCorrect, setIsCorrect] = useState<boolean>(false);
	let { backgrounds } = props;

	// INITIALIZE THE BACKGROUND COLORS
	backgrounds = backgrounds || {
		'0-25%': 'linear-gradient(#f6b667, #e66c2e)',
		'25%-50%': 'linear-gradient(#F1B395, #EA846D)',
		'50%-75%': 'linear-gradient(#F1B395, #EA846D)',
		'75%-100%': 'linear-gradient(#76E0C2, #5BCBD8)'
	};

	/**
	 * UPDATE BACKGROUND AND STATUS MESSAGE ON OPTION CHANGE
	 */
	useEffect(() => {
		const { optionGroups, selections } = props;
		let totalCorrectSelections = 0;
		const noOptionGroups = optionGroups.length;

		for (let i = 0; i < selections.length; i++) {
			let optionGroup: OptionGroupType = optionGroups[i];
			if (selections[i].selectedOptionIndex === optionGroup.options.indexOf(optionGroup.answer)) totalCorrectSelections++;
		}

		setIsCorrect(totalCorrectSelections === noOptionGroups);
		setCorrectness(getCorrectnessBracket(totalCorrectSelections, noOptionGroups));
	}, [props]);

	/**
	 * HANDLE OPTION GROUP CHANGE
	 * When an option in an option group is changed.
	 * @param {OptionGroupSelectionType[]} newSelections - Option Selections
	 */
	const handleChange = (newSelections: OptionGroupSelectionType[]) => {
		props.onChange({ questionIndex: props.index, selections: newSelections });
	};

	/**
	 * UI
	 */
	return (
		<div className='Question'>
			<h3>{props.question}</h3>
			<OptionGroupList optionGroups={props.optionGroups} selections={props.selections} locked={isCorrect} onChange={handleChange} />
			<h4>The answer is {isCorrect ? 'correct!' : 'incorrect'}</h4>

			{/* Backdrops (used because normal CSS can't apply transition animation to linear gradient colors) */}
			<div className='backdrops'>
				<div style={{ background: backgrounds['0-25%'], opacity: correctness === '0-25%' ? 1 : 0 }} className='backdrop' />
				<div style={{ background: backgrounds['25%-50%'], opacity: correctness === '25%-50%' ? 1 : 0 }} className='backdrop' />
				<div style={{ background: backgrounds['50%-75%'], opacity: correctness === '50%-75%' ? 1 : 0 }} className='backdrop' />
				<div style={{ background: backgrounds['75%-100%'], opacity: correctness === '75%-100%' ? 1 : 0 }} className='backdrop' />
			</div>
		</div>
	);
};

export default Question;

/**
 * GET THE PERCENTAGE RANGE OF CORRECT ANSWERS
 *
 * @param {number} totalCorrect - Total Correct selections
 * @param {number} noOptions  - Total number of options
 * @returns {string} - Range
 */
const getCorrectnessBracket = (totalCorrect: number, noOptions: number): BackgroundKeyTypes => {
	let correctPercentage = (totalCorrect / noOptions) * 100;
	if (correctPercentage < 25) return '0-25%';
	if (correctPercentage < 50) return '25%-50%';
	if (correctPercentage < 75) return '50%-75%';
	return '75%-100%';
};
