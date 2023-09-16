/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list, page){
   const itemsPerPage = 9;

   startIndex = (page * itemsPerPage) - itemsPerPage
   endIndex = page * itemsPerPage

   const studentList = document.querySelector(".student-list")

   studentList.innerHTML = '';
   
   // iterate through length of list and index into each student data object
   for(let i = 0; i < list.length; i++){
      if (i >= startIndex && i < endIndex){
         const student = data[i]
         
         const studentItem =`
               <li class="student-item cf">
                  <div class="student-details">
                     <img class="avatar" src="https://randomuser.me/api/portraits/women/25.jpg" alt="Profile Picture">
                     <h3>${student.name.first} ${student.name.last}</h3>
                     <span class="email">${student.email}</span>
                  </div>
                     <div class="joined-details">
                     <span class="date">${student.registered.date}</span>
                  </div>
            </li>
         `;
         // insert student info into html before the end of the ul element 
         studentList.insertAdjacentHTML('beforeend', studentItem)
      }
   }
}


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPagination(list){
   const numOfPages = Math.ceil(list.length / 9)
   const linkList = document.querySelector(".link-list")
   linkList.innerHTML = ''

   // add each page number by iterating through the number of pages needed
   for(let i = 1; i <= numOfPages; i++){
      const button = `
      <li>
            <button type="button">${i}</button>
      </li>
      `
      linkList.insertAdjacentHTML('beforeend', button)
   }
   const firstButton = linkList.querySelector('button')
   firstButton.className = 'active'

   linkList.addEventListener("click", (e) => {
      if (e.target.tagName === 'BUTTON'){
         // iterate through all buttons and remove class name of 'active'
         for(const button of linkList.querySelectorAll('button')){
            button.classList.remove('active')
         }
         e.target.classList.add('active')
         // convert string to int to be usuable for showPage function
         const page = parseInt(e.target.textContent)
         showPage(list, page)
      }
   })
}

// add search bar
function addSearchBar(){
   // create a label element
   const label = document.createElement('label');
   label.setAttribute('for', 'search');
   label.classList.add('student-search');

   // create span element for text input
   const span = document.createElement('span');
   span.textContent = 'Search By Name';

   // create input tag for user input
   const input = document.createElement('input');
   input.setAttribute('id', 'search');
   input.setAttribute('placeholder', 'Search By Name')


   // create button element for search bar
   const button = document.createElement('button');
   button.setAttribute('type', 'button');

   // search icon 
   const img = document.createElement('img');
   img.setAttribute('src', 'img/icn-search.svg');
   img.setAttribute('alt', 'Search Icon');

   // append children elements for search bar
   button.appendChild(img)
   label.appendChild(span)
   label.appendChild(input)
   label.appendChild(button)

   // place search bar at top of dom 
   const header = document.querySelector('.header');
   header.appendChild(label)
}

function performSearch() {
   const searchInput = document.getElementById('search');
   const searchValue = searchInput.value.toLowerCase();
   const matchingStudents = [];
   
   // filter resultes based on name
   for (let i = 0; i < data.length; i++){
      const fullName = `${data[i].name.first.toLowerCase()} ${data[i].name.last.toLowerCase()}`;
      if (fullName.includes(searchValue)) {
        matchingStudents.push(data[i]);
      }
    }

   //  if no matches found
   if (matchingStudents.length === 0) {
      noResultsMessage();
    } else {
      removeNoResultsMessage();
    }

       //  show results and paginate 
   showPage(matchingStudents, 1);
   addPagination(matchingStudents);
 
  }
   
   // show message to user 
   function noResultsMessage() {
      const studentList = document.querySelector('.student-list');
      const noResultsText = document.createElement('p');
      noResultsText.textContent = 'No results found.';
      noResultsText.classList.add('no-results-message');
      studentList.appendChild(noResultsText);
   }
   
   // remove no results message
   function removeNoResultsMessage() {
      const noResultsMessage = document.querySelector('.no-results-message');
      if (noResultsMessage) {
        noResultsMessage.remove();
      }
    }

// Call functions
addSearchBar();
showPage(data, 1);
addPagination(data);

// event listeners
const search = document.getElementById('search');
search.addEventListener('input', () => {performSearch();})

const button = document.querySelector('student-search button')
button.addEventListener('click', () => {performSearch();})