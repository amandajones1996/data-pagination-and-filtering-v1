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
         studentList.insertAdjacentHTML('beforeend', studentItem)
      }
   }
}


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPagination(list){
   const pagesNeeded = Math.ceil(list.length / 9)
   const linkList = document.querySelector(".link-list")
   linkList.innerHTML = ''

   for(let i = 1; i <= pagesNeeded; i++){
      const button = `
      <li>
            <button>${i}</button>
      </li>
      `
      linkList.insertAdjacentHTML('beforeend', button)
   }
   const firstButton = linkList.querySelector('button')
   firstButton.className = 'active'

   linkList.addEventListener("click", (e) => {
      if (e.target.tagName === 'BUTTON'){
         for(const button of linkList.querySelectorAll('button')){
            button.classList.remove('active')
         }
         e.target.classList.add('active')
         const page = parseInt(e.target.textContent)
         showPage(list, page)
      }
   })
}

// Call functions
showPage(data, 1);
addPagination(data)