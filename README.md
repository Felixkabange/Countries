# Countries Explorer

A React application to explore countries using the [REST Countries API](https://restcountries.com/). Users can:

- View a list of all countries
- Search by name or filter by region
- View detailed country information
- Favorite countries and revisit them easily

This project uses **React**, **Material-UI (MUI)**, and **React Router**.

---


## Features

- **Home Page:** Displays all countries in alphabetical order with flags, population, region, and capital.
- **Search & Filter:** Search countries by name and filter by region.
- **Country Details:** View detailed info about a country, including population, region, subregion, capital, currencies, languages, and borders.
- **Favorites:** Mark/unmark countries as favorites and view them in a dedicated Favorites page.
- **Responsive Design:** Works on desktop and mobile devices.

---

## Installation

Make sure you have Node.js installed.

```bash
# Clone the repository
git clone https://github.com/Felixkabange/Countries.git
cd Countries/frontend

# Install dependencies
npm install

# Start the development server
npm run dev
Open http://localhost:5173  in your browser.

#Decisions / Trade-offs
Used MUI instead of TailwindCSS for easier styling and responsiveness.

Favorites are stored in localStorage to persist across page refreshes. This approach avoids needing a backend but limits multi-device sync.

With more time I could have implemented state management with redux to ensure favorites are transfered among different device

Alphabetical sorting is done on the client-side for simplicity.

#Future Improvements
Add pagination or infinite scroll for performance on large datasets.

Implement multi-criteria search (name, region, language) on the API side if supported.

Integrate a backend to persist favorites per user across devices.

Implement even more targetted search by demographics 
