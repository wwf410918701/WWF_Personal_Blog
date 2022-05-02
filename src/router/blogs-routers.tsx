import React, { useContext } from "react";
import { Navigate, Route, useNavigate } from "react-router-dom";
import { AllBlogsPage } from "../pages/all-blogs-page/all-blogs-page";
import { BlogPage } from "../pages/blog-page/blog-page";
import { CreateNewBlogsPage } from "../pages/create-new-blogs-page/create-new-blogs-page";
import { MyBlogsPage } from "../pages/my-blogs-page/my-blogs-page";
import { PrivateRoute } from "../utils/private-route";
import { RouteStore } from "./root-routers";

const blogsRouterRoot = '/blogs/'

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
    </PrivateRoute>}/>,
};