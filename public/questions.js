'use strict'

const questions = [
    {
        question: 'What would you personally consider as Financially Independent?',
        choices: [
            'a.	All of the basics are taken care of such as housing, healthcare, food, minimal travel and entertainment and more time for myself and my family',
            'b.	All of questions above but would include more for entertainment, travel and the nicer materialistic things in life',
            'c.	All of the above and then everything else I can possibly want without limitations',
            'd. Undecided',
        ],
    },
    {
        question: 'How do you feel about your current financial situation?',
        choices: [
            'a.	I live paycheck to paycheck and/or barely getting by',
            'b.	I save about 20% of my salary (includes 401k contribution)',
            'c.	I am proudly debt free and save more than 20% of my salary (includes 401k contribution)',
            'd. Undecided',
        ],
    },
    {
        question: 'Are you willing to invest?',
        choices: [
            'a.	Yes, I understand the turbulent ride, but the historical high returns are worth the risk',
            'b.	Somewhat, my risk tolerance is low, and I prefer to invest more in bonds ',
            'c.	No, I prefer to just keep all my money in my savings and/or CD’s.',
            'd. Undecided',
        ],
    },
    {
        question: 'Are you willing to optimize your spending and expenses in order to reach your FI?',
        choices: [
            'a.	Yes, I can identify ways to minimize my spending to my values',
            'b.	No, I can’t identify anything else I can cut back on',
            'c. Already in progress',
            'd. Undecided',
        ],
    },
    {
        question: 'What would you consider wealthy?',
        choices: [
            'a.	Having a big house, nice car, designer clothes and shoes and lot of money ',
            'b.	Having great friendships and a close relationship with my family',
            'c.	Option b in addition to being able to live freely, travel, and enjoy what I love most in life within cognizant considerations',
            'd. Undecided',
        ],
    },
];


let numberOfQuestions = 0;

const generateQuestions = () => {
    (numberOfQuestions < questions.length)
    return `<div id="questionnaire">
        <div>
        <h2 class="question-h2">Let's start off with something to think about.</h2>
        <p class="question-p">These question's sole intention is to get your mind thinking about what it may take to be financially independent. Don't worry it will not be graded and there is no right or wrong answers. Just be you.</p>
        </div>
        </br>
        <h3 class="question">${questions[numberOfQuestions].question}</h3>
        <form class="questions-form">
            <div class="answerChoices">
            <input type="radio" name="choice" required></input>
            <label>${questions[numberOfQuestions].choices[0]}</label>
            </div>

            <div class="answerChoices">
            <input type="radio" name="choice" required></input>
            <label>${questions[numberOfQuestions].choices[1]}</label>
            </div>

            <div class="answerChoices">
            <input type="radio" name="choice" required></input>
            <label>${questions[numberOfQuestions].choices[2]}</label>
            </div>

            <div class="answerChoices">
            <input type="radio" name="choice" required></input>
            <label>${questions[numberOfQuestions].choices[3]}</label>
            </div>
            </br>
            <button id="next-question" class="question-btn btn">Next</button>
        </form>

        <button type="submit" id="submit-btn" class="btn">Let's go log some stuff...</button>

        </div>`
};


//Next Button
$('#questions-form').on('click', '#next-question', (event) => {
    event.preventDefault();

    let userAnswer = $('input[name="choice"]:checked', '#questions-form').val();
    
    if (!userAnswer) {
        alert('Please select a thoughtful answer.');
    } else {
        numberOfQuestions++;
    }
    
    if (numberOfQuestions < questions.length) {
        $('#questions-form').html(generateQuestions());
    }
    
    if (numberOfQuestions === 5) {
        $('.question').hide();
        $('.questions-form').hide();
        $('#submit-btn').show();
    } else {
        $('#submit-btn').hide();
    }
});



//Submit Button
$('#questions-form').on('click', '#submit-btn', (event) => {
    event.preventDefault();
    showLog();

    numberOfQuestions = 0;
});


