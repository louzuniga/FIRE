'use strict'

//High Chart ************
//Build the Chart 
let loggingChart = () => {

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
      name: 'Overview',
      colorByPoint: true,
      data: [{
        name: 'Expense',
        y: 61.41,
        sliced: true,
        selected: true 
      }, {
        name: 'Income',
        y: 0
      }, {
        name: 'Investment',
        y: 10.85
      }, {
        name: 'Savings',
        y: 4.67  
      }]
    }]
  });
}


// //Get request
// function getTheData (username) {
//     if ((username == "") || (username == undefined) || (username == null)) {
//         username = $('#loggedInUserName').val();
//     }

// //create the payload object (what data we send to the api call)
//     const UserObject = {
//         user: username
//     };
//     console.log(UserObject);

//     $.ajax({
//         type: 'GET',
//         url: `/income-read`,
//         dataType: 'json',
//         data: JSON.stringify(UserObject),
//         contentType: 'application/json'
//     })
//     //if call is succefull
//     .done(function (result) {

//         console.log(result);
//         // if (result.entriesOutput.length === 0) {
//         //     $('#no-entry').show();
//         // } else {
//         //     $('#no-entry').hide();
//         // }

//         //empty the user-list container before populating it dynamically
//         $('#income-list').html("");
//         //htmlUserDashboard(result);

//     })
//     //if the call is failing
//     .fail(function (jqXHR, error, errorThrown) {
//         console.log(jqXHR);
//         console.log(error);
//         console.log(errorThrown);
//     });
// };


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
    $('#login').submit((event) => {
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
            event.preventDefault();
            //getTheData(result.username);
            questionnairePopulated();
            
            if(numberOfQuestions < 4) {
                $('#submit-btn').hide();
            }else {
                $('#next-question').hide();
                $('#submit-btn').show();
            }
            //controlSubmitBtn();
        })
        .fail((err, errThrown) => {
            console.log(err);
            console.log(errThrown);
        });
    }; 
    });
};


// Sign Up Form **************
$('.signup-nav').click((event) => {
    event.preventDefault();
    $('.hideme').hide();
    $('#signup-form').show();
});

//cancel button clicked return to landing page
    $('.cancelbtn').click(() => {
        location.reload();
    });

$('#signup-form').submit( function (event) {
    event.preventDefault();
   
 //take the input from the user
 const email = $("#singup-email").val();
 const username = $("#signup-username").val();
 const password = $("#signup-password").val();
 console.log(email, username, password);   

 //validate the input
 if (email == "") {
     alert('Please add an Email Adress');
 } else if (username == "") {
     alert('Please add an user name');
 } else if (password == "") {
     alert('Please add a password');
 }
 //if the input is valid
 else {
     //create the payload object (what data we send to the api call)
     const newUserObject = {
         name: email,
         username: username,
         password: password,
     };
     console.log(newUserObject);

     //make the api call using the payload above
     $.ajax({
             type: 'POST',
             url: '/users/create',
             dataType: 'json',
             data: JSON.stringify(newUserObject),
             contentType: 'application/json'
         })
         //if call is succefull
         .done(function (result) {
             console.log(result);
            questionnairePopulated();
            //getTheData(result.username);
         })
         //if the call is failing
         .fail(function (jqXHR, error, errorThrown) {
             console.log(jqXHR);
             console.log(error);
             console.log(errorThrown);
         });
    };
});
   


// Generate questions **************
//when questionnaireBtn clicked show questions and hide signup form
const questionnaireBtnClicked = () => {
    $('#questionnaireBtn').click( (event) => {
        event.preventDefault();

        questionnairePopulated();
    });
};

const questionnairePopulated = () => {
    $('.hideme').hide();
    $('#questions-form').show();
    $('#questions-form').html(generateQuestions());
    $('#question-btns').show();
};


// Log *****************************************
//const logResults = () => {
    $('.log').click( () => {
        $('.hideme').hide();
        $('#log-form').show();
    });

//Add Income in DB****
    $('.income-log').submit( (event) => {
        event.preventDefault();

    //input from user
        const srcOfIncome = $('.income-src').val();
        const amntOfIncome = $('.income-amnt').val();
    
    //validate the input
    if (srcOfIncome == "") {
        alert('Please input source of income type');
    } else if (amntOfIncome == "") {
        alert('Please input amount of income');
    } 

    //if the input is valid
    else {
        //create the payload object (what data we send to the api call)
        const entryObject = {
            srcOfIncome: srcOfIncome,
            amntOfIncome: amntOfIncome,
        };
        console.log(entryObject);


        //make the api call using the payload above
        $.ajax({
                type: 'POST',
                url: `/income/create`,
                dataType: 'json',
                data: JSON.stringify(entryObject),
                contentType: 'application/json'
            })
            //if call is succefull
            .done( (result) => {
                $('.add-income-src').prepend(`<p>${srcOfIncome}</p> <button class="edit ">Edit</button>`)
                $('.add-income-amnt').prepend(`<p>${amntOfIncome}</p>`)
            })
            //if the call is failing
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
        };
    });


//Add expenses in DB *****
    $('.expenses-log').submit((event) => {
        event.preventDefault();

        const srcOfExpenses = $('.expense-src').val();
        const amntOfExpenses = $('.expense-amnt').val();

        if (srcOfExpenses == "") {
            alert('Please input an expense or input none');
        } else if (amntOfExpenses == "") {
            alert('Please input expense amount or 0');
        } 
    
        //if the input is valid
        else {
            //create the payload object (what data we send to the api call)
            const entryObject = {
                srcOfExpenses: srcOfExpenses,
                amntOfExpenses: amntOfExpenses,
            };
            console.log(entryObject);
    
            //make the api call using the payload above
            $.ajax({
                type: 'POST',
                url: `/expense/create`,
                dataType: 'json',
                data: JSON.stringify(entryObject),
                contentType: 'application/json'
            })
             //if the call is failing
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            })
            //if call is succefull
            .done( () => {
                $('.add-expense-src').prepend(`<p">${srcOfExpenses}</p>`)
                $('.add-expense-amnt').prepend(`<p>${amntOfExpenses}</p>`)
            });   
        };
    });

// Add Savings in DB******
    $('.savings-log').submit( (event) => {
        event.preventDefault();

    //input from user
        const srcOfSavings = $('.savings-src').val();
        const amntOfSavings = $('.savings-amnt').val();
    
    //validate the input
    if (srcOfSavings == "") {
        alert('Please input source of income type');
    } else if (amntOfSavings == "") {
        alert('Please input amount of income');
    } 

    //if the input is valid
    else {
        //create the payload object (what data we send to the api call)
        const entryObject = {
            srcOfSavings: srcOfSavings,
            amntOfSavings: amntOfSavings,
        };
        console.log(entryObject);

        //make the api call using the payload above
        $.ajax({
                type: 'POST',
                url: `/savings/create`,
                dataType: 'json',
                data: JSON.stringify(entryObject),
                contentType: 'application/json'
            })
            //if call is succefull
            .done( (result) => {
                $('.add-savings-src').prepend(`<p">${srcOfSavings}</p>`)
                $('.add-savings-amnt').prepend(`<p>${amntOfSavings}</p>`)
            })
            //if the call is failing
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
        };
    });
//};




//const addToLogTable = () => {
    // $('.income-add-btn').click( () => {
    //     const addSrc = $('.add-src').val();
    
    //     $('.add-to-log-src').append(`<p">${addSrc}</p>`)
    //     console.log(addSrc);
    // });
//};
// const logging = () => {
    
//     // addRow();
//     //deleteRow();
//     // logSum();
// };


// //add-row in log
// const addRow = () => {
//     $('.income-add-btn').click( () =>{
       
//     });

//     $('.expense-add-btn').click(() => {
//         $('.expense-source').append(`<input type="text" id="add-expense-source">`)
//         $('.expense-amnt').append(`<input type="number" id="add-expense-amount">`)
//     });

//     $('.savings-add-btn').click(() => {
//         $('.savings-amount').append(`<input type="text" id="add-savings-source">`)
//         $('.savings-source').append(`<input type="number" id="add-savings-amnt">`)
//     });
// };

// //delete-row in log
// const deleteRow = () => {
//     $('.delete-row-income').click(() => {
//         $('#add-source').addClass('delete-income');
//         $('#add-amount').addClass('delete-income');
//         $('.delete-income').remove();
//     });

//     $('.expense-delete-btn').click(() => {
//         $('#add-expense-amount').addClass('delete-income');
//         $('#add-expense-source').addClass('delete-income');
//         $('.delete-income').remove();
//     });

//     $('.delete-row-savings').click(() => {
//         $('#add-savings-source').addClass('delete-income');
//         $('#add-savings-amnt').addClass('delete-income');
//         $('.delete-income').remove();
//     });
// };

// // log Sum
// const logSum = () => {
//     $('.in-mnt').change(() => {
//         let sum = 0;
//         $('.in-mnt').each( function() {
//             sum += +$(this).val();
//         });
//         $('.total').val(sum);
//     });
// };

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
    //logging();
    questionnaireBtnClicked();
    nextQuestion();
    controlSubmitBtn();
    submitResults();
    navBar();
    loggingChart();

};


$(watchForm);