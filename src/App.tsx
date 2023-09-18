import Routes from "./app/routes/Routes";
import { fetchAll } from "./app/functions/util/FetchAll";

function App() {
  fetchAll();
  return (
    <div>
      <Routes />
    </div>
  );
}

export default App;
