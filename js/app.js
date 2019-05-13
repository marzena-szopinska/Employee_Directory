// <li class="person">
//   <div class="image">
//     <img src='mockup/employee_overlay.png' alt>
//   </div>
//   <div class="info">
//     <p class="name">Alex Brown</p>
//     <p class="email">alex.example@com</p>
//     <p class="place">Boston</p>
//   </div>
// </li>

const employee = document.getElementById('employee');


fetch('https://randomuser.me/api/?results=12')
.then(response => response.json())
.then(data => generateEmployee(data.results));

function generateEmployee(data){
  let html = '';
  data.forEach(employee => {
    console.log(employee);
    html += '<li class="person">';
    html += `<div class='image'><img src='${employee.picture.medium}' alt='${employee.name.title} ${employee.name.first}'></div>`;
    html += '<div class="info">';
    html += `<p class="name">${employee.name.first} ${employee.name.last}</p>`;
    html += `<p class="email">${employee.email}</p>`;
    html += `<p class="place">${employee.location.city}</p></div>`;
    html += '</li>';
  });
  employee.innerHTML = html;

}
