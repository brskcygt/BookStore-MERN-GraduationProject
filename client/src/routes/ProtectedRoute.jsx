import React from 'react'
import Sidebar from '../components/Sidebar/Sidebar';
import styled from '@emotion/styled';
import Navbar from '../components/Main/Navbar/Navbar';
import {  Navigate, Outlet, redirect } from 'react-router-dom';

const Layout = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 3fr;
  width: 100%;
  height: 100vh;
`;

const Dummy = styled.div`
  min-width: 250px;
  height: 100%;
  grid-column: 1 / 2;
`;

const MainLayout = styled.div`
  grid-column: 2 / 3;
`;

function ProtectedRoute() {
    const auth = localStorage.getItem('_id') ? true : false;
    if(!auth){
     return <Navigate to="login"   replace />
    }

  return (
    <>
        <Layout>
        <Dummy>
          <Sidebar />
        </Dummy>
        <MainLayout>
          <Navbar />
          <Outlet/>
        </MainLayout>
      </Layout>
        
    </>
  )
}

export default ProtectedRoute