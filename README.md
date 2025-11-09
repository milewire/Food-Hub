# FoodHub Data Analysis Dashboard

This is an interactive dashboard for a fictional food aggregator company, FoodHub, to analyze restaurant order data. The application visualizes trends in demand and uses the Google Gemini API to generate AI-powered business insights, helping to enhance customer experience and drive business growth.

The dashboard is built with React, TypeScript, and Tailwind CSS, featuring a clean, responsive, and modern UI.

## Features

-   **Dynamic Filtering**: Filter the entire dashboard's data by cuisine type to focus the analysis.
-   **Key Performance Indicators (KPIs)**: At-a-glance cards display essential metrics like Total Orders, Average Customer Rating, Average Cost for Two, and Average Delivery Time.
-   **Interactive Charts**: Data is visualized through several charts powered by Recharts:
    -   A **bar chart** showing the top 10 most popular restaurants by order volume.
    -   A **pie chart** illustrating the distribution of orders across different cuisines.
    -   A **line chart** tracking order trends throughout the week.
-   **Detailed Data Table**: A comprehensive, sortable table provides detailed performance metrics for each restaurant, including total orders, average rating, and average cost.
-   **AI-Powered Insights**: A standout feature that leverages the Google Gemini API to generate actionable business advice based on the currently filtered data summary. Includes loading and error states for a smooth user experience.
-   **Responsive Design**: The layout is fully responsive, ensuring a great user experience on desktops, tablets, and mobile devices.

## Tech Stack

-   **Frontend**: React, TypeScript
-   **Styling**: Tailwind CSS
-   **Charting**: Recharts
-   **Icons**: Lucide React
-   **AI Integration**: Google Gemini API (`@google/genai`)

## How It Works

1.  **Data Simulation**: The application uses a `dataService` to generate realistic mock data for restaurant orders, simulating a real-world dataset.
2.  **State Management**: React hooks (`useState`, `useMemo`, `useEffect`) are used to manage the application's state, including the order data, filters, and KPI calculations.
3.  **Data Visualization**: Components render various charts and tables using the `Recharts` library, which dynamically update when the data or filters change.
4.  **AI Insight Generation**: When the user requests insights, the `geminiService` sends a summarized version of the current data to the Gemini API and displays the returned analysis, providing actionable business intelligence.

## Getting Started

This is a static web application that relies on CDN-hosted libraries and can be run using any simple HTTP server.

1.  **API Key**: For the "Generate Insights" feature to work, the environment where the app is hosted must have the `process.env.API_KEY` variable set to a valid Google Gemini API key.
2.  **Serve Files**: Place all the project files (`index.html`, `index.tsx`, `components/`, `services/`, etc.) in a single directory. Serve this directory using a local web server.
    -   **Using Python**:
        ```bash
        python -m http.server
        ```
    -   **Using Node.js with `serve`**:
        ```bash
        npx serve .
        ```
3.  **Access the App**: Open your web browser and navigate to the local address provided by your server (e.g., `http://localhost:8000` or `http://localhost:3000`).

## File Structure

```
.
├── README.md
├── index.html                # Main HTML entry point
├── index.tsx                 # React application entry point
├── metadata.json             # Application metadata
├── App.tsx                   # Root React component
├── types.ts                  # TypeScript type definitions
├── components/
│   ├── Header.tsx            # Application header
│   ├── Dashboard.tsx         # Main dashboard component, orchestrates all widgets
│   ├── KpiCard.tsx           # Reusable card for key metrics
│   ├── RestaurantOrdersChart.tsx # Bar chart for top restaurants
│   ├── CuisineDistributionChart.tsx # Pie chart for cuisine distribution
│   ├── DailyOrdersChart.tsx    # Line chart for daily order trends
│   ├── RestaurantDataTable.tsx # Sortable table for restaurant details
│   └── InsightsCard.tsx        # UI for the AI insights feature
└── services/
    ├── dataService.ts        # Generates mock order data
    └── geminiService.ts      # Handles communication with the Gemini API
```
