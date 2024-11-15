# Quadrant Splitter Component

This React component allows users to split a viewport-covering quadrant into four unique sub-quadrants, each with a different color, upon click. Each click on any quadrant recursively divides it further into four sub-quadrants.

## Features
- **Quadrant Splitting**:  Each of the quadrants should maintain a common corner at the point where the mouse was clicked. This means that the quadrant is not split into 4 equally sized squares, but into 4 rectangles with different sizes .
- **Unique Colors**: Ensures each quadrant has a unique color that differs from its immediate siblings.
- **Initial Centered Display**: By default, the initial quadrant fills the entire viewport.

## Demo
Here’s how it works:
1. The main screen starts with one full-size quadrant.
2. When clicked, each quadrant splits into four sub-quadrants, each with its own unique color.

## Code Overview

### Components

1. **`Quadrant` Component**: 
   - Displays a single quadrant.
   - Listens for click events to trigger quadrant splitting.

2. **`QuadrantSplitter` Component**:
   - Manages quadrant states, including color , position , width and height.
   - Implements unique color generation and quadrant splitting logic.

### Key Functions

- **`getRandomColor`**: Generates a random color in hexadecimal format.
- **`generateUniqueColors`**: Ensures each split produces four unique colors, avoiding duplication among sibling quadrants.
- **`handleQuadrantClick`**: Calculates click position, splits the quadrant into four new quadrants, and assigns unique colors to each.

### Usage

To integrate this component:
1. Clone the repository.
2. Install dependencies with:
3. Start the app with
   ```bash
   npm install
   npm start


This will let users know that when they run the app locally, it will be available on port 3000 by default.
