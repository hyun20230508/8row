const { Store, User } = require('../models');

class StoreRepository {
  //업체등록
  createStore = async (
    name,
    storePhoneNumber,
    category,
    location,
    image,
    ownerId
  ) => {
    console.log(image);
    const createStoreData = await Store.create({
      name,
      storePhoneNumber,
      category,
      location,
      image,
      ownerId,
    });

    return createStoreData;
  };
  //삭제 권환 확인
  compareStore = async storeId => {
    const compareStoreData = await Store.findOne({
      attributes: ['ownerId'],
      where: { id: storeId },
    });
    return compareStoreData;
  };

  //업체삭제
  deleteStore = async storeId => {
    const deleteStoreData = await Store.destroy({
      where: { id: storeId },
    });
    return deleteStoreData;
  };

  //업체수정
  updateStore = async (
    userId,
    storeId,
    name,
    storePhoneNumber,
    category,
    location,
    image
  ) => {
    const updateStoreData = await Store.update(
      { name, storePhoneNumber, category, location, image },
      { where: { id: storeId } }
    );
    return updateStoreData;
  };

  //업체리스트
  getStore = async () => {
    const getStoreData = await Store.findAll({
      attributes: [
        'id',
        'name',
        'ownerId',
        'location',
        'storePhoneNumber',
        'category',
        'image',
        'sales',
      ],
    });
    return getStoreData;
  };

  //업체 카테고리 리스트
  getCategoryStore = async category => {
    const getStoreData = await Store.findAll({
      attributes: [
        'id',
        'name',
        'ownerId',
        'location',
        'storePhoneNumber',
        'category',
        'image',
        'sales',
      ],
      where: { category },
    });
    return getStoreData;
  };

  getStoreByUserId = async ownerId => {
    const store = await Store.findOne({ where: { ownerId } });
    return store;
  };

  //업체상세보기
  getStoreDetail = async storeId => {
    console.log(storeId, 'rep');
    const getStoreDetailData = await Store.findOne({ where: { id: storeId } });

    return getStoreDetailData;
  };
}

module.exports = StoreRepository;
