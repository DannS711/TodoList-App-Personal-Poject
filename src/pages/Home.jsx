import ListsTable from "../components/ListsTable";

function Home() {
  return (
    <>
      <div className="xl:px-[350px]">
        {!localStorage.getItem("access_token") ? (
          <div className="mt-72 text-center text-3xl font-semibold">
            It seems you havent login yet. Click{" "}
            <a
              href="/login"
              className="underline text-red-700 active:text-red-900"
            >
              here
            </a>{" "}
            to login so you can make up your activities
          </div>
        ) : (
          <ListsTable />
        )}
      </div>
    </>
  );
}

export default Home;
