import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './routes/Home.tsx';
import Tv from './routes/Tv.tsx';
import Movie from './routes/Movie.tsx';
import { theme } from './theme.ts';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Search from './routes/Search.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        { index: true, element: <Home /> },
        { path: 'search', element: <Search /> },
        {
          path: 'tv',
          element: <Tv />,
        },
        { path: 'tv/:genreId', element: <Tv /> },
        {
          path: 'movie',
          element: <Movie />,
        },
        { path: 'movie/:genreId', element: <Movie /> },
      ],
    },
  ],
  {
    basename: '/react-tsx-netflix-clone',
  }
);
const client = new QueryClient();
const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    position: absolute;
    top: 0;
  width: 100vw;
  min-height: 100vh;
  font-weight: 300;
  color:${(props) => props.theme.white.darker};
  line-height: 1.2;
  background-color: ${(props) => props.theme.black.veryDark};
  overflow-x:hidden !important;
  touch-action:pan-y pinch-zoom;
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
  div,span,h1,h2,h3,h4,h5,h6,p{
    cursor:default;
  }
`;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <RouterProvider router={router} />
        </ThemeProvider>
      </RecoilRoot>
    </QueryClientProvider>
  </React.StrictMode>
);
