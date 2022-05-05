import React, { lazy } from "react";
import { Route } from "react-router-dom";

import { PrivateRoute } from "../utils/private-route";
import { RouteStore } from "./root-routers";

const AllBlogsPage = lazy(() => import('../pages/all-blogs-page/all-blogs-page').then(module => ({ default: module.AllBlogsPage })))
const BlogPage = lazy(() => import('../pages/blog-page/blog-page').then(module => ({ default: module.BlogPage })))
const CreateNewBlogsPage = lazy(() => import('../pages/create-new-blogs-page/create-new-blogs-page').then(module => ({ default: module.CreateNewBlogsPage })))
const MyBlogsPage = lazy(() => import('../pages/my-blogs-page/my-blogs-page').then(module => ({ default: module.MyBlogsPage })))


export const blogs_router: RouteStore = {
  Personal_Detail_Page: <Route key='allBlogsPage' path={'/'} element={<AllBlogsPage />}/>,
  Create_New_Blog_Page:  <Route key='createNewBlogPage' path= {'/createnewblog'} element={
    <PrivateRoute>
      <CreateNewBlogsPage />
    </PrivateRoute>}/>,
  Blog_Page: <Route key='blogPage' path={'/blogPage/:blogID'} element={<BlogPage />}/>,
  My_Blogs_Page:  <Route key='myBlog' path= {'/myblogs'} element={
    <PrivateRoute>
      <MyBlogsPage />
    </PrivateRoute>}
  />,
  Edit_Blog_Page: <Route key='myBlog' path= {'/editblog/:blogID'} element={
    <PrivateRoute>
      <CreateNewBlogsPage />
    </PrivateRoute>}/>
};