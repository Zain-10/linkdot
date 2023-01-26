# LinkDOT [![Twitter](https://img.shields.io/twitter/url/https/twitter.com/cloudposse.svg?style=social&label=Follow%20%40Linkdotoff)](https://twitter.com/Linkdotoff)


linkDOT enable users to aggregate all the Onchain and Offchain credentials in one public profile. This will enable projects to search for users/collaborators and discover opportunities.

## Built With
- ⚡ [Next.js](https://nextjs.org) for Static Site Generator
- 🔥 Type checking [TypeScript](https://www.typescriptlang.org)
- 💎 Integrate with [Tailwind CSS](https://tailwindcss.com)
- ✅ Strict Mode for TypeScript and React 18
- 📏 Linter with [ESLint](https://eslint.org) (default NextJS, NextJS Core Web Vitals, Tailwind CSS and Airbnb configuration)
- 💖 Code Formatter with [Prettier](https://prettier.io)
- 🦊 Husky for Git Hooks
- 🚫 Lint-staged for running linters on Git staged files
- 🚓 Lint git commit with Commitlint
- 📓 Write standard compliant commit messages with Commitizen
- 🦺 Unit Testing with Jest and React Testing Library
- 🧪 E2E Testing with Cypress
- 👷 Run tests on pull request with GitHub Actions
- 💡 Absolute Imports using `@` prefix

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) >= 14.17.0
- [MongoDB](https://www.mongodb.com/) >= 4.4.0


### Installation

1. Clone the repo

```sh
git clone git@github.com:sreejinsreenivasan/linkdot.git
```

2. Install NPM packages

```sh
npm install
```

3. Create a `.env.local` file in the root directory and add the environment variables from `.env.example`.

```sh
cp .env.example .env.local
```

4. Migration database, make sure mongodb is running

```sh
npx prisma db push 
```

5. Run the development server

```sh
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Extras

### Docker

Run the mongodb container

```sh
docker-compose up -d
```

### Future Plans

- [ ] Add more badge providers