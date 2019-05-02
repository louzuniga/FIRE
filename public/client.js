'use strict'


//////////////////////////////////////////////
////////////functions, objects and variables////////////////////////
//////////////////////////////////////////////

function isValidEmailAddress(emailAddress) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
}

function searchUserNameDuplicates(username, email, password) {
    $.ajax({
        type: 'GET',
        url: `/check-duplicates/${username}/${email}`,
        dataType: 'json',
        contentType: 'application/json'
    })
        //if call is succefull
        .done((result) => {
            if (result.output !== undefined) {
                if (result.output.username == username) {
                    alert('Duplicate username');
                } else if (result.output.name == email) {
                    alert('Duplicate email');
                }
            }
            else {
                //create the payload object (what data we send to the api call)
                const newUserObject = {
                    email: email,
                    username: username,
                    password: password,
                };

                //make the api call using the payload above
                $.ajax({
                    type: 'POST',
                    url: '/auth/signup',
                    dataType: 'json',
                    data: JSON.stringify(newUserObject),
                    contentType: 'application/json'
                })
                    //if call is succefull
                    .done(function (result) {
                        console.log(result);
                        $('.activeUserID').val(result.body.id);
                        $('.activeUserName').val(result.body.username);
                        $('#nav-bar').html(navBar());
                        questionnairePopulated();
                        displayAllIncome(result.body.id);
                        displayAllExpense(result.body.id);
                        displayAllSavings(result.body.id);
                        localStorage.setItem('activeUserID', result.body.id);
                        localStorage.setItem('activeUserName', result.body.username);
                    })
                    //if the call is failing
                    .fail(function (jqXHR, error, errorThrown) {
                        console.log(jqXHR);
                        console.log(error);
                        console.log(errorThrown);
                    });
            }

        })

        //if the call is failing
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
};

//GET AJAX request from user Income user entries
function displayAllIncome(username) {

    if ((username == "") || (username == undefined) || (username == null)) {
        username = $('.activeUserName').val();
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
                $('.add-income-results').append

                    (`
                <div>
                <form class="update-income-form hideme">
                <button type="button" class="update-income-btn added-btn">Update</button>
                <button type="button" class="delete-income-btn added-btn">Delete</button>
                <br/>
    
                <input type="text" class="update-income-src update" value="${result.entries[i].srcOfIncome}">
    
                <input type="text" class="update-income-amnt update" value="${result.entries[i].amntOfIncome}">

                <input type="hidden" class="update-income-id" value="${result.entries[i]._id}">
                </form> 
                </div>
                `)
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
        username = $('.activeUserName').val();
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
                $('.add-expense-results').append

                    (`
                <div>
                <form class="update-expense-form hideme">
                <button type="button" class="update-expense-btn added-btn">Update</button>
                <button type="button" class="delete-expense-btn added-btn">Delete</button>
                <br/>
    
                <input type="text" class="update-expense-src update" value="${result.entries[i].srcOfExpenses}">
    
                <input type="text" class="update-expense-amnt update" value="${result.entries[i].amntOfExpenses}">

                <input type="hidden" class="update-expense-id" value="${result.entries[i]._id}">
                </form> 
                </div>
                `)
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
        username = $('.activeUserName').val();
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
                $('.add-savings-results').append

                    (`
                <div>
                <form class="update-savings-form hideme">
                <button type="button" class="update-savings-btn added-btn">Update</button>
                <button type="button" class="delete-savings-btn added-btn">Delete</button>
                <br/>
    
                <input type="text" class="update-savings-src update" value="${result.entries[i].amntOfSavings}">
    
                <input type="text" class="update-savings-amnt update" value="${result.entries[i].amntOfSavings}">

                <input type="hidden" class="update-savings-id" value="${result.entries[i]._id}">
                </form> 
                </div>
                `)
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
    <a id="questionnaireBtn">Questionnaire</a>
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
    let activeUserName = $('.activeUserName').val();
    let activeUserID = $('.activeUserID').val();
    populateChart(activeUserName);

};


//Populate High Chart PIE chart**********************
function populateChart() {
    const username = $('.activeUserName').val();
    let jsonObject = '';

    $.ajax({
        type: 'GET',
        url: `/populate-chart/${username}`,
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
                if (totalIncome < 0 && totalSavings > 0) {
                    outputText += '<b>Unfortunately, you fall in the negative income cashflow and it cannot be accounted for on the chart. However, you have postive savings. Great job!</b><br>';
                } else if (totalIncome < 0) {
                    outputText = '<b>Unfortunately, you fall in the negative income cashflow and it cannot be accounted for on the chart.</b><br>';
                }
                outputText += `Your overall income of $${rawIncome} is split into these categories:`;

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
                            name: `${username}'s FIRE Overview`,
                            data: [
                                {
                                    name: `Residual Income $${totalIncome}`, y: totalIncome, sliced: true,
                                    selected: true
                                },
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
    let activeUserID = $('.activeUserID').val();
    let activeUserName = $('.activeUserName').val();
    displayAllIncome(activeUserName);
    displayAllExpense(activeUserName);
    displayAllSavings(activeUserName);
};

//////////////////////////////////////////////
////////////triggers////////////////////////
//////////////////////////////////////////////

$(document).ready(function () {

    console.log(JSON.stringify(localStorage));
    
    //user persistance - user is logged in
    if (((localStorage.activeUserName) && (localStorage.activeUserName !== "")) || ((localStorage.activeUserID) && (localStorage.activeUserID !== ""))) {
        console.log("user is logged in");
        console.log(localStorage.activeUserName);
        console.log(localStorage.activeUserID);
        $('.activeUserID').val(localStorage.activeUserID);
        $('.activeUserName').val(localStorage.activeUserName);
        $('#nav-bar').html(navBar());
        showLog();
    }
    //user persistance - user is NOT logged in
    else {
        console.log("user is NOT logged in");
        $('.hideme').hide();
        $('#login').show();
    }
});

$('.see-results').click((event) => {
    event.preventDefault();
    seeResults();
});

$('#nav-bar').on('click', '#results', (event) => {
    event.preventDefault();
    seeResults();
});



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
    const activeUserID = $('.activeUserID').val();
    const activeUserName = $('.activeUserName').val();

    if (loginUsername === '') {
        alert('Please input username');
    } else if (password === '') {
        alert('Please enter password');
    } else {
        const loginUser = {
            username: loginUsername,
            password: password,
            activeUserID: activeUserID,
            activeUserName: activeUserName,
        };

        //make api call using payload above
        $.ajax({
            type: 'POST',
            url: '/auth/login',
            dataType: 'json',
            data: JSON.stringify(loginUser),
            contentType: 'application/json',
        })
            .done((result) => {
                console.log(result);
                $('.activeUserID').val(result.body.id);//gives the id of the user that just logged and will show in the hidden input
                $('.activeUserName').val(result.body.username);//gives the id of the user that just logged and will show in the hidden input
                $('#nav-bar').html(navBar());
                questionnairePopulated();
                displayAllIncome(result.body.id);
                displayAllExpense(result.body.id);
                displayAllSavings(result.body.id);
                localStorage.setItem('activeUserID', result.body.id);
                localStorage.setItem('activeUserName', result.body.username);
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

    //validate the input
    if (email === "") {
        alert('Please add an Email Adress');
    } else if (!isValidEmailAddress(email)) {
        alert('invalid email address')
    } else if (username === "") {
        alert('Please add an user name');
    } else if (password === "") {
        alert('Please add a password');
    } else if (password.length < 8) {
        alert('Password needs to be atleast 8 characters');
    }
    //if the input is valid
    else {
        searchUserNameDuplicates(username, email, password);
    };
});

$('#nav-bar').on('click', '.logout', (event) => {
    event.preventDefault();
    location.reload();
    localStorage.setItem('activeUserID', '');
    localStorage.setItem('activeUserName', '');
});


// Generate questions ****************************
$('#nav-bar').on('click', '#questionnaireBtn', (event) => {
    event.preventDefault();
    questionnairePopulated();

});


$('#nav-bar').on('click', '.log', (event) => {
    event.preventDefault();
    showLog();
});

//Add Income in DB--------------
$('.income-add-btn').click((event) => {
    event.preventDefault();

    //input from user
    const srcOfIncome = $('.income-src').val();
    const amntOfIncome = $('.income-amnt').val();
    let username = $('.activeUserName').val();

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
$('.expense-add-btn').click((event) => {
    event.preventDefault();

    const srcOfExpenses = $('.expense-src').val();
    const amntOfExpenses = $('.expense-amnt').val();
    let username = $('.activeUserName').val();

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
$('.savings-add-btn').click((event) => {
    event.preventDefault();

    //input from user
    const srcOfSavings = $('.savings-src').val();
    const amntOfSavings = $('.savings-amnt').val();
    let username = $('.activeUserName').val();

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
    const username = $('.activeUserName').val();
    const entryId = $(this).parent().find('.update-income-id').val();


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
$('.update-expense-btn').click(function (event) {
    event.preventDefault();

    //take the input from the user
    const srcOfExpenses = $(this).parent().find('.update-expense-src').val();
    const amntOfExpenses = $(this).parent().find(".update-expense-amnt").val();
    const username = $('.activeUserName').val();
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
    const username = $('.activeUserName').val();
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
    const username = $('.activeUserName').val();

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
    const username = $('.activeUserName').val();

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
    const username = $('.activeUserName').val();

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

