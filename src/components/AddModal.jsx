const AddModal = ({
  isOpened,
  onClose,
  onSubmit,
  handleInputChanges,
}) => {
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
          <h1 className="text-2xl text-center font-medium">Create</h1>
          <form className="max-w-sm mx-auto" onSubmit={onSubmit}>
            <div className="mb-5">
              <input
                type="text"
                id="listName"
                name="task"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Fill the input"
                required
                onChange={handleInputChanges}
              />
            </div>
            <div className="flex justify-center items-center space-x-4">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                Submit
              </button>
              <button
                type="button"
                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddModal;
