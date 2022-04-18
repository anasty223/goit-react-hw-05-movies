import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
const Layout = lazy(() => import("./components/Layout/Layout"));
const HomeWiew = lazy(() => import("./views/HomeWiew"));
const MoviesView = lazy(() => import("./views/MoviesView"));
const MovieDetailView = lazy(() => import("./views/MovieDetailView"));
const Cast = lazy(() => import("./views/Cast"));
const Reviews = lazy(() => import("./views/Reviews"));
const NoTfoundView = lazy(() => import("./views/NotFoundView"));
// import { Layout } from "./components/Layout/Layout";
// import { HomeWiew } from "./views/HomeWiew";
// import NoTfoundView from "./views/NotFoundView";
// import { MoviesView } from "./views/MoviesView";
// import { Cast } from "./views/Cast";
// import { Reviews } from "./views/Reviews";

// import { MovieDetailView } from "./views/MovieDetailView";

export const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomeWiew />} />
          <Route path="movies" element={<MoviesView />} />
          <Route path="movies/:movieId" element={<MovieDetailView />} />

          <Route path="movies/:movieId" element={<MovieDetailView />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route path="*" element={<NoTfoundView />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
