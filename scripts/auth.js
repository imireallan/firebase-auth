// add admin cloud function

const adminForm = document.querySelector('.admin-actions')

adminForm.addEventListener('submit', e => {
    e.preventDefault();
    const adminEmail = adminForm['admin-email'].value
    const addAdminRole = functions.httpsCallable('addAdminRole');

    addAdminRole({email: adminEmail}).then(result => {
        M.toast({ html: result.data.message, classes: 'success'})
        adminForm.reset()
    })
})

// tracking the auth status
auth.onAuthStateChanged(user => {
    if(user) {
        user.getIdTokenResult().then( idTokenResult => {
            user.admin = idTokenResult.claims.admin;
            setupUI(user)
        })
        
        // getting the documents
        db.collection('guides').onSnapshot( snapshot => { 
            setupGuides(snapshot.docs)
        }, error => { console.error(error.message)})
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
    const bio = signUp['signup-bio'].value

    // sign up the user
    auth.createUserWithEmailAndPassword(email, password).then( cred => {

        // creating a user collection
        return db.collection('users').doc(cred.user.uid).set({
            bio
        });
    }).then(() => {
        // close the modal form and reset the form
        const modal = document.querySelector('#modal-signup')
        M.Modal.getInstance(modal).close()
        signUp.reset()
        signUp.querySelector('.error').innerHTML = ''
        M.toast({html: 'User registration was successfull', classes: 'success'})
    })
    .catch(e => {
        signUp.querySelector('.errors').innerHTML = e.message
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
        loginForm.querySelector('.errors').innerHTML = ''
        M.toast({html: 'User logged in successfully', classes: 'success'})
    }).catch(e => {
        loginForm.querySelector('.errors').innerHTML = e.message
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