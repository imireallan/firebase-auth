const guides = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const adminItems = document.querySelectorAll('.admin');


const setupUI = user => {
    if(user) {
        if(user.admin) {
            adminItems.forEach( item => item.style.display = 'block')
        }
        // display account accountDetails
        db.collection('users').doc(user.uid).get().then(doc => {
            const html = `
            <div>Logged in as: ${user.email}</div>
            <div>Bio: ${doc.data().bio}</div>
            <div class="pink-text">${ user.admin ? 'Admin': ''}</div>
        `
            accountDetails.innerHTML = html 
        })


        // toggle links
        loggedInLinks.forEach( li => {
            li.style.display = 'block'
        })
        loggedOutLinks.forEach( li => {
            li.style.display = 'none'
        })
    } else {
        // hide account info
        adminItems.forEach( item => item.style.display = 'none')
        accountDetails.innerHTML = ''
        loggedInLinks.forEach( li => {
            li.style.display = 'none'
        })
        loggedOutLinks.forEach( li => {
            li.style.display = 'block'
        })
    }
}

const setupGuides = data => {
    let html = '';
    if(data && data.length) {
        data.forEach( doc => {
            const guide = doc.data()
            let li = `
            <li>
                <div class="collapsible-header grey lighten-4">${guide.title}</div>
                <div class="collapsible-body white">${guide.content}</div>
            </li>
            `
            html += li  
        })
        guides.innerHTML = html
    } else {
        guides.innerHTML = '<h5 class="center-align">Log in to view the guides.</>'
    }

}


// setting up materialize components
document.addEventListener('DOMContentLoaded', () => {
    let modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    let items = document.querySelectorAll('.collapsible')
    M.Collapsible.init(items)
})