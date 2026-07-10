# Interactive Quiz Funnel

Technical assessment built with:

- HTML5
- CSS3
- Vanilla JavaScript

## Features

- Multi-step quiz
- Progress bar
- GTM tracking
- Meta Pixel Lead event
- Klaviyo API integration
- Responsive design

## Integrations - [CheckoutChamp → Klaviyo Activation](./docs/checkoutchamp-klaviyo-integration.md)

## Security Note

- Klaviyo API Integration it's exposed for the purpose of this technical assessment, the Klaviyo API integration is demonstrated from the frontend side to show the expected payload structure and integration flow. In other cases the API Key should **never be exposed in client-side JavaScript**.

The recommended architecture would be: ```text User submits quiz | ↓ Frontend Application | ↓ Backend / Serverless Function | ↓ Klaviyo API (using private API key)

## Run locally

Open `index.html` using a local server.
Replace API_KEY and LIST_ID with your Klaviyo credentials before running against a real account.
Example: Live Server (VS Code).

## Live Demo

You can review the implementation directly through the live preview below. No installation is required:

🔗 [Live Preview](https://quiz-funnel-trial-task.vercel.app/)
