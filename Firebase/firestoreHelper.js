import { collection, getDocs, deleteDoc, doc, addDoc, updateDoc } from "firebase/firestore";
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

/**
 * Deletes all documents from a Firestore collection.
 * @param {string} collectionName - The Firestore collection name from which to delete all documents.
 * @returns {Promise} - A promise that resolves when all documents are successfully deleted.
 */
export async function deleteAllFromDB(collectionName) {
  try {
    const querySnapshot = await getDocs(collection(database, collectionName)); // Get all documents from the collection
    const deletePromises = [];

    querySnapshot.forEach((docSnapshot) => {
      const docRef = doc(database, collectionName, docSnapshot.id);
      deletePromises.push(deleteDoc(docRef)); // Add each deletion promise to the array
    });

    await Promise.all(deletePromises); // Wait for all delete operations to complete
    console.log(`All documents deleted from the ${collectionName} collection.`);
  } catch (err) {
    console.error('Error deleting all documents: ', err);
    throw err; // Re-throw the error to be handled by the calling function
  }
}

export async function updateWarningInDB(id, collectionName) {
    try {
      const docRef = doc(database, collectionName, id); // Reference to the document
      await updateDoc(docRef, { warning: true }); // Update the "warning" field to true
      console.log(`Warning field updated for document ID: ${id}`);
    } catch (err) {
      console.error("Error updating warning field: ", err);
      throw err;
    }
  }

// Fetch users from the sub-collection in Firestore
export async function getUsersFromSubcollection(goalId) {
  try {
    const usersCollectionRef = collection(database, "goals", goalId, "users");
    const querySnapshot = await getDocs(usersCollectionRef); // Fetch the documents

    const users = [];
    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() }); // Add each user to the array
    });

    console.log('Fetched users from Firestore:', users);
    return users; // Return the array of users
  } catch (error) {
    console.error('Error getting users from sub-collection:', error);
    return [];
  }
}

// Write users to the sub-collection in Firestore
export async function writeUsersToSubcollection(goalId, usersArray) {
  try {
    const usersCollectionRef = collection(database, "goals", goalId, "users");

    for (const user of usersArray) {
      const userToSave = {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      };

      await addDoc(usersCollectionRef, userToSave); // Add each user to Firestore
    }
    console.log('Users added to sub-collection successfully.');
  } catch (error) {
    console.error('Error adding users to sub-collection:', error);
  }
}