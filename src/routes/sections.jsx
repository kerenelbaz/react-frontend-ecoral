import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

import ProtectedRoute from './protectedRoutes'; 

export const IndexPage = lazy(() => import('src/pages/app'));
// export const BlogPage = lazy(() => import('src/pages/blog'));
export const PendingAdminView = lazy(() => import('src/pages/pending-admin'));
export const AllDataPage = lazy(() => import('src/pages/all-data'));
export const LoginPage = lazy(() => import('src/pages/login'));
// export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const DiveSitesMapPage = lazy(() => import('src/pages/dive-sites-map'));
export const InsertDataPage = lazy(() => import('src/pages/insert-data'));
export const ArticleViewPage = lazy(() => import('src/pages/article-view'));
export const ImportPostsPage = lazy(() => import('src/pages/import-posts'));
export const AddDiveSitePage = lazy(() => import('src/pages/add-dive-site'));
export const RegisterPage = lazy(() => import('src/pages/register'));
export const AddArticlePage = lazy(() => import('src/pages/add-article'));
export const ManageUsersPage = lazy(() => import('src/pages/manage-users'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element:  (
                  <DashboardLayout>
                    <Suspense fallback={<div>Loading...</div>}>
                      <Outlet />
                    </Suspense>
                  </DashboardLayout>
                ),
      children: [
        // IndexPage is outside the ProtectedRoute, making it accessible to everyone
        { element: <IndexPage />, index: true },
        { path: 'map', element: <DiveSitesMapPage /> },
        { path: 'article-view', element: <ArticleViewPage /> },
        {
          path:'/',
          element: (
            <ProtectedRoute>
              
                <Suspense fallback={<div>Loading...</div>}>
                  <Outlet />
                </Suspense>
              
            </ProtectedRoute>
            
          ),
          children: [
            { element: <IndexPage />, index: true },
            { path: 'pending-dives', element: <PendingAdminView /> },
            { path: 'all-data', element: <AllDataPage /> },
            // { path: 'products', element: <ProductsPage /> },
            // { path: 'blog', element: <BlogPage /> },
            { path: 'insert-data', element: <InsertDataPage /> },
            { path: 'import-posts', element: <ImportPostsPage /> },
            { path: 'add-dive-site', element: <AddDiveSitePage /> },
            { path: 'add-article', element: <AddArticlePage/>},
            { path: 'manage-users', element: <ManageUsersPage/>},
          ],
        },    
        {
          path: 'login',
          element: <LoginPage />,
        },
        {
          path: 'register',
          element: <RegisterPage />,
        },
        {
          path: '404',
          element: <Page404 />,
        },
        {
          path: 'register',
          element: <RegisterPage />,
        },
        {
          path: '*',
          element: <Navigate to="/404" replace />,
        },
      ],
    }
]);

  return routes;
}
