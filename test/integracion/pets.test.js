import { expect } from "chai";
import supertest from "supertest";

const request = supertest("http://localhost:8080/api/pets");

describe("Test de Integración Pets", () => {
    let petTest;

    it("[GET] /api/pets - Debe devolver un array con mascotas", async () => {
        const { status, body } = await request.get("/");
        expect(body.payload).to.be.an("array");
        expect(status).to.be.equal(200);
    });

    it("[POST] /api/pets - Debe crear una nueva mascota", async () => {
        const newPet = {
            name: "PetTest",
            specie: "Gato",
            birthDate: "10/10/2023",
            image: "blabla avatar",
        };

        const { status, body } = await request.post("/").send(newPet);
        petTest = body.payload;

        expect(status).to.be.equal(201);
        expect(petTest).to.be.an("object");
        expect(petTest.name).to.be.equal("PetTest");
        expect(petTest.specie).to.be.equal("Gato");
    });

    it("[PUT] /api/pets/:pid - Debe actualizar la mascota", async () => {
        const newPet = {
            name: "PetTest Modificado",
            specie: "Era gato, modifique a León",
        };

        const { status, body } = await request.put(`/${petTest._id}`).send(newPet);

        expect(status).to.be.equal(200);
        expect(body.payload).to.be.an("object");
        expect(body.payload.name).to.be.equal("PetTest Modificado");
        expect(body.payload.specie).to.be.equal("Era gato, modifique a León");
    });

    it("[DELETE] /api/pets/:pid - Debe eliminar la mascota", async () => {
        const { status, body } = await request.delete(`/${petTest._id}`);

        expect(status).to.be.equal(200);
        expect(body.payload).to.be.an("object");
        expect(body.payload.name).to.be.equal("PetTest Modificado");
        expect(body.payload.specie).to.be.equal("Era gato, modifique a León");
    });
});