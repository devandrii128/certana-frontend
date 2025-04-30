# Certana Frontend

This is the frontend application for the Certana platform, a solar job bidding marketplace where solar companies can post installation jobs and electricians can bid on them.

## Technologies

- **React** - UI library
- **TypeScript** - Type checking and improved developer experience
- **React Router** - Routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client

## Project Structure

```
src/
├── assets/                     # Images, fonts, etc.
├── components/                 # Reusable components
│   ├── common/                 # Shared UI components
│   ├── layout/                 # Layout components
│   └── jobs/                   # Job-specific components
├── contexts/                   # React contexts
├── hooks/                      # Custom React hooks
├── pages/                      # Page components
├── services/                   # API service integration
├── types/                      # TypeScript type definitions
├── utils/                      # Utility functions
├── App.tsx                     # Root component
├── index.tsx                   # Entry point
└── routes.tsx                  # Route definitions
```

## Getting Started

### Prerequisites

- Node.js v16 or higher
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/devandrii128/certana-frontend.git
   cd certana-frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and configure environment variables:
   ```
   cp .env.example .env
   ```

4. Start the development server:
   ```
   npm start
   ```

The application will be running at http://localhost:3000.

## Features

- **Authentication**: Login with JWT tokens
- **Dashboard**: Overview of available jobs and platform features
- **Job Management**: View jobs and create new job listings
- **Role-Based Access Control**: Different features for companies and electricians

## Test Accounts

For testing purposes, the application can be used with the following credentials:

- **Solar Company**:
  - Username: `admin`
  - Password: `admin123`

- **Electrician**:
  - Username: `electrician`
  - Password: `elect123`

## Development

### Available Scripts

- `yarn start` - Start development server
- `yarn run build` - Build for production
- `yarn test` - Run tests
- `yarn run lint` - Lint code

## License

MIT