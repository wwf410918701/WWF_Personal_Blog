import { Route } from 'react-router-dom';
import { lazy } from 'react'

import { RestrictedRoute } from '../utils/private-route';

const BlogsContainer = lazy(() => import('../pages/blogs-container/blogs-container').then(module => ({ default: module.BlogsContainer })))
const PersonalDetailPage = lazy(() => import('../pages/personal-detail-page/personal-detail-page').then(module => ({ default: module.PersonalDetailPage })))
const SignInOrSignUpPage = lazy(() => import('../pages/sign-in-up-page/sign-in-up-page').then(module => ({ default: module.SignInOrSignUpPage })))

export type RouteStore = {[routeName: string]: JSX.Element}

export const main_components_routes: RouteStore = {
  Personal_Detail_Page: <Route key='personalDetailPage' path='/*' element={<PersonalDetailPage />}/>,
  All_Blogs_Page:  <Route key='blogsContainer' path='/blogs/*' element={<BlogsContainer />}/>,
  Sign_In_Page: <Route key='signInPage' path='/signin' element={
    <RestrictedRoute>
      <SignInOrSignUpPage signInMode={true}/>
    </RestrictedRoute>}/>,
  Sign_Up_Page: <Route key='signUpPage' path='/signup' element={
    <RestrictedRoute>
      <SignInOrSignUpPage signInMode={false}/>
    </RestrictedRoute>}/>,
};