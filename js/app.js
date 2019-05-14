const employee = document.getElementById('employee');
let employeeInfo = [];

fetch('https://randomuser.me/api/?results=12')
.then(response => response.json())
.then(data => generateEmployee(data.results));

function generateEmployee(data){
  console.log(data);
  employeeInfo = data;
  let html = '';
  data.forEach(employee => {
    html += `<li class="person" id="${employee.name.first}">`;
    html += `<div class='image'><img src='${employee.picture.medium}' alt='${employee.name.title} ${employee.name.first}'></div>`;
    html += '<div class="info">';
    html += `<p class="name">${employee.name.first} ${employee.name.last}</p>`;
    html += `<p class="email">${employee.email}</p>`;
    html += `<p class="place">${employee.location.city}</p></div>`;
    html += '</li>';
  });
  employee.innerHTML = html;

}

employee.addEventListener('click', (e) => {
    if(e.target.className === 'person'){
        openModal(e.target.id);
    } else if(e.target.className === 'info' || e.target.className === 'image') {
      openModal(e.target.parentNode.id);
    } else {
      openModal(e.target.parentNode.parentNode.id);
    }
});

function openModal(id) {
  let modal = document.querySelector('.bg-modal');
  let modalContent = document.querySelector('.modal-content');
  let html = '';
    for(let i = 0; i < employeeInfo.length; i++) {
      if(employeeInfo[i].name.first === id) {
        // opend modal
        modal.style.display = 'block';
        html += '<i class="fas fa-times"></i>';
        html += `<div class='image'><img src='${employeeInfo[i].picture.medium}' alt='${employeeInfo[i].name.title} ${employeeInfo[i].name.first}'></div>`;
        html += '<div class="info">';
        html += `<p class="name">${employeeInfo[i].name.first} ${employeeInfo[i].name.last}</p>`;
        html += `<p class="email">${employeeInfo[i].email}</p>`;
        html += `<p class="place">${employeeInfo[i].location.city}</p></div>`;
        html += '<br><hr><br>';
        html += `<p class="cel">${employeeInfo[i].cell}</p></div>`;
        html += `<p class="address">${employeeInfo[i].location.street}, ${employeeInfo[i].location.state} ${employeeInfo[i].location.postcode}</p>`;
        html += `<p class="age">Birthday: ${cutString(employeeInfo[i].dob.date)}</p>`;
      }
    }

    modalContent.innerHTML = html;

    // close the modal window
    const close = document.querySelector('.fa-times');
    close.addEventListener('click', () => {
      modalClose();
    });

}

function cutString(string) {
  let shortString = string.slice(0, 10);
  // cut the necessary numbers
  let day = shortString.slice(8, 10);
  let month = shortString.slice(5, 7);
  let year = shortString.slice(2, 4);
  // form the right date format mm/dd/yyyy
  const newString = `${month}/${day}/${year}`;
  // return a new string
  return newString;
}

function modalClose() {
  // stop displaying the modal
  const modal = document.querySelector('.bg-modal');
  modal.style.display = 'none';
}
