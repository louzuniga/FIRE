'use strict'

$('.hideme').hide();
$('#login').show();


//GET AJAX request from user Income user entries
function displayAllIncome (username) {
   
    if ((username == "") || (username == undefined) || (username == null)) {
        username = $('.activeUser').val();
    }
    //create the payload object (what data we send to the api call)
    const UserObject = {
        user: username
    };

    //make the api call using the payload above
    //this will retrieve all the income
    $.ajax({
            type: 'GET',
            url: `/income/${username}`,
            dataType: 'json',
            contentType: 'application/json'
        })
        //if call is succefull
        .done( (result) => {
            console.log(result);
            $( '.income-log' ).each(function(){
                this.reset();
            });

            $('.add-income-results').html(''); //reset income before adding a new one

            for (let i = 0; i < result.entries.length; i++){
                $('.add-income-results').prepend
            
                (`<tr>
                <td> 
    
                <form class="update-income-form">
                <button type="button" class="update-income-btn">Update</button>
                <button type="button" class="delete-income-btn">Delete</button>
                <br/>
    
                <input type="text" class="update-income-src" value="${result.entries[i].srcOfIncome}">
                <label>Source of Income</label>
                <br/>
    
                <input type="text" class="update-income-amnt" value="${result.entries[i].amntOfIncome}">
                <input type="hidden" class="update-income-id" value="${result.entries[i]._id}">
                <label>Amount</label>
    
                </form> 
                </td>
                </tr>`)
            }
        })
        //if the call is failing
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
};

function displayAllExpense (username) {
   
    if ((username == "") || (username == undefined) || (username == null)) {
        username = $('.activeUser').val();
    }
    //create the payload object (what data we send to the api call)
    const UserObject = {
        user: username
    };

    //make the api call using the payload above
    //this will retrieve all the income
    $.ajax({
            type: 'GET',
            url: `/expense/${username}`,
            dataType: 'json',
            contentType: 'application/json'
        })
        //if call is succefull
        .done( (result) => {
            console.log(result);
            $( '.income-log' ).each(function(){
                this.reset();
            });

            $('.add-expense-results').html('');

            for (let i = 0; i < result.entries.length; i++) {
                $('.add-expense-results').prepend
                
                (`<tr>
                <td> 
                <form class="update-expense-form">

                <button type="submit" class="update-expense-btn">Update</button>
                <button type="button" class="delete-expense-btn">Update</button>
                <br/>

                <input type="text" class="update-expense-src" value="${result.entries[i].srcOfExpenses}">
                <label>Expense Type</label>
                <br/>

                <input type="text" class="update-expense-amnt" value="${result.entries[i].amntOfExpenses}">
                <input type="hidden" class="update-income-id" value="${result.entries[i]._id}">
                <label>Amount</label>

                </form> 
                </td>
                </tr>`)
            }
        })

        //if the call is failing
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
};

function displayAllSavings (username) {
   
    if ((username == "") || (username == undefined) || (username == null)) {
        username = $('.activeUser').val();
    }
    //create the payload object (what data we send to the api call)
    const UserObject = {
        user: username
    };

    //make the api call using the payload above
    //this will retrieve all the income
    $.ajax({
            type: 'GET',
            url: `/savings/${username}`,
            dataType: 'json',
            contentType: 'application/json'
        })
        //if call is succefull
        .done( (result) => {
            console.log(result);
            $( '.income-log' ).each(function(){
                this.reset();
            });

            $('.add-savings-results').html('');

            for (let i = 0; i < result.entries.length; i++) {
                $('.add-savings-results').prepend
                
                (`<tr>
                <td> 
                <form class="update-savings-form">

                <button type="submit" class="update-savings-btn">Update</button>
                <button type="button" class="delete-savings-btn">Update</button>
                <br/>
    
                <input type="text" class="update-savings-src" value="${result.entries[i].srcOfSavings}">
                <label>Savings Type</label>
                <br/>

                <input type="text" class="update-savings-amnt" value="${result.entries[i].amntOfSavings}">
                <input type="hidden" class="update-income-id" value="${result.entries[i]._id}">
                <label>Amount</label>

                </form> 
                </td>
                </tr>`)
            }
        })
        
        //if the call is failing
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
};
        
        

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


//Nav bar *****************************************
$('.icon').click((event) => {
    event.preventDefault();
    //$('#nav').addClass('responsive')
    
    let nav = document.getElementById('nav');
    if (nav.className === 'nav-list') {
        nav.className += ' responsive';
    } else {
        nav.className = 'nav-list';
    }
});


// login form ******************
////const loginForm = () => {
    $('#login').submit((event) => {
        event.preventDefault();
        
        const username = $('.loginUsername').val();
        const password = $('.loginPassword').val();
    
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
            $('.activeUser').val(result._id);//gives the id of the user that just logged and will show in the hidden input
            //getTheData(result.username);
            questionnairePopulated();
            $('#nav-bar').show();
            displayAllIncome(result._id);
            displayAllExpense(result._id);
            displayAllSavings(result._id);
            
        })
        .fail((err, errThrown) => {
            console.log(err);
            console.log(errThrown);
        });
    }; 
    });
//};


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

//user clicks sign-up button
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
            $('.activeUser').val(result._id);
            questionnairePopulated();
            displayAllIncome(result._id);
            displayAllExpense(result._id);
            displayAllSavings(result._id);

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
//const questionnaireBtnClicked = () => {
    $('#questionnaireBtn').click( (event) => {
        event.preventDefault();

        questionnairePopulated();
    });
//};

const questionnairePopulated = () => {
    $('.hideme').hide();
    $('#questions-form').show();
    $('#questions-form').html(generateQuestions());
    $('#question-btns').show();
};


// Log ****************************************************
//const logResults = () => {
    $('.log').click( () => {
        $('.hideme').hide();
        $('#log-form').show();
        let username = $('.activeUser').val();
        displayAllIncome(username);
        displayAllExpense(username);
        displayAllSavings(username);
    });

//Add Income in DB--------------
    $('.income-log').submit( (event) => {
        event.preventDefault();

    //input from user
        const srcOfIncome = $('.income-src').val();
        const amntOfIncome = $('.income-amnt').val();
        let username = $('.activeUser').val();
    
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
            username: username
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
                console.log(result);
                displayAllIncome (username) //after the income is added display the username
            })
            //if the call is failing
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
        };
    });


//Add expenses in DB ----------------
    $('.expenses-log').submit((event) => {
        event.preventDefault();

        const srcOfExpenses = $('.expense-src').val();
        const amntOfExpenses = $('.expense-amnt').val();
        let username = $('.activeUser').val();

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
                username: username,
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
            .done( (result) => {
                console.log(result);
                displayAllExpense(username);

                $( '.expenses-log' ).each(function(){
                    this.reset();
                });
            });   
        };
    });

// Add Savings in DB******
    $('.savings-log').submit( (event) => {
        event.preventDefault();

    //input from user
        const srcOfSavings = $('.savings-src').val();
        const amntOfSavings = $('.savings-amnt').val();
        let username = $('.activeUser').val();
    
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
            username: username
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
                console.log(result);
                displayAllSavings();
                
                $( '.savings-log' ).each(function(){
                    this.reset();
                });
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


//Update logged entries******

//Click to update Income Inputted***
// $('.income-log').on('click', 'li', function (event) {
//     event.preventDefault();

//     let editIncome = $(this);
//     let editIncomeInput = $('<input/>').val( editIncome.text() );
//     editIncome.replaceWith( editIncomeInput );

//     let save = function(){
//         let newIncomeInput = $('<li data-editable class="edit-income"><i class="edit-in fa fa-edit"></i></li>').text( editIncomeInput.val() );
//         editIncomeInput.replaceWith( newIncomeInput );
//         console.log(editIncomeInput);
//       };
      
//     editIncomeInput.one('blur', save).focus();
//     console.log(editIncomeInput);
// });


//Update Income DB***************************
$('.add-income-results').on('click', '.update-income-btn', function (event) {
    event.preventDefault();

    //take the input from the user
    const parentDiv = $(this).closest('.add-income-results');
    const srcOfIncome = $(this).parent().find('.update-income-src').val();
    const amntOfIncome = $(this).parent().find(".update-income-amnt").val();
    const username = $(".activeUser").val();
    const entryId = $(this).parent().find('.update-income-id').val();
    
    console.log(srcOfIncome);

    //validate the input
    if (srcOfIncome == "") {
        alert('Please input source of income');
    } else if (amntOfIncome == "") {
        alert('Please input amount of income');
    } 
    
    //if the input is valid
    else {
        //create the payload object (what data we send to the api call)
        const entryObject = {
            srcOfIncome: srcOfIncome,
            amntOfIncome: amntOfIncome,
            username: username,
            entryId: entryId,
        };
        console.log(entryObject);


        //make the api call using the payload above
        $.ajax({
                type: 'PUT',
                url: `/income/${entryId}`,
                dataType: 'json',
                data: JSON.stringify(entryObject),
                contentType: 'application/json'
            })
            //if call is succefull
            .done(function (result) {
                console.log(result);
                displayAllIncome(username);
                displayAllExpense(username);
                displayAllSavings(username);

            })
            //if the call is failing
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
        };
});


//Delete Entry********************
// $('.add-income-results').on('click', '.delete-income-btn', function (event) {
//     event.preventDefault();
    
//     $(event.currentTarget).closest('.entry-div').siblings

// });

$('.add-income-results').on('click', '.delete-income-btn', function (event) {
    event.preventDefault();


    //take the input from the user
    const entryId = $(this).parent().find('.update-income-id').val();
    const username = $(".activeUser").val();
    //const parentDiv = $(this).closest('.entries-container');

    //    console.log(currentForm, entryId);
    //    console.log(entryType, inputDate, inputPlay, inputAuthor, inputRole, inputCo, inputLocation, inputNotes);

    //make the api call using the payload above
    $.ajax({
            type: 'DELETE',
            url: `/income/${entryId}`,
            dataType: 'json',
            contentType: 'application/json'
        })
        //if call is succefull
        .done(function (result) {
            console.log(result);
            displayAllIncome(username);
            displayAllExpense(username);
            displayAllSavings(username);

        })
        //if the call is failing
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
});


//Click to update Expense inputted
// $('.expenses-log').on('click', 'li', function (event) {
//     event.preventDefault();

//     let editIncome = $(this);
//     let editIncomeInput = $('<input/>').val( editIncome.text() );
//     editIncome.replaceWith( editIncomeInput );
    
//     let save = function(){
//       let newIncomeInput = $('<li data-editable><i class="fa fa-edit"></i> </li>').text( editIncomeInput.val() );
//       editIncomeInput.replaceWith( newIncomeInput );
//     };
    
//     editIncomeInput.one('blur', save).focus();
// });

// //Click to update Savings inputted
// $('.savings-log').on('click', 'li', function (event) {
//     event.preventDefault();

//     let editIncome = $(this);
//     let editIncomeInput = $('<input/>').val( editIncome.text() );
//     editIncome.replaceWith( editIncomeInput );
    
//     let save = function(){
//       let newIncomeInput = $('<li data-editable><i class="fa fa-edit"></i> </li>').text( editIncomeInput.val() );
//       editIncomeInput.replaceWith( newIncomeInput );
//     };
    
//     editIncomeInput.one('blur', save).focus();
// });



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
    
    // googleTranslateElementInit();
    //loginForm();
    copyright();
    chart();
    //logging();
    //questionnaireBtnClicked();
    nextQuestion();
    submitResults();
    loggingChart();
   
};


$(watchForm);