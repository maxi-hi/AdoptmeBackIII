import Users from "../../src/dao/Users.dao.js";
import mongoose from "mongoose";
import {expect} from "chai";

mongoose.connect(`mongodb+srv://maximoperret:coderhouse@cluster0.rclpj.mongodb.net/BackendIII`);

describe("Test UserDao",()=>{
    const userDao = new Users;

    let userTest;

    before(()=>{
        console.log("Inicio de todos los test. Se ejecuta antes que todos los testeos dentro del describe.");
    });

    beforeEach(()=>{
        console.log("Se ejecuta antes de cada test individual dentro del describe.");
    });

    after(()=>{
        console.log("Se ejecuta al final de todos los testeos dentro del describe.");
        mongoose.disconnect();
    });

    afterEach(()=>{
        console.log("Se ejecuta al final de cada test dentro del describe.");
    });

    it("Debe retornar todos los usuarios",async ()=>{
        const users = await userDao.get();
        expect(users).to.be.an("array");
        expect(users).to.be.not.an("object");
    });

    it("Debe crear y retornar un usuario",async()=>{
        const newUser={
            first_name:"Pepe Test",
            last_name:"Second name test",
            email:"emailtest14@gmail.com",
            password:"123",
            age:30,
            birthDate: new Date()
        };

        const user = await userDao.save(newUser);

        userTest = user;

        expect(user).to.be.an("object");
        expect(user.first_name).to.be.equal(newUser.first_name).and.to.be.an("string");
        expect(user.last_name).to.be.equal(newUser.last_name);
        expect(user.password).to.be.equal(newUser.password);
        expect(user).to.have.property("_id");

        expect(user).to.not.have.property("age");
        expect(user).to.not.have.property("birthDate");
        expect(user).to.not.be.null;
        expect(user).to.not.be.an("array");
        expect(user).to.not.have.property("age");

        console.log(user);
    });

    it ("Debe retornar un usuario por su id", async ()=>{
        const user = await userDao.getBy(userTest._id);

        expect(user).to.be.an("object");
        expect(user).to.have.property("_id");
        expect(user.first_name).to.be.equal(userTest.first_name).and.to.be.an("string");
        expect(user.last_name).to.be.equal(userTest.last_name);

        expect(user).to.not.be.null;
    });

    it ("Debe actualizar un usuario", async()=>{

        const updateData = {
            first_name:"Juancito Actualizado",
            password:"123"
        };

        const user = await userDao.update(userTest._id,updateData);
        expect(user).to.be.an("object");
        expect(user).to.have.property("_id");
        expect(user.first_name).to.be.equal("Juancito Actualizado").and.to.be.an("string");
        expect(user.last_name).to.be.equal(userTest.last_name);
        expect(user.password).to.be.equal("123");

    });

    it("Debe eliminar un usuario",async()=>{
        await userDao.delete(userTest._id);

        const user = await userDao.getBy(userTest._id);

        expect(user).to.be.null;
    });
});
