import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { MantineProvider } from "@mantine/core";
import { store } from "./store";
import "@mantine/core/styles.css";
import '@mantine/carousel/styles.css';

import { SellRoutes } from "./routes/SellRoutes";
import { PurchaseRoutes } from "./routes/PurchaseRoutes";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Provider store={store}>
      <MantineProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            {SellRoutes}
            {PurchaseRoutes}
          </Routes>
        </Router>
      </MantineProvider>
    </Provider>
  );
}

export default App;
