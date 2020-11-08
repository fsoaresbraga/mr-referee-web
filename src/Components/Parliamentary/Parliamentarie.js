import React, {useEffect,useState} from 'react'
import {useParams} from 'react-router-dom';

import { ParallaxHeader } from '../ParallaxHeader';

import Api from '../../services/Api';

import 'bootstrap/dist/css/bootstrap.min.css';
import Styles from './Parliamentarie.module.css';


import Lottie from 'lottie-react-web';
import Animation from '../../Assets/Loaders/loading.json';
import Error404 from '../../Assets/Loaders/404.json';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const Parliamentarie = () => {
    let {id} = useParams();
    
    const [parliamentarie, setParliamentarie] = useState([]);
    const [parliamentarieName, setParliamentarieName] = useState([]);
    const [loading, setLoading] = useState(true);
    //const [suspicions, setSuspicions] = useState();
    let suspicions ='';
    
    useEffect(() => {
        async function loadParliamentarie() {
            try {
                const response = await  Api.get('parlamentar/'+ id)
                setParliamentarie(response.data.reimbursements,setParliamentarieName(response.data.parlamentar_data.name),setLoading(false));
                
            } catch (error) {
                console.log(error);
            }
            
                        
        }
       
        loadParliamentarie();
        // eslint-disable-next-line

       
     ;
      
    }, []);

    
    function dataAtualFormatada(){
        var data = new Date(),
            dia  = data.getDate().toString(),
            diaF = (dia.length === 1) ? '0'+dia : dia,
            mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
            mesF = (mes.length === 1) ? '0'+mes : mes,
            anoF = data.getFullYear();
        return diaF+"/"+mesF+"/"+anoF;
    }


    function validSuspicions(valid){
        console.log(valid);
        if (valid.meal_price_outlier)
            suspicions = 'Preço de refeição muito incomum ';

        if (valid.over_monthly_subquota_limit)
            suspicions = 'Extrapolou limite da (sub)quota ';

        if (valid.suspicious_traveled_speed_day)
            suspicions =
            'Muitas despesas em diferentes cidades no mesmo dia ';

        if (valid.invalid_cnpj_cpf)
            suspicions = 'CPF ou CNPJ inválidos ';

        if (valid.election_expenses)
            suspicions = 'Gastos com campanha eleitoral ';

        if (valid.irregular_companies_classifier)
            suspicions = 'CNPJ irregular ';
    }
    console.log(parliamentarie.length);
    if(parliamentarie.length != 0)
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
            <ParallaxHeader title={parliamentarieName}  /> 
            <div className={Styles.paddingSpace}></div>
            <div className="container">
                <section className={Styles.timeLineParliamentarie}>
                    <ul className="timeline">
                        {parliamentarie.map((parli,index) => 
                    
                        <li key={index} className={(((index % 2) === 1) ? "timeline-inverted": "timeline-not-inverted")}>
                        
                            <div className="timeline-badge"></div>
                            <div className="timeline-panel">
                                <div className="timeline-heading">
                                    <h4 className="timeline-title">{parli.subquota_description}</h4>
                                    <p><small className="text-muted"><FontAwesomeIcon icon={faCalendarAlt} className={Styles.iconCalendar} /> {dataAtualFormatada(parli.issue_date)}</small></p>
                                </div>
                                <div className={`${Styles.timeLineParli} timeline-body`}>
                                <div className="row">
                                    <div className="col-md-12">
                                        
                                            {(parli.suspicions) ? 
                                                (validSuspicions(parli.suspicions),
                                                <p><span className="badge badge-danger text-wrap" >Motivo:</span> {suspicions}</p>)
                                                :
                                                <p><span className="badge badge-primary text-wrap">Motivo:</span> Não Existe</p>
                                            }
                                    
                                    </div>
                                    <div className="col-md-12">
                                        <p><span className={(parli.suspicions)? 'badge badge-danger text-wrap':'badge badge-primary text-wrap'}>Fornecedor:</span> {(parli.supplier !== "") ?  parli.supplier :"Fornecedor invalido"}</p>
                                    </div>
                                    <div className="col-md-5">
                                            <p><span className={(parli.suspicions)? 'badge badge-danger text-wrap':'badge badge-primary text-wrap'}>CNPJ / CPF:</span> {(parli.cnpj_cpf !== "") ? parli.cnpj_cpf : "Não Encontrado"}</p>
                                    </div>
                                    
                                    <div className="col-md-3">
                                        <p><span className={(parli.suspicions)? 'badge badge-danger text-wrap':'badge badge-primary text-wrap'}>Valor: </span> {parli.document_value}</p>
                                    </div>

                                    <div className="col-md-4">
                                        <a href={parli.receipt} rel="noopener noreferrer" target="_blank" className={(parli.suspicions)? 'btn btn-danger':'btn btn-primary'}><FontAwesomeIcon icon={faFilePdf} className={Styles.iconFile} /> Documento</a>
                                    </div>
                                    
                                </div>
                                </div>
                            </div>
                        </li>)}
                    </ul>
                </section>
            </div>
            
        </>
        )   
    }
    else
    {
        return(
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
             <ParallaxHeader title="Não há Dados para ser Mostrado"  /> 
            <Lottie
                options={{
                    animationData: Error404,
                }}

                style={{
                    width: 400,
                    height: 400,
                    textAlign: 'center',
                }}
            />
        </>
        )

    }
}
export default Parliamentarie;
