import { collection, addDoc, doc, deleteDoc } from "firebase/firestore";
import { database } from "./firebaseSetup"; // Import the Firestore database object from firebaseSetup.js

/**
 * Writes a new document to Firestore in the specified collection.
 * @param {Object} data - The data to be written to the Firestore document.
 * @param {string} collectionName - The Firestore collection where the document will be added.
 * @returns {Promise} - A promise that resolves when the document is successfully added.
 */
export async function writeToDB(data, collectionName) {
  try {
    const docRef = await addDoc(collection(database, collectionName), data);
    console.log('Document written with ID: ', docRef.id);
    return docRef.id; // Return the document ID if needed
  } catch (err) {
    console.error('Error adding document: ', err);
    throw err; // Re-throw the error to be handled by the calling function
  }
}

/**
 * Deletes a document from Firestore in the specified collection using the document ID.
 * @param {string} id - The Firestore document ID to delete.
 * @param {string} collectionName - The Firestore collection name from which to delete the document.
 * @returns {Promise} - A promise that resolves when the document is successfully deleted.
 */
export async function deleteFromDB(id, collectionName) {
  try {
    const docRef = doc(database, collectionName, id); // Get the document reference
    await deleteDoc(docRef); // Delete the document
    console.log('Document deleted with ID: ', id);
  } catch (err) {
    console.error('Error deleting document: ', err);
    throw err; // Re-throw the error to be handled by the calling function
  }
}
