# Quotes

## Assignment Task B

A web app for quotes and stuff.

## Instructions

### Running locally

-   Clone the repo `git clone https://github.com/aizatazhar/cs3219-otot-task-b.git`
-   `npm install`
-   Create `.env` file at root of repo and add

    ```
    PORT="3000"
    ENV=${ENV}
    DEV="mongodb://localhost/cs3219-task-b"
    ```

-   On a terminal, do `mongosh`
-   On a separate terminal, do `npm run dev`
-   Have fun on postman?

### Running deployed

-   Clone the repo `git clone https://github.com/aizatazhar/cs3219-otot-task-b.git`
-   `npm install`
-   Create `.env` file at root of repo and add

    ```
    PORT="3000"
    ENV=${ENV}
    PROD=<your MongoDB url>
    ```

-   On a terminal, do `npm run prod`
-   Have fun on postman?
