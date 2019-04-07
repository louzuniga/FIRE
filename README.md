# Light Your Life on FIRE!
> FIRE stands for "Financial Independence, early retirement". This app is designed to display a broad picture of what financial independence means to you and how long it will take you to get there based on your current income, expenses and savings. 

> The app was created using HTML, CSS, JavaScript, Node, MongoDB, Heroku and mLab.

## Live App 
[](https://fire-node-app.herokuapp.com/)

## Technology 
> #### **Front-End:** HTML, CSS, JavaScript, jQuery
> #### **Back-End:**  Node, Express, Mocha, Chai, RESTful API, MongoDB, Mongoose
> #### **Host:**  mLab, Heroku

## Screenshots
Homepage
![Homepage](/readme-images/Homepage.png)
Sign-up  | Questionaire 
:-------------------------:|:-------------------------:
![Sign-up](/readme-images/Sign-up.png)  |  ![Questions](/readme-images/questionaire.png)
Logging  | Results 
![Log](/readme-images/Log.png) | ![Overview](/readme-images/overview.png)

## User Stories
*   User has a main login in screen
*   User can register
*	User registers and/or sign in
    *   Username
	*   Password
*	User has three options to browse through
	*   Mini Quiz – to gain user insight
    *	Logging – income, expense, savings/investments
    *	Results – based on quiz and logging
*	User answers 5 mini quiz questions
*	User input approximate:
    *	Monthly income
    *	Monthly expenses
    *	Monthly savings/investments
*	User can utilize planner/logger to keep track of    expenses and help budget towards FI goal
*	User will be provided some sort of graph or chart to display the results
*	User wants to know how long it will take him to reach FI
*	User wants results emailed to her

## Wireframe
Login  | Questions 
:-------------------------:|:-------------------------:
![Login](/readme-images/Wireframe-login.png)  |  ![Questions](/readme-images/Wireframe-questions.png)
Logging  | Overview 
![Logging](/readme-images/Wireframe-logger.png) | ![Results](/readme-images/Wireframe-results.png)

## Functionality 
*	As a user, I should be able identify my habits and lifestyle based off of the quiz

*	As a user, I should be able to add, delete, update and modify my income, expenses/bills within the logging section

*	As a user, I should be able see the results and when I am potentially financially independent

## Business Objects (Database Structure) 
*   Username
    *   username
    *   password
    *   Email
*   Questionnaire 
    *   Questions - general questions
    *   Response - user responses
*   Logging
    *   Income
    *   Expense
    *   Savings/Investments
*   Results
    *   Input for income
    *   Input for expenses
    *   Input for savings

## Development Roadmap 
> Functionality to-do task list
- [ ] login and sign-up page
- [ ] mini quiz and logger layout
- [ ] CRUD operations for logging
- [ ] api/develop tool to output results
- [ ] implement (CSS)
- [ ] functionality to email/print results
- [ ] make sure integration testing is implemented during development cycle

