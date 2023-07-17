import UserCard from "../components/UserCard";

const exampleDate = new Date(0);
const exampleUser = {
    name: "Avraham Gol",
    email: "avragol@gmail.com",
    roles: ["role1", "role2"],
    endTaskDates: [exampleDate]
}

const Users = () => {
    return (
        <>
            <UserCard user={exampleUser} />
        </>
    )
}
export default Users;