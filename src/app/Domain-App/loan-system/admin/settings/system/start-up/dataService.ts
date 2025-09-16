import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  CollectionReference,
  DocumentData,
  collectionData,
  DocumentReference,
  query,
  where
} from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class DataServiceService {
  constructor(private firestore: Firestore) {}

  /** Get collection reference */
  getCollectionRef(collectionName: string): CollectionReference<DocumentData> {
    return collection(this.firestore, collectionName);
  }

  /** Get document reference */
  getDocRef(pathOrCollection: string, docId?: string): DocumentReference<DocumentData> {
    return docId
      ? doc(this.firestore, `${pathOrCollection}/${docId}`)
      : doc(this.firestore, pathOrCollection); // full doc path
  }

  /** ➕ Add Single Document */
  addData(collectionName: string, data: any) {
    const colRef = this.getCollectionRef(collectionName);
    return addDoc(colRef, data);
  }

  /** ➕ Add Multiple Documents */
  async addMany(collectionName: string, dataArray: any[]): Promise<string[]> {
    const colRef = this.getCollectionRef(collectionName);
    const ids: string[] = [];

    for (const data of dataArray) {
      const docRef = await addDoc(colRef, data);
      ids.push(docRef.id);
    }

    return ids;
  }

  /** 🔄 Update One Document */
  updateOne(pathOrCollection: string, docIdOrData: string | any, updateData?: any) {
    const docRef = typeof docIdOrData === 'string'
      ? this.getDocRef(pathOrCollection, docIdOrData)
      : this.getDocRef(pathOrCollection); // assume pathOrCollection is full path

    const data = typeof docIdOrData === 'string' ? updateData : docIdOrData;
    return updateDoc(docRef, data);
  }

  /** 🔄 Update Multiple Documents */
  async updateMany(path: string, updates: { id: string, data: any }[]) {
    for (const { id, data } of updates) {
      const docRef = this.getDocRef(path, id);
      await updateDoc(docRef, data);
    }
  }

  /** ❌ Delete One Document */
  deleteOne(pathOrCollection: string, docId?: string) {
    const docRef = this.getDocRef(pathOrCollection, docId);
    return deleteDoc(docRef);
  }

  /** ❌ Delete Multiple Documents */
  async deleteMany(path: string, docIds: string[]) {
    for (const id of docIds) {
      const docRef = this.getDocRef(path, id);
      await deleteDoc(docRef);
    }
  }

  /** 📥 Get All Documents From Collection */
  getAll(path: string) {
    const colRef = this.getCollectionRef(path);
    return collectionData(colRef, { idField: 'id' });
  }

  /** 📥 Get One Document */
  async getOne(pathOrCollection: string, docId?: string): Promise<any | null> {
    const docRef = this.getDocRef(pathOrCollection, docId);
    const snapshot = await getDoc(docRef);
    return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
  }

  /** 📥 Optional Query Example */
  async getWhere(path: string, field: string, operator: any, value: any) {
    const q = query(this.getCollectionRef(path), where(field, operator, value));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
}












/*
constructor(private dataService: DataServiceService) {}

addUser() {
  this.dataService.addOne('users', { name: 'Adamu', age: 30 });
}

addMultipleUsers() {
  const users = [
    { name: 'Ali', age: 22 },
    { name: 'Zainab', age: 27 }
  ];
  this.dataService.addMany('users', users);
}

getUsers() {
  this.dataService.getAll('users').subscribe(data => console.log(data));
}

updateUser() {
  this.dataService.updateOne('users', 'abc123', { age: 31 });
}

deleteUser() {
  this.dataService.deleteOne('users', 'abc123');
}
*/
/*
Here is an **updated version** of your `DataServiceService` with support for:

* **Single** and **multiple**:

* Add
* Update
* Delete
* Get
* Cleaner API: you can pass just the collection name or full document path.
* Optional: returns document ID (`{ idField: 'id' }`) when retrieving data.

---

### ✅ `data-service.service.ts`

  ```ts
import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  CollectionReference,
  DocumentData,
  collectionData,
  DocumentReference,
  query,
  where
} from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class DataServiceService {
  constructor(private firestore: Firestore) {}

  /!** Get collection reference *!/
  getCollectionRef(collectionName: string): CollectionReference<DocumentData> {
    return collection(this.firestore, collectionName);
  }

  /!** Get document reference *!/
  getDocRef(pathOrCollection: string, docId?: string): DocumentReference<DocumentData> {
    return docId
      ? doc(this.firestore, `${pathOrCollection}/${docId}`)
: doc(this.firestore, pathOrCollection); // full doc path
}

/!** ➕ Add Single Document *!/
addOne(collectionName: string, data: any) {
  const colRef = this.getCollectionRef(collectionName);
  return addDoc(colRef, data);
}

/!** ➕ Add Multiple Documents *!/
async addMany(collectionName: string, dataArray: any[]): Promise<string[]> {
  const colRef = this.getCollectionRef(collectionName);
  const ids: string[] = [];

for (const data of dataArray) {
  const docRef = await addDoc(colRef, data);
  ids.push(docRef.id);
}

return ids;
}

/!** 🔄 Update One Document *!/
updateOne(pathOrCollection: string, docIdOrData: string | any, updateData?: any) {
  const docRef = typeof docIdOrData === 'string'
    ? this.getDocRef(pathOrCollection, docIdOrData)
    : this.getDocRef(pathOrCollection); // assume pathOrCollection is full path

  const data = typeof docIdOrData === 'string' ? updateData : docIdOrData;
  return updateDoc(docRef, data);
}

/!** 🔄 Update Multiple Documents *!/
async updateMany(path: string, updates: { id: string, data: any }[]) {
  for (const { id, data } of updates) {
    const docRef = this.getDocRef(path, id);
    await updateDoc(docRef, data);
  }
}

/!** ❌ Delete One Document *!/
deleteOne(pathOrCollection: string, docId?: string) {
  const docRef = this.getDocRef(pathOrCollection, docId);
  return deleteDoc(docRef);
}

/!** ❌ Delete Multiple Documents *!/
async deleteMany(path: string, docIds: string[]) {
  for (const id of docIds) {
    const docRef = this.getDocRef(path, id);
    await deleteDoc(docRef);
  }
}

/!** 📥 Get All Documents From Collection *!/
getAll(path: string) {
  const colRef = this.getCollectionRef(path);
  return collectionData(colRef, { idField: 'id' });
}

/!** 📥 Get One Document *!/
async getOne(pathOrCollection: string, docId?: string): Promise<any | null> {
  const docRef = this.getDocRef(pathOrCollection, docId);
  const snapshot = await getDoc(docRef);
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
}

/!** 📥 Optional Query Example *!/
async getWhere(path: string, field: string, operator: any, value: any) {
  const q = query(this.getCollectionRef(path), where(field, operator, value));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
}
```

---

### ✅ Example Usage in Component

```ts
constructor(private dataService: DataServiceService) {}

addUser() {
  this.dataService.addOne('users', { name: 'Adamu', age: 30 });
}

addMultipleUsers() {
  const users = [
    { name: 'Ali', age: 22 },
    { name: 'Zainab', age: 27 }
  ];
  this.dataService.addMany('users', users);
}

getUsers() {
  this.dataService.getAll('users').subscribe(data => console.log(data));
}

updateUser() {
  this.dataService.updateOne('users', 'abc123', { age: 31 });
}

deleteUser() {
  this.dataService.deleteOne('users', 'abc123');
}
```

---

### ✅ Summary

| Method       | Use Case                     |
| ------------ | ---------------------------- |
| `addOne`     | Add single doc to collection |
| `addMany`    | Add multiple docs            |
| `getAll`     | Get all docs as observable   |
| `getOne`     | Get one doc (promise)        |
| `updateOne`  | Update single doc            |
| `updateMany` | Batch update multiple docs   |
| `deleteOne`  | Delete one doc               |
| `deleteMany` | Delete multiple docs         |
| `getWhere`   | Get filtered data with query |

Let me know if you want support for **pagination**, **caching**, or **batch writes**.
*/
