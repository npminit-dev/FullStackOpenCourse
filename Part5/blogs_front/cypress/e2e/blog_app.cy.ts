import cypress from "cypress";
import { contains } from "cypress/types/jquery";

const newUser = {
  username: "MMasi",
  name: "Michael Masi",
  password: "uzumymw",
};
const userLoginData = { username: "MMasi", password: "uzumymw" };
const newBlogData = {
  title: "Messi: Overall",
  url: "hhtp://www.mipaginaweb.com.ar",
  likes: 178,
};

beforeEach(() => {
  localStorage.removeItem("lsssstkn");
  cy.request("GET", "http://localhost:3003/testUtils/resetDB");
  cy.request({
    url: "http://localhost:3003/api/users/signin",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: newUser,
  }).then((res) => {
    console.log(res);
  });
  cy.visit("http://192.168.0.5:5173/");
});

describe("Session tests:", () => {
  it("log in default shown", () => {
    cy.get("#loginform").contains("Username:");
    cy.get("#loginform").contains("Password:");
  });

  it("incorrect login", () => {
    cy.get("#loginform").get("#usernameinput").type("Masi");
    cy.get("#loginform").get("#passwordinput").type("uzumymw");
    cy.get("#loginform").get("#loginsubmitbutton").click();
    cy.get(".msg").contains("401");
  });

  it("correct login", () => {
    cy.get("#loginform").get("#usernameinput").type("MMasi");
    cy.get("#loginform").get("#passwordinput").type("uzumymw");
    cy.get("#loginform").get("#loginsubmitbutton").click();
    cy.get("#postblogform").should("contain", "Title");
    cy.get("#postblogform").should("contain", "URL");
    cy.get("#postblogform").should("contain", "LIKES");
  });
});

describe.only("Blogs test:", () => {
  it("Check if a logged user can create a blog", async () => {
    cy.get("#blogscontainer").children().should("have.length", 0);
    cy.request({
      url: "http://localhost:3003/api/users/login",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: userLoginData,
    }).then((res) => {
      cy.request({
        url: "http://localhost:3003/api/blogs",
        method: "POST",
        auth: { bearer: ":" + res.body },
        headers: { "Content-Type": "application/json" },
        body: newBlogData,
      }).then(() => {
        cy.get("#blogscontainer").children().should("have.length", 1);
      });
    });
  });

  
});
