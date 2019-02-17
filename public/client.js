'use strict'

$('.login').submit ((event) => {
    event.preventDefault();

    const username = $('loginUsername').val();
    const password = $('loginPassword').val();

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

// footer and copyright
const copyright = () => {
    let d = new Date()
    $('#copyright').text(`Copyright \u00A9 ${d.getFullYear()}  Lou Zuniga`)
};

copyright();

