
## Dokan -  a Sales Management System — Frontend

## Overview
Next.js frontend for the Sales Management System, providing a responsive UI to manage sales, inventory, and customers. Styled with Tailwind CSS and communicating with a Laravel backend via REST API.


## Features
- User authentication & role-based access

- Dashboard with sales & inventory overview

- Customer and product management

- Real-time inventory updates

- Responsive design with Tailwind CSS

## Tech Stack
- Next.js (React framework)

- Tailwind CSS for styling

- Axios for API calls

- React Context API for state management

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Create .env.local with:
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
