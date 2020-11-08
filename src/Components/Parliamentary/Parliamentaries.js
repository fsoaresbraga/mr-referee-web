import React from 'react';
import {Link} from 'react-router-dom';

import { ParallaxHeader } from '../ParallaxHeader';


import Styles from './Parliamentarie.module.css';
import Api from '../../services/Api';
import 'bootstrap/dist/css/bootstrap.min.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faMeh } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';


import Error from '../../Assets/error.jpg';



import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
//import "bootstrap/dist/css/bootstrap.min.css";

import Noty from 'noty';
import "../../../node_modules/noty/lib/noty.css";  
import "../../../node_modules/noty/lib/themes/mint.css";

import Lottie from 'lottie-react-web';
import Animation from '../../Assets/Loaders/loading.json';


 const Parliamentaries = () => {
  
    const [parliamentaries, setParliamentaries] = React.useState([]);

    const [modal, setModal] = React.useState([]);
    
    const [modalShow, setModalShow] = React.useState(false);

    const [isOpen, setIsOpen] = React.useState(false);


    const [checkView, setCheckView] = React.useState();

    const [loading, setLoading] = React.useState(true);
    
    React.useEffect(() => {
        async function loadParliamentarie() {
            await Api.get('get_all_parlamentars').then((response) => {
                setParliamentaries(response.data);
                setLoading(false)
              }).catch((err) => {
                console.log(err);
              });
        }

        loadParliamentarie();
    }, []);
   
    
    const hideModal = () => {
        setIsOpen(false);
    };

    function loadUpdate(parli)
    {   
        setModalShow(true);
        setIsOpen(true);
       setCheckView(parli.has_suspicions);
        return setModal(parli);
    }

 
    function toggleClearable (){
        setCheckView(!checkView);
    }

    async function sendUpdate(id, event){
        //event.preventDefault()
        
        var check = document.getElementsByName("suspicions");
        let checked; 
        for (var i=0;i<check.length;i++){ 
            if (check[i].checked == true){ 
                // CheckBox Marcado... Faça alguma coisa...
                checked = true;
            } 
            else{
                checked = false;
            }
        }
      
            
        await Api.put('update_parlamentar/'+id, {
            "has_suspicions": checked
        }).then((response) => {
            new Noty({
                type:'success',
                layout: 'topRight',
                text: 'Parlamentar Atualizado com sucesso',
                timeout: 1500
            }).show()
            setIsOpen(false);
        }).catch((err) =>{
            console.log(err);
        })
    }
    
    async function sendDelete(id)
    {
        await Api.delete('remove_parlamentar/'+id, {
        }).then((response) => {
            console.log(response);
            document.location.reload(true);
        }).catch((err) =>{
            console.log(err);
        })

    }

    if(parliamentaries.length !== 0)
    {
        return (
            <>
                
            <ParallaxHeader title="Parlamentares" description="Confira nossa sessão de Parlamentares." />  

            <div className={Styles.paddingSpace}></div>
            <div className="container">
                <section>
                <div className="row">
                    {parliamentaries.map((parliamentarie, index)=>(
                    <div key={index}className={`${Styles.parliamentariesCard} col-xs-12 col-md-6 col-lg-3`}>
                        <div className="card">
                            <figure>
                                <img src={parliamentarie.avatar_url} className={Styles.parliamentariesImg} alt="imagem" title={parliamentarie.party}/>
                            </figure>
                            <div  className="card-body">
                                <h4 className={`${Styles.parliamentariesTitle} card-title`}>{parliamentarie.name}</h4>
                                <div className="row">
                                    <div className="col-md-6 text-center">
                                        <span className="badge badge-primary">{parliamentarie.party}</span>
                                    </div>
                                    <div className="col-md-6 text-center">
                                        <span className="badge badge-dark">{parliamentarie.estate}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                            <div className="row">
                                    <div className="col-md-4 text-center">
                                        <Link to={`/${parliamentarie.id}`}>
                                            <FontAwesomeIcon icon={faEye}  className={Styles.iconView}/>
                                        </Link>
                                    </div>
        
                                    <div className="col-md-4 text-center"  onClick={((callback)=> loadUpdate(parliamentarie))}>
                                        <FontAwesomeIcon icon={faPencilAlt} className={Styles.iconEdit} />
                                    </div>
        
                                    <div className="col-md-4 text-center" onClick={((callback)=> sendDelete(parliamentarie.id))}>
                                        <FontAwesomeIcon icon={faTrash} className={Styles.iconTrash} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
                </section>
                {
                    (modalShow) &&
                        <Modal show={isOpen} onHide={hideModal}>
                            <Modal.Header>
                                <Modal.Title>{modal.name}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                               <form>
                               <label for-html="party">Partido</label>
                                <select className="form-control form-group"  id="party">
                                    <option disabled value={modal.name} selected enabled="enabled">{modal.party}</option>
                                </select>

                               <label for-html="state">Estado</label>
                                <select className="form-control form-group"  id="state">
                                    <option disabled value={modal.estate} selected enabled="enabled">{modal.estate}</option>
                                </select>

                               <label for-html="name">Nome</label>
                                <select className="form-control form-group"  id="name">
                                    <option disabled value={modal.name} selected enabled="enabled">{modal.name}</option>
                                </select>
                                <div>
                                    <input type="checkbox" id={Styles.checkSuspicions} name="suspicions" onChange={toggleClearable}  checked={checkView}/>
                                    <label for-html="suspicions">Exibir reembolso suspeito?</label>
                                </div>
                               
                               </form>
                            </Modal.Body>
                            <Modal.Footer>
                                <button className="btn-teal btn rounded-pill px-4 ml-lg-4" onClick={((callback)=> sendUpdate(modal.id))}>Editar</button>
                                <button className="btn btn-danger rounded-pill px-4 ml-lg-4" onClick={hideModal}>Cancelar</button>
                            </Modal.Footer>
                        </Modal>
                }

               
                
                   
                    
               
            </div>
            </>
        )
    }
    else 
    {
        return (
            <>
                {(loading) && 
                    <div className={Styles.loaderGif}>
                        <Lottie
                            options={{
                                animationData: Animation,
                            }}

                            style={{
                                width: 200,
                                height: 200,
                                textAlign: 'center',
                                marginTop: 200,
                            }}
                        />
                    </div>
                }
            <div className={`${Styles.parliamentarieBanner}`}>
                <div className="container">
                    <h1 className={Styles.titleParliamentarie}>PARLAMENTARES</h1>
                </div>
            </div>
            <div className={Styles.paddingSpace}></div>
            <div className="container">
                <section>
                    <div className="row">
                        <div className="col-md-6 text-center">
                            <h1 className={`${Styles.error} text-center`}><FontAwesomeIcon icon={faMeh}/> Desculpe!</h1>
                            <h2 className={Styles.errorDesc}>Nenhum Parlamentar Encontrado. <br /> <span>Cadastre um novo Parlamentar no botão Abaixo</span></h2>
                            <br />
                            <Link to="/" className={`${Styles.buttonCad} button`}>
                                CADASTRAR PARLAMENTAR <FontAwesomeIcon icon={faChevronRight}/>
                            </Link>
                        </div>
                        <div className="col-md-6">
                            <img src={Error} className={Styles.errorImg} alt="imagem" />
                        </div>
                    </div>
                    
                </section>
            </div>
            </>
        )
    }

} 

export default Parliamentaries;
