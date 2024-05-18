import TaskTable from "../components/TaskTable";

function TaskDetail() {
  return (
    <>
      {!localStorage.getItem("access_token") ? (
        <div className="xl:px-[350px]">
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
        </div>
      ) : (
        <div className="xl:px-[600px]">
          <TaskTable />
        </div>
      )}
    </>
  );
}

export default TaskDetail;
