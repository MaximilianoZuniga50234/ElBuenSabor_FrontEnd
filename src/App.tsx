import Router from "./app/routes/Router";
import { fetchAll } from "./app/functions/util/FetchAll";
import NavBar from "./app/components/nav_bar/NavBar";
import Footer from "./app/components/footer/Footer";

function App() {
  fetchAll();
  return (
    <main className="whole_app_container">
      <header className="whole_app_header">
        <NavBar />
      </header>
      <section className="main_content">
        <Router />
      </section>
      <footer>
        <Footer />
      </footer>
    </main>
  );
}

export default App;
