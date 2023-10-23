import { useState, useEffect } from "react";
import "./ProfileForm.scss";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "../Button/Button";
import Loading from "../Loading/Loading";

function ProfileForm({ userInformation }) {
  const {firstname, lastname, display_name, username, bio, date_of_birth, email, phone_number, status} = userInformation

  const [formValue, setFormValue] = useState(null);
  
  useEffect(() => {
    if (userInformation) {
      setFormValue({ ...userInformation });
    }
  },[userInformation])

  const getMaxDate = () => {
    const today = new Date();
    const eighteenYearsAgo = new Date(
      today.getFullYear() - 13,
      today.getMonth(),
      today.getDate()
    );
    return eighteenYearsAgo.toISOString().split("T")[0];
  };

  if (!formValue) {
    return <Loading/>
  }

  const handleChange = e => {
    formValue.firstname = e.target.value; 
    setFormValue(formValue);
  }
  return (
    <section>
      <Card className="profile">
        <article className="profile__form-div">
          <h3 className="profile__title">Profile</h3>
          <form>
            <div className="profile__avatar-div">
              <label htmlFor="avatar">Profile pic</label>
              <input type="file" name="avatar" id="avatar" />
            </div>
            <div>
              <input type="text" name="firstname" id="firstname" onChange={handleChange} value={formValue.firstname}/>
              <input type="text" name="lastname" id="lastname" value={formValue.lastname}/>
            </div>
            <div>
              <input type="text" name="display_name" id="display_name" value={formValue.display_name}/>
            </div>
            <div>
              <input type="email" name="email " id="email" value={formValue.email}/>
              <input type="tel" name="phone_number" id="phone" value={formValue.phone_number}/>
            </div>
            <p>{ formValue.username }</p>
            <div>
              <input
                type="date"
                name="date_of_birth "
                id="date_of_birth"
                max={getMaxDate()}
                value={formValue.date_of_birth}
              />
            </div>
            <textarea name="bio" id="bio" cols="30" rows="10"  value={formValue.bio}></textarea>

            <Button message={"Save"} />
          </form>
        </article>
      </Card>

      <Card className="profile">
        <article className="profile__form-div">
          <h3 className="profile__title">Change password</h3>
          <form>
            <div>
              <input type="password" name="password" id="password" />
            </div>
            <div>
              <input type="confirm_pwd" name="confirm_pwd" id="confirm_pwd" />
            </div>

            <Button message={"Change password"} />
          </form>
        </article>
      </Card>
    </section>
  );
}

export default ProfileForm;
