async function getDepartments() {
    try {
        return await strapi.service('api::department.department').find();
    } catch(err) {
        console.log("departments couldn't be sent. Try again!")
    }
}

async function getCustomer() {
    try {
        return await strapi.service('api::customer.customer').find();
    } catch(err) {
        console.log("customers couldn't be sent. Try again!")
    }
}

async function getAppointment() {
    try {
        return await strapi.service('api::appointment.appointment').find(
            {
            populate: {
                Employee: true,
                Customer: true
            }
        });
    } catch(err) {
        console.log("appointments couldn't be sent. Try again!")
    }
}

async function getEmployee() {
    try {
        return await strapi.service('api::employee.employee').find(
            {
            populate: {
                Department: true
            }
        }
        );
    } catch(err) {
        console.log("employees couldn't be sent. Try again!")
    }
}

module.exports = {
    getDepartments,
    getCustomer,
    getAppointment,
    getEmployee
}