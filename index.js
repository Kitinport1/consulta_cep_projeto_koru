// Função para buscar o endereço por CEP usando a API ViaCEP
const receivedCep = '01001000'; // Exemplo de CEP

function buscarEnderecoporCEP(cep) {
  const url = `https://viacep.com.br/ws/${cep}/json/`;

  return fetch(url)
    .then(response => response.json())
    .then((dados) => {
      return{ 
      cep: dados.cep,
      logradouro: dados.logradouro,
      bairro: dados.bairro,
      cidade: dados.localidade,
      estado: dados.uf,
      regiao: dados.regiao,
      DDD: dados.ddd,
    }
  })
}

buscarEnderecoporCEP(receivedCep).then(endereco => {
  console.log(endereco)
});
