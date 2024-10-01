import "../assets/css/Home.css";
import "../App.css";
import Footer from '../component/Footer';
import Menu from '../component/Menu';
import imagen1 from '../assets/images/imagen1.jpg';
import imagen2 from '../assets/images/imagen2.jpg';
import imagen3 from '../assets/images/imagen3.png';
import imagen4 from '../assets/images/imagen4.png';
import imagen5 from '../assets/images/imagen5.png';
import imagen6 from '../assets/images/imagen6.jpg';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="App">
      <div>
      <Menu />
      </div>
      <section className="background-home">
        <div className="home">
          <div className="home-text">
          <h1>Compromisso com o desenvolvimento e bem-estar no ambiente de trabalho</h1>
          <p>A equipe de Recursos Humanos tem como missão promover um ambiente de trabalho saudável e colaborativo, focado no desenvolvimento pessoal e profissional de cada colaborador. Nosso compromisso é garantir que todos tenham as ferramentas e o suporte necessários para alcançar seu máximo potencial, contribuindo para o sucesso e crescimento sustentável da empresa.</p>
          <button><Link to="/ListaFuncionarios">Ver Lista de Funcionários</Link></button>
          </div>
          <div id="vertical-slider">
              <div class="container-slides">
              <img class="img-scroll-slider" src={imagen1} alt="imagen 1"/>
                <img class="img-scroll-slider" src={imagen2} alt="imagen2"/>
                <img class="img-scroll-slider" src={imagen3} alt="imagen3"/>
                <img class="img-scroll-slider" src={imagen4} alt="imagen4"/>
                <img class="img-scroll-slider" src={imagen5} alt="imagen5"/>
                <img class="img-scroll-slider" src={imagen6} alt="imagen6"/>
              <img class="img-scroll-slider" src={imagen1} alt="imagen 1"/>
              <img class="img-scroll-slider" src={imagen2} alt="imagen2"/>
              </div>
            </div>
        </div>
      </section>
      <div>
      <Footer />
      </div>
    </div>
  );
}

export default Home;