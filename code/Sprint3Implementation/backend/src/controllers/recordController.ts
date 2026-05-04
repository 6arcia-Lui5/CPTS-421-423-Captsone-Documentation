import type { Request, Response } from "express"
import * as queries from "../db/queries"
import { getAuth } from "@clerk/express"

// Get all records
export const getAllRecords = async (req: Request, res: Response) => {
    try {
        const records = await queries.getAllRecords();
        res.status(200).json(records);
    } catch (error) {
        console.error("Error getting records:", error);
        res.status(500).json({error: "Failed to get records" })
    }
}

export const getRecordById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const record = await queries.getRecordById(id.toString());

        if (!record) return res.status(404).json({ error: "Record not found" });

        return res.status(200).json(record);
    } catch(error) {
        console.error("Error getting collection by id:", error);
        res.status(500).json({ error: "Failed to get collection by id" });
    }
};


// Get user records
export const getMyRecords = async (req: Request, res: Response) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) return res.status(401).json({ error: "Unauthorize" });

        const records = await queries.getRecordsByUserId(userId);
        res.status(200).json(records);
    } catch (error) {
        console.error("Error getting user records:", error);
        res.status(500).json({error: "Failed to get user records" })
    }
};

// Create a new record
export const createRecord = async (req: Request, res: Response) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) return res.status(401).json({ error: "Unauthorized" });

        const { title, description, imageUrl, date, material, dimensions, classification, credit, objectNumber, collectionId } = req.body

        if (!title || !description || !imageUrl || !date || !material || !dimensions || !classification || !credit || !objectNumber ) {
            res.status(400).json({ error: "All fields required for a record" });
            return;
        }

        const record = await queries.createRecord({
            userId,
            date,
            imageUrl,
            title,
            description,
            material,
            dimensions,
            classification,
            credit,
            objectNumber,
            collectionId,
        });

        res.status(201).json(record);
    } catch (error) {
        console.error("Error creating records:", error);
        res.status(500).json({error: "Failed to create records" })
    }
}

// Update an existing record
export const updateRecord = async (req: Request, res: Response) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) return res.status(401).json({ error: "Unauthorized" });

        const { id } = req.params;
        const { title, description, imageUrl, date, material, dimensions, classification, credit, objectNumber, collectionId } = req.body;

        const existingRecord = await queries.getRecordById(id.toString());
        if (!existingRecord) {
            res.status(404).json({ error: "Record not found" });
            return;
        }

        if (existingRecord.userId !== userId) {
            res.status(403).json({ error: "You can only update your own records" });
            return;
        }

        const record = await queries.updateRecord(id.toString(), {
            date,
            title,
            description,
            material,
            dimensions,
            classification,
            credit,
            objectNumber,
            collectionId,
            imageUrl,
        })

        res.status(200).json(record);
    } catch (error) {
        console.error("Error updating records:", error);
        res.status(500).json({error: "Failed to update records" })
    }
}

// Delete records
export const deleteRecord = async (req: Request, res: Response) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) return res.status(401).json({ error: "Unauthorized" });

        const { id } = req.params;

        const existingRecord = await queries.getRecordById(id.toString());
        if (!existingRecord) {
            res.status(404).json({ error: "Record not found" });
            return;
        }

        if (existingRecord.userId !== userId) {
            res.status(403).json({ error: "You can only delete your own records" });
            return;
        }

        await queries.deleteRecord(id.toString());
        res.status(200).json({ message: "record deleted successfully" });
    } catch (error) {
        console.error("Error deleting record:", error);
        res.status(500).json({ error: "Failed to delete record" });
    }
};