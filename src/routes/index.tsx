import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router";
import useAuth from "../hooks/auth";

import LoginPage from "../view/login";
import LoadingPage from "../view/loading";
import NotFound from "../view/not-found";
import DashboardLayout from "../layout/dashboardLayout";


const AdminSettingslazy = lazy(() => import("../view/admin/settings"));
const UsersAdminLazy = lazy(() => import('../view/admin/users'));
const BannersAdminLazy = lazy(() => import('../view/admin/banners'));
const ServicesAdminLazy = lazy(() => import('../view/admin/services'));
const NoticiasAdminLazy = lazy(() => import('../view/admin/noticias'));
const DocumentosAdminLazy = lazy(() => import('../view/admin/documentos'));

type IProps = {
    isAdmin?: boolean;
    children: JSX.Element;
}

const RoutesAplication = () => {
    const { user, signOut } = useAuth();

    const Autenticate = ({ children, isAdmin }: IProps) => {
        let errAccess = false;
        if (!user) errAccess = true;

        if (isAdmin && user?.is_admin === 0) errAccess = true;

        if (errAccess) {
            signOut();
            return <Navigate to="/login" replace />;
        }
        return children
    };


    return (
        <Routes>
            <Route path='/' element={<Navigate to='/login' replace />} />
            <Route path='/login' element={<LoginPage />} />
            <Route element={<DashboardLayout />}>
                <Route path='/admin/settings' element={
                    <Autenticate isAdmin>
                        <Suspense fallback={<LoadingPage />}>
                            <AdminSettingslazy />
                        </Suspense>
                    </Autenticate>
                } />
                <Route path='/admin/settings/users' element={
                    <Autenticate isAdmin>
                        <Suspense fallback={<LoadingPage />}>
                            <UsersAdminLazy />
                        </Suspense>
                    </Autenticate>
                } />
                <Route path='/admin/settings/documentos' element={
                    <Autenticate isAdmin>
                        <Suspense fallback={<LoadingPage />}>
                            <DocumentosAdminLazy />
                        </Suspense>
                    </Autenticate>
                } />
                <Route path='/admin/settings/banners' element={
                    <Autenticate isAdmin>
                        <Suspense fallback={<LoadingPage />}>
                            <BannersAdminLazy />
                        </Suspense>
                    </Autenticate>
                } />
                <Route path='/admin/settings/services' element={
                    <Autenticate isAdmin>
                        <Suspense fallback={<LoadingPage />}>
                            <ServicesAdminLazy />
                        </Suspense>
                    </Autenticate>
                } />
                <Route path='/admin/settings/noticias' element={
                    <Autenticate isAdmin>
                        <Suspense fallback={<LoadingPage />}>
                            <NoticiasAdminLazy />
                        </Suspense>
                    </Autenticate>
                } />
            </Route>
            <Route path='*' element={<NotFound />} />
        </Routes>
    );
}

export default RoutesAplication;