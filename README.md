<p align="center">
  <a href="https://www.perspective.co/">
  <img align="center" src="https://perspective.imgix.net/assets/app/logo/256x256.png" alt="thumbnail">
</a>
</p>
<p align="center">
  <a href="#-features"><strong>Features</strong></a> ·
  <a href="#-deployment"><strong>Deployment</strong></a> ·
  <a href="#-getting-started"><strong>Getting started</strong></a> ·
  <a href="#%EF%B8%8F-scripts-overview"><strong>Scripts overview</strong></a> ·
</p>

## 🎉 Features
- 🚀 Next.js 14 (App router)
- ⚛️ React 18
- 📘 Typescript
- 🎨 TailwindCSS - Class sorting, merging and linting
- 🛠️ Shadcn/ui - Customizable UI components
- 🧪 Jest & React Testing Library - Configured for unit testing
- 📈 Absolute Import & Path Alias - Import components using `@/` prefix
- 💅 Biome - Format, lint, all in one
- 🐶 Husky & Lint Staged - Run scripts on your staged files before they are committed
- 🔹 Icons - From Lucide

## 🚀 Deployment

[website](https://funnels-preview-ashen.vercel.app/)
🎉 Has been tested across Safari, Chrome, Firefox 

## 🎯 Getting started

### 2. Install dependencies

```bash
pnpm install
```

### 4. Prepare husky
It is required if you want husky to work

```bash
pnpm prepare
```

### 5. Run the dev server

You can start the server using this command:

```bash
pnpm dev
```

and open http://localhost:3000/ to see this app.

## 📁 Project structure

```bash
.
├── .husky                          # Husky configuration
├── public                          # Public assets folder
└── src
    ├── __tests__                   # Unit and tests
    ├── app                         # Next JS App (App Router)
    ├── components                  # React components
    ├── hooks                       # Custom hooks
    ├── lib                         # Functions and utilities
    ├── styles                      # Styles folder
    ├── types                       # Type definitions
```

## ⚙️ Scripts overview
The following scripts are available in the `package.json`:
- `dev`: Run development server
- `build`: Build the app
- `start`: Run production server
- `preview`: Run `build` and `start` commands together
- `lint`: Lint the code using Biome
- `lint:fix`: Fix linting errors
- `format:check`: Checks the code for proper formatting
- `format:write`: Fix formatting issues
- `typecheck`: Type-check TypeScript without emitting files
- `test`: Run unit tests
- `test:watch`: Run unit tests in watch mode
- `postbuild`: Generate sitemap
- `prepare`: Install Husky for managing Git hooks

## Extra Mile 🏁 

- More Unit tests and UI Integration tests.
- More Styling around the canvas and the elements.
- More file management, potentially upload the json files to S3 and provide a file management for the client.

