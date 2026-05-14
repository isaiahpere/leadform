import { lazy, Suspense } from "react";
import { Routes, Route, NavLink } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const Results = lazy(() => import("./pages/Results"));

const Loading = <p className="text-shadow-gray-500">Loading...</p>;

const App = () => {
  return (
    <>
      <nav className="p-10 flex justify-between">
        <NavLink className={"text-2xl font-bold"} to={"/"}>
          LeadForm
        </NavLink>
        <div className="flex items-center gap-5">
          <NavLink className={"text-lg font-semibold"} to={"/"}>
            Home
          </NavLink>
          <NavLink className={"text-lg font-semibold"} to={"/results"}>
            Results
          </NavLink>
        </div>
      </nav>
      <main className="p-10">
        <Suspense fallback={Loading}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </Suspense>
      </main>
    </>
  );
};

export default App;
