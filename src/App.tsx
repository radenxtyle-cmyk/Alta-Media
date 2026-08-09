/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicSite from './pages/PublicSite';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicSite />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
