import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Loader from "../loader";

const Category = lazy(() => import("../../components/category"));
const Products = lazy(() => import("../../components/products"));
const Location = lazy(() => import("./../../components/location"));
const Orders = lazy(() => import("./../../components/orders"));

const AppRoute = () => {
    return (
        <Suspense fallback={<Loader />}>
            <Switch>
                <Route exact path="/" to="/orders" component={Orders} />
                <Route exact path="/category" component={Category} />
                <Route exact path="/products/:id" component={Products} />
                <Route exact path="/location" component={Location} />
            </Switch>
        </Suspense>
    );
};

export default AppRoute;
