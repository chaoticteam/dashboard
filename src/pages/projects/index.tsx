import { DataTable, Modal } from "@/components";
import { useProject } from "@/hooks";
import { IProject } from "@/models";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import styled from "styled-components";

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
export default function ProjectsPage(){
  const [projectSelected,SetSelection] = useState<IProject>();
  const router = useRouter();
  const {
    projects,
    DeleteProject,
  } = useProject();
  const HandleEdit = useCallback(({id}: IProject)=>{
    router.push(`projects/edit/?id=${id}`)
  },[router]);
  const HandleDelete = useCallback((project:IProject)=>{
    SetSelection(project);
  },[SetSelection]);
  const HandleDeleteOk = useCallback(async()=>{
    if (!projectSelected ) return;
    await DeleteProject(projectSelected);
    SetSelection(undefined);
  },[projectSelected])
  return (<div>
    <Label>
      <Link href="projects/create/">Create</Link>
    </Label>
    <DataTable<IProject>
     headers={["title","description","image","url","dateStart","dateEnd"]}
     data={projects}
     HandleEdit={HandleEdit}
     HandleDelete={HandleDelete}
     >
      {project=>(
        <>
          <DataTable.Td >{project.title}</DataTable.Td>
          <DataTable.Td >{project.description}</DataTable.Td>
          <DataTable.Td data-type="image" $image_url={project.image} />
          <DataTable.Td >{project.url}</DataTable.Td>
          <DataTable.Td >{project.startDate.toString()}</DataTable.Td>
          <DataTable.Td >{project.endDate?.toString()}</DataTable.Td>
        </>
      )}
    </DataTable>
    <Modal title="are you sure?" show={!!projectSelected} >
      <>
      <div>
        you going to delete the course {projectSelected?.title}
      </div>
      <Modal.Footer>
        <input type="button" value="ok" onClick={HandleDeleteOk} />
        <input type="button" value="close" onClick={()=>SetSelection(undefined)} />
      </Modal.Footer>
      </>
    </Modal>
  </div>)
}

