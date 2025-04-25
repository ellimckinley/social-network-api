# 📡 Social Network API

A backend API for a social networking app built with **Express.js**, **MongoDB**, and **Mongoose**. Designed to handle CRUD operations for users, thoughts, reactions, and friend relationships — this API powers a lightweight social platform for posting ideas, reacting to them, and staying connected. Built for assignment during University of Denver Coding Bootcamp.

---

## Table of Contents

- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [How to Use](#-how-to-use)
- [Walkthrough Video](#-walkthrough-video)
- [Author](#-author)

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose ODM

---

## Features

- Create, read, update, and delete **users** and **thoughts**
- Add and remove **friends** from a user's friend list
- Add and remove **reactions** (replies) to thoughts
- Virtuals for:
  - `friendCount` on User
  - `reactionCount` on Thought
- Uses subdocument schema for `reactions` (not standalone model)
- Proper date formatting with Mongoose getters

---

## How to Use

1. Clone the repo
2. Install dependencies `npm install`
3. Start MongoDB `mongod --dbpath ~/your-db-path
4. Run the server `npm run start`
5. Test API endpoints with **Insomnia** or **Postman**

---

## Walkthrough Video

[🔗 Click here to watch the walkthrough demo](https://your-video-link.com)

> Demonstrates all technical acceptance criteria including CRUD routes, reaction/friend functionality, and proper use of Mongoose methods.

---

## Author

**Elli McKinley**  
Business Systems Specialist | Developer-in-Training | River Rat 🛶  
[GitHub](https://github.com/ellimckinley) | [LinkedIn](https://linkedin.com/in/ellimckinley)

---
