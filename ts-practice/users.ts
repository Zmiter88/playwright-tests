async function getTestUsername() {
    return "test_user";
}

async function printUsername() {
    const username = await getTestUsername();
    console.log(username);
}

const users = ["admin", "tester", "manager", "test_user"];
// filtrowanie po słowie "test"
const testers = users.filter(user => user.includes("test"));
console.log(testers);
// dodoanie prefixu "user_" do kazdego uzytkownika
const testUsers = testers.map(user => "user_" + user)
console.log(testUsers);

const users2 = ["admin", "test_user", "manager", "tester", "guest", "test_admin"];
const testers2 = users2.filter(user => user.includes("test"));
const testUsers2 = testers2.map(user => "user_" + user);
console.log(testUsers2);

class TestUser {
    public username: string;
    private password: string;
    public active: boolean;

    constructor(username: string, password: string, active: boolean) {
        this.username = username;
        this.password = password;
        this.active = active;
    }

    public getUserInfo() {
        return this.username + " - active:" + this.active;
    }
}

    const user = new TestUser("test_user", "1234", true);
    console.log(user.username);
    console.log(user.getUserInfo());
