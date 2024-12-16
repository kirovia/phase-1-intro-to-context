const test = ["Julius", "Caesar", "General", 1000];

function createEmployeeRecord(array) {
    let obj = {};
    obj.firstName = array[0];
    obj.familyName = array[1];
    obj.title = array[2];
    obj.payPerHour = array[3];
    obj.timeInEvents = [];
    obj.timeOutEvents = [];
    return obj;
};

const createEmployeeRecords = array => array.map(createEmployeeRecord);

function createTimeInEvent(employeeRecord, timestamp) {
    let newObj = {};
    newObj.type = 'TimeIn';
    newObj.date = `${timestamp.slice(0, 10)}`;
    newObj.hour = parseInt(`${timestamp.slice(11)}`);
    employeeRecord.timeInEvents.push(newObj);
    return employeeRecord;
};

function createTimeOutEvent(employeeRecord, timestamp) {
    let newObj = {};
    newObj.type = 'TimeOut';
    newObj.date = `${timestamp.slice(0, 10)}`;
    newObj.hour = parseInt(`${timestamp.slice(11)}`);
    employeeRecord.timeOutEvents.push(newObj);
    return employeeRecord;
};

function hoursWorkedOnDate(employeeRecord, date) {
    let clockOut;
    let clockIn;
    employeeRecord.timeOutEvents.forEach(item => {
        if (item.date === date) {clockOut = item.hour}
    });
    employeeRecord.timeInEvents.forEach(item => {
        if (item.date === date) {clockIn = item.hour}
    });
    return (clockOut - clockIn) / 100;
};

function wagesEarnedOnDate(employee, date) {
    let hoursWorked = hoursWorkedOnDate(employee, date);
    let payOwed = hoursWorked * employee.payPerHour;
    return payOwed;
};

function allWagesFor(object) {
    let totalWages = 0;
    let totalHours = 0;
    let timeIn = object.timeInEvents;
    let timeOut = object.timeOutEvents;
    for (let i = 0; i < timeIn.length; i++) {
        totalHours += timeOut[i].hour - timeIn[i].hour;
    }
    totalWages = (totalHours * object.payPerHour) / 100;
    return totalWages;
};

function calculatePayroll(array) {
    let totalPayOwed = 0;
    array.forEach(item => {
        totalPayOwed += allWagesFor(item);
    })
    return totalPayOwed;
};