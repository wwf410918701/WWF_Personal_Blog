import { PersonalDetailPage } from '../pages/personal-detail-page/personal-detail-page';
import { Route } from 'react-router-dom';

type RouteStore = {[routeName: string]: JSX.Element}

export const main_components_routes: RouteStore = {
  Personal_Detail_Page: <Route path='/' element={<PersonalDetailPage />}/>,
};