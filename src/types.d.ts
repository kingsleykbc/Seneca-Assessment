export type QuestionListType = Array<Question>;

export type QuestionType = {
	question: string;
	optionGroups: Array<OptionGroup>;
};

export type OptionGroupType = {
	options: [string, string, string?];
	answer?: string;
};

export type BackgroundsType = {
	'0-25%': string;
	'25%-50%': string;
	'50%-75%': string;
	'75%-100%': string;
};

export type BackgroundKeyTypes = '0-25%' | '25%-50%' | '50%-75%' | '75%-100%';

export type QuestionSelectionType = {
	questionIndex: number,
	selections: OptionGroupSelectionType[]
};

export type OptionGroupSelectionType = {
	optionGroupIndex: number, 
	selectedOptionIndex: number
}