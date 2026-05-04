import { db } from "./index";
import { eq } from "drizzle-orm";
import { users, records, collections, type NewUser, type NewRecord, type NewCollection } from "./schema";


// User queries
export const createUser = async (data: NewUser) => {
    const [user] = await db.insert(users).values(data).returning();
    return user;
}

export const getUserById = async (id: string) => {
    return db.query.users.findFirst({ where: eq(users.id, id) });
};

export const updateUser = async (id: string, data:Partial<NewUser>) => {
    const existingUser = await getUserById(id);
    if (!existingUser) {
        throw new Error(`User with id ${id} not found`);
    }
    const [user] = await db.update(users).set(data).where(eq(users.id, id)).returning();
    return user;
};

export const upsertUser = async (data:NewUser) => {
    // Originally done - provides a race condition if two requests try to upsert the same user at the same time
    // const existingUser = await getUserById(data.id);
    // if (existingUser) {
    //     return updateUser(data.id, data);
    // }
    // return createUser(data);

    // Updated upsert method
    const [user] = await db.insert(users).values(data).onConflictDoUpdate({
        target: users.id,
        set: data,
    }).returning();
    return user;
}

//Collection queries===================================================
export const createCollection = async(data:NewCollection) => {
    const [collection] = await db.insert(collections).values(data).returning();
    return collection;
};

//gets collection info for cards
export const getAllCollections = async() => {
    return db.query.collections.findMany({ 
        with: { records: true },
        orderBy: (collections, {desc}) => [desc(collections.createdAt)] 
    });
}

//Used in collection page for all collection details
export const getCollectionById = async(id: string) => {
    return db.query.collections.findFirst({ 
        where: eq(collections.id, id), 
        with: {
            records: true,
        },
    });
};

export const deleteCollection = async(id: string) => {
    const existingCollection = await getCollectionById(id);
    if (!existingCollection) {
        throw new Error(`Collection with id ${id} not found`);
    }

    const [collection] = await db.delete(collections).where(eq(collections.id, id)).returning();
    return collection;
}

// Record queries=====================================
export const createRecord = async(data:NewRecord) => {
    const [record] = await db.insert(records).values(data).returning();
    return record;
};

//gets record info for cards
export const getAllRecords = async() => {
    return db.query.records.findMany({ 
        with: { user: true },
        orderBy: (records, {desc}) => [desc(records.createdAt)] 
    });
}

//Used in record page for all details
export const getRecordById = async(id: string) => {
    return db.query.records.findFirst({ 
        where: eq(records.id, id), 
        with: {
            user: true,
            collections: true,
        },
    });
};

export const getRecordsByUserId = async(userId: string) => {
    return db.query.records.findMany({ 
        where: eq(records.userId, userId), 
        with: { user: true},
        orderBy: (records, { desc }) => [desc(records.createdAt)],
    });
};

export const updateRecord = async(id: string, data:Partial<NewRecord>) => {
    const existingRecord = await getRecordById(id);
    if (!existingRecord) {
        throw new Error(`Record with id ${id} not found`);
    }

    const [record] = await db.update(records).set(data).where(eq(records.id, id)).returning();
    return record;
};

export const deleteRecord = async(id: string) => {
    const existingRecord = await getRecordById(id);
    if (!existingRecord) {
        throw new Error(`Record with id ${id} not found`);
    }
    
    const [record] = await db.delete(records).where(eq(records.id, id)).returning();
    return record;
}