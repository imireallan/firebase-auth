

// tracking the auth status
auth.onAuthStateChanged(user => {
    if(user) {
        // getting the documents
        db.collection('guides').get().then( snapshot => { 
            setupGuides(snapshot.docs)
            setupUI(user)
        })
    } else {
        // getting the documents
        setupGuides([])
        setupUI()
    }
    
})



// signup
const signUp = document.querySelector('#signup-form')

signUp.addEventListener('submit', e => {
    e.preventDefault();

    // get user info
    const email = signUp['signup-email'].value
    const password = signUp['signup-password'].value

    // sign up the user
    auth.createUserWithEmailAndPassword(email, password).then( cred => {

        // close the modal form and reset the form
        const modal = document.querySelector('#modal-signup')
        M.Modal.getInstance(modal).close()
        signUp.reset()
        M.toast({html: 'User registration successful', classes: 'success'})
    }).catch(() => {
        M.toast({html: 'Something went wrong', classes: 'error'})
    })
})

// logout
const logout = document.querySelector('#logout')
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        M.toast({html: 'User logged out successful', classes: 'success'})
    }).catch(() => {
        M.toast({html: 'Something went wrong', classes: 'error'})
    })
})

// login
const loginForm = document.querySelector('#login-form')

loginForm.addEventListener('submit', e => {
    e.preventDefault();

    // get user info
    const email = loginForm['login-email'].value
    const password = loginForm['login-password'].value

    // login the user
    auth.signInWithEmailAndPassword(email, password).then( cred => {
        
        // close the modal form and reset the form
        const modal = document.querySelector('#modal-login')
        M.Modal.getInstance(modal).close()
        loginForm.reset()
        M.toast({html: 'User logged in successfully', classes: 'success'})
    }).catch(() => {
        M.toast({html: 'Something went wrong', classes: 'error'})
    })
})