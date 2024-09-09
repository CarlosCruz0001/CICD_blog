/* eslint-disable no-undef */




describe("Testes de cadastro de usuário", () => {
  beforeEach(() => {
    cy.visit("/");
  });




it("Deve cadastrar um usuário com sucesso", function () {
    cy.get(":nth-child(3) > a").click();
    cy.get(":nth-child(1) > input").type("André");
    cy.get(":nth-child(2) > input").type("andre@email.com");
    cy.get(":nth-child(3) > input").type("1@2B3c4d5e");
    cy.get("button").click();
    cy.get(".success-message").should(
      "contain",
      "Usuário registrado com sucesso!"
    );
  });




  it("Nao deve cadastrar o mesmo usuário duas vezes", function () {
    cy.get(":nth-child(3) > a").click();
    cy.get(":nth-child(1) > input").type("Bruno");
    cy.get(":nth-child(2) > input").type("bruno@email.com");
    cy.get(":nth-child(3) > input").type("1@2B3c4d5e");
    cy.get("button").click();
    cy.wait(1000);
    cy.get(":nth-child(1) > input").type("Bruno");
    cy.get(":nth-child(2) > input").type("bruno@email.com");
    cy.get(":nth-child(3) > input").type("1@2B3c4d5e");
    cy.get("button").click();
    cy.wait(1000);
    cy.get(".error-message").should(
      "contain",
      "Erro ao registrar o usuário. Tente novamente."
    );
  });




  it("Não deve deixar cadastrar com nome em branco", function () {
    cy.get(":nth-child(3) > a").click();
    cy.get(":nth-child(2) > input").type("carlos@email.com");
    cy.get(":nth-child(3) > input").type("1@2B3c4d5e");
    cy.get("button").click();
    cy.get("form").submit();
    cy.get(".error-message").should("be.visible");
  });




  it("Não deve deixar cadastrar com email em branco", function () {
    cy.get(":nth-child(3) > a").click();
    cy.get(":nth-child(1) > input").type("Carlos");
    cy.get(":nth-child(3) > input").type("1@2B3c4d5e");
    cy.get("button").click();
    cy.get("form").submit();
    cy.get(".error-message").should("be.visible");
  });
  it("Não deve deixar cadastrar com email sem @", function () {
    cy.get(":nth-child(3) > a").click();
    cy.get(":nth-child(1) > input").type("Carlos");
    cy.get(":nth-child(2) > input").type("carlos.com");
    cy.get(":nth-child(3) > input").type("1@2B3c4d5e");
    cy.get("button").click();
    cy.get("form").submit();
    cy.get(".error-message").should("be.visible");
  });
});




describe("Testes de login", () => {
  beforeEach(() => {
    cy.visit("/");
  });




  it("Deve realizar login com sucesso", function () {
    cy.get(":nth-child(3) > a").click();
    cy.get(":nth-child(1) > input").type("Daniel");
    cy.get(":nth-child(2) > input").type("daniel@email.com");
    cy.get(":nth-child(3) > input").type("1@2B3c4d5e");
    cy.get("button").click();
    cy.wait(20000);
    cy.get(":nth-child(2) > a").click();
    cy.get(":nth-child(1) > input").type("daniel@email.com");
    cy.get(":nth-child(2) > input").type("1@2B3c4d5e");
    cy.get("button").click();
    cy.wait(20000);
    cy.get(".success-message").should(
      "contain",
      "Login bem-sucedido! Redirecionando..."
    );
  });




  it("Não deve realizar login sem endereço de email", function () {
    cy.get(":nth-child(2) > a").click();
    cy.get(":nth-child(2) > input").type("1@2B3c4d5e");
    cy.get("button").click();
    cy.get("form").submit();
    cy.get(".error-message").should("be.visible");
  });




  it("Não deve realizar login sem @ no email", function () {
    cy.get(":nth-child(2) > a").click();
    cy.get(":nth-child(1) > input").type("danielemail.com");
    cy.get(":nth-child(2) > input").type("1@2B3c4d5e");
    cy.get("button").click();
    cy.get("form").submit();
    cy.get(".error-message").should("be.visible");
  });




  it("Não deve realizar login sem digitar senha", function () {
    cy.get(":nth-child(2) > a").click();
    cy.get(":nth-child(1) > input").type("daniel@email.com");
    cy.get("button").click();
    cy.get("form").submit();
    cy.get(".error-message").should("be.visible");
  });




  it("Não deve realizar login com senha incorreta", function () {
    cy.get(":nth-child(2) > a").click();
    cy.get(":nth-child(1) > input").type("daniel@email.com");
    cy.get(":nth-child(2) > input").type("123");
    cy.get("button").click();
    cy.wait(20000);
    cy.get(".error-message").should("contain", "User not authorized");
  });




  it("Não deve realizar login com email não cadastrado", function () {
    cy.get(":nth-child(2) > a").click();
    cy.get(":nth-child(1) > input").type("emanuel@email.com");
    cy.get(":nth-child(2) > input").type("1@2A3b4c5d");
    cy.get("button").click();
    cy.wait(20000);
    cy.get(".error-message").should("contain", "User not authorized");
  });
});




describe("Testes de post", () => {
  beforeEach(() => {
    cy.visit("/");
  });




  it("Não deve deixar postar sem autenticação", function () {
    cy.get(":nth-child(4) > a").click();
    cy.get("input").type("Este é um post de teste");
    cy.get("textarea").type(
      "O texto poderia ser qualquer coisa, como um lorem"
    );
    cy.get("button").click();
    cy.wait(2000);
    cy.get(".error-message").should(
      "contain",
      "Você precisa estar autenticado para criar uma postagem."
    );
  });




  it("Deve autenticar e postar ", function () {
    cy.get(":nth-child(3) > a").click();
    cy.get(":nth-child(1) > input").type("fabio");
    cy.get(":nth-child(2) > input").type("fabio@email.com");
    cy.get(":nth-child(3) > input").type("1@2B3c4d5e");
    cy.get("button").click();
    cy.wait(20000);
    cy.get(":nth-child(2) > a").click();
    cy.get(":nth-child(1) > input").type("fabio@email.com");
    cy.get(":nth-child(2) > input").type("1@2B3c4d5e");
    cy.get("button").click();
    cy.wait(20000);
    cy.get(".success-message").should(
      "contain",
      "Login bem-sucedido! Redirecionando..."
    );
    cy.get(":nth-child(4) > a").click();
    cy.get("input").type("Este é um post de teste");
    cy.get("textarea").type(
      "O texto poderia ser qualquer coisa, como um lorem (Post 1)"
    );
    cy.get("button").click();
    cy.wait(2000);
    cy.get(".success-message").should(
      "contain",
      "Postagem criada com sucesso!"
    );
  });




  it("Deve autenticar e não deixar postar com título em branco ", function () {
    cy.get(":nth-child(2) > a").click();
    cy.get(":nth-child(1) > input").type("fabio@email.com");
    cy.get(":nth-child(2) > input").type("1@2B3c4d5e");
    cy.get("button").click();
    cy.wait(20000);
    cy.get(".success-message").should(
      "contain",
      "Login bem-sucedido! Redirecionando..."
    );
    cy.get(":nth-child(4) > a").click();
    cy.get("textarea").type(
      "O texto poderia ser qualquer coisa, como um lorem"
    );
    cy.get("button").click();
    cy.wait(2000);
    cy.get("form").submit();
    cy.get(".error-message").should("be.visible");
    cy.get(".error-message").should("contain", "Erro ao criar postagem.");
  });




  it("Deve autenticar e não deixar postar com conteúdo em branco ", function () {
    cy.get(":nth-child(2) > a").click();
    cy.get(":nth-child(1) > input").type("fabio@email.com");
    cy.get(":nth-child(2) > input").type("1@2B3c4d5e");
    cy.get("button").click();
    cy.wait(20000);
    cy.get(".success-message").should(
      "contain",
      "Login bem-sucedido! Redirecionando..."
    );
    cy.get(":nth-child(4) > a").click();
    cy.get("input").type("Este é um post de teste");
    cy.get("button").click();
    cy.wait(2000);
    cy.get("form").submit();
    cy.get(".error-message").should("be.visible");
    cy.get(".error-message").should("contain", "Erro ao criar postagem.");
  });








it("Não deve criar post com título pequeno ", function () {
    cy.get(":nth-child(2) > a").click();
    cy.get(":nth-child(1) > input").type("fabio@email.com");
    cy.get(":nth-child(2) > input").type("1@2B3c4d5e");
    cy.get("button").click();
    cy.wait(20000);
    cy.get(".success-message").should(
      "contain",
      "Login bem-sucedido! Redirecionando..."
    );
    cy.get(":nth-child(4) > a").click();
    cy.get("input").type("E");
    cy.get("textarea").type(
      "O texto poderia ser qualquer coisa, como um lorem (Post 2)"
    );
    cy.get("button").click();
    cy.wait(20000);
    cy.get('.error-message').should('contain', 'Erro ao criar postagem.');
  });








it("Não deve criar post com conteúdo pequeno ", function () {
    cy.get(":nth-child(2) > a").click();
    cy.get(":nth-child(1) > input").type("fabio@email.com");
    cy.get(":nth-child(2) > input").type("1@2B3c4d5e");
    cy.get("button").click();
    cy.wait(20000);
    cy.get(".success-message").should(
      "contain",
      "Login bem-sucedido! Redirecionando..."
    );
    cy.get(":nth-child(4) > a").click();
    cy.get("input").type("Este é um post de teste");
    cy.get("textarea").type(
      "O"
    );
    cy.get("button").click();
    cy.wait(20000);
    cy.get('.error-message').should('contain', 'Erro ao criar postagem.');
  });




});




describe("Testes completo ", () => {
  beforeEach(() => {
    cy.visit("/");
  });




  it("Deve criar usuário, autenticar, postar verificar a renderização na página inicial ", function () {
    cy.get(":nth-child(3) > a").click();
    cy.get(":nth-child(1) > input").type("gabriel");
    cy.get(":nth-child(2) > input").type("gabriel@email.com");
    cy.get(":nth-child(3) > input").type("1@2B3c4d5e");
    cy.get("button").click();
    cy.wait(20000);
    cy.get(":nth-child(2) > a").click();
    cy.get(":nth-child(1) > input").type("gabriel@email.com");
    cy.get(":nth-child(2) > input").type("1@2B3c4d5e");
    cy.get("button").click();
    cy.wait(20000);
    cy.get(".success-message").should(
      "contain",
      "Login bem-sucedido! Redirecionando..."
    );
    cy.get(":nth-child(4) > a").click();
    cy.get("input").type("Este é um post de teste");
    cy.get("textarea").type(
      "O texto poderia ser qualquer coisa, como um lorem (Post 2)"
    );
    cy.get("button").click();
    cy.wait(2000);
    cy.get(".success-message").should(
      "contain",
      "Postagem criada com sucesso!"
    );
    cy.get(":nth-child(1) > a").click();
    cy.get(':nth-child(2) > h3').should("contain", "Este é um post de teste");
    cy.get(':nth-child(2) > p').should(
      "contain",
      "O texto poderia ser qualquer coisa, como um lorem"
    );
  });
});





