# Ankara & Co. - Premium African Fabrics

A modern, fully responsive React e-commerce website for Ankara & Co., featuring premium African fabrics including Ankara, Asooke, and Lace materials.

## Features

- ✅ **Fully Responsive Design**: Optimized for mobile, tablet, and desktop views
- ✅ **Modern React Architecture**: Built with React 18
- ✅ **Exact Design Match**: Matches the provided design specifications
- ✅ **Interactive Components**: Mobile menu, hover effects, and smooth transitions
- ✅ **Complete Sections**:
  - Header with navigation, search, and cart
  - Hero section with call-to-action
  - Shop by Category (6 categories in responsive grid)
  - New Arrivals products showcase
  - Value proposition features
  - Comprehensive footer with newsletter

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

The page will automatically reload when you make changes.

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Project Structure

```
├── public/
│   ├── index.html          # Main HTML template
│   ├── hero page image 1.png
│   └── image 1.png - image 10.png
├── src/
│   ├── App.js              # Main React component
│   ├── App.css             # Responsive styles
│   ├── index.js            # React entry point
│   └── index.css           # Global styles
├── package.json            # Dependencies and scripts
└── README.md               # This file
```

## Responsive Breakpoints

- **Desktop**: 1025px and above
  - 3-column category grid
  - 4-column product grid
  - Full navigation menu visible

- **Tablet**: 769px - 1024px
  - 2-column category grid
  - 2-column product grid
  - Adjusted spacing and typography

- **Mobile**: 480px - 768px
  - Single column layouts
  - Mobile hamburger menu
  - Optimized typography and spacing
  - Hidden search bar

- **Small Mobile**: Below 480px
  - Further optimized spacing
  - Smaller font sizes
  - Stacked newsletter form

## Design Specifications

### Colors
- Primary Beige: `#F5F1EB`
- Dark Green: `#1B4D3E`
- Brown Button: `#8B6F47`
- Text Dark: `#2C2C2C`
- Text Light: `#666`

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

### Image Assets
All images are located in the `public/` folder and referenced with absolute paths starting with `/`.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

## Notes

- The mobile menu toggles on click of the hamburger icon
- All images should be placed in the `public/` folder
- The design is pixel-perfect and matches the provided specifications
- All interactive elements have hover states and transitions

