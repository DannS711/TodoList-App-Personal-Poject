import axios from "axios";
import { Table, TableBody, TableCell, TableRow } from "flowbite-react";
import { useEffect, useState } from "react";
import { baseServerAPI } from "../utils";
import { useNavigate, useParams } from "react-router-dom";
import AddModal from "./AddModal";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";

const TaskTable = () => {
  const navigate = useNavigate();

  const ListId = useParams()._id;
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    task: "",
  });
  const [taskId, setTaskId] = useState(null);

  useEffect(() => {
    const getTask = async () => {
      try {
        const { data } = await axios({
          method: "GET",
          url: `${baseServerAPI}/task/tasks/${ListId}`,
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        setTasks(data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getTask();
  }, [ListId]);

  const handleCheckboxChange = async (taskId, isChecked) => {
    try {
      await axios({
        method: "PUT",
        url: `${baseServerAPI}/task/status/${taskId}`,
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
        data: {
          isCompleted: isChecked,
        },
      });

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, isCompleted: isChecked } : task
        )
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreatenewTask = async (e) => {
    e.preventDefault();

    try {
      await axios({
        method: "POST",
        url: `${baseServerAPI}/task/create/${ListId}`,
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
        data: {
          task: form.task,
        },
      });
      setLoading(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();

    if (taskId) {
      try {
        await axios({
          method: "PATCH",
          url: `${baseServerAPI}/task/rewrite/${taskId}`,
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
          data: {
            task: form.task,
          },
        });
        setShowModal(false);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDeleteTask = async (e) => {
    e.preventDefault();

    if (taskId) {
      try {
        await axios({
          method: "DELETE",
          url: `${baseServerAPI}/task/delete/${taskId}`,
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        setShowModal(false);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const showCreateTaskmodal = () => {
    setModalType("add");
    setShowModal(true);
  };

  const showEditTaskModal = (IdTask) => {
    setTaskId(IdTask);
    setModalType("edit");
    setShowModal(true);
  };

  const showDeleteTaskModal = (IdTask) => {
    setTaskId(IdTask);
    setModalType("delete");
    setShowModal(true);
  };

  const handleInputChanges = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  if (loading) {
    return (
      <>
        <h1 className="flex justify-center items-center mt-[17rem] sm:mt-[19rem] font-extrabold text-5xl">
          Loading...
        </h1>
      </>
    );
  }

  return (
    <>
      <div className="py-16">
        {tasks.length === 0 ? (
          <div className="text-center">
            <p className="font-bold text-2xl mt-60">
              No tasks available. Create a new task!
            </p>
            <button
              className="bg-white text-black p-2 rounded-lg mt-4 font-medium"
              onClick={showCreateTaskmodal}
            >
              Create Task
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <button
                className="bg-white p-2 mb-1 rounded-lg font-semibold hover:bg-slate-100 active:bg-slate-200 flex"
                onClick={() => navigate("/")}
              >
                {"<-"} Back
              </button>
              <button
                className="bg-white p-2 mb-1 rounded-lg font-semibold hover:bg-slate-100 active:bg-slate-200 flex"
                onClick={showCreateTaskmodal}
              >
                <img src="/add.svg" alt="add" height="20" width="20" />
                Create Task
              </button>
            </div>
            <Table>
              <TableBody className="divide-y">
                {tasks.map((task, index) => (
                  <TableRow className="bg-white" key={index}>
                    <TableCell className="text-start text-slate-700 font-semibold flex-1 text-base">
                      <input
                        className="mr-3"
                        type="checkbox"
                        checked={task.isCompleted}
                        onChange={(e) =>
                          handleCheckboxChange(task._id, e.target.checked)
                        }
                      />
                      {task.task}
                    </TableCell>
                    <TableCell className="text-center">
                      <button
                        className="mr-5"
                        onClick={() => showEditTaskModal(task._id)}
                      >
                        <img
                          src="/edit.svg"
                          alt="edit"
                          height="20"
                          width="20"
                        />
                      </button>
                      <button onClick={() => showDeleteTaskModal(task._id)}>
                        <img
                          src="/delete.svg"
                          alt="Delete"
                          height="20"
                          width="20"
                        />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </div>
      {modalType === "edit" && (
        <EditModal
          isOpened={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={handleEditFormSubmit}
          handleInputChanges={handleInputChanges}
        />
      )}
      {modalType === "delete" && (
        <DeleteModal
          isOpened={showModal}
          onClose={() => setShowModal(false)}
          onDelete={handleDeleteTask}
        />
      )}
      {modalType === "add" && (
        <AddModal
          isOpened={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={handleCreatenewTask}
          handleInputChanges={handleInputChanges}
        />
      )}
    </>
  );
};

export default TaskTable;
