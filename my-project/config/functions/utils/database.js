async function getDepartments() {
    try {
        return await strapi.service('api::department.department').find();
    } catch(err) {
        console.log("departments couldn't be sent. Try again!")
    }
}

async function getCustomers(page, recordsPerPage) {
    try {
        return await strapi.service('api::customer.customer').find(
            {
                pagination: {
                    page: page,
                    pageSize: recordsPerPage
                }
            }
        );
    } catch(err) {
        console.log("customers couldn't be sent. Try again!")
    }
}

async function getAppointments(page, recordsPerPage) {
    try {
        return await strapi.service('api::appointment.appointment').find(
            {
                populate: {
                    Employee: true,
                    Customer: true
                },
                pagination: {
                    page: page,
                    pageSize: recordsPerPage
                }
            });
    } catch(err) {
        console.log("appointments couldn't be sent. Try again!")
    }
}

async function getEmployees() {
    try {
        return await strapi.entityService.findMany('plugin::users-permissions.user',
            {
                populate: {
                    Department: true
                }
            });
    } catch(err) {
        console.log("employees couldn't be sent. Try again!")
    }
}

async function getUser(id) {
    try {
        let user = await strapi.entityService.findOne('plugin::users-permissions.user', id,
            {
                populate: ['role']
            });
        let role = user.role.name
        let username = user.username
        return {username, role};
    } catch(err) {
        console.log("user couldn't be sent. Try again!")
    }
}

module.exports = {
    getDepartments,
    getCustomers,
    getAppointments,
    getEmployees,
    getUser
}