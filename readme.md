# Personal Blog

A clean, minimalist blog focused on content and readability.

## Features

- Built with React and Vite for a fast and modern user experience.
- Utilizes Drizzle ORM for database interactions.
- Supports dynamic content management with a PostgreSQL database.

## Getting Started

### Prerequisites

- Node.js (version 20 or higher)
- npm (Node package manager)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/offensive-vk/personal-blog.git
   cd personal-blog
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables:
   - Create a `.env` file in the root directory and add your database URL:
     ```
     DATABASE_URL=your_database_url_here
     ```

### Running the Application

- For development:
  ```bash
  npm run dev
  ```

- For production:
  ```bash
  npm run build
  npm start
  ```

### Database Setup

- Ensure you have a PostgreSQL database set up.
- Use Drizzle ORM to manage your database schema and migrations.

### Deployment

- The application can be deployed on platforms like Heroku, Vercel, or DigitalOcean.
- Ensure to set the `DATABASE_URL` environment variable in your deployment settings.

## License

This project is licensed under the MIT License.