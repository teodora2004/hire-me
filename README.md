# Attendance Application

This repository contains a small React application for managing and displaying children's attendance data. The application fetches data from a given API and displays it in a user-friendly format.

## Getting Started

### Prerequisites

- Node.js (>= 14.x)
- npm (>= 6.x) or yarn (>= 1.x)

### Installation

1. **Fork the Repository:**

   - Click the "Fork" button at the top-right corner of this repository's GitHub page to create a copy under your GitHub account.

2. **Clone the Forked Repository:**

   ```bash
   git clone https://github.com/your-username/attendance-application.git
   cd attendance-application
   ```

   Replace `your-username` with your GitHub username.

3. **Install Dependencies:**

   Using npm:

   ```bash
   npm install
   ```

### Running the Application

To run the application locally, use the following command:

Using npm:

```bash
npm start
```

This will start the development server and open the application in your default web browser.

### Usage

1. Ensure you have a valid `accessToken`, `groupId`, and `institutionId` to fetch the attendance data.
2. The application will fetch and display the list of children along with their attendance status.

REACT_APP_ACCESS_TOKEN=<access_token>
REACT_APP_GROUP_ID=86413ecf-01a1-44da-ba73-1aeda212a196
REACT_APP_INSTITUTION_ID=dc4bd858-9e9c-4df7-9386-0d91e42280eb

## Design Decisions

### Custom Hook for Data Fetching

I created a custom hook `useFetchChildren` to handle data fetching in order to promote code reusability, separation of concerns, and improved readability. By encapsulating the data fetching logic in a custom hook, we can easily reuse this logic across different components and maintain a clean component structure.

### Error Handling

The custom hook handles errors by setting an error state if the data fetching fails. This allows the component to gracefully handle and display error messages to the user.

### Component Structure

The application consists of the following main parts:

- **`useFetchChildren` Hook:** Handles data fetching and state management.
- **`ChildrenList` Component:** Uses the `useFetchChildren` hook to fetch and display the list of children.
- **`Child` Component:** Handles check-in/out actions; By encapsulating this logic within the Child component, we promote encapsulation, reusability, and flexibility.
- **`Pagination` feature - it is encapsulated within the usePagination custom hook. It tracks the current page state and calculates the range of items to display based on the current page number and items per page. It's utilizing memoization for performance optimization, it computes the current items and total pages, ensuring minimal re-renders.