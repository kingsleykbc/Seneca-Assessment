# Seneca Learning Assessment Submission - Kingsley CA

This is my submission for the Question and Option Selection UI Widget.

[Live Demo](https://kingsleykbc.github.io/Seneca-Assessment/)

## Tools Used

This project was developed purely in JSX and CSS alone (i.e., no 3rd-party libraries/ui kits/frameworks used).

## Assumptions

For this project I assumed that the options were to be displayed in a carousel view, since no form/mock up was specified in the figma design.

## Limitations

The lack of a CSS library like styled-jsx or Framer Motion made it difficult to implement some some basic animations, like the background gradient transitions and making the option indicator responsive. Therefore, walkarounds were developed instead.

## Code walkthrough

The app comprises of four components:

- `QuestionList`: The main component that takes in a JSON object of questions and creates the question widgets for each.
- `Question`: Child of the QuestionList component. It displays a question and its options.
- `OptionGroupList`: Clid of the Question component. It displays all the option groups. e.g.

      [
          { options: ['Liverpool', 'chelsea', 'Man UTD'], answer: 'chelsea' },
          { options: ['Serena Williams', 'Naomi Osaka'], answer: 'Naomi Osaka' }
      ]

- `OptionGroup`: Clid of the OptionGroupList component. It displays an optionGroup with the toggle functionality.

## Completed Requirements:

- State any assumptions or limitations of your solution in the repository readme - ✅

- Put your soluton in git repo & email the link once you are done - ✅

- Some form of type checking should be used e.g. flow, propTypes, typescript - ✅

- The component should be responsive down to 320px - ✅

- The solution should lock once the correct answer is reached so the toggles can no longer be switched - ✅

- Ignore the navbar or footer just the toggles component itself - ✅

- The toggles should animate between the two states (see attached video) - ✅

- The background color should change in proportion to how "correct" the answer is (see video attached) - ✅

- The component should be reusable & extendable, it should be able to accomodate the question changing from that in the video to e.g: - ✅

Q. "What are the ideal conditions inside an office?"

A. (good pay, bad pay) (lot of meetings, less meetings), (free coffee, expensive coffee), (bear in office, dog in office).

Extension:

- The order of the questions & answer positions should be randomised - ✅

- You solution should be able to accomodate answers with both two and three toggle positions in the answers. For example: - ✅

Q. "Which are the best sports people & teams?"

A. (Liverpool, Chelsea, Man Utd), (Serena Williams, Naomi Osaka)

- You should make it easy to switch between the active question - ✅

## Running the project

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\

You will also see any lint errors in the console.
