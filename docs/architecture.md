# Weather App Architecture

## 1. Application Overview

This document outlines the architecture of the simple, client-side weather application. The application allows users to search for weather conditions in a specific city. It is built using fundamental web technologies: HTML, CSS, and vanilla JavaScript. The application fetches data from a public third-party API and displays it in a clean, modern user interface.

## 2. Technical Architecture

The application is a **Single Page Application (SPA)** with a pure client-side architecture. It does not require a backend server.

-   **Frontend**: Vanilla HTML, CSS, and JavaScript.
    -   **Structure**: `index.html`
    -   **Styling**: `style.css` (features a responsive, "glassmorphism" design)
    -   **Logic**: `script.js`
-   **External Dependencies**:
    -   **API**: `wttr.in` for public weather data (JSON format).
    -   **Fonts**: Google Fonts (`Poppins`).

The application logic runs entirely in the user's web browser, which directly communicates with the external `wttr.in` API.

## 3. File Responsibilities

| File          | Responsibility                                                                                                                                                                                                                                                        |
| :------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `index.html`  | **Structure**: Provides the core HTML structure of the application. It contains all the necessary DOM elements, such as the input field, search button, and placeholders for displaying weather data. It links the CSS stylesheet and the JavaScript file.                 |
| `style.css`   | **Presentation**: Defines the visual appearance of the application. It handles the layout (using Flexbox), colors, fonts, animations (for loading and data display), and responsive adjustments for mobile devices.                                                    |
| `script.js`   | **Behavior**: Contains all the interactive logic. Its responsibilities include handling user input, making API requests to fetch weather data, managing UI states (loading, error, and success), and dynamically updating the DOM with the retrieved information. |

## 4. User Interface Flow

The user interface flow describes how a user interacts with the application.

1.  **Initial View**: The page loads and immediately displays the weather for a default city ("London").
2.  **User Input**: The user types the name of a different city into the "Enter city name" input field.
3.  **Search Action**: The user triggers a search by either:
    -   Clicking the search button (🔍).
    -   Pressing the `Enter` key on their keyboard.
4.  **UI Feedback**:
    -   The application shows a spinning loader to indicate that data is being fetched.
    -   Any previously displayed weather data or error messages are hidden.
5.  **Result Display**:
    -   **Success**: If the city is found, the weather information is displayed in the weather card. The new data fades in smoothly.
    -   **Failure**: If the city cannot be found or another error occurs, a user-friendly error message is displayed (e.g., "Sorry, we couldn't find the weather for...").

## 5. Weather Data Flow

This flow details how data moves through the application.

1.  **Trigger**: The flow is initiated by a call to the `getWeatherData(city)` function, which happens on initial page load or after a user search.
2.  **Request**: An `async` `fetch` request is sent to the `wttr.in` API endpoint (`https://wttr.in/{city}?format=j1`).
3.  **Response Handling**: The application awaits a response from the API.
    -   **Success (HTTP 200 OK)**: The JSON response body is parsed. The `updateWeatherData(data)` function is called with the parsed data. This function maps the JSON fields to the corresponding DOM elements (e.g., city name, temperature, humidity) and updates their content.
    -   **Error (e.g., HTTP 404 Not Found)**: The `catch` block of the promise is executed. The `showError(message)` function is called, which displays the error message in the UI.
4.  **UI Update**: The `finally` block ensures the loader is hidden after the request is complete, regardless of the outcome.

## 6. Future Improvement Opportunities

-   **API Key Abstraction**: If switching to an API that requires a key, introduce a backend proxy or a serverless function to avoid exposing the key on the client side.
-   **Component-Based Architecture**: For added complexity, the UI could be broken down into reusable components using a framework like React, Vue, or Svelte, or by following a component-based pattern in vanilla JS.
-   **State Management**: For applications with more complex state, introduce a dedicated state management library (like Redux or Pinia) or a simple state management pattern to handle application state more predictably.
-   **Unit/E2E Testing**: Implement a testing framework (like Jest, Vitest, or Cypress) to create unit tests for data transformation logic and end-to-end tests for user flows.
-   **Geolocation**: Add a feature to request the user's location to automatically fetch weather for their current area.
-   **User Preferences**: Allow users to save default locations or toggle between units (Metric/Imperial).
-   **Improved Accessibility (a11y)**: Enhance accessibility by adding ARIA roles and attributes to provide better context for screen reader users, especially for dynamically changing content.
