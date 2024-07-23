import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './routes/Home.tsx';
import Tv from './routes/Tv.tsx';
import TvById from './routes/TvById.tsx';
import Movie from './routes/Movie.tsx';
import MovieById from './routes/MovieById.tsx';
import { theme } from './theme.ts';
import {
  createGlobalStyle,
  StyleSheetManager,
  ThemeProvider,
} from 'styled-components';
import emotionIsPropValid from '@emotion/is-prop-valid';
import Search from './routes/Search.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const router = createBrowserRouter([
  {
    path: '/react-tsx-netflix-clone/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'search', element: <Search /> },
      {
        path: 'tv',
        element: <Tv />,
      },
      { path: 'tv/:tvId', element: <TvById /> },
      {
        path: 'movie',
        element: <Movie />,
      },
      { path: 'movie/:movieId', element: <MovieById /> },
    ],
  },
]);
const client = new QueryClient();
const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
  width: 100vw;
  height: 300vh;
  font-weight: 300;
  color:${(props) => props.theme.white.darker};
  line-height: 1.2;
  background-color: ${(props) => props.theme.black.veryDark};
  }
  body::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  a {
    color:inherit;
  }
  button,input {
    color:inherit;
    background-color: transparent;
    border:none;
    outline: none;
  }
`;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
