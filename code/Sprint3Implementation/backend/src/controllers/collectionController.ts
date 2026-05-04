import type { Request, Response } from "express";

import * as queries from "../db/queries";
import { getAuth } from "@clerk/express";
import { desc } from "drizzle-orm";

export const getAllCollections = async (req: Request, res: Response) => {
    try {
        const collections = await queries.getAllCollections();
        res.status(200).json(collections);
    } catch (error) {
        console.error("Error geting collections:", error);
        res.status(500).json({ error: "Failed to get collections" });
    }
};


export const getCollectionById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const collection = await queries.getCollectionById(id.toString());

        if (!collection) return res.status(404).json({ error: "Collection not found" });
    } catch(error) {
        console.error("Error getting collection by id:", error);
        res.status(500).json({ error: "Failed to get collection by id" });
    }
};

export const createCollection = async (req: Request, res: Response) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) return res.status(401).json({ error: "Unauthorized" });

        const { title, description, timePeriod, imageUrl} = req.body;

        if (!title || !description || !timePeriod || !imageUrl) {
            res.status(400).json({ error: "Title, description, timePeriod, and imageUrl are required" });
            return;
        }

        const collection = await queries.createCollection({
            title,
            description,
            timePeriod,
            imageUrl
        })
        res.status(201).json(collection);
    } catch(error) {
        console.error("Error creating collection:", error);
        res.status(500).json({ error: "Failed to create collection" });
    }
}

// // Admin only: update collection information
// export const updateCollection = async (req: Request, res: Response) => {
//     try {
//         const { userId } = getAuth(req);
//         if (!userId) return res.status(401).json({ error: "Unauthorized" });

//         const { id } = req.params;
//         const { title, description, timePeriod, imageUrl} = req.body as UpdateCollectionBody;

//         const existingCollection = await queries.getCollectionById(id.toString());
//         if (!existingCollection) {
//             res.status(404).json({ error: "Product not found" });
//             return;
//         }

//         const product = await queries.updateCollection

//     } catch(error) {
//         console.error("Error getting product:", error);
//         res.status(500).json({ error: "Failed to get product" });
//     }
// }