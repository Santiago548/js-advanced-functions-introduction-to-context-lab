// Your code here
 let createEmployeeRecord = function(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(employeeData) {
    return employeeData.map(function(row){
        return createEmployeeRecord(row)
    })
}

let createTimeInEvent = function(employee, dateTime) {
    let [date, hour] = dateTime.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}

let createTimeOutEvent = function(employee, dateTime) {
    let [date, hour] = dateTime.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}

let hoursWorkedOnDate = function(employee, dateTime) {
    let inEvent = employee.timeInEvents.find(function(e){
        return e.date === dateTime
    })

    let outEvent = employee.timeOutEvents.find(function(e){
        return e.date == dateTime
    })

    return (outEvent.hour - inEvent.hour) / 100
}


let wagesEarnedOnDate = function(employee, dateTime){
    let wage = hoursWorkedOnDate(employee, dateTime)
        * employee.payPerHour
    return parseFloat(wage.toString())
}

let allWagesFor = function(employee){
    let eligibleDates = employee.timeInEvents.map(function(e){
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable
}

let calculatePayroll = function(employeeArray){
    return employeeArray.reduce(function(memo, rec){
    return memo + allWagesFor(rec)
    }, 0)
}

let findEmployeeByFirstName = function(employee, firstName){
    return employee.find(function(name){
        return name.firstName === firstName
    })
}