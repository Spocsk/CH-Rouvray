import React, { useState } from "react";
import { useForm } from "react-hook-form";
import './style.css'
import { postNews } from "../../../../Utils/Api/News/NewsApiRequests";
import { getUser } from "../../../../Utils/Common";
import useModal from "../../../Others/Modal/useModal";

export default function NewpostForm() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState("");
  const { toggle } = useModal();
  const user = getUser();


  const onSubmit = async data => {
    try {
      Object.assign(data, {author: `/api/users/${user.id}`});
      await postNews(data)
      .then(() => {
          (() => {toggle()})()
      })
    }
    catch(err) {
      setError(err.response.data)
    }
  }

  const closeModal = () => {
    toggle()
  }
   
  return (
    <>
      <button onClick={() => {closeModal()}}>Toggle</button>
      <form onSubmit={handleSubmit(onSubmit)}>

        <input className="txtBox" {...register("title", { required: true})} placeholder='Ajouter titre' />
        {errors?.title?.type === "required" && <p className="fieldRequired">Le champ titre est requis !</p>}

        <textarea className="txtBox" {...register("description", { required: true})} placeholder='Ajouter description'></textarea>
        {errors?.description?.type === "required" && <p className="fieldRequired">Le champ description est requis !</p>}
        
        {error ? <p className="error">{error}</p> : null}
        <input className="submitBtn" type="submit" value='Ajouter'></input>
      </form>
    </>
  );
}