var email = document.querySelector('#resetloginEmail').value;
                          
$("#resetEmail").on("submit", function (e) {
        e.preventDefault();

        const email = $('#resetloginEmail').val();
        console.log(email);
        
        firebase.auth().sendPasswordResetEmail(email)
        .then(function() {
            alert('Reset link has been sent to provided email address');
            window.location.replace("./index.html");
        })
    });