import React, { useCallback } from "react";
import { Trash, Whatsapp } from "@/components";
import { useAuth } from "@/hooks";
import { useProfile } from "@/hooks/useProfile";
import { Dictionary } from "@/models/utils";
import Form from "form-with-state";

export default function Profile(){
  const {state:{user}}= useAuth();
  const {partialUpdate,addTelephone,removeTelephone} =useProfile();
  const handleAddTelephone =useCallback(async(data:any,_:any)=>{
    addTelephone(data);
  },[addTelephone])
  const HandleSubmit = useCallback(async (data:Dictionary)=>{
    partialUpdate(data);
  },[partialUpdate])
  let Image = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path fill="currentColor" d="M172 120a44 44 0 1 1-44-44a44.05 44.05 0 0 1 44 44m60 8A104 104 0 1 1 128 24a104.11 104.11 0 0 1 104 104m-16 0a88.09 88.09 0 0 0-91.47-87.93C77.43 41.89 39.87 81.12 40 128.25a87.65 87.65 0 0 0 22.24 58.16A79.71 79.71 0 0 1 84 165.1a4 4 0 0 1 4.83.32a59.83 59.83 0 0 0 78.28 0a4 4 0 0 1 4.83-.32a79.71 79.71 0 0 1 21.79 21.31A87.62 87.62 0 0 0 216 128"/></svg>
  if (!!user?.profile.photo){
    Image = <div style={{
      backgroundImage: `url(${user.profile.photo})`,
      backgroundSize:"cover",
      backgroundRepeat:"no-repeat",
      backgroundPosition: "top center",
      borderRadius:"50%",
      padding:"1rem",
      aspectRatio:"1/1",
    }}
    />
  }
  return(
    <div className="container">
      <div className="avatar">
        <div style={{padding:"1rem"}}>
          {Image}
        </div>
        <div>
          Upload new avatar
          <Form className='form-photo' initialState={user?.profile} onSubmit={HandleSubmit} persistData>
            <Form.TextField label="photo" required name="photo" />
            <Form.Submit style={{width:"5rem"}} name='save'/>
          </Form>
        </div>
      </div>
      <div>
        <h2>Profile Data</h2>
        <Form className='form-profile' initialState={user?.profile} persistData onSubmit={HandleSubmit}>
          <Form.TextField label="Firs Name" name="firstName"  />
          <Form.TextField label="Last Name" name="lastName"  />
          <Form.TextArea label="Biography" name="bio"  />
          <Form.Submit style={{width:"5rem"}} name='save'/>
        </Form>
      </div>
      <div>
        <h2>Telephones</h2>
        <div style={{display:"grid",gridTemplateColumns:".5fr 1fr",alignItems:"start"}}>
          <Form className='form-telephones' initialState={{}} onSubmit={handleAddTelephone}>
            <Form.TextField required label="Country code" name="countryCode" />
            <Form.TextField required label="Telephone" name="phoneNumber" />
            <Form.CheckBox  name="whatsapp" />
           <Form.Submit style={{width:"5rem"}} name='save'/>
          </Form>
          <table>
              <tr>
                <th>Telephones</th>
                <th>Apps</th>
                <th>actions</th>
              </tr>
            {user?.profile.telephone.map(({id,countryCode,phoneNumber,whatsapp})=>(
              <tr key={id}>
                <td>+{countryCode} {phoneNumber}</td>
                <td>{whatsapp && <Whatsapp />}</td>
                <td><a onClick={()=>removeTelephone(id)}><Trash /></a></td>
              </tr>
            ))}
          </table>
        </div>
      </div>
      <div>
        <h2>Social Media</h2>
        <Form className='form-social-media' initialState={user?.profile} persistData onSubmit={HandleSubmit}>
          <Form.TextField label="Linkedin" name="linkedin"  />
          <Form.TextField label="GitHub" name="github"  />
          <Form.TextField label="GitLab" name="gitlab"  />
          <Form.TextField label="Discord" name="discord"  />
          <Form.TextField label="Twitter" name="twitter"  />
          <Form.TextField label="Facebook" name="facebook"  />
          <Form.TextField label="Instagram" name="instagram"  />
          <Form.TextField label="Youtube" name="youtube"  />
          <Form.TextField label="Web Site" name="website"  />
          <Form.Submit style={{width:"5rem"}} name='save'/>
        </Form>
      </div>
      <div>
      <h2>Others</h2>
        <Form className='form-others' initialState={user?.profile} persistData onSubmit={HandleSubmit}>
          <Form.TextField label="specialties" name="specialties"  />
          <Form.TextField label="skills" name="skills"  />
          <Form.TextField label="Languages" name="languages"  />
          <Form.TextField label="Hobbies" name="hobbies"  />
          <Form.Submit style={{width:"5rem"}} name='save'/>
        </Form>
      </div>
      <style>{`
        .container{

        }
        .avatar{
          display:grid;
          grid-template-columns:10rem 1fr;
        }
        .container > div{
          padding: 2rem;
          border-bottom: solid #797575;
        }
        table {
          border-collapse: collapse;
          width: 100%;
        }
        th, td {
          height: fit-content;
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }
        tr:nth-child(even) {background-color: #f2f2f2;}
        .form-photo {
          grid-template-areas:
            "photo photo photo photo photo"
            "save . . . .";
        }
        .form-profile {
          grid-template-areas:
            "firstName fistName lastName lastName"
            "bio bio bio bio"
            "save . . .";
        }
        .form-telephones {
          grid-template-areas:
            "countryCode countryCode countryCode"
            "whatsapp phoneNumber phoneNumber"
            "save . .";
        }
        .form-social-media {
          grid-template-areas:
            "linkedin linkedin linkedin linkedin"
            "github github gitlab gitlab"
            "discord discord twitter twitter"
            "facebook facebook instagram instagram"
            "youtube youtube youtube youtube"
            "website website website website"
            "save . . .";
        }
        .form-others {
          grid-template-areas:
            "specialties skills"
            "languages hobbies"
            "save .";
        }
      `}</style>
    </div>
  )
}
