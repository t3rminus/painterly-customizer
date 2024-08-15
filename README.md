# Painterly Pack Cusomizer
A (re-)restart of the Minecraft Painterly Pack resource pack customizer, allowing you to build a completely custom Minecraft resource pack.

## Getting Started
The Painterly Customizer is a [Next.js](https://nextjs.org/) project.
To build and run a development server:
Ensure you have a Postgres server available to store the project data.
Make an `.env.local` file in the root of the project with the following variables, or otherwise ensure the variables are set in your environment:
```
AUTH_SECRET="..."
POSTGRES_URL="postgres://..."
```
Then run 
```bash
npm i && npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
