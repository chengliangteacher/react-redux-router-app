import React from 'react';
import { Route } from 'react-router-dom';
function Status({ code, children }: any) {
  return (
    <Route
      render={({ staticContext }: any) => {
        if (staticContext) staticContext.status = code;
        return children;
      }}
    />
  );
}

export default function NotFound() {
  return (
    <Status code={404}>
      <div>
        <h1>Sorry, can’t find that.</h1>
      </div>
    </Status>
  );
}
