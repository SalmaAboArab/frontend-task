import React, { useEffect } from 'react'
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { allGroupsData } from "../../../GroupsList/GroupsData";
import { toast } from "react-toastify";

export default function EditModal({closeModal, itemName, itemIndex}) {
    const curruntItem= (itemName=='Group'? allGroupsData[itemIndex] : '')
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
      } = useForm();
    
      const onSubmitEdit = async (data) => {
        const newItem={
            id:curruntItem.id,
            name:data.name,
            description:data.description,
            creationDate:curruntItem.creationDate
        }
        if(itemName=='Group') allGroupsData[itemIndex]=(newItem);
        toast.success(`${itemName} Edited Successfuly`);
        closeModal();
      };

      useEffect(() => {
        setValue('name', curruntItem.name)
        setValue('description', curruntItem.description)
      }, [])
      

  return (
    <Modal show={true} onHide={closeModal} centered={true}>
      <Modal.Header closeButton>
        <Modal.Title>Edit {itemName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form
          onSubmit={handleSubmit(onSubmitEdit)}
        >
          <div className="input-group flex-column flex-nowrap my-4 px-2">
            <div className="my-1 inputdetails">
            <label className='mb-2 fw-semibold text-warning'>Name</label>
              <input
                type="text"
                className=" form-control border-0 bg-light "
                placeholder={`${itemName} Name`}
                {...register('name',
                {required:"Name is required"},)}
              />
            </div>
            {errors.name&&<p className='text-danger ps-1'>{errors.name.message}</p>}

            <div className=" mb-1 mt-3 inputdetails">
                <label className='mb-2 fw-semibold text-warning'>Description</label>
              <textarea
                type="text"
                className=" form-control border-0 bg-light pb-5 pageOverflow"
                placeholder={`${itemName} Description`}
                {...register('description',
                {required:"Description is required"},)}
              />
            </div>
            {errors.description&&<p className='text-danger ps-1'>{errors.description.message}</p>}
          </div>
          <div className="text-end">
              <button className="btn btn-warning">Edit</button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  )
}