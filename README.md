# Frontend Mentor - Mortgage repayment calculator solution

This is a solution to the [Mortgage repayment calculator challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/mortgage-repayment-calculator-Galx1LXK73). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- Input mortgage information and see monthly repayment and total repayment amounts after submitting the form
- See form validation messages if any field is incomplete
- Complete the form only using their keyboard
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshot

![](./screenshot.jpg)

### Links

- Solution URL: [GitHub Repository](https://github.com/19Rohan97/mortgage-repayment-calculator)
- Live Site URL: [Live Demo](https://19rohan97.github.io/mortgage-repayment-calculator/)

## My process

### Built with

- [React](https://reactjs.org/) - JS library (v19.1.0)
- [Tailwind CSS](https://tailwindcss.com/) - For styles
- Flexbox and CSS Grid for layout
- Mobile-first responsive design
- Custom form validation
- Keyboard accessibility

### What I learned

This project provided valuable experience in creating an interactive financial calculator with React. Some key learnings include:

- Implementing custom form validation with error handling
- Creating an accessible form that can be navigated using only the keyboard
- Using React hooks (useState, useEffect, useRef) for state management and DOM manipulation
- Implementing complex financial calculations for mortgage repayments
- Creating a responsive design that works well on different screen sizes
- Using Tailwind CSS for efficient styling with custom configuration

```js
// Mortgage calculation logic
if (mortgageType === "repayment") {
  monthlyPayment = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
} else {
  // Interest-only: just interest per month
  monthlyPayment = P * r;
}
```

```js
// Currency formatting
function formatCurrency(value) {
  return new Intl.NumberFormat("en-UK", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
  }).format(value);
}
```

### Continued development

In future projects, I'd like to focus on:

- Adding more advanced mortgage options (e.g., different payment frequencies, overpayments)
- Implementing data visualization for payment breakdowns
- Adding the ability to save and compare different mortgage scenarios
- Enhancing accessibility features
- Adding unit and integration tests for the calculator logic
- Implementing more advanced form validation techniques

### Useful resources

- [React Documentation](https://react.dev/) - Comprehensive guide to React concepts and hooks
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Detailed reference for Tailwind CSS
- [MDN Web Docs - Number.prototype.toLocaleString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString) - Helpful for formatting currency values
- [Mortgage Calculator Formula Explanation](https://www.mtgprofessor.com/formulas.htm) - Explains the mathematics behind mortgage calculations

## Author

- Website - [Rohan T George](https://www.rohantgeorge.ca)
- Frontend Mentor - [@rohantgeorge](https://www.frontendmentor.io/profile/19Rohan97)

## Acknowledgments

Thanks to Frontend Mentor for providing this challenge, which helped improve my React and Tailwind CSS skills. Special appreciation to the React and Tailwind CSS communities for their excellent documentation and resources.
