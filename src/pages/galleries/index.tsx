import { Modal, Trash } from "@/components";
import { useGallery } from "@/hooks";
import Form from "form-with-state";
import React, { useCallback, useState } from "react";
import styled from "styled-components";

export default function GalleriesPage(){
  const {
    images,
    CreateGallery,
    DeleteGallery,
  } = useGallery();
  const [open,setOpen] = useState(false);

  const HandleOnSubmit = useCallback(async(data: any)=>{
    await CreateGallery(data);
    setOpen(!open);
  },[])

  return (<div>
    <Container>
      <Item
        data-type="add"
        $image="https://api.iconify.design/uil:plus.svg"
        onClick={()=>setOpen(true)}
        />
      {images.map(({id,image})=><Item key={id} $image={image}>{id}<Span onClick={()=>DeleteGallery(id)}><Trash /></Span></Item>)}
    </Container>
    <Modal title="Add image to gallery" show={open} onClose={()=>setOpen(!open)}>
      <FormContainer>
        <Form onSubmit={HandleOnSubmit}>
          <Form.TextField name="image" />
          <Form.Submit name="send" />
        </Form>
      </FormContainer>
    </Modal>
  </div>)
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: .5rem;
  width: 100%;
  `;
const Item = styled.div<{$image:string}>`
  position: relative;
  --shadow-color: 286deg 36% 48%;
  --shadow-elevation-low:
    0.3px 0.5px 0.9px hsl(var(--shadow-color) / 0),
    0.6px 1.1px 1.9px hsl(var(--shadow-color) / 0.34),
    1.2px 2.5px 4.2px hsl(var(--shadow-color) / 0.68);
  box-shadow: var(--shadow-elevation-low);
  background-image: url(${props=>props.$image});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 20rem;
  height: 20rem;

  &[data-type=add]{
    cursor: pointer;
  }
`;
const Span = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  margin: .5rem 0;
  color: red;
  cursor: pointer;
`;
const FormContainer = styled.div`
 form {
  display: grid;
  grid-template-areas:
    "image image image"
    ". . send";
  gap: 1rem;
 }
`;
