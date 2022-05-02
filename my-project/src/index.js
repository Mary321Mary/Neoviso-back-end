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
            getCustomer,
            getAppointment,
            getEmployee
        } = require('../config/functions/utils/database');

        process.nextTick(() =>{

            const {Server} = require('socket.io')
            var io = new Server(strapi.server.httpServer, {
                cors: {
                    origin: "http://localhost:8080",
                    methods: ["GET"],
                    allowedHeaders: ["my-custom-header"],
                    credentials: true
                }
            });

            io.on('connection', async function(socket) {
                console.log("a user connected")

                socket.on('departments', async(callback) => {
                    console.log('departments-socket');
                    try {
                        const deps = await getDep();
                        socket.emit('departments', deps);
                        callback();
                        callback(deps);
                    } catch(err) {
                        console.log("Err occured, Try again!", err);
                    }
                })

                
                const departments = await getDepartments();
                socket.emit('departments', departments);
                
                const customers = await getCustomer();
                socket.emit('customers', customers);
                
                const appointments = await getAppointment();
                //console.log(appointments)
                socket.emit('appointments', appointments);
                
                const employees = await getEmployee();
                //console.log(employees)
                socket.emit('employees', employees);
            });

            strapi.io = io;

        })
    },
};
