import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

import ProtectedRoute from './protectedRoutes'; 

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const WelcomePage = lazy(() => import('src/pages/welcome'));
export const RegisterPage = lazy(() => import('src/pages/register'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const DiveSitesMapPage = lazy(() => import('src/pages/dive_sites_map'));
export const InsertDataPage = lazy(() => import('src/pages/insert-data'));
export const ArticleViewPage = lazy(() => import('src/pages/article-view'));
export const ImportPostsPage = lazy(() => import('src/pages/import-posts'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <ProtectedRoute>
          <DashboardLayout>
            <Suspense>
              <Outlet />
            </Suspense>
          </DashboardLayout>
        </ProtectedRoute>
        
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'insert-data', element: <InsertDataPage /> },
        { path: 'Map', element: <DiveSitesMapPage /> },
        { path: 'article-view', element: <ArticleViewPage/>},
        { path: 'import-posts', element: <ImportPostsPage/>},
        
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'welcome',
      element: <WelcomePage />,
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
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
