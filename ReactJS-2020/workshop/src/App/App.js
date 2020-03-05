import React from 'react';
import './App.css';

import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import Aside from '../Aside/Aside';
import Posts from '../Posts/Posts';
import CreatePost from '../CreatePost/CreatePost';
import Main from '../Main/Main';
import Loader from '../App/Loader/Loader';
// import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

const Profile = React.lazy(() => { return import('../Profile/Profile') });

function render(title, Cmp) {
  return () => {
    return <Main title={title}><Cmp /></Main>
  }
}

function App() {
  return (
   <BrowserRouter>
    <div className="App">
      <Loader isLoading={false} />
      <Navigation />
      <div className="Container">
        <Aside />
         <Switch>
           <Route path="/" exact render={render('Posts', Posts)}></Route>
           <Route path="/create-posts" render={render('CreatePost', CreatePost)}></Route>
            <Route path="/profile">
            <React.Suspense fallback={<Loader isLoading={true} />}>
              <Profile></Profile>
            </React.Suspense>
            </Route>
           <Route path="/login" render={render('Login', Login)}></Route>
           <Route path="/register" render={render('Register', Register)}></Route>
           <Route path="*" component={NotFound}></Route>
         </Switch>
      </div>
      <Footer />
    </div>
   </BrowserRouter>
  );
}

export default App;
