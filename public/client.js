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
    //the results will be extracted from the logger
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
    
        // $('.hideme').hide();
        // $('#questionnaire').show();
        // $('#questionnaire').html(generateQuestions());
    
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
const signupForm = (event) => {
    event.preventDefault()
    
$('.signup-nav').click(() => {
   
    $('.hideme').hide();
    $('#signup-form').show();

//cancel button clicked return to landing page
    $('.cancelbtn').click(() => {
        location.reload();
    });

// when sign up button clicked create a new user and store it in the db 
//then go to questionnaire 
    // $('.signupbtn').click(() => {
        
    // });
    });
};  

// Generate questions **************
//when questionnaireBtn clicked show questions and hide signup form

    $('#questionnaireBtn').click( (event) => {
        event.preventDefault();
        $('.hideme').hide();
        $('#questions-form').show();
    });


//show next button and then next and prev button 


// Log ******************
const logging = () => {
    $('.log').click( () => {
       
        $('.hideme').hide();
        $('#logging').show();
    });
};


//Chart function ***************
//when results is clicked show results page
const chart = () => {
    $('#results').click(() => {

        $('.hideme').hide();
        $('#container').show();
    });
};

// Footer and copyright ************
const copyright = () => {
    let d = new Date()
    $('#copyright').text(`Copyright \u00A9 ${d.getFullYear()}  Lou Zuniga`)
};


const watchForm = () => {
    $('.hideme').hide();
    $('#login').show();
    // googleTranslateElementInit();
    loginForm();
    copyright();
    chart();
    logging();
    signupForm();
};


$(watchForm);