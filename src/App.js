import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <React.StrictMode>
      <div className='app'>        
      <Header />    
      <Routes> 
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes> 
      <Footer />
      </div>
    </React.StrictMode>
  );
}

export default App;
