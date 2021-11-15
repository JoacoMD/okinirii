import { BrowserRouter, Route, Switch } from 'react-router-dom'
import AnimeDetail from './components/anime-detail/AnimeDetail';
import NavBar from './components/app/NavBar';
import Home from './components/home/Home';
import UserPage from './components/user/UserPage';

function App() {

  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen justify-between">
        <header>
          <NavBar />
        </header>
        <main className="mb-auto container mx-auto py-10">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/animes/:id" component={AnimeDetail} />
            <Route path="/user" component={UserPage} />
          </Switch>
        </main>
        <footer className="bottom-0 bg-gray-700 h-20 text-center text-gray-400">
          <p className="text-md font-bold py-5">designed by Joaquin Mendoza Dib</p>
        </footer>
      </div>

    </BrowserRouter>
  );
}

export default App;
