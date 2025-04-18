# Hub Digital cabo Verde

Hub Digital é uma plataforma colaborativa para descoberta, divulgação e apoio a produtos e projetos tecnológicos criados
em Cabo Verde.

Inspirada por iniciativas como Product Hunt, esta plataforma visa criar um ecossistema onde makers, devs, designers,
estudantes e empreendedores locais possam lançar suas ideias, obter feedback e ganhar visibilidade.

O projeto está em seu estágio inicial e procura seus primeiros contribuidores. O objetivo é construir um MVP simples e,
posteriormente, migrar para tecnologias mais robustas

## Conteúdo

- [Instalação](#installation)
- [Utilização](#usage)
- [Como Contribuir](#contributing)
- [Licença](#license)

## Instalação

Este projeto foi desenvolvido com Laravel 12 e React como frontend.
Para executar o projeto, você precisará ter o PHP, Composer e Node.js instalados em sua máquina
nas versões recomendadas.

- [PHP](https://www.php.net/downloads.php) >= 8.4
- [Composer](https://getcomposer.org/download/) >= 2.0
- [Node.js](https://nodejs.org/en/download/) >= 22.0

Siga estas etapas para instalar e configurar o projeto:

```bash
# Clone este repositório
git clone https://github.com/digitalhub/digitalhub.git

cd digitalhub

git checkout -b feat/your-feature

```

> **Nota:** Não faça push diretamente para a branch `main`. Crie uma nova branch para suas alterações.

### Instale as dependências usando o [Composer](https://getcomposer.org) e [NPM](https://www.npmjs.com):

```bash  
# Instale as dependências do PHP
composer install
# Instale as dependências do Node.js
npm install
```

### Crie uma cópia do arquivo `.env.example` e renomeie-o para `.env`:

```bash
cp .env.example .env
php artisan key:generate
```

### Prepare a base de dados e execute as migrações:

```bash
  touch database/database.sqlite
    php artisan migrate
```

### Link o diretório de armazenamento:

```bash
php artisan storage:link
```

Em um terminal separado compile os assets:

```bash
npm run dev
```

### Execute o servidor  do Laravel:

```bash
php artisan serve
```

## Como Contribuir

Contribuições são bem-vindas! Siga estas etapas para contribuir:

1. Fork o projeto.
2. Crie sua branch de recurso (`git checkout -b feature/AmazingFeature`).
3. Commit suas alterações (`git commit -m 'feat: add some AmazingFeature'`).
4. Envie para a branch (`git push origin feature/AmazingFeature`).
5. Abra um pull request.

Por favor, siga as diretrizes de contribuição e mantenha o código limpo e bem documentado,
e escreva testes para novas funcionalidades.

## Testes

Para executar os testes, use o seguinte comando:

```bash
composer test
```

## Mantido por:

- [Nuno Lima](https://github.com/NunoLima10)
- [kidiatoliny Gonçalves](https://github.com/kidiatoliny)
- [Outros contribuidores](../../contributors)

## Licença

Distribuido sob a licença **[GNU Affero General Public License](LICENSE.md)**







