
# Table of Content
1. [Kanban13](#kanban13)
2. [Deployed on](#deployed-on)
4. [User Guide](#user-guide)
    1. [How to Setup](#how-to-setup)
    2. [How to Use](#how-to-use)

# kanban13

Welcome to my Kanban Task Management Single Page Application! This application allows users to easily manage and organize their tasks using a kanban board interface. It has been built using NextJS and Redis to provide a seamless and efficient user experience. With this application, users can create task cards, assign them to different columns, and drag and drop them to reorder and prioritize their tasks. The application also includes real-time updates and collaboration capabilities, making it perfect for teams to use together. Whether you're working on a personal project or managing a team, this Kanban Task Management Application has you covered.

# Deployed on

https://kanban13.vercel.app/

## User Guide

#### How to Setup

Clone the repository.

#### How to Use

Run `npm install` in `kanban13` folder.

```
 cd kanban13/
 npm install
```
> **NOTE**: If `npm install` is not executing successfully, then use node v14 and `npm install --legacy-peer-deps` and try again.

First you need to create a `.env` file in `kanban13` folder following the template provided in the file `.env.sample`.<br/> <br/>

## Set-up-Upstash
1. Sign in to https://console.upstash.com/login.
2. Click **Create database** and necessary information about the project.
  - Add project name
  - Set Region
  - Click on Create
3. Paste the redis url in .env

## Set-up-NextAuth
1. Sign in to https://console.cloud.google.com/
2. Create Project 
3. Set up OAuth
4. Paste the Google client id and client secret in .env


You should fill in these values in their relevent fields in the `.env` file.

To run the project:  
 `$ npm run dev`

Visit [localhost:3000](http://localhost:3000) to browse.



To run storybook :
` npm run storybook`
It will redirect to 6006 port. Find detailed information [here](https://storybook.js.org/docs/react/get-started/introduction)



