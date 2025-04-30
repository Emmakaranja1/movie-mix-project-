# React + Vite
🎬 MovieMix
MovieMix is a React-based movie listing application that fetches data from an API using json-server. This project aims to provide a simple interface to browse and filter through a collection of movies



Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

## Structure of the movie mix##
Registration page-sign up
                  -log in
App component
Search-bar component
Homepage component
Movie-detail component
API-OMDB

## Requirement
Initialize the project using Vite.
Use json-server to store movie data.
Implement navigation using React Router.
Use Context API for managing app-wide state.
Organize code in folders like /components, /pages, /context, /services, etc.
     
1. Clone the Repository
bash
CopyEdit
git clone https://github.com/your-username/moviemix.git
cd moviemix

2. Install Dependencies
bash
CopyEdit
npm install

3. Install json-server (if not already installed globally)
bash
CopyEdit
npm install -g json-server

## Running the Project
1. Start the Backend (json-server)
bash





API Endpoints
GET /movies – Get all movies


GET /movies/:id – Get a single movie


POST /movies – Add a new movie


PUT /movies/:id – Update a movie


DELETE /movies/:id – Delete a movie


Features to Implement
Add a Movie – Title, genre, year, rating, and review.
View Movies – List and filter movies.
Edit Movie – Update movie details.
Delete Movie – Remove a movie from the collection.
Routing – Pages: All Movies, Watchlist, Rated 5 Stars.
Authentication – Login/logout functionality (mocked).
Context API – Store movie data and auth status globally.
Styling – User-friendly, responsive design.

📦 Deployment
 deploy the frontend  Vercel 



If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

slides link
https://docs.google.com/presentation/d/1RlHKHUS8QFbm-6EKdEi8pA4kyHWwqyfY5SP_z1hgsFY/edit?usp=sharing

vercel frontend link
https://movie-mix-project.vercel.app/

vercel mockApi link
https://moviemix-mock-api.onrender.com/
