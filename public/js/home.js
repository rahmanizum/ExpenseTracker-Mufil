//FOR SIGN UP 
const form1 = document.querySelector("#myForm1");
const signupbtn = form1.querySelector('#signup');
const usernameDiv1 = form1.querySelector('#usernameDiv1');
const successDiv1 = form1.querySelector('#successDiv1');
const passwordDiv1 = form1.querySelector('#passwordDiv1');
const Name = form1.querySelector('#Name');
const userName = form1.querySelector('#userName');
const password1 = form1.querySelector('#password1');
const password2 = form1.querySelector('#password2');
signupbtn.addEventListener('click', onSignup);
async function onSignup(e) {
    try {
        if (e.target && e.target.classList.contains("submit") && form1.checkValidity()) {
            e.preventDefault();
            if (password1.value != password2.value) {
                passwordDiv1.classList.remove('d-none');
                passwordDiv1.classList.add('d-block');
                setTimeout(() => {
                    passwordDiv1.classList.remove('d-block');
                    passwordDiv1.classList.add('d-none');
                }, 3000);
            } else {
                const data = {
                    Name: Name.value,
                    userName: userName.value,
                    password1: password1.value,
                };
                const response = await axios.post("http://192.168.29.221:6565/user/signup", data);
                successDiv1.classList.remove('d-none');
                successDiv1.classList.add('d-block');
                setTimeout(() => {
                    successDiv1.classList.remove('d-block');
                    successDiv1.classList.add('d-none');
                    window.location.href = "http://192.168.29.221:6565/home";
                }, 3000);
            }
        }     
    } catch (error) {
        if (error.response && error.response.status === 401) {
            e.preventDefault();
            console.log("Authentication failed. User is already exist.");
            usernameDiv1.classList.remove('d-none');
            usernameDiv1.classList.add('d-block');
            setTimeout(() => {
                usernameDiv1.classList.remove('d-block');
                usernameDiv1.classList.add('d-none');
            }, 3000);
        } else {
            console.error("An error occurred:", error);
        }
    }
}

//FOR SIGNIN 
const form2 = document.querySelector("#myForm2");
const signinbtn = form2.querySelector('#signin');
const usernameDiv2 = form2.querySelector('#usernameDiv2');
const successDiv2 = form2.querySelector('#successDiv2');
const passwordDiv2 = form2.querySelector('#passwordDiv2');
const Name2 = form2.querySelector('#Name');
const loguserName = form2.querySelector('#loguserName');
const logpassword = form2.querySelector('#logpassword');
signinbtn.addEventListener('click', onSignin);

async function onSignin(e) {
    try {
        if (e.target && e.target.classList.contains("submit") && form2.checkValidity()) {
            e.preventDefault();
            const data = {
                userName: loguserName.value,
                password: logpassword.value,
            };
            const isValidUser = await axios.post("http://192.168.29.221:6565/user/signin", data);
            if(isValidUser && isValidUser.status === 200){
                e.preventDefault();
                localStorage.setItem('token', JSON.stringify({name:isValidUser.data.user.name,token:isValidUser.data.token}));
                successDiv2.classList.remove('d-none');
                successDiv2.classList.add('d-block');
                setTimeout(() => {
                    successDiv2.classList.remove('d-block');
                    successDiv2.classList.add('d-none');
                    window.location.href = `http://192.168.29.221:6565/user`;
                }, 1000);

            }
        }

    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.log("Authentication failed. User is not found.");
            usernameDiv2.classList.remove('d-none');
            usernameDiv2.classList.add('d-block');
            setTimeout(() => {
                usernameDiv2.classList.remove('d-block');
                usernameDiv2.classList.add('d-none');
            }, 3000);
        } else if (error.response && error.response.status === 401) {
            console.log("Authentication failed. User is unauthorized.");
            e.preventDefault();
            passwordDiv2.classList.remove('d-none');
            passwordDiv2.classList.add('d-block');
            setTimeout(() => {
                passwordDiv2.classList.remove('d-block');
                passwordDiv2.classList.add('d-none');
            }, 3000);
        } else {
            console.error("An error occurred:", error);
        }
    }
}