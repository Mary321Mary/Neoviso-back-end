'use strict';

module.exports = {
    /**
     * An asynchronous register function that runs before
     * your application is initialized.
     *
     * This gives you an opportunity to extend code.
     */
    register(/*{ strapi }*/) {},

    /**
     * An asynchronous bootstrap function that runs before
     * your application gets started.
     *
     * This gives you an opportunity to set up your data model,
     * run jobs, or perform some special logic.
     */
    bootstrap({ strapi }) {
        const {
            getDepartments,
            getCustomers,
            getCustomer,
            getAppoitsCustomer,
            getAppointments,
            getEmployees,
            getUser
        } = require('../config/functions/utils/database');

        process.nextTick(() =>{

            const {Server} = require('socket.io')
            var io = new Server(strapi.server.httpServer, {
                cors: {
                    origin: "http://localhost:8080",
                    methods: ["GET", "POST", "PUT", "DELETE"],
                    allowedHeaders: ["my-custom-header"],
                    credentials: true
                }
            });

            io.on('connection', async function(socket) {
                console.log("a user connected")

                socket.on('departments', async () => {
                    console.log('departments-socket');
                    try {
                        const departments = await getDepartments();
                        socket.emit('departments', departments);
                    } catch(err) {
                        console.log("Err occured, Try again!", err);
                    }
                })

                socket.on('customers', async({ page, recordsPerPage }) => {
                    try {
                        const customers = await getCustomers(page, recordsPerPage);
                        socket.emit('customers', customers);
                    } catch(err) {
                        console.log("Err occured, Try again!", err);
                    }
                })

                socket.on('appointments', async({ page, recordsPerPage }) => {
                    try {
                        const appointments = await getAppointments(page, recordsPerPage);
                        socket.emit('appointments', appointments);
                    } catch(err) {
                        console.log("Err occured, Try again!", err);
                    }
                })

                socket.on('employees', async() => {
                    try {
                        const employees = await getEmployees();
                        socket.emit('employees', employees);
                    } catch(err) {
                        console.log("Err occured, Try again!", err);
                    }
                })

                socket.on('user', async ({ id }) => {
                    try {
                        const user = await getUser(id);
                        socket.emit('user', user);
                    } catch(err) {
                        console.log("Err occured, Try again!", err);
                    }
                })
            });
            strapi.io = io;
        })
    }
};
