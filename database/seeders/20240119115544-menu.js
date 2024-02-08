'use strict';
const { v4: uuidv4 } = require('uuid');

const listmenu = [
  {
    title: 'Dashboard',
    key: 'dashboard',
    url: '/dashboard',
    icon: null,
    active: true,
    submenu:[]
  },
  {
    title: 'Manajemen User & Menu',
    key: 'manajemen-role-menu',
    url: null,
    icon: null,
    active: true,
    submenu:[
      {
        title: 'User',
        key: 'user',
        url: '/user',
        icon: null,
        active: true,
      },
      {
        title: 'Role',
        key: 'role',
        url: '/role',
        icon: null,
        active: true,
      },
      {
        title: 'Menu',
        key: 'menu',
        url: '/menu',
        icon: null,
        active: true,
      },
      {
        title: 'Role Access',
        key: 'role-access',
        url: '/role-access',
        icon: null,
        active: true,
      }
    ]
  },
];

// const payloadmenu = listmenu.map((item, index) => ({
//   id: uuidv4(),
//   title: item.title,
//   key: item.key,
//   url: item.url,
//   icon: item.icon,
//   is_menu: item.active,
//   sorting: index + 1,
//   created_at: new Date(),
//   updated_at: new Date(),
// }));

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const transaction = await queryInterface.sequelize.transaction();

    try {
      let _menu=[];
      let _submenu=[];
      let sorting=1;
      listmenu.forEach((item) => {
        let id=uuidv4()
        _menu.push({
            id: id,
            title: item.title,
            key: item.key,
            url: item.url,
            icon: item.icon,
            active: item.active,
            parent_id:null,
            sorting: sorting,
            is_menu:true,
            description:null,
            created_at: new Date(),
            updated_at: new Date(),
        });
        if(item.submenu.length > 0){
          sorting +=1;
          item.submenu.forEach(subitem => {
            _submenu.push({
                id: uuidv4(),
                title: subitem.title,
                key: subitem.key,
                url: subitem.url,
                icon: subitem.icon,
                active: subitem.active,
                parent_id:id,
                sorting: sorting,
                is_menu:true,
                description:null,
                created_at: new Date(),
                updated_at: new Date(),
            })
          });
        }
        sorting++
      });

      await queryInterface.bulkInsert('menu', _menu, { returning: true, transaction });
      await queryInterface.bulkInsert('menu', _submenu, { returning: true, transaction });
      await transaction.commit();
    } catch (error) {
      console.error('Error in seed:', error.message);
      await transaction.rollback();
      throw error;
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    // await queryInterface.bulkDelete('menu', null, {});
  }
};
