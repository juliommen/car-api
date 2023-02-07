# Aplicação Geral

## Requisitos Não Funcionais
Banco de dados Postgre.
ORM Prisma.
Node.Js.


# Cadastro de Carros

## Requisitos Funcionais
Deve ser possível cadastrar um carro

## Regra de Negócio
Não se pode cadastrar um carro com placa já existente.
Não se pode alterar a placa de um carro.
Só o usuário administrador pode cadastrar um carro.

# Listagem de Carros

## Requisitos Funcionais
Deve ser possível listar todos os carros disponíveis.
Deve ser possível listar todos os carros disponíveis pelo nome do carro.
Deve ser possível listar todos os carros disponíveis pela categoria.
Deve ser possível listar todos os carros disponíveis pela marca.

## Regra de Negócio
Não é preciso estar logado para solicitar a listagem.

# Cadastro de Imagem

## Requisitos Funcionais
Deve ser possível cadastrar a imagem do carro.

## Requisitos Não Funcionais
Utilizar multer para processar o upload de arquivos.

## Regra de Negócio
Deve ser possível cadastrar mais de uma imagem para o mesmo carro.
Só um usuário administrador pode cadastrar imagens.

# Aluguel

## Requisitos Funcionais
Deve ser possível cadastrar o aluguel de um carro.

## Requisitos Não Funcionais

## Regra de Negócio
O aluguel deve ter duração mínima de 24 horas.
Não se pode cadastrar um novo aluguel para o mesmo usuário.
Não se pode cadastra um novo aluguel para um carro indisponível.

etc etc