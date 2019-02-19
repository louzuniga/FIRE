'use strict'

// login form
$('form').submit(event => {
        event.preventDefault();


    // const username = $('.loginUsername').val();
    // const password = $('.loginPassword').val();

    // console.log(username, password);

    // // if (username === '') {
    // //     alert('Please input username');
    // // } else if (password === '') {
    // //     alert('Please enter password');
    // // } else {
    //     const loginUser = {
    //         username: username,
    //         password: password,
    //     };
    //     console.log(loginUser);

    // //make api call using payload above
    // $.ajax({
    //     type: 'POST',
    //     url: 'users/login',
    //     dataType: 'json',
    //     data: JSON.stringify(loginUser),
    //     contentType: 'application/json',
    // })
    // .done((result) => {
    //     console.log(result);
    // })
    // .fail((err, errThrown) => {
    //     console.log(err);
    //     console.log(errThrown);
    // });

    $('.login-button').click(() => {
        $('.questionnaire').html(generateQuestions());
    });
});


// Sign Up Form
$('.signup').click((event) => {
    event.preventDefault();

    $('#login').hide();
    $('#signup-form').show();

//cancel button clicked
    $('.cancelbtn').click(() => {
        location.reload();
    });

//sign up button clicked
    $('.signupbtn').click(() => {
        
    });
});

//generate questions
const numberOfQuestions = 0;
const questionsAnswered =0;

const generateQuestions = () => {
    if(questionsAnswered < questions.length) {
        return $('#questionnaire').removeClass('hidden')
        `<div id="questionnaire">
        <h3>How to you really feel?</h3>
        <p>Let's start off with a short quiz to gauge your mindset toward FIRE.</p>
        <form class="questions-form">
            <label class="answerChoices">
                <input type="radio" value="${questions[numberOfQuestions].choices[0]}" name="choice" required>
                <span>${questions[numberOfQuestions].choices[0]}</span>
            </label>
            <label class="answerChoices">
                <input type="radio" value="${questions[numberOfQuestions].choices[1]}" name="choice" required>
                <span>${questions[numberOfQuestions].choices[1]}</span>
            </label>
            <label class="answerChoices">
                <input type="radio" value="${questions[numberOfQuestions].choices[2]}" name="choice" required>
                <span>${questions[numberOfQuestions].choices[2]}</span>
            </label>
        </form>
    </div>`
    };
};



//google translate
function googleTranslateElementInit() {
    new google.translate.TranslateElement({pageLanguage: 'en'}, 'google-translate');
  }

// footer and copyright
const copyright = () => {
    let d = new Date()
    $('#copyright').text(`Copyright \u00A9 ${d.getFullYear()}  Lou Zuniga`)
};

copyright();
googleTranslateElementInit();
