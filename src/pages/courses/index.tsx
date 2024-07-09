import React, { useCallback, useState } from "react";
import { DataTable } from "@/components";
import { useCourse } from "@/hooks";
import { ICourse } from "@/models";
import { Modal } from "@/components/Modal";
import { useRouter } from "next/router";
import Form from "form-with-state";
import styled from "styled-components";
import Link from "next/link";

interface ModelUse {
  item: ICourse;
  type: "edit" | "delete"
}

const FormContainer = styled.div`
  form {
    display: grid;
    grid-template-areas:
      "name name name"
      "image image image"
      "ok close .";
    gap: 1rem;
  }
  input[type=submit],input[type=button]{
    display: flex;
    border: none;
    color: white;
    padding: 16px 32px;
    text-decoration: none;
    margin: 4px 2px;
    cursor: pointer;
  }
  input[type=submit] {
    grid-area: ok;
    background-color: #04AA6D;
  }
  input[type=button] {
    grid-area: close;
    background-color: #505050;
  }
`;
const Label = styled.label`
  display: flex;
  justify-content: right;
  a {
    display: flex;
    border: none;
    color: white;
    padding: 16px 32px;
    text-decoration: none;
    margin: 4px 2px;
    cursor: pointer;
    background-color: var(--secondary);
    width: fit-content;
  }
`

export default function CoursePage(){
  const router = useRouter();
  const {
    courses,
    UpdateCourse,
    DeleteCourse,
  } = useCourse();
  const [courseSelected,SetSelection] = useState<ModelUse>();

  const HandleEdit = useCallback((course: ICourse)=>{
    SetSelection({item: course,type:"edit"})
  },[])
  const HandleDelete = useCallback((course: ICourse)=>{
    SetSelection({item: course,type:"delete"})
  },[])

  const HandleEditOK = useCallback(async(data: any,)=>{
    courseSelected && await UpdateCourse(data)
    SetSelection(undefined);
  },[router,courseSelected,SetSelection,UpdateCourse])
  const HandleDeleteOK = useCallback(async()=>{
    courseSelected && await DeleteCourse(courseSelected.item);
    SetSelection(undefined);
  },[router,courseSelected,SetSelection,DeleteCourse])
  return (<div>
    <Label>
      <Link href="courses/create/">Create</Link>
    </Label>
    <DataTable<ICourse>
      headers={["name","image"]}
      data={courses}
      HandleDelete={HandleDelete}
      HandleEdit={HandleEdit}
      >
      {course=>(
        <>
        <DataTable.Td>{course.name}</DataTable.Td>
        <DataTable.Td data-type="image" $image_url={course.image} />
        </>
      )}
    </DataTable>
    <Modal title={courseSelected?.type=="edit"?"Edit":"are you sure?"} show={!!courseSelected} onClose={()=>SetSelection(undefined)}>
      <>
      {courseSelected?.type=="edit" && <FormContainer>
        <Form initialState={courseSelected.item} persistData onSubmit={HandleEditOK}>
          <Form.TextField name="name" />
          <Form.TextField name="image" />
          <input type="submit" value="send" />
          <input type="button" value="close" onClick={()=>SetSelection(undefined)} />
        </Form>
      </FormContainer>}
      {courseSelected?.type=="delete" && <div>
        <div>
          you going to delete the course {courseSelected?.item?.name}
        </div>
        <Modal.Footer>
          <input type="button" value="ok" onClick={HandleDeleteOK}/>
          <input type="button" value="close" onClick={()=>SetSelection(undefined)} />
        </Modal.Footer>
      </div>}
      </>
    </Modal>
  </div>)
}

