import React from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
<Route path="/user/register" element={<h1>User Register</h1>
} />
<Route path="/user/login" element={<h1>User Login</h1>
} />
<Route path="/food-partner/register" element={<h1>FooodPartner Register</h1>
} />
<Route path="/food-partner/login" element={<h1>FoodPartner Login</h1>
} />
      
      </Routes>
    </Router>
  );
};

export default AppRoutes;
