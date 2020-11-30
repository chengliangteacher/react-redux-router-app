/* 
    @description  公共路由组件
    @autor        cheng liang
    @create       2020-10-22 11:04"
    @params       
    @return       
*/
import React, { Suspense, useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
//=====================================router对象类型====================================//
interface routerConfig {
  path?: string;
  children?: routerConfig[];
  component?: any;
  redirect?: boolean;
  title?: string;
}
interface props {
  routes: routerConfig[];
}
export default function RouterItems(props: props) {
  useState(nprogress.start());
  useEffect((): any => {
    nprogress.done();
    return () => nprogress.start();
  });
  const { routes }: props = props;
  const istoken = sessionStorage.token ? true : false;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        {routes.map((item: any, index: any) => {
          if (item.children) {
            return (
              <Route
                key={index}
                path={item.path}
                render={(data) => (
                  <item.component {...data} routes={item.children} />
                )}
              ></Route>
            );
          } else if (item.redirect) {
            return (
              <Route exact={istoken} key={index} path={item.path}>
                <Redirect to="/login" />
              </Route>
            );
          } else {
            return (
              <Route
                key={index}
                path={item.path}
                component={item.component}
              ></Route>
            );
          }
        })}
      </Switch>
    </Suspense>
  );
}
