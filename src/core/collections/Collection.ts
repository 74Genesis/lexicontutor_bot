import firebase from 'firebase';

/**
 * firestore collection
 */
export default class Collection {
  public collection: string = '';
  public instance: firebase.FirebaseApp;
  constructor() {
    this.instance = firebase.firestore().collection(this.collection);
  }
}
