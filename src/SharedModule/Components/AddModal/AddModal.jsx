import React from "react";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { allGroupsData } from "../../../GroupsList/GroupsData";
import { toast } from "react-toastify";

export default function AddModal({closeModal, itemName, addItem}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitAdd = (data) => {
    addItem(data);
    toast.success(`${itemName} Added Successfuly`);
    closeModal();
  };

  return (
    <Modal show={true} onHide={closeModal} centered={true}>
      <Modal.Header closeButton>
        <Modal.Title>Add {itemName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form
          onSubmit={handleSubmit(onSubmitAdd)}
        >
          <div className="input-group flex-column flex-nowrap my-4 px-2">
            <div className="my-1 inputdetails">
            <label className='mb-2 fw-semibold text-success'>{itemName=='Group'? 'Name' : 'Title'}</label>
              <input
                type="text"
                className=" form-control border-0 bg-light "
                placeholder={`${itemName} ${itemName=='Group'? 'Name' : 'Title'}`}
                {...register('name',
                {required:"Name is required"},)}
              />
            </div>
            {errors.name&&<p className='text-danger ps-1'>{errors.name.message}</p>}

            <div className="mb-1 mt-3 inputdetails">
            <label className='mb-2 fw-semibold text-success'>{itemName=='Group'? 'Description' : 'Content'}</label>
              <textarea
                type="text"
                className=" form-control border-0 bg-light pageOverflow pb-5"
                placeholder={`${itemName} ${itemName=='Group'? 'Description' : 'Content'} `}
                {...register('description',
                {required:"Description is required"},)}
              />
            </div>
            {errors.description&&<p className='text-danger ps-1'>{errors.description.message}</p>}
          </div>
          <div className="text-end">
              <button className="btn btn-success">Save</button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
