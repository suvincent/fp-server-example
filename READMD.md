# Fastify Simple Server with Validated Environment Variables
This project is an example of a Fastify server that uses fp-ts to validate environment variables. It demonstrates how to ensure the server configuration is correct before starting, providing clear and detailed error messages when validation fails.

This approach is particularly useful in server development and deployment, where different environments require specific configurations.

## Features
* Environment Variable Validation: Ensures all required environment variables are correctly defined and meet the expected criteria.
* Clear Error Reporting: Displays detailed error messages when validation fails, helping to debug misconfigurations quickly.
* Functional Programming with fp-ts: Implements a functional programming approach for robust and predictable validation.


## Prerequisites
Node.js: v20.18.1
Environment File (.env): Create a .env file with the required environment variables in the correct format.

## Installation and Usage
```
npm i
npm run build
npm run start
```

## Testing

```
npm run test
```