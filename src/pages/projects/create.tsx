import { useCourse, useProject } from "@/hooks";
import Form from "form-with-state";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";


const FormContainer = styled.div`
  form {
    display: grid;
    grid-template-areas:
      "title title title ."
      "description description description description"
      "image image url url"
      "startDate startDate endDate endDate"
      "send back . .";
    gap: 1rem;
  }
  input[type=submit],input[type=button]{
    position: relative;
    display: flex;
    border: none;
    color: white;
    padding: 1rem 0;
    text-decoration: none;
    cursor: pointer;
  }
  input[type=submit] {
    grid-area: send;
    background-color: var(--primary);
  }
  input[type=button] {
    grid-area: back;
    background-color: #505050;
  }
`;
export default function EditPage (){
  const router = useRouter();
  const { CreateProject } = useProject();
  return (
    <div>
      <FormContainer>
        <Form onSubmit={CreateProject} >
          <Form.TextField name="title" />
          <Form.TextArea name="description" />
          <Form.TextField name="image" />
          <Form.TextField name="url" />
          <Form.DatePicker name="startDate" />
          <Form.DatePicker name="endDate" />
          <input type="submit" value="send" />
          <input type="button" value="back" onClick={()=>router.back()} />
        </Form>
      </FormContainer>
    </div>
  )
}
