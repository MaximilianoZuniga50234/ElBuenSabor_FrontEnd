import Routes from "./app/routes/Routes";
import { fetchAll } from "./app/functions/util/FetchAll";

function App() {
  fetchAll();
  return <Routes />;
}

export default App;
