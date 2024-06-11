import React, { useEffect, useState } from "react";
import { Title } from "../SharedModule/Components/Title/Title";
import { allGroupsData } from "./GroupsData";
import styles from "./Groups.module.css";
import DeleteModal from "../SharedModule/Components/DeleteModal/DeleteModal";
import Filter from "../SharedModule/Components/Filter/Filter";
import NoData from "../SharedModule/Components/NoData/NoData";
import { toast } from "react-toastify";
import AddModal from "../SharedModule/Components/AddModal/AddModal";
import EditModal from "../SharedModule/Components/EditModal/EditModal";
import Loading from "../SharedModule/Components/Loading/Loading";
import { useNavigate} from "react-router-dom";

export default function GroupsList() {
  const [allData, setAllData] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const closeModal = () => {
    setOpenDeleteModal(false);
    setOpenAddModal(false);
    setOpenEditModal(false);
  };
  const [curruntGroupIndex, setCurruntGroupIndex] = useState(null);

  const groupsNumPerPage = 9;
  const [CurrentPageNum, setCurrentPageNum] = useState(1);
  const NbPages = Math.ceil(allData?.length / groupsNumPerPage);
  const startIndex = (CurrentPageNum - 1) * groupsNumPerPage;
  const endIndex = startIndex + groupsNumPerPage;
  const DataPerPage = allData?.slice(startIndex, endIndex);

  async function getData(searchValue) {
    if (searchValue) {
      const groups = allGroupsData.filter((group) =>
        group.name.includes(searchValue)
      );
      setAllData(groups);
    } else setAllData(allGroupsData);
    setIsLoading(false);
  }
  const deleteGroup = () => {
    allData.splice(curruntGroupIndex, 1);
  };

  const addGroup = (data) => {
      const newGroup={
        id:Date.now(),
        name:data.name,
        description:data.description,
        posts:[],
        creationDate:`${new Date()}`.slice(0,21)
    }
    allGroupsData.push(newGroup);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Title title={"All Groups"} />

      <div className="addGroup w-100  d-flex justify-content-end px-5 py-3">
        <button className="btn btn-dark me-4 px-4" onClick={()=>{setOpenAddModal(true)}}>Add New Group</button>
      </div>

      <Filter getItems={getData} />

      <div className="groupsList w-100 row justify-content-center">
        {isLoading ? (
            <Loading/>
        )
        :(
            allData.length > 0 ? (
                DataPerPage?.map((group, index) => (
                  <a
                    className={`${styles.group} group text-black col-lg-3 col-sm-5 m-3 px-2 rounded shadow `}
                    onClick={()=> navigate(`posts/${index}`)}
                  >
                    <div className="d-flex justify-content-between my-3 mx-3">
                      <h3 className="">{group.name}</h3>
                      <div className="dropdown mt-2">
                        <button
                          className="btn border-0 fa fa-ellipsis-h"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        ></button>
                        <ul className="dropdown-menu rounded-4 py-1 px-1">
                          <li>
                            <button
                              className="btn btn-outline-light w-100 text-start border-0 text-black"
                              onClick={() => {
                                setOpenEditModal(true);
                                setCurruntGroupIndex(index);
                            }}
                            >
                              <i className="fa fa-edit me-2 text-warning"></i>Edit
                            </button>
                          </li>
      
                          <li>
                            <button
                              className="btn btn-outline-light w-100 text-start border-0 text-black"
                              onClick={() => {
                                setOpenDeleteModal(true);
                                setCurruntGroupIndex(index);
                              }}
                            >
                              <i className="fa fa-trash me-2 text-danger"></i>Delete
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <p className="mb-3 ps-3">{group.description}</p>
                    <p className="text-start text-danger ps-3">
                      {group.creationDate}
                    </p>
                  </a>
                ))
              ) : (
                <NoData />
              )
              
        ) }
        <nav aria-label="Page navigation example" className="d-flex justify-content-center my-4">
              <ul class="pagination mt-3">
                <li class="page-item">
                  <a
                    class="page-link"
                    onClick={()=> CurrentPageNum-1<1?'':setCurrentPageNum(CurrentPageNum-1)}
                    aria-label="Previous"
                  >
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>

                {allData?.slice(0, NbPages).map((group, index) => (
                  <li class="page-item">
                    <a
                      class="page-link"
                      onClick={() => setCurrentPageNum(index + 1)}
                    >
                      {index + 1}
                    </a>
                  </li>
                ))}

                <li class="page-item">
                  <a
                    class="page-link"
                    onClick={()=> CurrentPageNum+1>NbPages?'':setCurrentPageNum(CurrentPageNum+1)}
                    aria-label="Next"
                  >
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
      </div>
      {openDeleteModal && (
        <DeleteModal
          closeDeleteModal={closeModal}
          itemName={"Group"}
          deleteItem={deleteGroup}
        />
      )}

      {openAddModal && (
        <AddModal closeModal={closeModal} itemName={"Group"} addItem={addGroup}/>
      )}

      {openEditModal && (
        <EditModal closeModal={closeModal} itemName={"Group"} itemIndex={curruntGroupIndex}/>
      )}
    </>
  );
}
