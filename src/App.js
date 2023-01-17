import CharactersTable from "./components/Character/Table";
import Loading from "./components/Loading";
import { loadCharacters } from "./store/character";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const App = () => {
  const { isLoading } = useSelector((state) => state.characters);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCharacters());
  }, [dispatch]);

  return (
    <div className="App">{isLoading ? <Loading /> : <CharactersTable />}</div>
  );
};

export default App;
