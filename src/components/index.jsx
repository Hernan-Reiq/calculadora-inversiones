import { useRef, useState } from "react";
import Calculadora from "./calculadora";

function Index() {
    const inversion = useRef();
    const interes = useRef();
    const meses = useRef();
    const cantidad = useRef();
    const reinversion = useRef();
    const [capitalizable, setCapitalizable] = useState(false);
    const [resultados, setResultados] = useState([]);

    return (
        <div className="container bg-dark p-4 rounded shadow">
            <div className="card my-4 bg-reiq text-white shadow">
                <div className="card-body p-2">
                    <label htmlFor="inversion">Inversion inicial:</label><br />
                    <input type="number" className="form-control" id="inversion" ref={inversion} />
                </div>
                <div className="card-body p-2">
                    <label htmlFor="interes">Interes anual</label><br />
                    <input type="number" className="form-control" id="interes" ref={interes} />
                </div>
                <div className="card-body p-2">
                    <label htmlFor="capitalizable">Interes capitalizable?</label><br />
                    <button className={capitalizable ? 'btn btn-success' : 'btn btn-secondary'} id="capitalizable" onClick={() => {
                        setCapitalizable(!capitalizable);
                    }}>{capitalizable ? 'Si es capitalizable' : 'No es capitalizable'}</button>
                </div>
                <div className="card-body p-2">
                    <label htmlFor="meses">Cantidad de meses:</label><br />
                    <input type="number" className="form-control" id="meses" ref={meses} />
                </div>
                <div className="card-body p-2">
                    <label htmlFor="cantidad">Cada cuantos meses piensa reinvertir?</label><br />
                    <input type="number" className="form-control" id="cantidad" ref={cantidad} />
                </div>
                <div className="card-body p-2">
                    <label htmlFor="reinversion">Cuanto piensa reinvertir?</label><br />
                    <input type="number" className="form-control" id="reinversion" ref={reinversion} />
                </div>
                <div className="card-footer p-2">
                    <div className="row">
                        <div className="col-6">
                            <button className="btn btn-warning w-100" onClick={() => {
                                inversion.current.value = '';
                                interes.current.value = '';
                                meses.current.value = '';
                                cantidad.current.value = '';
                                reinversion.current.value = '';
                                setResultados([])
                            }}>
                                Limpiar
                            </button>
                        </div>
                        <div className="col-6">
                            <button className="btn btn-success w-100" onClick={() => {
                                if (inversion.current.value && interes.current.value && meses.current.value && cantidad.current.value && reinversion.current.value) {
                                    setResultados(Calculadora(
                                        parseInt(inversion.current.value),
                                        parseInt(interes.current.value),
                                        parseInt(meses.current.value),
                                        parseInt(cantidad.current.value),
                                        parseInt(reinversion.current.value),
                                        capitalizable
                                    ));
                                } else {
                                    alert('No hay nada que calcular')
                                }
                            }}>
                                Calcular
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {resultados.length > 0 &&
                <div className="card my-4 shadow">
                    <table class="table table-dark m-0">
                        <thead>
                            <tr>
                                <th scope="col">Mes</th>
                                <th scope="col">Intereses</th>
                                <th scope="col">Capital</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resultados.length > 0 &&
                                resultados.map((element, i) => {
                                    return (
                                        <tr key={i}>
                                            <th scope="row" className={(i % 2) === 0 ? 'bg-secondary' : 'bg-dark'}>{element.mes}</th>
                                            <td className={(i % 2) === 0 ? 'bg-secondary' : 'bg-dark'}>{element.intereses}</td>
                                            <td className={(i % 2) === 0 ? 'bg-secondary' : 'bg-dark'}>{element.capital}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            }

        </div>
    )
}


export default Index;