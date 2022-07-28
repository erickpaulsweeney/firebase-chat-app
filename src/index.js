import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Chatrooms from './components/Chatrooms';
import Room from './components/Room';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/chatrooms" element={<Chatrooms />} />
                <Route path={`/chatrooms/:id`} element={<Room />} />
            </Routes>
        </BrowserRouter>
    </Provider>
);