const guides = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');


const setupUI = user => {
    if(user) {
        // display account accountDetails
        const html = `
            <div>Logged in as: ${user.email}</div>
        `
        accountDetails.innerHTML = html


        // toggle links
        loggedInLinks.forEach( li => {
            li.style.display = 'block'
        })
        loggedOutLinks.forEach( li => {
            li.style.display = 'none'
        })
    } else {
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