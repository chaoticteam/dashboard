import { useProject } from "@/hooks";
import Form from "form-with-state";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useCallback, useEffect } from "react";
import styled from "styled-components";

export const EditPage = ()=>{
  const {
    projects,
    EditProject,
  } = useProject();

  const params = useSearchParams();
  const router = useRouter();

  const id = parseInt(params.get("id")||"0");
  const project = projects.find(item=>item.id==id)

  const HandleSubmit = useCallback(async(data:any,)=>{
    await EditProject(id,data)
  },[])

  useEffect(()=>{
    if (router.isReady && !!projects.length && !project) router.push("/404")
  },[projects,router.isReady]);

  if (!project) return <div>not found!!!</div>;
  return <Content>
    <Form initialState={project} persistData onSubmit={HandleSubmit}>
      <Form.TextField name="title" />
      <Form.TextArea name="description" />
      <Form.TextField name="image" />
      <Form.TextField name="url" />
      <Form.DatePicker name="dateStart" />
      <Form.DatePicker name="dateEnd" />
      <Form.Submit name="send" />
      <input type="button" value="back" onClick={()=>router.back()}/>
    </Form>
  </Content>
}

const Content = styled.div`
  form {
    display: grid;
    gap: 1rem;
    grid-template-areas:
      "title title"
      "description description"
      "description description"
      "image url"
      "dateStart dateEnd"
      "send back";
  }
  form input[type="button"] {
    grid-area: back;
    background-color: #505050;
    position: relative;
    display: flex;
    border: none;
    color: white;
    padding: 1rem 0;
    text-decoration: none;
    cursor: pointer;
    border-radius: .5rem;
  }
`

export default EditPage;
