import PocketBase from 'pocketbase';

const db = new PocketBase(import.meta.env.VITE_APP_DBURL);

export default db;