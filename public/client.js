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
    console.log(UserObject);

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
            $('.add-income-src').prepend
            
            (`<tr>
            <th> 
            <form class="update-form">
            <input type="text" class="update-income-src" value="${result.srcOfIncome}">
            
            <input type="text" class="update-income-amnt" value="${result.amntOfIncome}">
            
            <input type="hidden" class="inputEntryID"  value="${result._id}">

            <button type="submit" class="update-income-btn">Update</button>
            </form> 
            </th>
            </tr>`)

            $( '.income-log' ).each(function(){
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
            
            //controlSubmitBtn();
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


// Log ******************************************************
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
                displayAllIncome (username, result) //after the income is added display the username
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
                $('.add-expense-src').prepend
                (`<li data-editable class="edit">
                <i class="fa fa-edit"></i>  ${srcOfExpenses}
                </li>`)

                $('.add-expense-amnt').prepend
                (`<li data-editable class="edit">
                <i class="fa fa-edit"></i>  ${amntOfExpenses}</li>`)

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
                $('.add-savings-src').prepend
                (`<li data-editable class="edit">
                <i class="fa fa-edit"></i>  ${srcOfSavings}</li>`)

                $('.add-savings-amnt').prepend
                (`<li data-editable class="edit"><i class="fa fa-edit"></i>  ${amntOfSavings}</li>`)
                
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
$('.income-log').on('click', 'li', function (event) {
    event.preventDefault();

    let editIncome = $(this);
    let editIncomeInput = $('<input/>').val( editIncome.text() );
    editIncome.replaceWith( editIncomeInput );

    let save = function(){
        let newIncomeInput = $('<li data-editable class="edit-income"><i class="edit-in fa fa-edit"></i></li>').text( editIncomeInput.val() );
        editIncomeInput.replaceWith( newIncomeInput );
        console.log(editIncomeInput);
      };
      
    editIncomeInput.one('blur', save).focus();
    console.log(editIncomeInput);
});

//Update Income DB
$('.income-log').on('click', '.edit-in', function (event) {
     event.preventDefault();

    //take the input from the user
    const parentDiv = $(this).closest('.log-table');
    const srcOfIncome = $(this).parent().find('.edit-income').val();
    const amntOfIncome = $(this).parent().find(".edit").val();
    const entryId = $(this).parent().find('.inputEntryID').val();
    
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
            entryId: entryId
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
                

                // populateUserDashboardDate(loggedInUserName);
                // $('.js-edit-entry').hide();

                // console.log(parentDiv);
                // $('html, body').animate({
                //     scrollTop: parentDiv.offset().top
                // }, 1000);

            })
            //if the call is failing
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    };

});


//Click to update Expense inputted
$('.expenses-log').on('click', 'li', function (event) {
    event.preventDefault();

    let editIncome = $(this);
    let editIncomeInput = $('<input/>').val( editIncome.text() );
    editIncome.replaceWith( editIncomeInput );
    
    let save = function(){
      let newIncomeInput = $('<li data-editable><i class="fa fa-edit"></i> </li>').text( editIncomeInput.val() );
      editIncomeInput.replaceWith( newIncomeInput );
    };
    
    editIncomeInput.one('blur', save).focus();
});

//Click to update Savings inputted
$('.savings-log').on('click', 'li', function (event) {
    event.preventDefault();

    let editIncome = $(this);
    let editIncomeInput = $('<input/>').val( editIncome.text() );
    editIncome.replaceWith( editIncomeInput );
    
    let save = function(){
      let newIncomeInput = $('<li data-editable><i class="fa fa-edit"></i> </li>').text( editIncomeInput.val() );
      editIncomeInput.replaceWith( newIncomeInput );
    };
    
    editIncomeInput.one('blur', save).focus();
});
    //  $(event.currentTarget).closest('.income-src').siblings('.add-income-amnt', '.add-income-src');

    // $('.add-income-amnt').hide();
    // $('.add-income-src').hide();
    // currentEditForm.show();


    // $('html, body').animate({
    //     scrollTop: currentEditForm.offset().top
    // }, 1000);

//Update Entry Submit
// $('#user-list').on('submit', '.edit-entry-form', function (event) {
//     event.preventDefault();

//     //take the input from the user
//     const parentDiv = $(this).closest('.entries-container');
//     const entryType = $(this).parent().find(".entry-type").val();
//     const inputDate = $(this).parent().find(".inputDate").val();
//     const inputPlay = $(this).parent().find(".inputPlay").val();
//     const inputAuthor = $(this).parent().find(".inputAuthor").val();
//     const inputRole = $(this).parent().find(".inputRole").val();
//     const inputCo = $(this).parent().find(".inputCo").val();
//     const inputLocation = $(this).parent().find(".inputLocation").val();
//     const inputNotes = $(this).parent().find(".inputNotes").val();
//     const loggedInUserName = $("#loggedInUserName").val();
//     const entryId = $(this).parent().find('.inputEntryID').val();

//     //validate the input
//     if (entryType == "") {
//         alert('Please input entry type');
//     } else if (inputDate == "") {
//         alert('Please input addInputDate');
//     } else if (inputPlay == "") {
//         alert('Please input addInputPlay');
//     } else if (inputAuthor == "") {
//         alert('Please input addInputAuthor');
//     } else if (inputNotes == "") {
//         alert('Please input addInputNotes');
//     }
//     //if the input is valid
//     else {
//         //create the payload object (what data we send to the api call)
//         const entryObject = {
//             entryType: entryType,
//             inputDate: inputDate,
//             inputPlay: inputPlay,
//             inputAuthor: inputAuthor,
//             inputRole: inputRole,
//             inputCo: inputCo,
//             inputLocation: inputLocation,
//             inputNotes: inputNotes,
//             loggedInUserName: loggedInUserName,
//             entryId: entryId
//         };
//         console.log(entryObject);


//         //make the api call using the payload above
//         $.ajax({
//                 type: 'PUT',
//                 url: `/entry/${entryId}`,
//                 dataType: 'json',
//                 data: JSON.stringify(entryObject),
//                 contentType: 'application/json'
//             })
//             //if call is succefull
//             .done(function (result) {
//                 populateUserDashboardDate(loggedInUserName);
//                 $('.js-edit-entry').hide();

//                 console.log(parentDiv);
//                 $('html, body').animate({
//                     scrollTop: parentDiv.offset().top
//                 }, 1000);

//             })
//             //if the call is failing
//             .fail(function (jqXHR, error, errorThrown) {
//                 console.log(jqXHR);
//                 console.log(error);
//                 console.log(errorThrown);
//             });
//     };

// });


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
    
    // googleTranslateElementInit();
    //loginForm();
    copyright();
    chart();
    //logging();
    //questionnaireBtnClicked();
    nextQuestion();
    submitResults();
    navBar();
    loggingChart();
};


$(watchForm);