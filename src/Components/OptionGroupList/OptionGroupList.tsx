import React, { FC } from 'react';
import { OptionGroupSelectionType, OptionGroupType } from '../../types';
import OptionGroup from '../OptionGroup/OptionGroup';
import './OptionGroupList.css';

type PropTypes = {
	optionGroups: OptionGroupType[];
	onChange: (newSelections: OptionGroupSelectionType[]) => void;
	locked: boolean;
	selections: OptionGroupSelectionType[];
};

const OptionGroupList: FC<PropTypes> = props => {
	const { optionGroups, onChange, locked, selections } = props;

	/**
	 * HANDLE CHANGE OF OPTION GROUP
	 * @param {OptionGroupSelectionType} selection - The change made to an option group
	 */
	const handleChange = (selection: OptionGroupSelectionType) => {
		let newSelections = selections;
		const pos = selections.findIndex(item => item.optionGroupIndex === selection.optionGroupIndex);
		newSelections[pos].selectedOptionIndex = selection.selectedOptionIndex;
		onChange(newSelections);
	};

	/**
	 * UI
	 */
	return (
		<div className='OptionGroupList'>
			{optionGroups.map((item, index) => (
				<OptionGroup locked={locked} key={`og_${index}`} index={index} onChange={handleChange} selection={selections[index]} {...item} />
			))}
		</div>
	);
};

export default OptionGroupList;
