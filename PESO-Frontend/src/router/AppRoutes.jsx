import React, { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import ProtectedRoute from '../components/common/ProtectedRoute'
import Customer from '../pages/Customers/Customer'
import AddNewCustomer from '../pages/Customers/AddNewCustomer'
import EditCustomer from '../pages/Customers/EditCustomer'
import ViewCustomer from '../pages/Customers/ViewCustomer'

// lazy pages
const Login = lazy(() => import('../pages/Login'))
const Dashboard = lazy(() => import('../pages/Dashboard'))

export default function AppRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes with layout */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Customer" element={<Customer />} />
          <Route path="/addNewCustomer" element={<AddNewCustomer />} />
          <Route path="/editCustomer" element={<EditCustomer />} />
          <Route path="/viewCustomer" element={<ViewCustomer />} />
          {/* Add more authenticated routes here */}
        </Route>

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Suspense>
  )
}
