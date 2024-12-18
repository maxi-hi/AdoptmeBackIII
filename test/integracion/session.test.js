import { expect } from "chai";
import supertest from "supertest";

const request = supertest("http://localhost:8080/api/sessions");
const userRequest = supertest("http://localhost:8080/api/users");

describe("Test de Integración Sessions",()=>{

    let userSession;

    it("[POST] /api/sessions - Debe registrar un usuario",async()=>{
        const newUser = {
                first_name:"Pepe Test",
                last_name:"Second name test",
                email:"emailtest22@gmail.com",
                password:"123"
        };

        const {status, body} = await request.post("/register").send(newUser);
        
        userSession = body.payload;

        expect(body.payload).to.be.an("object");
        expect(status).to.be.equal(201);
        expect(body.status).to.be.equal("success");
        expect(body.payload.email).to.be.equal(newUser.email);
        expect(body.payload.last_name).to.be.equal(newUser.last_name);
        expect(body.payload.password).to.not.be.equal(newUser.password);
    });

    after(async ()=>{
        await userRequest.delete(`/${userSession._id}`);
    });

    it("[POST] /api/sessions - Debe loguear un usuario",async()=>{
        const dataSignIn={
            email:"emailtest15@gmail.com",
            password:"123"
        };

        const {status, body} = await request.post("/login").send(dataSignIn);

        expect(body.payload).to.be.an("object");
        expect(status).to.be.equal(200);
        expect(body.status).to.be.equal("success");
        expect(body.payload.email).to.be.equal(dataSignIn.email);
        expect(body.message).to.be.an("string");
        expect(body.payload.password).to.not.be.equal(dataSignIn.password);
    });
});
