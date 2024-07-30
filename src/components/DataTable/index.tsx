import React from "react";
import styled from "styled-components";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  & th {
    text-align: left;
    padding: 1rem;
  }
`
export const Td = styled.td<{$image_url?:string}>`
  height: 3rem;
  padding: 1rem;
  &[data-type=text], &:not([data-type]){
    text-align: left;
  }
  &[data-type=id] {
    text-align: center;
  }
  &[data-type=number] {
    text-align: right;
  }
  &[data-type=image] {
    background-image: url(${props=>props.$image_url});
    background-repeat: no-repeat;
    background-position: left;
    background-size: contain;
    visibility: visible;
  }
  & svg{
    cursor: pointer;
    margin: .1rem;
  }
  & svg:hover {
    background-color: #ffffff;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 1rem;
  }
`
export const Edit =(props:React.SVGProps<SVGSVGElement>)=> {
  return (
    <svg id="edit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}><g fill="none" stroke="yellow" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M19.09 14.441v4.44a2.37 2.37 0 0 1-2.369 2.369H5.12a2.37 2.37 0 0 1-2.369-2.383V7.279a2.356 2.356 0 0 1 2.37-2.37H9.56"/><path d="M6.835 15.803v-2.165c.002-.357.144-.7.395-.953l9.532-9.532a1.362 1.362 0 0 1 1.934 0l2.151 2.151a1.36 1.36 0 0 1 0 1.934l-9.532 9.532a1.361 1.361 0 0 1-.953.395H8.197a1.362 1.362 0 0 1-1.362-1.362M19.09 8.995l-4.085-4.086"/></g></svg>
  )
}
const Trash = (props:React.SVGProps<SVGSVGElement>)=>{
  return (
    <svg id="delete" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}><g fill="red"><path fill-rule="evenodd" d="M17 5V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v1H4a1 1 0 0 0 0 2h1v11a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V7h1a1 1 0 1 0 0-2zm-2-1H9v1h6zm2 3H7v11a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1z" clip-rule="evenodd"/><path d="M9 9h2v8H9zm4 0h2v8h-2z"/></g></svg>
  )
}
interface IDataTableProps<T> {
  headers: string[];
  HandleEdit?: (item: T)=>Promise<void> | void;
  HandleDelete?: (item: T)=>Promise<void> | void;
  data: T[];
  children?: (item: T)=>React.ReactElement | React.ReactElement[];
}

export const DataTable = <T,>({headers,data,children,HandleDelete,HandleEdit}:IDataTableProps<T>)=>{
  const options = !!HandleDelete || !!HandleEdit;
  return (
      <Table>
        <thead>
          <tr>
            {headers.map((head,i)=><th key={i}>{head}</th>)}
            { options && <th>actions</th>}
          </tr>
        </thead>
        <tbody>
          {children && data.map((item,i)=>(
            <tr key={i}>
              {children(item)}
              {options && <Td>{HandleEdit && <Edit onClick={()=>HandleEdit(item)}  />}{HandleDelete && <Trash onClick={()=>HandleDelete(item)} />}</Td>}
            </tr>
          ))}
        </tbody>
        <style>{`
          tr:nth-child(even){background-color: #f2f2f2;}
          th {
            padding-top: 12px;
            padding-bottom: 12px;
            text-align: left;
            background-color: var(--primary);
          }
        `}
        </style>
      </Table>
  )
}
DataTable.Td = Td;
