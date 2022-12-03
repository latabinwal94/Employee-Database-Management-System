(async function() {
  const data = await fetch('./src/data.json')
  const res = await data.json()
  const employeeList = document.querySelector('.employees__name--list')
  const employeeInfo = document.querySelector('.employees__single--info')
  let employees = res
  let selectedEmployee = employees[0]
  let selectedEmployeeId = employees[0].id
  // Select Employee logic on click of list item

  employeeList.addEventListener('click', (e) => {
    if(e.target.tagName = 'SPAN' && selectedEmployeeId !== e.target.id) {
      selectedEmployeeId = e.target.id
      renderList()
      renderSingleEmployee()
    }
    if(e.target.tagName === 'I') {
      employees = employees.filter((emp) => String(emp.id) !== e.target.parentNode.id)
    }
    if(String(selectedEmployeeId) === e.target.parentNode.id) {
      selectedEmployeeId =  employees[0]?.id || -1
      selectedEmployee = employees[0] || {}
      renderSingleEmployee()
    }
    renderList()
  })

  // add employee logic

  const addEmployee = document.querySelector('.add')
  const createEmployeeModal = document.querySelector('.addEmployee')
  const createEmployeeForm = document.querySelector('.addEmployee__create')

  addEmployee.addEventListener('click' , (e) => {
    createEmployeeModal.style.display = 'flex'
  })

  createEmployeeModal.addEventListener('click', (e) => {
    if(e.target.className==='addEmployee') {
      createEmployeeModal.style.display = 'none'
    }
  })

  // create emloyee form logic

  createEmployeeForm.addEventListener('submit' , (e) => {
    e.preventDefault()
    const formData = new FormData(createEmployeeForm)
    const values = [...formData.entries()]
    const empData = {}
    values.forEach((val) => {
      empData[val[0]] = val[1]
    })
    empData.id = employees[employees.length - 1].id + 1
    empData.age = new Date().getFullYear() - parseInt(empData.dob.slice(0, 4), 10)
    empData.imageUrl = empData.imageUrl || "https://cdn-icons-png.flaticon.com/512/0/93.png"
    employees.push(empData)
    renderList()
    createEmployeeForm.reset()
    createEmployeeModal.style.display = 'none'
  })

    // Set Employee age to be entered minimum 18 years
  const dobInput = document.querySelector('.addEmployee__create--dob')
  dobInput.max = `${new Date().getFullYear() - 18}-${new Date().toISOString().slice(5, 10)}`

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