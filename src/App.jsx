import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import HighLights from "./components/HighLights"
import Model from "./components/Model"
import Features from "./components/Features"
import Chip from "./components/Chip"
import Footer from "./components/Footer"
import Notice from "./components/Notice"

const App = () => {
return (
    <main className="bg-black">
        <Notice />
        <Navbar />
        <Hero />
        <HighLights />
        <Model />
        <Features />
        <Chip />
        <Footer />
    </main>
    )
}

export default App;