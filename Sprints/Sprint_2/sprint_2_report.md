# Sprint 2 Report (02/3/24/26)

## YouTube link of Sprint * Video (Make this video unlisted)

## What's New (User Facing)
 * Users can browse featured artifacts on the homepage
 * Users can search artifacts by title
 * Users can view detailed artifact pages with metadata (date, material, place, symbols, etc.)
 * Backend API endpoints now support artifact retrieval and search (/artifacts, /artifacts?q=, /artifacts/{id})
 * Artifact submission pipeline implemented with validation, normalization, and status assignment (ACCEPTED, REVIEW_NEEDED, REJECTED)
 * Swagger UI (/docs) available for testing submissions and API endpoints

## Work Summary (Developer Facing)
For this sprint, the team focused on desigining and implementing the core architecture of the Digital Humanitites Artifact Archive MVP. We structured the system into a clear three-layer architecture consisting of a static frontend, a FastAPI backend and a PostgreSQL database. 

A majorority of the effort for this sprint went into building the submission process pipeline, which normalizes JSON data, evaluates data quality, assigns confidence scores, and determines schema using relational tables and JSONB fields to balance the structure with flexibility. One challenge we addressed during the sprint was handling inconsistent humanities data while preserving provenance, which led to the decision to store both original and processed records. 

This sprint was primarily focused on establishing a solid data pipeline for the project to be build on after taking into consideration how important it is to have valid data to manipulate in accordance to the clients needs.

## Unfinished Work
Some advanced search and filtering features were not completed due to time constraints. The frontend functionality also still remains basic and does not yet support full interactions with all back end capabilities. Deployment is still limited to local development (Docker + Uvicorn) and is not production ready.

All of these incomplete issues have been documented and moved to the next sprint for completion.

## Completed Issues/User Stories
Here are links to the issues that we completed in this sprint:

 * URL of issue 1
 * URL of issue 2
 * URL of issue n
 
 ## Incomplete Issues/User Stories
 Here are links to issues we worked on but did not complete in this sprint:
 
 * URL of issue 1 <<One sentence explanation of why issue was not completed>>
 * URL of issue 2 <<One sentence explanation of why issue was not completed>>
 * URL of issue n <<One sentence explanation of why issue was not completed>>

## Code Files for Review
Please review the following code files, which were actively developed during this sprint, for quality:
 * [Name of code file 1](https://github.com/your_repo/file_extension)
 * [Name of code file 2](https://github.com/your_repo/file_extension)
 * [Name of code file 3](https://github.com/your_repo/file_extension)
 
## Retrospective Summary
Here's what went well:
  * Clear separation of frontend, backend, and database responsibilities
  * Successful implementation of the full submission-to-display pipeline
  * Strong team alignment on architecture and design decisions
 
Here's what we'd like to improve:
   * Better time estimation for complex features like search and filtering
   * Earlier integration between frontend and backend components
   * More incremental testing throughout development
   * Better communication as deadlines approach
  
Here are changes we plan to implement in the next sprint:
   * Add advanced search and filtering capabilities
   * Improve frontend interactivity and user experience
   * Begin work on deployment and production readiness according to WSU's IT standards.