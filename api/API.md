# Descrição das Pastas

## /app
- Contém a lógica específica do aplicativo, como controladores (controllers) e middlewares. Essa camada é responsável por orquestrar os casos de uso (use cases).

## domain: Contém as regras de negócio puras. Aqui é onde ficam as entidades e os casos de uso, que devem ser independentes de qualquer framework ou tecnologia externa.

/entities: Define as entidades de negócio, que são objetos que representam as principais unidades do sistema (por exemplo, User, Order).

/usecases: Contém a lógica de negócio, organizada em casos de uso (use cases). Cada caso de uso deve ser uma ação específica que o sistema realiza (por exemplo, CreateUser, GetUser).

/infrastructure: Responsável por qualquer tecnologia externa que o sistema utilize, como banco de dados ou servidores web.

/database: Contém a configuração do banco de dados e as implementações dos repositórios.

/webserver: Contém a configuração do servidor Express.js.

/interfaces: Define as interfaces que a aplicação deve implementar, como repositórios e controladores.

/controllers: Interfaces dos controladores que definem os métodos esperados (por exemplo, IUserController).

/repositories: Interfaces dos repositórios, que são responsáveis pela comunicação com a camada de dados (por exemplo, IUserRepository).

/tests: Contém os testes do sistema, organizados de forma a cobrir tanto unidades quanto integrações.