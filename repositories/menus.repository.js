const Menu = require('../models/menu');
const Store = require('../models/store');
// menuObjArray
class MenuRepo {
  createMenu = async (storeId, menuName, price, image) => {
    try {
      await Menu.create({ storeId, menuName, price, image });

      return true;
    } catch (err) {
      console.error(`Error path: ${__dirname}${__filename}`);
      console.error(err);

      return false;
    }
  };

  getMenu = async storeId => {
    if (typeof storeId !== 'number') {
      storeId = Number(storeId);
    }

    try {
      const result = await Menu.findAll({
        where: { storeId },
        attributes: ['id', 'menuName', 'price', 'image'],
      });

      if (result.length <= 0) {
        return null;
      }

      return result;
    } catch (err) {
      console.log(`Error path: ${__dirname}${__filename}`);
      console.error(err);

      return null;
    }
  };

  // 사진을 변경했을 경우도 생각하기
  updateMenu = async (menuId, storeId, menuName, price) => {
    if (typeof menuId !== 'number') {
      menuId = Number(menuId);
    }
    if (typeof storeId !== 'number') {
      storeId = Number(storeId);
    }
    if (typeof price !== 'number') {
      price = Number(price);
    }
    try {
      // result 결과가 배열로 나옴
      const result = await Menu.update(
        { menuName, price },
        { where: { id: menuId } }
      );

      //   console.log(`update result: ${result}`);
      //   await Menu.update(
      //     { menuName, price },
      //     { where: { [Op.and]: [{ storeId }, { menuName }] } }
      //   );

      if (!result[0]) {
        return false;
      }

      return true;
    } catch (err) {
      console.error(`Error path: ${__dirname}${__filename}`);
      console.error(err);

      return false;
    }
  };

  deleteMenu = async menuId => {
    if (typeof menuId !== 'number') {
      menuId = Number(menuId);
    }

    try {
      // result 결과가 배열로 나옴
      const result = await Menu.destroy({ where: { id: menuId } });

      //   console.log(`delete result: ${result}`);

      if (!result) {
        return false;
      }

      return true;
    } catch (err) {
      console.error(`Error path: ${__dirname}${__filename}`);
      console.error(err);

      return false;
    }
  };

  getOwner = async (userId, storeId) => {
    if (typeof userId !== 'number') {
      userId = Number(userId);
    }
    if (typeof storeId !== 'number') {
      storeId = Number(storeId);
    }

    try {
      const user = await Store.findOne({
        where: { ownerId: userId, id: storeId },
      });

      if (!user) {
        return false;
      }

      return true;
    } catch (err) {
      console.error(`Error path: ${__dirname}${__filename}`);
      console.error(err);

      return false;
    }
  };
}

module.exports = MenuRepo;
