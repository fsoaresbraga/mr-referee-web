import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Footer } from './Components/Footer';
import { Header } from './Components/Header';
import { Home } from './Components/Home';
import Parliamentaries from './Components/Parliamentary/Parliamentaries';
import Parliamentarie from './Components/Parliamentary/Parliamentarie';

export const App = () => {
    return (
        <>
            <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/parliamentaries" element={<Parliamentaries />} />
                <Route path="/:id" element={<Parliamentarie />} />
            </Routes>
            <Footer />
        </BrowserRouter>

        </>
    )
}
export default App
