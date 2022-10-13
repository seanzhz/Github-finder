import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import About from "./pages/About";
import Home from "./pages/Home";
import Alert from "./components/layout/Alter";
import NotFound from "./pages/NotFound";
import {GithubProvider} from "./context/GithubContext";
import {AlertProvider} from "./context/AlertContext";
import User from "./pages/User";

function App() {
    return (
        <GithubProvider>
            <AlertProvider>
                <Router>
                    <div className="flex flex-col justify-between h-screen">
                        <Navbar/>
                        <main className="container mx-auto px-3 pb-12">
                            <Alert/>
                            <Routes>
                                <Route path="/" element={<Home/>}/>
                                <Route path='/about' element={<About/>}/>
                                <Route path="/notfound" element={<NotFound/>}/>
                                <Route path="/user/:login" element={<User/>}/>
                                <Route path="/*" element={<NotFound/>}/>
                            </Routes>
                        </main>

                        <Footer/>
                    </div>
                </Router>
            </AlertProvider>
        </GithubProvider>
    );
}

export default App;
