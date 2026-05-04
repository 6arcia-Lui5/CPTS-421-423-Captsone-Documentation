# Sprint 3 Report (05/03/2026)

## YouTube link of Sprint * Video (Make this video unlisted)
(https://youtu.be/XgfdpYvT8V0)

---

## What's New (User Facing)
 * Users can now **create new artifacts/records** through a submission form
 * Users can **edit and delete their own records**
 * Improved frontend interaction with backend APIs (full CRUD support)
 * Authentication system implemented (users can sign up, log in, and manage their data)
 * User-specific views such as **"Profile" page**
 * Improved UI over prototype

---

## Work Summary (Developer Facing)
For this sprint, the team focused on expanding the system from a primarily static application into a fully interactive full-stack platform. Building on the architecture established in Sprint 2, we implemented full CRUD functionality and integrated user authentication into the system.

A significant portion of the work involved connecting the frontend and backend through API calls, ensuring that user actions such as creating, updating, and deleting records were properly handled and persisted in the database. We also implemented user management, allowing records to be associated with specific authenticated users.

Another key focus was improving frontend architecture by transitioning to a more dynamic component-based design and integrating state management and data-fetching strategies using TanStack Query and Drizzle ORM. This allowed for better synchronization between the UI and backend data.

One challenge addressed during this sprint was handling validation and error states across the full stack, particularly ensuring consistency between frontend input handling and backend validation requirements. We also ran into a few issues with auth syncing, cases where there were missing fields, and some routing bugs for the **Create Record** Page.

This sprint emphasized full-stack integration and user interaction, transforming the project into a more complete and functional application.

---

## Unfinished Work
Some features remain incomplete due to time constraints, including:
 * collections, filtering and search, UI polish, Other user Profile Viewing, CSV import/export
 * Deployment is still partially deployed with the Neon Database, but local instance for the website, which is a decions the client wanted us to take until it is completely finished. 
 
 In the future, we will be integrating each of these issues and will have a full deployment.


---

## Completed Issues/User Stories
Here are links to the issues that we completed in this sprint:

 * [URL of issue 1]
 * [URL of issue 2]
 * [URL of issue n]

---

## Incomplete Issues/User Stories
Here are links to issues we worked on but did not complete in this sprint (All due to time constraints):

 * [URL of issue 1] <<[REASON NOT COMPLETED]>>
 * [URL of issue 2] <<[REASON NOT COMPLETED]>>
 * [URL of issue n] <<[REASON NOT COMPLETED]>>

---

## Code Files for Review
Please review the following code files, which were actively developed during this sprint, for quality:

 * Frontend - https://github.com/6arcia-Lui5/CPTS-421-423-Captsone-Documentation/tree/main/code/Sprint3Implementation/frontend
 * Backend - https://github.com/6arcia-Lui5/CPTS-421-423-Captsone-Documentation/tree/main/code/Sprint3Implementation/backend
 * Database Schema/Queries - https://github.com/6arcia-Lui5/CPTS-421-423-Captsone-Documentation/tree/main/code/Sprint3Implementation/backend/src/db
 * API Endpoints - https://github.com/6arcia-Lui5/CPTS-421-423-Captsone-Documentation/blob/main/code/Sprint3Implementation/backend/src/index.ts

---

## Retrospective Summary

### Here's what went well:
  * Successful implementation of full CRUD functionality
  * Integration of authentication with application data
  * Improved frontend-backend communication

### Here's what we'd like to improve:
   * Better handling of edge cases and validation
   * Earlier testing of full-stack integration
   * Communication

### Here are changes we plan to implement in the next sprint:
   * Finalize remaining features and polish UI/UX
   * Improve error handling and validation consistency
   * Prepare application for deployment and final presentation
   * Add csv import/export
   * Add search/filtering function