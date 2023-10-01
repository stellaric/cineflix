import React, { useEffect, useState } from "react";
import Main  from './components/Main'
import Header from './components/Header'
import Footer from './components/Footer'
import Loader from './components/Loader'

//page accueil principale
function App() {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Effectuez ici des opérations asynchrones, comme le chargement de données depuis une API.
    // Une fois les données chargées, définissez isLoading sur false pour masquer le loader.
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simule le chargement pendant 2 secondes.
  }, []);
  
  return (
    <div>
    {isLoading ? (
      <Loader/>
    ) : (
      <div>
        <Header />
        <Main />
        <Footer/>
       </div>
    )}
  </div>
  )
}

export default App
