// Your code here

// features of employee
const features = ['medet', 'diler', 'developer', 200];


// create employee record
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
  // this.firstNames  = firstName;
  // this.familyNames = familyName;
  // this.titles = title;
  // this.payPerHours = payPerHour;
  // this.timeInEvents = '';
  // this.timeOutEvents = '';
  const employee = {
    firstName: firstName,
    familyName: familyName,
    title: title,
    payPerHour: payPerHour,
    timeInEvents: [],
    timeOutEvents: []
  }
  return employee;
}

// create employee records
function createEmployeeRecords(employees) {
  return employees.map(item => createEmployeeRecord(item));
}



function createTimeInEvent(employeeRecord, dates) {
  const [date, hour] = dates.split(' ');
  const timeInEvent = {
    type: "TimeIn",
    date,
    hour: parseInt(hour),
  };
  employeeRecord.timeInEvents.push(timeInEvent);
  return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dates) {
  const [date, hour] = dates.split(' ');
  employeeRecord.timeOutEvents.push({
    type: 'TimeOut',
    date,
    hour: parseInt(hour)
  });
  return employeeRecord;
}


function hoursWorkedOnDate(employeeRecord, date) {
  const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
  if (!timeInEvent) {
    return 0;
  }

  const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
  if (!timeOutEvent) {
    return 0;
  }
  const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;

  return hoursWorked;
}

function wagesEarnedOnDate(employeeRecord, date) {
  const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
  const payRate = employeeRecord.payPerHour;
  const wages = hoursWorked * payRate;
  return wages;
}

function allWagesFor(employeeRecord) {
  const datesWorked = employeeRecord.timeInEvents.map(event => event.date);

  const totalWages = datesWorked.reduce((acc, date) => {
    return acc + wagesEarnedOnDate(employeeRecord, date);
  }, 0);

  return totalWages;
}

function calculatePayroll(employees) {
  let payroll = 0;
  employees.forEach(employee => {
    payroll += allWagesFor(employee);
  });
  return payroll;
}