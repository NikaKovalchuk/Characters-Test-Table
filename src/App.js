import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import CharactersTable from "./components/Character/Table";
import Loading from "./components/Loading";
import { loadCharacters } from "./store/character";

const App = () => {
  let { characters, isLoading } = useSelector((state) => state.characters);

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCharacters());
  }, [dispatch]);

  return (
    <div className="App">
      {isLoading ? <Loading /> : <CharactersTable characters={characters} />}
    </div>
  );
};

export default App;
