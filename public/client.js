'use strict'

$('.hideme').hide();
$('#login').show();

//GET AJAX request from user Income user entries
function displayAllIncome(username) {

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
        .done((result) => {
            $('.income-log').each(function () {
                this.reset();
            });

            $('.add-income-results').html(''); //reset income before adding a new one

            for (let i = 0; i < result.entries.length; i++) {
                $('.add-income-results').prepend

                    (`<tr class="collapsible expand">
                <td> 
    
                <form class="update-income-form hideme">
                <button type="button" class="update-income-btn btn">Update</button>
                <button type="button" class="delete-income-btn btn">Delete</button>
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


function displayAllExpense(username) {
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
        .done((result) => {
            $('.income-log').each(function () {
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
                <label>Type of Expense</label>
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

function displayAllSavings(username) {

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
        .done((result) => {
            $('.income-log').each(function () {
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
                <label>Type of Savings</label>
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
    <a href="/" class="logout">Logout</a>
    <a id="questionnaireBtn">Questionaire</a>
    <a class="log">Log</a>
    <a id="results">Overview</a>
    <a class="icon">
        <i class="fa fa-bars"></i>
    </a>
</div>`
};


//High Chart ************
const seeResults = () => {
    $('.hideme').hide();
    $('#container').show();
    $('#results-container').show();
    let username = $('.activeUser').val();
    populateChart(username);
    
};

$('.see-results').click((event) => {
    event.preventDefault();
    seeResults();
});

$('#nav-bar').on('click', '#results', (event) => {
    event.preventDefault();
    seeResults();
});

//Populate High Chart PIE chart**********************
function populateChart(userID) {
    const loginUsername = $('.loginUsername').val();
    let jsonObject = '';

    $.ajax({
        type: 'GET',
        url: `/populate-chart/${userID}`,
        dataType: 'json',
        contentType: 'application/json'
    })
        //if call is succesfull
        .done(function (result) {
            //result.allSavingsExpensesIncome.forEach((result) => console.log(result));

            let rawIncome = 0;
            for (let i = 0; i < result.allSavingsExpensesIncome[0].length; i++) {
                rawIncome += parseInt(result.allSavingsExpensesIncome[0][i].amntOfIncome)
            }

            let totalSavings = 0;
            for (let i = 0; i < result.allSavingsExpensesIncome[2].length; i++) {
                totalSavings += parseInt(result.allSavingsExpensesIncome[2][i].amntOfSavings)
            }

            let totalExpense = 0;
            for (let i = 0; i < result.allSavingsExpensesIncome[1].length; i++) {
                totalExpense += parseInt(result.allSavingsExpensesIncome[1][i].amntOfExpenses)
            }

            let totalIncome = rawIncome - totalExpense - totalSavings

            if (totalIncome == 0 && totalExpense == 0 && totalSavings == 0) {
                $('#container').hide();
                alert('No expenses, income or savings inputted.');
            } else {
                $('#container').show();
            
            let outputText = ``;
            if(totalIncome < 0 && totalSavings > 0) {
                outputText += '<b>Unfortunately, you fall in the negative income cashflow and it cannot be accounted for on the chart. However, you have postive savings. Great job!</b><br>';
            }else if (totalIncome < 0) {
                outputText = '<b>Unfortunately, you fall in the negative income cashflow and it cannot be accounted for on the chart.</b><br>';
            }
            outputText += `Your overall income of $${rawIncome} is split into three categories:`;

                //Build the Chart------------------
                jsonObject = 
                Highcharts.chart('container', {
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                    },
                    title: {
                        text: outputText
                    },
                    tooltip: {
                        pointFormat: `{series.name}: <b>{point.percentage:.1f}%</b>`
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                style: {
                                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                },
                                connectorColor: 'silver'
                            }
                        }
                    },
                    series: [{
                        name: `${loginUsername}'s FIRE Overview`,
                        data: [
                            { name: `Residual Income $${totalIncome}`, y: totalIncome, sliced: true,
                            selected: true },
                            { name: `Savings $${totalSavings}`, y: totalSavings },
                            { name: `Expense $${totalExpense}`, y: totalExpense },
                        ],
                        showInLegend: true
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
$('#nav-bar').on('click', (event) => {
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

    const loginUsername = $('.loginUsername').val();
    const password = $('.loginPassword').val();

    if (loginUsername === '') {
        alert('Please input username');
    } else if (password === '') {
        alert('Please enter password');
    } else {
        const loginUser = {
            username: loginUsername,
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
                //populateChart(result._id);
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
$('#signup-form').submit(function (event) {
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
                //populateChart(result._id);
            })
            //if the call is failing
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    };
});

$('#nav-bar').on('click', '.logout', (event) => {
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
$('.income-log').submit((event) => {
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
            .done((result) => {
                displayAllIncome(username) //after the income is added display the username
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
            .done((result) => {
                displayAllExpense(username);

                $('.expenses-log').each(function () {
                    this.reset();
                });
            });
    };
});

// Add Savings in DB******
$('.savings-log').submit((event) => {
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
            .done((result) => {
                displayAllSavings();

                $('.savings-log').each(function () {
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


// Footer and copyright ************
let d = new Date()
$('#copyright').text(`Copyright \u00A9 ${d.getFullYear()}  Lou Zuniga`)

