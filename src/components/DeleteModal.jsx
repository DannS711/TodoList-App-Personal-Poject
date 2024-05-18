const DeleteModal = ({ isOpened, onClose, onDelete }) => {
  if (!isOpened) return null;

  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="w-[600px]">
        <div className="bg-white p-2 rounded">
          <div className="p-4">
            <h1 className="text-center text-3xl font-semibold">
              Are you sure you want to delete it?
            </h1>
          </div>
          <div className="flex justify-center items-center space-x-4 m-3">
            <button
              type="button"
              className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-400 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              onClick={onDelete}
            >
              Delete
            </button>
            <button
              type="button"
              className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-400 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
