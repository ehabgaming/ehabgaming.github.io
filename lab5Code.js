

function sumbitForm()
{
    let Correct = true;
    const firstname = document.getElementById('fname').value;
    const lastName = document.getElementById('lname').value;
    const Email = document.getElementById('Email').value;
    const password = document.getElementById('Password').value;
    const dob = document.getElementById('dob').value;

    if(!firstname || !lastName || !Email || !password || !dob)
    {
        Correct = false;
    }

    if(!password.includes('!') && !password.includes('?'))
    {
        Correct = false;
    }

    let user = {
        FirstName: firstname,
        LastName: lastName,
        email : Email,
        Password: password,
        DateOfBirth: dob
    };

    const maskedPassword = user.Password.replace(/./g, '*');

    if(Correct == true)
    {
        document.getElementById("results").innerHTML = `
        <h3 style="color: white;">Registration Successful!</h3>
        <p style="color: white;">Name: ${user.FirstName} ${user.LastName}</p>
        <p style="color: white;">Email: ${user.email}</p>
        <p style="color: white;">Password: ${maskedPassword}</p>
        <p style="color: white;">Date of Birth: ${user.DateOfBirth}</p>
        `;
    }
    else
    {
        document.getElementById("results").innerHTML =  `
        <h3 style="color: white;">Registration Fail!</h3>
        <p style="color: white;">Please make sure all fields are filled and password includes ! or ?</p>
        `;
    }
}