import React, { FC, useState, useEffect } from 'react';
import { OptionGroupSelectionType, OptionGroupType } from '../../types';
import './OptionGroup.css';

type PropTypes = OptionGroupType & {
	onChange: (newSelection: OptionGroupSelectionType) => void;
	selection: OptionGroupSelectionType;
	index: number;
	locked: boolean;
};

const OptionGroup: FC<PropTypes> = props => {
	const { options, onChange, index: optionGroupIndex, locked, selection } = props;

	/**
	 * HANDLE OPTION CHANGE
	 * When a single option group is changed.
	 * @param {number} index - Index of the selected value in the option group
	 */
	const handleSelect = (index: number) => {
		if (locked) return;
		onChange({ optionGroupIndex, selectedOptionIndex: index });
	};

	/**
	 * UI
	 */
	return (
		<div className={`OptionGroup ${locked && 'locked'}`}>
			{options.map((item, index) => (
				<Option key={item} item={item} index={index} selectedIndex={selection.selectedOptionIndex} onSelect={() => handleSelect(index)} />
			))}
		</div>
	);
};

export default OptionGroup;

/**
 * OPTION
 */
const Option: FC<{ item: string | undefined; index: number; onSelect: any; selectedIndex: number }> = props => {
	const { selectedIndex, item, index, onSelect } = props;

	/**
	 * SETUP LISTENER FOR MEDIA QUERY
	 * Because inline CSS or CSS-in-JS cannot apply media query rules.
	 */
	const matchMedia = window.matchMedia('(max-width: 500px)');
	const [matches, setMatches] = useState(matchMedia.matches);
	const updateMatch = (e: any) => setMatches(e.matches);

	useEffect(() => {
		matchMedia.addEventListener('change', updateMatch);
	}, [matchMedia]);

	// Set highlight/indicator offset horizontally (Large screen) or vertically (Small screen)
	const style = matches ? { top: `${selectedIndex * 100}%` } : { marginLeft: `${selectedIndex * 100}%` };

	/**
	 * UI
	 */
	return (
		<div className={`option ${selectedIndex === index && 'active'}`} onClick={onSelect}>
			<span>{item}</span>
			{index === 0 && <div style={style} className='highlight' />}
		</div>
	);
};
