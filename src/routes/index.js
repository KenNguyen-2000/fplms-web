import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import { RouteContainer } from '../components';
import TextEditor from '../components/TextEditor';
import AdminPage from './AdminPage';
import ClassList from './ClassList';
import DiscussionList from './DiscussionList';
import DiscussionView from './DiscussionView';
import GroupPicking from './GroupPicking';
import GroupView from './GroupView';
import Login from './Login';
import MarkTable from './MarkTable';
import MyQuestions from './MyQuestions';
import NotFound from './NotFound';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import StudentList from './StudentList';
import Topic from './Topic';

export const publicRoute = [
    {
        path: 'login',
        name: 'login',
        component: Login,
        exact: true,
        restrict: true,
    },
];

export const privateRoute = [
    {
        path: 'class',
        name: 'class',
        component: ClassList,
        exact: true,
        restrict: true,
    },
    {
        path: '/mark-table/:classId',
        name: 'Mark Table',
        component: MarkTable,
        exact: true,
        restrict: true,
    },
    {
        path: 'student-list/:classId',
        name: 'student-list',
        component: StudentList,
        exact: true,
        restrict: true,
    },
    {
        path: '/class/:id',
        name: 'group-picking',
        component: GroupPicking,
        exact: true,
        restrict: true,
    },
    {
        path: '/class/:classId/group/:groupId',
        name: 'group',
        component: GroupView,
        exact: true,
        restrict: true,
    },
    {
        path: 'discussion-list',
        name: 'discussion-list',
        component: DiscussionList,
        exact: true,
        restrict: true,
    },
    {
        path: 'discussion-view/:id',
        name: 'discussion-view',
        component: DiscussionView,
        exact: true,
        restrict: true,
    },
    {
        path: 'topic',
        name: 'topic',
        component: Topic,
        exact: true,
        restrict: true,
    },
    {
        path: 'add-question',
        name: 'add-question',
        component: TextEditor,
        exact: true,
        restrict: true,
    },
    {
        path: 'my-questions',
        name: 'my-questions',
        component: MyQuestions,
        exact: true,
        restrict: true,
    },
];

export const RouterComponent = () => {
    const routes = publicRoute.concat(privateRoute);

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Navigate to="/class" />} />
                <Route exact path="/" element={<PrivateRoute />}>
                    {privateRoute.map((route) => (
                        <Route
                            key={route.name}
                            path={route.path}
                            element={
                                <RouteContainer routes={routes} component={<route.component />} />
                            }
                            exact={route.exact}
                            restrict={route.restrict}
                        />
                    ))}
                    <Route path="/admin" element={<AdminPage />} />
                </Route>
                <Route exact path="/" element={<PublicRoute />}>
                    {publicRoute.map((route) => (
                        <Route
                            key={route.name}
                            path={route.path}
                            element={<route.component />}
                            exact={route.exact}
                            restrict={route.restrict}
                        />
                    ))}
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};
