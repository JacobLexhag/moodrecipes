# Mood Recipe Finder

A web application that recommends recipes based on your current mood. The app uses natural language processing to analyze your mood and suggests appropriate recipes to match your emotional state.

## Features

- Mood-based recipe recommendations
- Interactive chat interface
- Beautiful, responsive design
- Recipe categories for different moods (happy, sad, excited, tired)
- Detailed recipe pages with ingredients and instructions

## Tech Stack

- Node.js
- Express.js
- SQLite3
- Tailwind CSS
- Vanilla JavaScript

## Local Development

1. Clone the repository:

```bash
git clone <your-repo-url>
cd mood-recipe-finder
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open http://localhost:3000 in your browser

## Deployment

This application is configured for deployment on Render.com. Here's how to deploy:

1. Create a Render account at https://render.com

2. Create a new Web Service

3. Connect your GitHub repository

4. Configure the service:

   - Name: mood-recipe-finder
   - Environment: Node
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Plan: Free

5. Click "Create Web Service"

The application will be automatically deployed and you'll get a URL where it's accessible.

## Environment Variables

No environment variables are required for basic functionality. The application uses SQLite for data storage.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
