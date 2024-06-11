import React, { useEffect, useState } from "react";
import { Title } from "../../../SharedModule/Components/Title/Title";
import styles from "./PostDetails.module.css";
import DeleteModal from "../../../SharedModule/Components/DeleteModal/DeleteModal";
import Loading from "../../../SharedModule/Components/Loading/Loading";
import NoData from "../../../SharedModule/Components/NoData/NoData";
import { useNavigate, useParams } from "react-router-dom";
import { allGroupsData } from "../../../GroupsList/GroupsData";
// import EditModal from "../../../SharedModule/Components/EditModal/EditModal";

export default function PostDetails() {
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { groupindex, postindex } = useParams();
  const navigate = useNavigate();

  async function getPostDetails() {
    setPost(allGroupsData[groupindex].posts[postindex]);
    setComments(allGroupsData[groupindex].posts[postindex].comments);
    setIsLoading(false);
  }

  useEffect(() => {
    getPostDetails();
  }, []);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  // const [openEditModal, setOpenEditModal] = useState(false);
  const closeModal = () => {
    setOpenDeleteModal(false);
    // setOpenEditModal(false);
  };
  const deletePost = () => {
    allGroupsData[groupindex].posts.splice(postindex, 1);
    navigate(`/posts/${groupindex}`);
  };
  return (
    <div className="w-100 vh-100 p-5">
      <Title title={"Post Details"} />

      {isLoading ? (
        <Loading />
      ) : post ? (
        <div className="row vh-100">
          <div className="details col-md-8 mx-auto border rounded my-5 p-4">
            <div className="post mb-5 pb-5 pt-4 border-bottom border-3">
              <div className="d-flex justify-content-between">
                <h3 className="mb-5">{post.title}</h3>
                <div className="dropdown mt-2">
                  <button
                    className="btn border-0 fa fa-ellipsis-h"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  ></button>
                  <ul className="dropdown-menu rounded-4 py-1 px-1">
                    {/* <li>
                            <button
                              className="btn btn-outline-light w-100 text-start border-0 text-black"
                              onClick={() => {
                                setOpenEditModal(true);
                            }}
                            >
                              <i className="fa fa-edit me-2 text-warning"></i>Edit
                            </button>
                          </li> */}

                    <li>
                      <button
                        className="btn btn-outline-light w-100 text-start border-0 text-black"
                        onClick={() => {
                          setOpenDeleteModal(true);
                        }}
                      >
                        <i className="fa fa-trash me-2 text-danger"></i>Delete
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <p className="">{post.content}</p>
            </div>

            <div className="comments">
              <h3 className="mb-5">Comments</h3>
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div>
                    <h5 className="ms-3 mb-3">
                      <i className="fa fa-user-circle me-3"></i>
                      {comment.name}
                    </h5>
                    <div
                      className={`${styles.comment} w-75 p-3 mb-4 rounded-4 border ms-5`}
                    >
                      <p>{comment.content}</p>
                    </div>
                  </div>
                ))
              ) : (
                <NoData />
              )}
            </div>
          </div>
        </div>
      ) : (
        <NoData />
      )}
      {openDeleteModal && (
        <DeleteModal
          closeDeleteModal={closeModal}
          itemName={"Post"}
          deleteItem={deletePost}
        />
      )}

      {/* {openEditModal && (
        <EditModal closeModal={closeModal} itemName={"Post"} 
        // itemIndex={curruntGroupIndex}
        />
      )} */}
    </div>
  );
}
