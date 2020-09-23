/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering

Coded by Morgan Olsen, September 2020.
*/

// Amount of items per page, if ever needed to change.
const itemsPerPage = 9;

let searchField = document.querySelector('#search');
let searchButton = document.querySelector('.student-search button');
const pagination = document.querySelector('ul.link-list');
const ul = document.querySelector('ul.student-list');
let currentList = data;


/**
 * Creates a DOM element and assigns an optional class and an optional variable.
 * 
 * @param {string} type - The type of element to create
 * @param {string} className - (Optional) The class to assign to the element
 * @param {string} variable - (Optional) A variable to set on the element
 * @param {string} value - (Optional) The value of the variable to set on the element
 * @returns {object} - Created element object
 */
function createElement(type, className = '', variable = '', value = '')
{
   const element = document.createElement(type);
   if(className.length > 0){
      element.className = className;
   }
   if(variable.length > 0){
      element[variable] = value;
   }
   return element;
}


/**
 * Uses the above createElement function to create a DOM element and then appends it to a parent element.
 * 
 * @param {object} appendTo - The parent to append the new element to.
 * @param {string} type - The type of element to create
 * @param {string} className - (Optional) The class to assign to the element
 * @param {string} variable - (Optional) A variable to set on the element
 * @param {string} value - (Optional) The value of the variable to set on the element
 * @returns {object} - Created element object
 */
function createAppendElement(appendTo, type, className = '', variable = '', value = '')
{
   element = createElement(type, className, variable, value);
   appendTo.appendChild(element);
   return element;
}

/**
 * Shows itemsPerPage amount of students on the page.
 * 
 * @param {array} list - The list of students to display
 * @param {number} page - The current page number to display
 */
function showPage(list, page) {
   const startIndex = (page * itemsPerPage) - itemsPerPage;
   const endIndex = page * itemsPerPage - 1;
   
   ul.innerHTML = '';
   for(let i = 0; i < list.length; i++){
      if(i >= startIndex && i <= endIndex)
      {
         const student = list[i];
         const li = createAppendElement(ul, 'li', 'student-item cf');

         const detailsDiv = createAppendElement(li, 'div', 'student-details');

         const img = createAppendElement(detailsDiv, 'img', 'avatar', 'src', student.picture.medium);
         img.alt = 'Profile Picture';
         createAppendElement(detailsDiv, 'h3', undefined, 'textContent', `${student.name.first} ${student.name.last}`);
         createAppendElement(detailsDiv, 'span', 'email', 'textContent', student.email);

         const joinedDiv = createAppendElement(li, 'div', 'joined-details');
         createAppendElement(joinedDiv, 'span', 'date', 'textContent', student.registered.date);
      }
   }
}


/**
 * Adds pagination to the bottom of the page based on a list.
 * 
 * @param {array} list - The list of students to display 
 * @returns {number} - The amount of pagination buttons created.
 */
function addPagination(list) {
   const neededButtons = Math.ceil(list.length / 9);
   pagination.innerHTML = '';
   if(neededButtons <= 1){
      return 0;
   }
   for(let i = 0; i < neededButtons; i++){
      const li = createAppendElement(pagination, 'li');
      const button = createAppendElement(li, 'button', undefined, 'textContent', i+1);
   }
   return neededButtons;
}

/**
 * Creates a search bar on top of the page.
 */
function addSearchBar() {
   const header = document.querySelector('header.header');
   const label = createAppendElement(header, 'label', 'student-search', 'for', 'search');
   
   const input = createAppendElement(label, 'input', undefined, 'id', 'search');
   input.placeholder = 'Search by name...';

   const button = createAppendElement(label, 'button', undefined, 'type', 'button');

   const img = createAppendElement(button, 'img', undefined, 'src', 'img/icn-search.svg');
   img.alt = 'Search icon';

   searchField = document.querySelector('#search');
   searchButton = document.querySelector('.student-search button');
}

/**
 * Performs a search in the given list and lists the students on the page.
 * 
 * @param {array} list - The list of students to search in.
 */
function search(list) {
   const searchString = searchField.value;
   const newList = [];
   if(searchString.length > 0)
   {
      for(let i = 0; i < list.length; i++)
      {
         const fullname = `${list[i].name.first} ${list[i].name.last}`;
         if(fullname.toLowerCase().includes(searchString.toLowerCase()) || list[i].email.toLowerCase().includes(searchString))
         {
            newList.push(list[i]);
         }
      }
      
      showPage(newList, 1);
      const pages = addPagination(newList);
      currentList = newList;
      if(pages > 0){
         pagination.firstElementChild.firstElementChild.className = 'active';
      }

      if(newList.length === 0)
      {
         const li = createAppendElement(ul, 'li', 'student-item', 'textContent', 'No results found');
      }
   }else{
      showPage(list, 1);
      addPagination(list);
      currentList = list;
   }
}

addSearchBar();
showPage(currentList, 1);
addPagination(currentList);

const firstPageButton = pagination.firstElementChild.firstElementChild;
firstPageButton.className = 'active';

searchButton.addEventListener('click', () => { search(data); });
searchField.addEventListener('keyup', () => { search(data); });

pagination.addEventListener('click', (e) => {
   if(e.target.tagName === 'BUTTON'){
      for(let i = 0; i < pagination.children.length; i++)
      {
         pagination.children[i].firstElementChild.className = '';
      }
      e.target.className = 'active';
      showPage(currentList, e.target.textContent);
   }
});





