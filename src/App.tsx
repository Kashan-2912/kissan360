import { BrowserRouter as Router, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { MantineProvider } from "@mantine/core";
import { store } from "./store";
import "@mantine/core/styles.css";

import { SellRoutes } from "./routes/SellRoutes";
import { PurchaseRoutes } from "./routes/PurchaseRoutes";

function App() {
  return (
    <Provider store={store}>
      <MantineProvider>
        <Router>
          <Routes>
            {SellRoutes}
            {PurchaseRoutes}
          </Routes>
        </Router>
      </MantineProvider>
    </Provider>
  );
}

export default App;
