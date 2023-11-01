import React, { lazy, Suspense } from 'react'
import { RouteObject, useRoutes } from 'react-router'

const Layouts = lazy(
  () => import(/* webpackChunkName: "p_Layouts" */ '@web/Layouts')
)

const BlogHome = lazy(
  () => import(/* webpackChunkName: "p_BlogHome" */ '@web/pages/BlogHome')
)

const BlogDetails = lazy(
  () => import(/* webpackChunkName: "p_BlogDetails" */ '@web/pages/BlogDetails')
)
const NotFound = lazy(
  () => import(/* webpackChunkName: "p_NotFound" */ '@web/pages/NotFound')
)

const BaseRouter = () => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      {useRoutes(routerConfig)}
    </Suspense>
  )
}

const routerConfig: RouteObject[] = [
  {
    children: [
      { element: <BlogHome />, path: '/' },
      {
        element: <BlogDetails />,
        path: '/details'
      }
    ],
    element: <Layouts />,
    path: '/'
  },
  {
    element: <NotFound />,
    path: '*'
  }
]

export default BaseRouter
