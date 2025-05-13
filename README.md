# Sales Forecasting ML Application

A full-stack application for predicting sales based on various factors including category, weather conditions, and historical data.

## Overview

This application helps businesses predict sales for different products and categories by analyzing historical sales data along with environmental factors like weather conditions, weekends, and festivals. The application uses machine learning to generate accurate forecasts.

## Features

- **Category Management**: Add, edit, and delete product categories
- **Product Management**: Manage products within categories
- **Sales Data Entry**: Enter sales data manually or via CSV upload
- **Weather Integration**: Real-time weather data affects sales predictions
- **ML-Powered Forecasting**: Generate predictions based on historical patterns
- **Visualizations**: View forecasts with interactive charts and graphs
- **Multiple Forecast Types**: Product, category, and overall store forecasts

## Tech Stack

### Backend
- Node.js with Express
- MongoDB for database
- TensorFlow.js for machine learning
- OpenWeatherMap API for weather data

### Frontend
- React with React Bootstrap
- Recharts for data visualization
- React Router for navigation
- Axios for API communication

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- npm or yarn
- MongoDB connection

### Backend Setup
1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb+srv://aswin:aswin@cluster0.4bgll.mongodb.net/sales_forecasting?retryWrites=true&w=majority
   WEATHER_API_KEY=your_openweathermap_api_key
   ```

4. Start the backend server:
   ```
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the React development server:
   ```
   npm start
   ```

4. Access the application at http://localhost:3000

## Data Format

The application accepts CSV files with the following columns:
- `productId`: MongoDB ID of the product
- `date`: Date in YYYY-MM-DD format
- `quantity`: Number of items sold
- `temperature`: Temperature in Celsius
- `rainfall`: Rainfall in mm
- `isWeekend`: true/false or 1/0
- `isFestival`: true/false or 1/0
- `time`: Time of the day (optional)

## Getting Started

1. Add product categories
2. Add products within those categories
3. Enter sales data (manually or via CSV)
4. Generate forecasts based on your data
5. Use the insights to optimize your inventory and sales strategy
