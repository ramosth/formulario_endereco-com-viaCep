import { useState } from "react";
import axios from "axios";
import './estilos.css'
import Card from '../Card'

const Formulario = (props) => {

  const obterCep = (evento) => {
    if (!evento.target.value)
      return

    const url = `https://viacep.com.br/ws/${evento.target.value}/json/`;
    axios.get(url)
      .then(response => {
        if (!response.data.erro) {
          setCep(response.data.cep);
          setRua(response.data.logradouro);
          setBairro(response.data.bairro);
          setCidade(response.data.localidade);
          setUf(response.data.uf);
        }
      })
      .catch()
  }

  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');

  const cepHandle = (evento) => {
    if(evento.target.value.length <= 8)
      setCep(evento.target.value);
  }
  const ruaHandle = (evento) => {
    setRua(evento.target.value);
  }
  const numeroHandle = (evento) => {
    setNumero(evento.target.value);
  }
  const bairroHandle = (evento) => {
    setBairro(evento.target.value);
  }
  const cidadeHandle = (evento) => {
    setCidade(evento.target.value);
  }
  const ufHandle = (evento) => {
    setUf(evento.target.value);
  }
  const salvar = (evento) => {
    evento.preventDefault();
    const endereco = {}
    endereco.cep = cep;
    endereco.rua = rua;
    endereco.numero = numero;
    endereco.bairro = bairro;
    endereco.cidade = cidade;
    endereco.uf = uf;
    props.aoSalvar(endereco);
    setCep('')
    setRua('')
    setNumero('')
    setBairro('')
    setCidade('')
    setUf('')
  }

  return (<Card>
    <form className="form" onSubmit={salvar}>
      <div>
        <label>CEP</label>
        <input required type="numeric" value={cep} onBlur={obterCep} onChange={cepHandle} />
      </div>
      <div>
        <label>Rua</label>
        <input required type="text" value={rua} onChange={ruaHandle} />
      </div>
      <div>
        <label>Número</label>
        <input required type="numeric" value={numero} onChange={numeroHandle} />
      </div>
      <div>
        <label>Bairro</label>
        <input required type="text" value={bairro} onChange={bairroHandle} />
      </div>
      <div>
        <label>Cidade</label>
        <input required type="text" value={cidade} onChange={cidadeHandle} />
      </div>
      <div>
        <label>UF</label>
        <input required type="text" value={uf} onChange={ufHandle} />
      </div>
      <button>Salvar</button>
    </form>
  </Card>
  )
}

export default Formulario;