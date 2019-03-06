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


//Nav bar ****************
const navBar = () => {
   
    $('.icon').click(() => {
        //$('#nav').addClass('responsive')
        
        let nav = document.getElementById('nav');
        if (nav.className === 'nav-list') {
            nav.className += ' responsive';
        } else {
            nav.className = 'nav-list';
        }
    });
};


// login form ******************
const loginForm = () => {
    $('.login-button').click((event) => {
        event.preventDefault();
    
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
const signupForm = () => {
$('.signup-nav').click((event) => {
    event.preventDefault();
    $('.hideme').hide();
    $('#signup-form').show();

//cancel button clicked return to landing page
    $('.cancelbtn').click(() => {
        location.reload();
    });
    });
};  

// Generate questions **************
//when questionnaireBtn clicked show questions and hide signup form
const questionnaireBtnClicked = () => {
    $('#questionnaireBtn').click( (event) => {
        event.preventDefault();
        $('.hideme').hide();
        $('#questions-form').show();
        $('#questions-form').html(generateQuestions());
        $('#question-btns').show();
        
        if(numberOfQuestions < 4) {
            $('#submit-btn').hide();
        }else {
            $('#next-question').hide();
            $('#submit-btn').show();
        }
        //controlSubmitBtn();
        controlPrevBtn();
    });
};


// Log ******************
const logging = () => {
    $('.log').click( () => {
        $('.hideme').hide();
        $('#logging').show();
    });
    addRow();
    deleteRow();
};

//add-row in log
const addRow = () => {
    $('.income-add-btn').click( () =>{
        $('.income-source').append(`<input type="text" id="add-source">`)
        $('.income-amount').append(`<input type="text" id="add-amount">`)
    });

    $('.expense-add-btn').click(() => {
        $('.expense-source').append(`<input type="text" id="add-expense-source">`)
        $('.expense-amnt').append(`<input type="text" id="add-expense-amount">`)
    });

    $('.savings-add-btn').click(() => {
        $('.savings-amount').append(`<input type="text" id="add-savings-source">`)
        $('.savings-source').append(`<input type="text" id="add-savings-amnt">`)
    });
};


//delete-row in log
const deleteRow = () => {
    $('.delete-row-income').click(() => {
        $('#add-source').addClass('delete-income');
        $('#add-amount').addClass('delete-income');
        $('.delete-income').remove();
    });

    $('.expense-delete-btn').click(() => {
        $('#add-expense-amount').addClass('delete-income');
        $('#add-expense-source').addClass('delete-income');
        $('.delete-income').remove();
    });

    $('.delete-row-savings').click(() => {
        $('#add-savings-source').addClass('delete-income');
        $('#add-savings-amnt').addClass('delete-income');
        $('.delete-income').remove();
    });
};


//Chart function ***************
//when results is clicked show results page
const seeResults = () => {
    $('.hideme').hide();
        $('#results-container').show();
        $('#container').show();
};

const submitResults = () => {
    $('.see-results').click( () => {
        seeResults();
    });
};

const chart = () => {
    $('#results').click(() => {
        seeResults();
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
    questionnaireBtnClicked();
    nextQuestion();
    prevQuestion();
    submitResults();
    navBar();
};


$(watchForm);