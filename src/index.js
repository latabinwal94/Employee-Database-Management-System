(async function() {
  const data = await fetch('./src/data.json')
  const res = await data.json()
  const employeeList = document.querySelector('.employees__name--list')
  const employeeInfo = document.querySelector('.employees__single--info')
  const employees = res
  let selectedEmployee = employees[0]
  let selectedEmployeeId = employees[0].id
  // Select Employee logic on click of list item

  employeeList.addEventListener('click', (e) => {
    if(e.target.tagName = 'SPAN' && selectedEmployeeId !== e.target.id) {
      selectedEmployeeId = e.target.id
      renderList()
      renderSingleEmployee()
    }
  })

  // render single employee Data

  const renderSingleEmployee = () => {
    employeeInfo.innerHTML = `
      <img src='${selectedEmployee.imageUrl}' />
      <span class='employees__single--heading'>${selectedEmployee.firstName} ${selectedEmployee.lastName} ${selectedEmployee.age}</span>
      <span>${selectedEmployee.address}</span>
      <span>${selectedEmployee.email}</span>
      <span>${selectedEmployee.contactNumber}</span>
      <span>${selectedEmployee.dob}</span>
    `
  }

  // render the employee List
  const renderList = () => {
    employeeList.innerHTML = ""
    employees.forEach((emp) => {
      let employeeInfo = document.createElement('span')
      employeeInfo.classList.add('employee__name--item')
      if(parseInt(selectedEmployeeId, 10) === emp.id) {
        employeeInfo.classList.add('selected')
        selectedEmployee = emp
      }
      employeeInfo.innerHTML = `${emp.firstName} ${emp.lastName} <i class='employeeDelete'>X</i>`
      employeeInfo.setAttribute('id', emp.id)
      employeeList.append(employeeInfo)
    });
  }
  renderList()

  if(selectedEmployee) {
    renderSingleEmployee()
  }
})()