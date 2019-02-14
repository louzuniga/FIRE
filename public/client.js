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
    // $.ajax({
    //     type: 'POST',
    //     url: 'users/login',
    //     dataType: 'json',
    //     data: JSON.stringify(loginUser),
    //     contentType: 'application/json',
    // })
    // .done((result) => {
    //     console.log(result);
    // })

    };

});