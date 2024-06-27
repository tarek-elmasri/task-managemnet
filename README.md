# TMA ( Task Management App )

a basic application to manage daily tasks built with T3 stack.
[Live Demo](https://tma-zeta.vercel.app)

## Installation

### Prerequisites

- Node.js installed on your machine

- a PostgreSQL database server running

### Clone Repository

- clone repository to your local maching:

```
git clone https://github.com/tarek-elmasri/task-managemnet
cd task-managemnet
```

### Configure Environment

- rename or copy `.env-example` to `.env`

- Update Enviromental variables:

| KEY              | VALUE           | Description                                 |
| ---------------- | --------------- | ------------------------------------------- |
| DATABASE_URL     | posdgres_db_url | string representation of db credentitials   |
| NEXTAUTH_SECRET  | secret_key      | secret key for next auth encryption         |
| NEXTAUTH_URL     | localhost:3000  | root host url                               |
| ---------------- | --------------- | ------------------------------------------- |

### Install Dependencies

- Install dependencies by running the following command in the terminal:

```
npm install
```

### Database Setup

- create the database and perform migrations by running the following command in the terminal.

```
npm run db:push
```

### Start Project

- to run the application in dev mode, run the following command:

```
npm run dev
```

## Technologies Used

- T3 stack ( Next.js, Typescript, tRPC)
- Prisma
- Tailwindcss
- Shadcn Components
- React Hook Form
- Zod
