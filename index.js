const readline = require('readline');
const fetch = require('node-fetch');

function validarCEP(cep) {
  return /^[0-9]{8}$/.test(cep);
}

function buscarEnderecoporCEP(cep) {
  const url = `https://viacep.com.br/ws/${cep}/json/`;

  return fetch(url)
    .then(response => response.json())
    .then((dados) => {
      if (dados.erro) {
        throw new Error('CEP não encontrado');
      }

      return {
        cep: dados.cep,
        logradouro: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf,
        DDD: dados.ddd,
      };
    });
}

function menu() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log("\nCONSULTA DE CEP");
  console.log("1. Consultar CEP");
  console.log("2. Sair\n");

  rl.question("Digite o número da opção desejada: ", (respostaMenu) => {
    if (respostaMenu === '1') {
      rl.question("\nDigite o CEP (somente números): ", (cep) => {
        if (!validarCEP(cep)) {
          console.log("CEP inválido. Informe exatamente 8 números.");
          rl.close();
          menu();
          return;
        }

        buscarEnderecoporCEP(cep)
          .then(endereco => {
            console.log('\nEndereço encontrado:');
            console.log(endereco);

            rl.question("\nDeseja fazer uma nova consulta? (s/n): ", (resposta) => {
              rl.close();
              if (resposta.toLowerCase() === 's') menu();
              else console.log("Encerrando o programa...");
            });
          })
          .catch(error => {
            console.log('\nErro:', error.message);
            rl.question("\nDeseja tentar novamente? (s/n): ", (resposta) => {
              rl.close();
              if (resposta.toLowerCase() === 's') menu();
              else console.log("Encerrando o programa...");
            });
          });
      });
    } else if (respostaMenu === '2') {
      console.log("Saindo do programa...");
      rl.close();
    } else {
      console.log("Opção inválida. Tente novamente.");
      rl.close();
      menu();
    }
  });
}

menu();