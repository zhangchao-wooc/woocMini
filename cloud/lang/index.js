const cloud = require('wx-server-sdk');
const COLLECTION_NAME = 'dev';

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

exports.main = async (event, context) => {
  const db = cloud.database();
  const { data } = await db.collection(COLLECTION_NAME).get()

  return { data }
}