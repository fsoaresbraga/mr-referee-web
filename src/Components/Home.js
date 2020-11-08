import React from 'react';

import Noty from 'noty';
import "../../node_modules/noty/lib/noty.css";  
import "../../node_modules/noty/lib/themes/mint.css";


import Styles from './Home.module.css';
import {Routes, Route, Link} from 'react-router-dom';
import NewParliamentary from './Parliamentary/Parliamentaries';
import IconReg from '../Assets/arrow-right.png';
//import { Button } from './Forms/Button';
import ApiCamara from '../services/ApiCamara';
import ApiUF from '../services/ApiUF';
import Api from '../services/Api';




import Lottie from 'lottie-react-web';
import AnimationCad from '../Assets/Loaders/cadLoader.json';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFont } from '@fortawesome/free-solid-svg-icons';

import ParallaxHeader from '../Assets/img/drawkit/color/drawkit-content-man-color.svg';






export const Home = () => {
    const [parties, setParties] = React.useState([]);
    const [partie, setPartie] = React.useState('');
    const [partieFinal, setPartieFinal] = React.useState('');

    const [uf, setUf] = React.useState([]);
    const [auxUf, setAuxUf] = React.useState('');

    const [parliamentaries, setParliamentaries] = React.useState([]);
    const [parliamentarie, setParliamentarie] = React.useState('');

    const [name, setName] = React.useState(''); 
    const [document, setDocument] = React.useState(''); 
    const [state, setState] = React.useState(''); 
    const [avatarUrl, setAvatar] = React.useState('');
   /*  const [loading, setLoading] = React.useState(); */

   React.useEffect(() => {
        
        async function loadParties() {
          await ApiCamara.get('partidos', {params: { itens: 40}}).then((response) => {
            setParties(response.data.dados);
            
          }).catch((err) => {
            console.log(err);
          });
        }

        async function loadStates() {
            await ApiUF.get('estados').then((response) => {
                setUf(response.data);
            }).catch((err) => {
                console.log(err);
            });
        } 

        loadParties();
        loadStates()
    }, []);

    async function handleName(id, uf) {
        if (id) {
            await ApiCamara.get(`partidos/${id}/membros`).then((response) => {
                const data = response.data.dados.filter(e => e.siglaUf.includes(uf));
                setParliamentaries(data)
            }).catch((err) => {
             console.log(err.mensage);
            });
          }
    }


    async function handleParliamentarie(id) {

         if (id) {
          const response = await ApiCamara.get(`deputados/${id}`);
          const name = response.data.dados.ultimoStatus.nome;
          const document = response.data.dados.cpf;
          const partieNew = response.data.dados.ultimoStatus.siglaPartido;
          const state = response.data.dados.ultimoStatus.siglaUf;
          const avatar = response.data.dados.ultimoStatus.urlFoto;
          setName(name);
          setDocument(document);
          setPartieFinal(partieNew);
          setState(state);
          setAvatar(avatar);
        } 
        
    }
   // console.log(partieNew);
    async function handleSubmit(event) {
       event.preventDefault();
       
        await Api.post('add_parlamentar', {
            "name": name,
            "document":document,
            "avatar_url": avatarUrl,
            "party": partieFinal,
            "estate": state
        }).then((response) => {
           
            new Noty({
                type:'success',
                layout: 'topRight',
                text: 'Cadastrado com sucesso',
                timeout: 1500
            }).show()

             setTimeout(function(){
                let URL = window.location.origin +'/parliamentaries';
                window.location.href = URL;
          
             }, 1500);
        }).catch((err) => {
            if(err.response.status === 400)
            {
                  new Noty({
                    type:'error',
                    layout: 'topRight',
                    text: 'Parlamentar já cadastrado!',
                    timeout: 1500
                }).show() 
               setParliamentarie('');
            
            }
            console.log(err.response.status);
        });
       
    }
   
    return (
    <>

        <div className="page-header page-header-dark bg-gradient-primary-to-secondary">
                <div className="page-header-content pt-10">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6" data-aos="fade-up">
                                <h1 className="page-header-title">OLÁ, BEM VINDOS</h1>
                                <p className="page-header-text mb-5">AOS GASTOS PÚBLICOS SUSPEITOS DE <br /><b>PARLAMENTARES!</b></p>
                                <a className="btn btn-teal btn-marketing rounded-pill lift lift-sm" href="#sendParliamentaries">CADASTRAR PARLAMENTAR<br />
                                </a>
                            </div>
                            <div className="col-lg-6 d-none d-lg-block" data-aos="fade-up" data-aos-delay="50">
                                <img className="img-fluid" src={ParallaxHeader} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="svg-border-rounded text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144.54 17.34" preserveAspectRatio="none" fill="currentColor"><path d="M144.54,17.34H0V0H144.54ZM0,0S32.36,17.34,72.27,17.34,144.54,0,144.54,0" /></svg>
                </div>
        </div>
        <section className="bg-light pt-5" id="sendParliamentaries">
            <div className="container">
                <div className="row align-items-center justify-content-center">
                    <div className="col-md-9 col-lg-6 order-1 order-lg-0" data-aos="fade-right">
                        <div className="content-skewed content-skewed-right">
                        <Lottie
                            options={{
                                animationData: AnimationCad,
                            }}

                            style={{
                                width: 500,
                                height: 500,
                                textAlign: 'center',
                            }}
                        />
                        </div>
                    </div>
                    <div className={`${Styles.cadParliamentarie} col-lg-6 order-0 order-lg-1 mb-5 mb-lg-0" data-aos="fade-left"`}>
                        <div className="mb-5">
                            <h2 className={Styles.cadTitle}>Cadastrar Parlamentar</h2>
                        </div>
                        <form action="" if="newParliamentary"  onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-12 form-group">
                                    <label for-html="party">Partido</label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text"><FontAwesomeIcon icon={faFont}/></div>
                                        </div>
                                        <select className="form-control form-group"  id="party" value={partie} onChange={({target})=>setPartie(target.value, partie.sigla)} required>
                                            <option disabled value="">Selecione um Partido</option>
                                            {parties.map((party,index)=><option key={index} value={party.id}>{party.sigla}</option>)}
                                        </select>
                                    </div>
                                </div>

                                <div className="col-md-12 form-group">
                                    <label for-html="uf">Estado</label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text"> <FontAwesomeIcon icon={faFont}/></div>
                                        </div>
                                        <select className="form-control form-group"  id="uf" value={auxUf} onChange={({target})=>
                                        (setAuxUf(target.value) + handleName(partie, target.value))} required>
                                            <option disabled value="">Selecione um Estado</option>
                                            {uf.map((state,index)=><option key={index} value={state.sigla}>{state.sigla}</option>)}
                                        </select>
                                    </div>
                                </div>

                                <div className="col-md-12 form-group">
                                    <label for-html="parliamentarie">Parlamentar</label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text"> <FontAwesomeIcon icon={faFont}/></div>
                                        </div>
                                        <select className="form-control form-group"  id="parliamentarie" value={parliamentarie} onChange={({target})=>
                                            (setParliamentarie(target.value)+
                                            handleParliamentarie(target.value))} required>
                                            <option disabled value="">Selecione um Parlamentar</option>
                                            {parliamentaries.map((parliamentarie,index)=><option key={index} value={parliamentarie.id}>{parliamentarie.nome}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                  <button className="btn-teal btn rounded-pill">Cadastrar</button>
                                </div>
                            </div>
                        </form>
         
                    </div>
                </div>
            </div>
        </section>
    </>
    )
}
