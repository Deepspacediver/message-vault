# Message Vault - Members only messages board

The Odin
Project [Assignment](https://www.theodinproject.com/lessons/node-path-nodejs-members-only).

## Running locally:

1. Clone project
2. npm install
3. npm run dev

## App concept:

+ To see content a user must have an account and be logged in
+ Default `user` role can only read messages but cannot add their own messages or see details of messages
+ User can change their role (into `member` or `admin`) by choosing desired option and submitting form with secret
  password
+ A `member` role can add messages and see the details of added messages (date, author)
+ An `admin` role can additionally delete messages
+ Accounts without required permission do not have access to the resources or functionalities

## Technologies:

+ Node + TS
+ Express
+ Passport.js with Local strategy
+ EJS
