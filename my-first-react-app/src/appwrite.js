// ensuring that the env variables are properly setup...
import {Client, Databases, Query, ID} from "appwrite";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

// console.log(PROJECT_ID, DATABASE_ID, COLLECTION_ID);

// defining a client to use the Appwrite's functionality...
const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(PROJECT_ID)

//we need to define which functionality we want to use
const database = new Databases(client);

export const updateSearchCount = async (searchTerm, movie) => {
    // 1. Use Appwrite SDK to check if the search term exists in the database.
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal('searchTerm', searchTerm),
        ])

        // 2. If it does, update the count.
        if(result.documents.length > 0) { // if the document exists
            const doc = result.documents[0]; // get the documents

            // update the count
            await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {count: doc.count + 1});
        } else { // 3. If it doesn't create a new document with the search term and count as 1.
            await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                searchTerm,
                count: 1,
                movie_id: movie.id,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            });
        }
    } catch (error) {
        console.error(error);
    }
}

// display the top trending movies based on the database data...
export const getTrendingMovies = async () => {
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(5),
            Query.orderDesc("count")
        ])

        return result.documents;
    } catch (error) {
        console.error(error);
    }
}