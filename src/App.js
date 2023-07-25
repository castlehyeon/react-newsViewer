import logo from "./logo.svg";
import "./App.css";
import { useCallback, useState } from "react";
import axios from "axios";
import NewsList from "./components/NewsList";
import Categories from "./components/Categories";
import { Route, Routes } from "react-router-dom";
import NewsPage from "./pages/NewsPage";

/*
https://jsonplaceholder.typicode.com/todos/1
*/
function App() {
  // const [category, setCategory] = useState("all"); /** 선택된 카테고리 */
  // const onSelect = useCallback(category => setCategory(category), []);

  return (
    // <div>
    //   <Categories category={category} onSelect={onSelect} />
    //   <NewsList category={category} />
    // </div>
    <Routes>
      <Route path="/" element={<NewsPage />} />
      <Route path="/:category" element={<NewsPage />} />
    </Routes>
  );
}

export default App;
