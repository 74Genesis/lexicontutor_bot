import { initializeApp } from 'firebase/app';
import config from '../../configs/firebase';

// class DBConnection {
//   private config: Record<string, string>;
//   private instance: DBConnection;

//   constructor(config) {
//     this.config = config;
//   }

//   static getInstance(config) {
//     if (!this.instance) {
//       this.instance = new DBConnection(conString);
//     }

//     return this.instance;
//   }
// }
// const dbConObj = DBConnection.getInstance('mysqldb1');
const app = initializeApp(config);
export default app;
