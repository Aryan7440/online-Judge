# High-Level Design Document for Online Judge Platform

## Table of Contents

- [High-Level Design Document for Online Judge Platform](#high-level-design-document-for-online-judge-platform)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Challenges](#challenges)
  - [Data Flow](#data-flow)
  - [HLD](#hld)
    - [Database designing](#database-designing)
  - [Entities and Relationships](#entities-and-relationships)
    - [User](#user)
    - [Question](#question)
    - [TestCase](#testcase)
    - [Submission](#submission)
    - [Discussion](#discussion)
    - [Comment](#comment)
    - [Contest](#contest)
    - [ContestQuestion](#contestquestion)
  - [UI and Routes](#ui-and-routes)
    - [Creating a Contest](#creating-a-contest)
    - [Participating in a Contest](#participating-in-a-contest)
    - [Discussing Solutions](#discussing-solutions)
  - [User APIs](#user-apis)
  - [Question APIs](#question-apis)
  - [Test Case APIs](#test-case-apis)
  - [Submission APIs](#submission-apis)
  - [Discussion APIs](#discussion-apis)
  - [Comment APIs](#comment-apis)
  - [Contest APIs](#contest-apis)
  - [ContestQuestion APIs](#contestquestion-apis)
  - [Technology Stack](#technology-stack)
  - [Component Description](#component-description)
    - [Frontend](#frontend)
    - [Backend](#backend)
    - [Database](#database)
    - [External Services](#external-services)
  - [Security](#security)
  - [Scalability and Performance](#scalability-and-performance)
  - [Conclusion](#conclusion)

## Introduction

The Online Judge Platform is designed to facilitate competitive programming and coding challenges. Users can submit their code, which will be evaluated against predefined test cases. The platform is built using the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Challenges

1. **Scalability and Load Balancing**

   - Load Balancing: Distribute requests across multiple servers to ensure even load distribution.
   - Horizontal Scaling: Design architecture to support adding more servers as needed.

2. **Efficient Resource Management**

   - Sandboxing: Run each submission in an isolated environment to ensure security and prevent interference.
   - Resource Limits: Impose limits on CPU usage, memory consumption, and execution time to prevent resource abuse.
   - Prioritization: Implement a job queue to manage and prioritize submissions during peak times.

3. **Result Accuracy and Fairnes**s

   - Test Case Management: Design a robust system for managing and updating test cases without exposing them to users.
   - Edge Cases: Create comprehensive test cases that cover common and uncommon edge cases.
   - Anti-Cheating Mechanisms: Implement mechanisms to detect plagiarism and code similarity among submissions.

4. **Security**

   - Prevent Unauthorized Access: Implement robust authentication and authorization mechanisms.
   - Code Injection Attacks: Ensure that code submissions are executed in a secure, isolated environment.
   - Data Breaches: Protect user data with encryption and secure storage practices.

## Data Flow

![alt text](DataFlowDaigram.png)

1. **User Registration/Login**:

   - User interacts with the frontend to register or log in.
   - Frontend sends a request to the backend.
   - Backend interacts with the database to store or validate user credentials.
   - Response is sent back to the frontend.

2. **Problem Retrieval**:

   - User requests a list of problems.
   - Frontend sends a request to the backend.
   - Backend retrieves problem data from the database.
   - Data is sent back to the frontend for display.

3. **Code Submission**:
   - User submits code via the frontend.
   - Code is sent to the backend.
   - Backend Runs the code in the Docker Container
   - Container runs the code and returns the results.
   - Result gets compared to the expected result.
   - Backend processes and stores the results, then sends them to the frontend.

## HLD

### Database designing

![alt text](DatabaseDesign.png)

## Entities and Relationships

### User

- **\_id**: Primary Key, unique identifier for each user.
- **username**: User's name.
- **email**: User's email address.
- **passwordHash**: Hashed password for security.
- **registrationDate**: Date when the user registered.
- **DateOfBirth**: Date of birth.
- **FullName**: Full name of the user.
- **Bio**: About the User.
- **ProfilePicture**: S3 url for display picture.
- **Rating**: Rating of the user

### Question

- **\_id**: Primary Key, unique identifier for each question.
- **title**: Title of the question.
- **description**: Description of the question, including embedded image URLs.
- **difficulty**: Difficulty level of the question (e.g., easy, medium, hard).
- **Total submissons**: no of submissions
- **WA**: Total wrong no. of submissions
- **Tags**: List of Tags

### TestCase

- **TestCaseid**: Primary Key, unique identifier for each test case.
- **question_id**: Foreign Key, reference to the associated question.
- **inputFileURL**: URL to the input file stored in S3.
- **expectedOutputFileURL**: URL to the expected output file stored in S3.

### Submission

- **SubmissonID**: Primary Key, unique identifier for each submission.
- **user_id**: Foreign Key, reference to the user who made the submission.
- **question_id**: Foreign Key, reference to the question being answered.
- **Language**: Programming Language.
- **codeFileURL**: URL to the submitted code file stored in S3.
- **submissionTime**: Date and time of submission.
- **Verdict**: Result of the code execution (e.g., success, failure, error message).
- **Points**: Points scored

### Discussion

- **Article_id**: Primary Key, unique identifier for each discussion thread.
- **question_id**: Foreign Key, reference to the associated question.
- **user_id**: Foreign Key, reference to the user who initiated the discussion.
- **title**: Title of the discussion.
- **content**: Content of the discussion (e.g., description of the solution).
- **createdDate**: Date and time when the discussion was created.
- **Views**: Number of people who have viewed the article
- **Likes**: Likes in the article.
- **Dislikes**: DisLikes in the article.

### Comment

- **CommentID**: Primary Key, unique identifier for each comment.
- **discussion_id**: Foreign Key, reference to the associated discussion.
- **user_id**: Foreign Key, reference to the user who wrote the comment.
- **content**: Content of the comment.
- **createdDate**: Date and time when the comment was created.
- **Views**: Number of people who have viewed the article
- **Likes**: Likes in the article.
- **Dislikes**: DisLikes in the article.

### Contest

- **ContestID**: Primary Key, unique identifier for each contest.
- **Title**: Name of the contest.
- **startDate**: Start date and time of the contest.
- **endDate**: End date and time of the contest.
- **description**: Description of the contest.
- **Division**: Description of the contest.

### ContestQuestion

- **contest_id**: Foreign Key, reference to the associated contest.
- **question_id**: Foreign Key, reference to the associated question.

## UI and Routes

![alt text](UI_Routes.png)

### Creating a Contest

1. **Admin Interface**: Admin navigates to the contest creation page and fills out the form with contest details.
2. **Backend**: The form data is sent to the backend, which creates a new `Contest` entry in the database and associates selected questions using the `ContestQuestion` join table.
3. **Response**: The backend sends a response back to the admin interface confirming the creation of the contest.

### Participating in a Contest

1. **User Interface**: Users view active contests and select one to participate in.
2. **Contest Details**: The contest details and list of questions are fetched and displayed.
3. **Submitting Solutions**: Users select a question, write their solution, and submit it.
4. **Backend Processing**: The submission is sent to the backend, which stores the `ContestQuestion`, runs the code, and updates the result.
5. **Result Display**: The result of the submission is sent back to the user and displayed.

### Discussing Solutions

1. **User Interface**: Users can start a discussion for a question by filling out a discussion form.
2. **Backend**: The discussion is saved in the `Discussion` entity and linked to the respective question and user.
3. **Commenting**: Other users can view discussions and add comments, which are stored in the `Comment` entity.

Certainly! Here is the information formatted in Markdown:

## User APIs

1. **User Registration**

   - **Endpoint**: `POST /api/users/register`
   - **Description**: Registers a new user.

2. **User Login**

   - **Endpoint**: `POST /api/users/login`
   - **Description**: Authenticates a user and returns a JWT.

3. **Get User Profile**

   - **Endpoint**: `GET /api/users/:id`
   - **Description**: Retrieves the profile information of a user.
   - **Parameters**: `id` (user ID)

4. **Update User Profile**

   - **Endpoint**: `PUT /api/users/:id`
   - **Description**: Updates the profile information of a user.
   - **Parameters**: `id` (user ID)

5. **Get All Users**
   - **Endpoint**: `GET /api/users`
   - **Description**: Retrieves a list of all users.

## Question APIs

6. **Create Question**

   - **Endpoint**: `POST /api/questions`
   - **Description**: Creates a new question.

7. **Get Question Details**

   - **Endpoint**: `GET /api/questions/:id`
   - **Description**: Retrieves details of a specific question.
   - **Parameters**: `id` (question ID)

8. **Get All Questions**

   - **Endpoint**: `GET /api/questions`
   - **Description**: Retrieves a list of all questions.

9. **Update Question**

   - **Endpoint**: `PUT /api/questions/:id`
   - **Description**: Updates details of a specific question.
   - **Parameters**: `id` (question ID)

10. **Delete Question**
    - **Endpoint**: `DELETE /api/questions/:id`
    - **Description**: Deletes a specific question.
    - **Parameters**: `id` (question ID)

## Test Case APIs

11. **Create Test Case**

    - **Endpoint**: `POST /api/testcases`
    - **Description**: Creates a new test case.

12. **Get Test Cases for a Question**

    - **Endpoint**: `GET /api/questions/:id/testcases`
    - **Description**: Retrieves all test cases for a specific question.
    - **Parameters**: `id` (question ID)

13. **Update Test Case**

    - **Endpoint**: `PUT /api/testcases/:id`
    - **Description**: Updates details of a specific test case.
    - **Parameters**: `id` (test case ID)

14. **Delete Test Case**
    - **Endpoint**: `DELETE /api/testcases/:id`
    - **Description**: Deletes a specific test case.
    - **Parameters**: `id` (test case ID)

## Submission APIs

15. **Submit Code**

    - **Endpoint**: `POST /api/submissions`
    - **Description**: Submits a solution for a question.

16. **Get Submission Details**

    - **Endpoint**: `GET /api/submissions/:id`
    - **Description**: Retrieves details of a specific submission.
    - **Parameters**: `id` (submission ID)

17. **Get User Submissions**
    - **Endpoint**: `GET /api/users/:id/submissions`
    - **Description**: Retrieves all submissions made by a specific user.
    - **Parameters**: `id` (user ID)

## Discussion APIs

18. **Create Discussion**

    - **Endpoint**: `POST /api/discussions`
    - **Description**: Creates a new discussion thread.

19. **Get Discussion Details**

    - **Endpoint**: `GET /api/discussions/:id`
    - **Description**: Retrieves details of a specific discussion thread.
    - **Parameters**: `id` (discussion ID)

20. **Get Discussions for a Question**

    - **Endpoint**: `GET /api/questions/:id/discussions`
    - **Description**: Retrieves all discussions related to a specific question.
    - **Parameters**: `id` (question ID)

21. **Update Discussion**

    - **Endpoint**: `PUT /api/discussions/:id`
    - **Description**: Updates details of a specific discussion thread.
    - **Parameters**: `id` (discussion ID)

22. **Delete Discussion**
    - **Endpoint**: `DELETE /api/discussions/:id`
    - **Description**: Deletes a specific discussion thread.
    - **Parameters**: `id` (discussion ID)

## Comment APIs

23. **Add Comment**

    - **Endpoint**: `POST /api/comments`
    - **Description**: Adds a comment to a discussion thread.

24. **Get Comments for a Discussion**

    - **Endpoint**: `GET /api/discussions/:id/comments`
    - **Description**: Retrieves all comments for a specific discussion thread.
    - **Parameters**: `id` (discussion ID)

25. **Update Comment**

    - **Endpoint**: `PUT /api/comments/:id`
    - **Description**: Updates details of a specific comment.
    - **Parameters**: `id` (comment ID)

26. **Delete Comment**
    - **Endpoint**: `DELETE /api/comments/:id`
    - **Description**: Deletes a specific comment.
    - **Parameters**: `id` (comment ID)

## Contest APIs

27. **Create Contest**

    - **Endpoint**: `POST /api/contests`
    - **Description**: Creates a new contest.
    - **Request Body**:

28. **Get Contest Details**

    - **Endpoint**: `GET /api/contests/:id`
    - **Description**: Retrieves details of a specific contest.
    - **Parameters**: `id` (contest ID)

29. **Get All Contests**

    - **Endpoint**: `GET /api/contests`
    - **Description**: Retrieves a list of all contests.

30. **Update Contest**

    - **Endpoint**: `PUT /api/contests/:id`
    - **Description**: Updates details of a specific contest.
    - **Parameters**: `id` (contest ID)
    - **Request Body**:

31. **Delete Contest**
    - **Endpoint**: `DELETE /api/contests/:id`
    - **Description**: Deletes a specific contest.
    - **Parameters**: `id` (contest ID)

## ContestQuestion APIs

32. **Add Question to Contest**

    - **Endpoint**: `POST /api/contests/:contest_id/questions`
    - **Description**: Adds a question to a contest.
    - **Parameters**: `contest_id` (contest ID)
    - **Request Body**:

33. **Remove Question from Contest**
    - **Endpoint**: `DELETE /api/contests/:contest_id/questions/:question_id`
    - **Description**: Removes a question from a contest.
    - **Parameters**: `contest_id` (contest ID), `question_id` (question ID)

## Technology Stack

- **Frontend**: React.js
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **File Storage**: AWS S3 for storing code files, test cases, and images
- **External Services**: Code execution environment,Sandbox
- **Docker**: for containerization
- **AWS**: Deployment

## Component Description

### Frontend

- **Technology**: React.js
- **Responsibilities**:
  - User authentication and authorization
  - Display coding problems and challenges
  - Code editor and submission interface
  - Display results and user rankings

### Backend

- **Technology**: Node.js with Express.js
- **Responsibilities**:
  - User management (registration, login, profiles)
  - Problem management (CRUD operations for problems and test cases)
  - Submission handling (receiving, storing, and forwarding code submissions to the execution service)
  - Result processing and storage

### Database

- **Technology**: MongoDB
- **Responsibilities**:
  - Store user data (credentials, profiles, history)
  - Store problems and test cases
  - Store submission data and results

### External Services

- **Code Execution Service**:
  - Sandbox environment for securely executing user-submitted code
  - Supports multiple programming languages
  - Returns execution results (output, errors, execution time, etc.)

## Security

- **Authentication and Authorization**:
  - Use JWT for securing API endpoints.
  - Role-based access control for different user levels (admin, user).
- **Data Protection**:
  - Use HTTPS for secure data transmission.
  - Encrypt sensitive data in the database.

## Scalability and Performance

- **Scalability**:
  - Use a load balancer to distribute traffic across multiple backend servers.
  - Implement horizontal scaling for the backend and database.
  - Using scheduling Queues for running submissions.
- **Performance**:
  - Optimize database queries and use indexing.
  - Implement caching strategies where appropriate.
  - Use a Content Delivery Network (CDN) for serving static assets.

## Conclusion

This high-level design document outlines the core components and architecture of the Online Judge Platform built using the MERN stack. It provides a foundation for further detailed design and implementation phases, ensuring a scalable, secure, and efficient system.
