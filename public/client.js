'use strict'

$('.hideme').hide();
$('#login').show();

//GET AJAX request from user Income user entries
function displayAllIncome (username) {
   
    if ((username == "") || (username == undefined) || (username == null)) {
        username = $('.activeUser').val();
    }

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
            $( '.income-log' ).each(function(){
                this.reset();
            });

            $('.add-income-results').html(''); //reset income before adding a new one

            for (let i = 0; i < result.entries.length; i++){
                $('.add-income-results').prepend
            
                (`<tr>
                <td> 
    
                <form class="update-income-form hideme">
                <button type="button" class="update-income-btn btn">Update</button>
                <button type="button" class="delete-income-btn btn">Delete</button>
                <br/>
    
                <input type="text" class="update-income-src" value="${result.entries[i].srcOfIncome}">
                <label>Income</label>
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
            $( '.income-log' ).each(function(){
                this.reset();
            });

            $('.add-expense-results').html('');

            for (let i = 0; i < result.entries.length; i++) {
                $('.add-expense-results').prepend
                
                (`<tr>
                <td> 
                <form class="update-expense-form hideme">

                <button type="submit" class="update-expense-btn btn">Update</button>
                <button type="button" class="delete-expense-btn btn">Delete</button>
                <br/>

                <input type="text" class="update-expense-src" value="${result.entries[i].srcOfExpenses}">
                <label>Expense</label>
                <br/>

                <input type="text" class="update-expense-amnt" value="${result.entries[i].amntOfExpenses}">
                <input type="hidden" class="update-expense-id" value="${result.entries[i]._id}">
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
            $( '.income-log' ).each(function(){
                this.reset();
            });

            $('.add-savings-results').html('');

            for (let i = 0; i < result.entries.length; i++) {
                $('.add-savings-results').prepend
                
                (`<tr>
                <td> 
                <form class="update-savings-form hideme">

                <button type="submit" class="update-savings-btn btn">Update</button>
                <button type="button" class="delete-savings-btn btn">Delete</button>
                <br/>
    
                <input type="text" class="update-savings-src" value="${result.entries[i].srcOfSavings}">
                <label>Savings</label>
                <br/>

                <input type="text" class="update-savings-amnt" value="${result.entries[i].amntOfSavings}">
                <input type="hidden" class="update-savings-id" value="${result.entries[i]._id}">
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


//Show Nav Bar HTML**************
const navBar = () => {
    return `<div class="nav-list" id="nav">
    <a href="/" class="Logout">Logout</a>
    <a id="questionnaireBtn">Questionaire</a>
    <a class="log">Log</a>
    <a id="results">Overview</a>
    <a class="icon">
        <i class="fa fa-bars"></i>
    </a>
</div>`
};


//High Chart ************
//Build the Chart 
const seeResults = () => {
    $('.hideme').hide();
    $('#container').show();
    $('#results-container').show();
    let username = $('.activeUser').val();
    populateChart(username);
};

$('.see-results').click( (event) => {
    event.preventDefault();
    seeResults();
});

$('#nav-bar').on ('click', '#results', (event) => {
    event.preventDefault();
    seeResults();
});


function populateChart (userID) {
    let jsonObject = '';

    $.ajax({
        type: 'GET',
        url: `/populate-chart/${userID}`,
        dataType: 'json',
        contentType: 'application/json'
    })
    //if call is succefull
    .done(function (result) {
        result.allSavingsExpensesIncome.forEach((result) => console.log(result));

        let totalSavings = 0;
        for(let i = 0; i < result.allSavingsExpensesIncome[2].length; i++){
            totalSavings += parseInt(result.allSavingsExpensesIncome[2][i].amntOfSavings)
        }
        console.log(totalSavings, 'savings');

        let totalIncome = 0;
        for(let i = 0; i < result.allSavingsExpensesIncome[0].length; i++){
            totalIncome += parseInt(result.allSavingsExpensesIncome[0][i].amntOfIncome)
        }
        console.log(totalIncome, 'income');

        let totalExpense = 0;
        for(let i = 0; i < result.allSavingsExpensesIncome[1].length; i++){
            totalExpense += parseInt(result.allSavingsExpensesIncome[1][i].amntOfExpenses)
        }
        console.log(totalExpense, 'expense');

        if (totalIncome == 0 && totalExpense == 0 && totalSavings == 0) {
            $('#container').hide();
            alert('No expenses, income or savings inputted.');
            
             
        } else {
            $('#container').show();

            jsonObject = Highcharts.chart('container', {
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
                    y: totalExpense,
                    sliced: true,
                    selected: true 
                  }, {
                    name: 'Income',
                    y: totalIncome,
                  }, {
                    name: 'Savings',
                    y: totalSavings,  
                  }]
                }]
              });
              loggingChart(jsonObject); 
        }

        
    })
    //if the call is failing
    .fail(function (jqXHR, error, errorThrown) {
        console.log(jqXHR);
        console.log(error);
        console.log(errorThrown);
    });
    
   
};

let loggingChart = (jsonObject) => {
    return jsonObject
};


//Nav bar *****************************************
$('.icon').click((event) => {
    event.preventDefault();
    
    let nav = document.getElementById('nav');
    if (nav.className === 'nav-list') {
        nav.className += ' responsive';
    } else {
        nav.className = 'nav-list';
    }
});


// login form ******************
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

    //make api call using payload above
    $.ajax({
        type: 'POST',
        url: 'users/login',
        dataType: 'json',
        data: JSON.stringify(loginUser),
        contentType: 'application/json',
    })
    .done((result) => {
        event.preventDefault();
        $('.activeUser').val(result._id);//gives the id of the user that just logged and will show in the hidden input
        $('#nav-bar').html(navBar());
        questionnairePopulated();
        displayAllIncome(result._id);
        displayAllExpense(result._id);
        displayAllSavings(result._id);
        populateChart (result._id);
    })
    .fail((err, errThrown, jqXHR) => {
        console.log(err);
        console.log(errThrown);
        console.log(jqXHR)
        alert('Uh oh, incorrect username or password.')
    });
}; 
});


// Sign Up Form **************
$('.signup-nav').click((event) => {
    event.preventDefault();
    $('.hideme').hide();
    $('#signup-form').show();
});

//cancel button clicked return to landing page
    $('.cancelbtn').click((event) => {
        event.preventDefault();
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
            $('#nav-bar').html(navBar());
            questionnairePopulated();
            displayAllIncome(result._id);
            displayAllExpense(result._id);
            displayAllSavings(result._id);
            populateChart (result._id);
         })
         //if the call is failing
         .fail(function (jqXHR, error, errorThrown) {
             console.log(jqXHR);
             console.log(error);
             console.log(errorThrown);
         });
    };
});

$('#logout').click(function (event) {
    event.preventDefault();
    location.reload();
});


// Generate questions ****************************
$('#nav-bar').on('click', '#questionnaireBtn', (event) => {
    event.preventDefault();
    questionnairePopulated();
    
});

const questionnairePopulated = () => {
    $('.hideme').hide();
    $('#questions-form').show();
    $('#questions-form').html(generateQuestions());
    $('#submit-btn').hide();
    // $('#question-btns').show();
};


// Log ***********************************************
//const logResults = () => {
//Collapse
    // let coll = document.getElementsByClassName("collapsible");
    // let i;
    
    // for (i = 0; i < coll.length; i++) {
    //   coll[i].addEventListener("click", function() {
    //     this.classList.toggle("active");
    //     let content = this.nextElementSibling;
    //     if (content.style.display === "block") {
    //       content.style.display = "none";
    //     } else {
    //       content.style.display = "block";
    //     }
    //   });
    // }

const showLog = () => {
    $('.hideme').hide();
    $('#log-form').show();
    let username = $('.activeUser').val();
    displayAllIncome(username);
    displayAllExpense(username);
    displayAllSavings(username);
};

    $('#nav-bar').on('click', '.log', (event) => {
        event.preventDefault();
        showLog();
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

//Expense ----
$('.add-expense-results').on('click', '.update-expense-btn', function (event) {
    event.preventDefault();

    //take the input from the user
    const srcOfExpenses = $(this).parent().find('.update-expense-src').val();
    const amntOfExpenses = $(this).parent().find(".update-expense-amnt").val();
    const username = $(".activeUser").val();
    const entryId = $(this).parent().find('.update-expense-id').val();

    //validate the input
    if (srcOfExpenses == "") {
        alert('Please input source of income');
    } else if (amntOfExpenses == "") {
        alert('Please input amount of income');
    } 
    
    //if the input is valid
    else {
        //create the payload object (what data we send to the api call)
        const entryObject = {
            srcOfExpenses: srcOfExpenses,
            amntOfExpenses: amntOfExpenses,
            username: username,
            entryId: entryId,
        };
        console.log(entryObject);

        //make the api call using the payload above
        $.ajax({
                type: 'PUT',
                url: `/expense/${entryId}`,
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

//Savings ---------
$('.add-savings-results').on('click', '.update-savings-btn', function (event) {
    event.preventDefault();

    //take the input from the user
    const srcOfSavings = $(this).parent().find('.update-savings-src').val();
    const amntOfSavings = $(this).parent().find(".update-savings-amnt").val();
    const username = $(".activeUser").val();
    const entryId = $(this).parent().find('.update-savings-id').val();

    //validate the input
    if (srcOfSavings == "") {
        alert('Please input source of income');
    } else if (amntOfSavings == "") {
        alert('Please input amount of income');
    } 
    
    //if the input is valid
    else {
        //create the payload object (what data we send to the api call)
        const entryObject = {
            srcOfSavings: srcOfSavings,
            amntOfSavings: amntOfSavings,
            username: username,
            entryId: entryId,
        };
        console.log(entryObject);

        //make the api call using the payload above
        $.ajax({
                type: 'PUT',
                url: `/savings/${entryId}`,
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


//Delete Entry***************************
//Income-------
$('.add-income-results').on('click', '.delete-income-btn', function (event) {
    event.preventDefault();

    //take the input from the user
    const entryId = $(this).parent().find('.update-income-id').val();
    const username = $(".activeUser").val();

    //make the api call using the payload above
    $.ajax({
            type: 'DELETE',
            url: `/income/${entryId}`,
            dataType: 'json',
            contentType: 'application/json'
        })
        //if call is succefull
        .done(function (result) {
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

//Expense-------
$('.add-expense-results').on('click', '.delete-expense-btn', function (event) {
    event.preventDefault();

    //take the input from the user
    const entryId = $(this).parent().find('.update-expense-id').val();
    const username = $(".activeUser").val();

    //make the api call using the payload above
    $.ajax({
            type: 'DELETE',
            url: `/expense/${entryId}`,
            dataType: 'json',
            contentType: 'application/json'
        })
        //if call is succefull
        .done(function (result) {
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

//Savings-------
$('.add-savings-results').on('click', '.delete-savings-btn', function (event) {
    event.preventDefault();


    //take the input from the user
    const entryId = $(this).parent().find('.update-savings-id').val();
    const username = $(".activeUser").val();

    //make the api call using the payload above
    $.ajax({
            type: 'DELETE',
            url: `/savings/${entryId}`,
            dataType: 'json',
            contentType: 'application/json'
        })
        //if call is succefull
        .done(function (result) {
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


//Email Overview Chart to user****************
// const myform = $("form#send-email-form");

// $('#send-email-form').submit((event) => {
//     event.preventDefault();

//     const service_id = "default_service";
//     const template_id = "template_FAu9A88p";

//     emailjs.sendForm(service_id,template_id,myform[0])
//         .then(function(){ 
//           alert("Sent!");
//          //myform.find("button").text("Send");
//       }, function(err) {
//          alert("Send email failed!\r\n Response:\n " + JSON.stringify(err));
//          //myform.find("button").text("Send");
//       });
//     return false;
// });



// Footer and copyright ************
    let d = new Date()
    $('#copyright').text(`Copyright \u00A9 ${d.getFullYear()}  Lou Zuniga`)


const watchForm = () => {
    //logResults();
    // googleTranslateElementInit();
    //copyright();
    //chart();
    //nextQuestion();
    //submitResults();
    //loggingChart();
    
};


$(watchForm);