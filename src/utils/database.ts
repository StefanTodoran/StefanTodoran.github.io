import {
    DocumentData,
    DocumentReference,
    QuerySnapshot,
    Timestamp,
    addDoc,
    collection,
    doc,
    getDocs,
    query,
    setDoc,
    where,
    writeBatch,
} from "firebase/firestore";
import { db } from "./firebase";

interface FormData {
    name: string,
    email: string,
    message: string,
}

// When we fetch and parse the JSON, we just get an object rather than a Timestamp.
type RawTimestamp = { seconds: number, nanoseconds: number };

// interface MessageDocument extends FormData {
//     date: RawTimestamp,
// }

interface MetadataDocument {
    email: string,
    count: number,
    last: RawTimestamp,
}

/**
 * @param formData 
 * @returns An error message, or the empty string if successful 
 */
export async function postMessageToServer(formData: FormData): Promise<string> {
    const sendTime = Timestamp.fromDate(new Date());
    const documentName = formData.email + "_" + roundToNearestFive(sendTime).toMillis();

    let metadata: MetadataDocument = await getSpecificEntry("metadata", "email", formData.email);
    if (!metadata) {
        const blankMetadata = {
            email: formData.email,
            count: 0,
            last: new Timestamp(0, 0),
        };

        const newMetadata = await createDocument("metadata", formData.email, blankMetadata);
        if (!newMetadata) return "Unable to communicate with server. Double check your network connection and try again.";
        metadata = blankMetadata;
    }

    const lastSendTime = new Timestamp(metadata.last.seconds, metadata.last.nanoseconds);
    if (calculateMinutesPassed(lastSendTime.toDate()) < 5) {
        return "Please wait at least 5 minutes between message submissions!";
    }

    const batchSuccess = await batchedDocumentCreate([
        {
            targetCollection: "metadata",
            documentName: formData.email,
            content: {
                email: formData.email,
                count: metadata.count + 1,
                last: sendTime,
            },
        },
        {
            targetCollection: "messages",
            documentName: documentName,
            content: {
                ...formData,
                date: sendTime,
            },
        },
    ]);
    if (!batchSuccess) return "Unknown server error. Please try again.";

    return "";
}

export async function getSpecificEntry(collectionName: string, key: string, value: any) {
    console.log("getSpecificEntry", collectionName, key, value);
    const q = query(collection(db, collectionName), where(key, "==", value));
    const querySnapshot = await getDocs(q);
    const docs = parseQuerySnapshot(querySnapshot);

    if (docs.length === 0) {
        return null;
    }
    else if (docs.length === 1) return docs[0]; // Success case
    else {
        console.warn(`Found multiple records for "${key}: ${value}" in "${collectionName}"!`);
        console.warn(`Using first document returned by query snapshot.`);
        return docs[0];
    }
}

interface NewDocument {
    targetCollection: string,
    documentName: string,
    content: any,
}

async function batchedDocumentCreate(documents: NewDocument[]) {
    const batch = writeBatch(db);

    documents.forEach(document => {
        const newDoc = doc(db, document.targetCollection, document.documentName);
        batch.set(newDoc, document.content);
    });

    try {
        await batch.commit();
    } catch (error) {
        console.log("Error committing batch:", error);
        return false;
    }

    return true;
}

export async function createDocument(
    collectionName: string,
    docName: string | undefined,
    docContent: any,
): Promise<DocumentReference | null> {
    let newDoc;

    try {
        if (docName) {
            newDoc = doc(db, collectionName, docName);
            await setDoc(newDoc, docContent);
        } else {
            // If no document name provided, use auto generated firestore document id
            newDoc = await addDoc(collection(db, collectionName), docContent);
        }
    } catch (error) {
        console.log("Error creating document:", error);
        return null;
    }

    return newDoc;
}

function parseQuerySnapshot(snapshot: QuerySnapshot<DocumentData, DocumentData>) {
    const docs: any[] = [];
    snapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const next = doc.data();
        next.id = doc.id;
        docs.push(next);
    });

    return docs;
}

function calculateMinutesPassed(pastDate: Date) {
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - pastDate.getTime();

    const minutesPassed = timeDifference / (1000 * 60); // 1000 milliseconds per second, 60 seconds per minute, 60 minutes per hour
    return minutesPassed;
}

const fiveMinutesInMilliseconds = 5 * 60 * 1000;
function roundToNearestFive(timestamp: Timestamp): Timestamp {
    const milliseconds = timestamp.toDate().getTime();
    const roundedMilliseconds = Math.round(milliseconds / fiveMinutesInMilliseconds) * fiveMinutesInMilliseconds;
    const roundedDate = new Date(roundedMilliseconds);
    return Timestamp.fromDate(roundedDate);
}