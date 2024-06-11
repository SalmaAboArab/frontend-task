import React, { useEffect, useState } from "react";
import NoData from "../../../SharedModule/Components/NoData/NoData";
import Loading from "../../../SharedModule/Components/Loading/Loading";
import Filter from "../../../SharedModule/Components/Filter/Filter";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Posts.module.css";
import { Title } from "../../../SharedModule/Components/Title/Title";
import { allGroupsData } from "../../../GroupsList/GroupsData";
import AddModal from "../../../SharedModule/Components/AddModal/AddModal";

export default function PostsList() {
  const navigate = useNavigate();
  const {index} = useParams();
  const [posts, setPosts] = useState([]);
  const [curruntPostIndex,setCurruntPostIndex]=useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const postsNumPerPage = 6;
  const [CurrentPageNum, setCurrentPageNum] = useState(1);
  const NbPages = Math.ceil(posts?.length / postsNumPerPage);
  const startIndex = (CurrentPageNum - 1) * postsNumPerPage;
  const endIndex = startIndex + postsNumPerPage;
  const DataPerPage = posts?.slice(startIndex, endIndex);

  async function getposts(searchValue) {
    if (searchValue) {
      const allPosts = allGroupsData[index].posts.filter((post) =>
        post.title.includes(searchValue)
      );
      setPosts(allPosts);
    } else setPosts(allGroupsData[index].posts);
    setIsLoading(false);
  }

  const addGroup = (data) => {
    const newPost={
      id:Date.now(),
      title:data.name,
      content:data.description,
      comments:[],
      creationDate:`${new Date()}`.slice(0,21)
  }
  allGroupsData[index].posts.push(newPost);
};

  useEffect(() => {
    getposts();
  }, []);

  const [openAddModal, setOpenAddModal] = useState(false);
  const closeModal = () => {
    setOpenAddModal(false);
  };

  return (
    <div className="vh-100 w-100 p-5">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="allPosts">
          <Title title={"All Posts"} />

          <div className="addGroup w-100  d-flex justify-content-end px-5 py-3">
        <button className="btn btn-dark me-4 px-4" 
        onClick={()=>{setOpenAddModal(true)}}
        >Add New Post</button>
      </div>

          <div className="search mb-5">
            <Filter getItems={getposts} />
          </div>
          <div className=" row mb-3 justify-content-center overflow-auto pageOverflow g-0">
            {posts.length > 0 ? (
              DataPerPage.map((post,postindex) => {
                return (
                  <button
                    className={`${styles.post} col-lg-3 col-sm-5 card mt-3 mx-2 p-1 py-4`}
                    onClick={() => navigate(`/post-details/${index}/${postindex}`)}
                  >
                    <div className="card-body row align-items-center mx-auto">
                      <h3 className="card-title">{post.title}</h3>
                    </div>
                  </button>
                );
              })
            ) : (
              <NoData />
            )}

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

                {posts?.slice(0, NbPages).map((post, index) => (
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
        </div>
      )}
      {openAddModal && (
        <AddModal closeModal={closeModal} itemName={"Post"} addItem={addGroup}/>
      )}
    </div>
  );
}
