import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
    id: text("id").primaryKey(), // clerkID
    email: text("email").notNull().unique(),
    name: text("name").notNull(),
    imageUrl: text("image_url"),

    createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const collections = pgTable("collections", {
    id: uuid("id").defaultRandom().primaryKey(),

    title: text("title").notNull(),
    description: text("description").notNull(),
    imageUrl: text("image_url"),
    timePeriod: text("time_period").notNull(),

    createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const records = pgTable("records", {
    id: uuid("id").defaultRandom().primaryKey(),

    title: text("title").notNull(),
    description: text("description").notNull(),
    imageUrl: text("image_url"),
    date: text("date").notNull(),
    material: text("material").notNull(),
    dimensions: text("dimensions").notNull(),
    classification: text("classification").notNull(),
    credit: text("credit").notNull(),
    objectNumber: text("object_number").notNull(),
    userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade"}),
    collectionId: uuid("collectionId").references(() => collections.id, { onDelete: "cascade"}),

    createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow().$onUpdate(() => new Date()),
});


// Relations:

// User can have many records
export const userRelations = relations(users, ({many}) => ({
    records: many(records)
}));

// Collection can have many records
export const collectionRelations = relations(collections, ({many}) => ({
    records: many(records),
}));

// Records can have one users and belong to one collection
export const recordRelations = relations(records, ({one}) => ({
    user: one(users, {
        fields:[records.userId], 
        references: [users.id]
    }),
    collections: one(collections, {
        fields:[records.collectionId], 
        references: [collections.id]})
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type collection = typeof collections.$inferSelect;
export type NewCollection = typeof collections.$inferInsert;

export type Record = typeof records.$inferSelect;
export type NewRecord = typeof records.$inferInsert;