

// tracking the auth status
auth.onAuthStateChanged(user => {
    if(user) {
        // getting the documents
        db.collection('guides').onSnapshot( snapshot => { 
            setupGuides(snapshot.docs)
            setupUI(user)
        }, error => { console.error(error)})
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
        M.toast({html: 'User registration was successfull', classes: 'success'})
    }).catch(e => {
        M.toast({html: e.message, classes: 'error'})
    })
})

// logout
const logout = document.querySelector('#logout')
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        M.toast({html: 'User logged out successfully', classes: 'success'})
    }).catch(e => {
        M.toast({html: e.message, classes: 'error'})
    })
})

// login
const loginForm = document.querySelector('#login-form')

loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const modal = document.querySelector('#modal-login')

    // get user info
    const email = loginForm['login-email'].value
    const password = loginForm['login-password'].value

    // login the user
    auth.signInWithEmailAndPassword(email, password).then( cred => {
        
        // close the modal form and reset the form
        
        M.Modal.getInstance(modal).close()
        loginForm.reset()
        M.toast({html: 'User logged in successfully', classes: 'success'})
    }).catch(e => {
        M.Modal.getInstance(modal).close()
        loginForm.reset()
        M.toast({html: e.message, classes: 'error'})
    })
})


// adding a guide
const createForm = document.querySelector('#create-form')

createForm.addEventListener('submit', e => {
    e.preventDefault();
    const modal = document.querySelector('#modal-create')

    db.collection('guides').add({
        title: createForm['title'].value,
        content: createForm['content'].value
    }).then( () => {

        // close the modal form and reset the form
        M.Modal.getInstance(modal).close()
        createForm.reset()
        M.toast({html: 'Guide created', classes: 'success'})
    }).catch(e => {
        M.Modal.getInstance(modal).close()
        createForm.reset()
        M.toast({html: e.message, classes: 'error'})
    })
})