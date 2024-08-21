import User from "../../app/interfaces/IUser";

const userSeed: User = {
  id: 1,
  name: "teste 2",
  email: "teste123@teste.com",
  password: "teste123",
  birth_date: new Date("1990-03-07"),
  active: true,
};

export default userSeed;