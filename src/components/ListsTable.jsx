import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { baseServerAPI } from "../utils";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import AddModal from "./AddModal";

function ListsTable() {
  const navigate = useNavigate();

  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedListId, setSelectedListId] = useState(null);
  const [form, setForm] = useState({
    listName: "",
  });
  const [modalType, setModalType] = useState("");

  useEffect(() => {
    const getLists = async () => {
      try {
        const { data } = await axios({
          method: "GET",
          url: `${baseServerAPI}/list/lists`,
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        setLists(data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    getLists();
  }, []);

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();

    if (selectedListId) {
      try {
        await axios({
          method: "PUT",
          url: `${baseServerAPI}/list/rename/${selectedListId}`,
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
          data: {
            listName: form.listName,
          },
        });
        setShowModal(false);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDeleteList = async (e) => {
    e.preventDefault();

    if (selectedListId) {
      try {
        await axios({
          method: "DELETE",
          url: `${baseServerAPI}/list/delete/${selectedListId}`,
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

  const handleAddNewList = async (e) => {
    e.preventDefault();

    try {
      await axios({
        method: "POST",
        url: `${baseServerAPI}/list/create`,
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
        data: {
          listName: form.listName,
        },
      });
      setShowModal(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditButtonClick = (listId, listName) => {
    setSelectedListId(listId);
    setForm({
      listName,
    });
    setModalType("edit");
    setShowModal(true);
  };

  const handleDeleteModalClick = (listId) => {
    setSelectedListId(listId);
    setModalType("delete");
    setShowModal(true);
  };

  const handleInputChanges = (e) => {
    const { id, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [id]: value,
    }));
  };

  const showAddListModal = () => {
    setModalType("add");
    setShowModal(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
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
      <div className="overflow-x-auto px-4 sm:px-8 md:px-16 lg:px-32 py-8 sm:py-16">
        {lists.length === 0 ? (
          <div className="text-center">
            <p className="font-bold text-2xl mt-60">
              No lists available. Create a new list!
            </p>
            <button
              className="bg-white text-black p-2 rounded-lg mt-4 font-medium"
              onClick={showAddListModal}
            >
              Create List
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <button
                className="flex bg-white p-2 mb-1 rounded-lg font-semibold hover:bg-slate-100 active:bg-slate-200"
                onClick={showAddListModal}
              >
                <img src="/add.svg" alt="add" height="20" width="20" />
                Create List
              </button>
              <button
                className="flex bg-white p-2 mb-1 rounded-lg font-semibold hover:bg-slate-100 active:bg-slate-200"
                onClick={handleLogout}
              >
                <img src="/logout.svg" alt="add" height="20" width="20" />
                Logout
              </button>
            </div>
            <Table className="w-full">
              <TableHead>
                <TableHeadCell className="text-center">List name</TableHeadCell>
                <TableHeadCell className="text-center">
                  <span></span>
                </TableHeadCell>
              </TableHead>
              <TableBody className="divide-y">
                {lists.map((list, index) => (
                  <TableRow key={index} className="bg-white">
                    <TableCell className="whitespace-nowrap font-medium text-gray-900 text-center">
                      <Link to={`/task/${list._id}`}>
                        <p className="text-slate-700 font-semibold flex-1 hover:underline truncate">
                          {list.listName}
                        </p>
                      </Link>
                    </TableCell>
                    <TableCell className="text-center flex justify-center items-center gap-3">
                      <button
                        className="sm:mr-5"
                        onClick={() => handleEditButtonClick(list._id)}
                      >
                        <img
                          src="/edit.svg"
                          alt="edit"
                          height="20"
                          width="20"
                        />
                      </button>
                      <button onClick={() => handleDeleteModalClick(list._id)}>
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
          onDelete={handleDeleteList}
        />
      )}
      {modalType === "add" && (
        <AddModal
          isOpened={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={handleAddNewList}
          handleInputChanges={handleInputChanges}
        />
      )}
    </>
  );
}

export default ListsTable;
