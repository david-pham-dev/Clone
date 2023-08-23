'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'admin@gmail.com',
        password: '123456',
        firstName: 'BITCH',
        lastName: 'ASS',
        phoneNumber: '1230987654',
        address: 'NEW JERSEY',
        gender: 1,
        image: 'https.ice out',
        roleId: 'ICED OUT AP',
        positionId: 'Doctor',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
