'use strict'

//High Chart ************
//Build the Chart 
    Highcharts.chart('container', {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: 'FIRE Overview'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false
        },
        showInLegend: true
      }
    },
    series: [{
      name: 'Brands',
      colorByPoint: true,
      data: [{
        name: 'Expense',
        y: 61.41,
        sliced: true,
        selected: true 
      }, {
        name: 'Income',
        y: 11.84
      }, {
        name: 'Investment',
        y: 10.85
      }, {
        name: 'Savings',
        y: 4.67
      }]
    }]
  });


// login form ******************
const loginForm = () => {
    $('.login-button').click((event) => {
        event.preventDefault();
    
        $('#login').hide();
        $('#questionnaire').show();
        $('#questionnaire').html(generateQuestions());
    
        const username = $('.loginUsername').val();
        const password = $('.loginPassword').val();
    
        console.log(username, password);
    
        if (username === '') {
            alert('Please input username');
        } else if (password === '') {
            alert('Please enter password');
        } else {
            const loginUser = {
                username: username,
                password: password,
            };
            console.log(loginUser);
    
        //make api call using payload above
        $.ajax({
            type: 'POST',
            url: 'users/login',
            dataType: 'json',
            data: JSON.stringify(loginUser),
            contentType: 'application/json',
        })
        .done((result) => {
            console.log(result);
        })
        .fail((err, errThrown) => {
            console.log(err);
            console.log(errThrown);
        });
    
    };
    });
};


// Sign Up Form **************

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

// Generate questions **************
//when questionnaireBtn clicked show questions and hide signup form

    $('#questionnaireBtn').click( (event) => {
        event.preventDefault();
        $('#questions-form').show();
        $('#login').hide();
        console.log('question btn clicked')
    });


//show next button and then next and prev button 


//Chart function ***************
// const chart = () => {
//     $('#results').click(() => {
//         $('#login').hide();
//         $('#container').removeClass('hidden');
//     });
// };


//Google translate ***************
function googleTranslateElementInit() {
    new google.translate.TranslateElement({pageLanguage: 'en'}, 'google-translate');
}

// Footer and copyright ************
const copyright = () => {
    let d = new Date()
    $('#copyright').text(`Copyright \u00A9 ${d.getFullYear()}  Lou Zuniga`)
};


const watchForm = () => {
    googleTranslateElementInit();
    loginForm();
    copyright();
    chart();
};


$(watchForm);