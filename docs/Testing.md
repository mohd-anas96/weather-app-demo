# Weather App Testing

This document outlines the test plan for the Weather App, covering various testing scenarios to ensure its functionality, usability, and robustness.

## 1. Functional Test Cases

| Test Case ID | Test Scenario | Test Steps | Expected Result |
| :--- | :--- | :--- | :--- |
| **FT-001** | Search for a valid city | 1. Open the Weather App.<br>2. Enter a valid city name (e.g., "London") in the search input.<br>3. Click the search button. | The app displays the current weather information for the specified city. |
| **FT-002** | Use "Use My Location" button | 1. Open the Weather App.<br>2. Click the "Use My Location" button.<br>3. Grant location permission if prompted. | The app displays the current weather information for the user's current location. |
| **FT-003** | Deny location permission | 1. Open the Weather App.<br>2. Click the "Use My Location" button.<br>3. Deny location permission if prompted. | The app displays a friendly message asking the user to grant permission or search for a city. |
| **FT-004** | Search for a city after using location | 1. Use the "Use My Location" button to get weather for the current location.<br>2. Enter a valid city name in the search input.<br>3. Click the search button. | The app displays the weather for the new city. |
| **FT-005** | Search with Enter key | 1. Open the Weather App.<br>2. Enter a valid city name in the search input.<br>3. Press the Enter key. | The app displays the current weather information for the specified city. |

## 2. UI Test Cases

| Test Case ID | Test Scenario | Test Steps | Expected Result |
| :--- | :--- | :--- | :--- |
| **UI-001** | Verify initial UI state | 1. Open the Weather App. | The app displays the search input, search button, and "Use My Location" button. The weather information is hidden, and the loader is not visible. |
| **UI-002** | Verify loader visibility | 1. Search for a city or use the location button. | The loader is visible while the app is fetching weather data. |
| **UI-003** | Verify weather data display | 1. Successfully fetch weather data. | The weather data section is visible and displays all the required information (city name, temperature, humidity, wind speed, etc.). |
| **UI-004** | Verify error message display | 1. Trigger an error (e.g., search for an invalid city). | An error message is displayed in the error message section. |
| **UI-005** | Verify responsive design | 1. Open the app on different screen sizes (desktop, tablet, mobile). | The app's layout and elements adjust to the screen size without breaking. |

## 3. Negative Test Cases

| Test Case ID | Test Scenario | Test Steps | Expected Result |
| :--- | :--- | :--- | :--- |
| **NEG-001** | Search for an invalid city | 1. Open the Weather App.<br>2. Enter an invalid city name (e.g., "InvalidCity123").<br>3. Click the search button. | The app displays an error message indicating that the city was not found. |
| **NEG-002** | Search for an empty city | 1. Open the Weather App.<br>2. Leave the search input empty.<br>3. Click the search button. | The app does nothing or displays a message prompting the user to enter a city. |
| **NEG-003** | Geolocation not supported | 1. Use a browser that does not support geolocation.<br>2. Open the Weather App.<br>3. Click the "Use My Location" button. | The app displays an error message indicating that geolocation is not supported. |

## 4. Edge Cases

| Test Case ID | Test Scenario | Test Steps | Expected Result |
| :--- | :--- | :--- | :--- |
| **EDGE-001** | Very long city name | 1. Enter a very long city name in the search input. | The UI handles the long name gracefully without breaking the layout. |
| **EDGE-002** | Slow network connection | 1. Simulate a slow network connection.<br>2. Search for a city. | The loader is displayed for a longer time, and the app eventually displays the weather data or a timeout error. |
| **EDGE-003** | Rapidly click search/location button | 1. Click the search or location button multiple times in quick succession. | The app handles the multiple requests without crashing or displaying inconsistent data. |

## 5. Browser Compatibility Testing

| Test Case ID | Browser | Version | Expected Result |
| :--- | :--- | :--- | :--- |
| **BCT-001** | Google Chrome | Latest | All functionalities work as expected. |
| **BCT-002** | Mozilla Firefox | Latest | All functionalities work as expected. |
| **BCT-003** | Microsoft Edge | Latest | All functionalities work as expected. |
| **BCT-004** | Safari | Latest | All functionalities work as expected. |
