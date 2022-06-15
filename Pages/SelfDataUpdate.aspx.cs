using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SudokuWebsite.Pages
{
    public partial class SelfDataUpdate : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!(bool)Session["signedIn"])
                Response.Redirect("Home.aspx");

            if (!IsPostBack)
            {
                DataRow User = SqlHelper.FindUser((string)Session["username"]);
                username.Value = (string)User["username"];
                password.Value = (string)User["Password"];
                firstName.Value = (string)User["FirstName"];
                lastName.Value = (string)User["LastName"];
                gender.Value = (string)User["Gender"];
                string sBirthDate = (string)User["BirthDate"];
                birthDate.Value = sBirthDate.Substring(6, 4) + "-" + sBirthDate.Substring(3, 2) + "-" + sBirthDate.Substring(0, 2);
                email.Value = (string)User["Email"];
                string sPhone = (string)User["PhoneNumber"];
                phone.Value = sPhone[2].ToString() + sPhone.Substring(4, 7);
                city.Value = (string)User["City"];
            }

            if (IsPostBack)
            {
                if (SqlHelper.UsernameCheck(username.Value))
                {
                    errorText.InnerText = "משתמש כבר קים.";
                }
                else
                {
                    string sUsername = username.Value;
                    string sPassword = password.Value;
                    string sFirstName = firstName.Value;
                    string sLastName = lastName.Value;
                    string sGender = gender.Value == "other" ? null : gender.Value;
                    string sBirthDate = birthDate.Value;
                    if (sBirthDate != null && sBirthDate != "")
                        sBirthDate = $"{sBirthDate.Substring(8, 2)}/{sBirthDate.Substring(5, 2)}/{sBirthDate.Substring(0, 4)}";
                    string sEmail = email.Value;
                    string sPhone = $"05{phone.Value[0]}-{phone.Value.Substring(1, 7)}";
                    string sCity = city.Value;
                    string[] arr = new string[] { sUsername, sPassword, sFirstName, sLastName, sGender, sBirthDate, sEmail, sPhone, sCity };
                    SqlHelper.UpdateUser((string)Session["username"], arr, false); ;
                    Session["username"] = sUsername;
                }
            }
        }

        public void ResetData(object sender, EventArgs e)
        {
            DataRow User = SqlHelper.FindUser((string)Session["username"]);
            username.Value = (string)User["UserName"];
            password.Value = (string)User["Password"];
            firstName.Value = (string)User["FirstName"];
            lastName.Value = (string)User["LastName"];
            gender.Value = (string)User["Gender"];
            string sBirthDate = (string)User["BirthDate"];
            birthDate.Value = sBirthDate.Substring(6, 4) + "-" + sBirthDate.Substring(3, 2) + "-" + sBirthDate.Substring(0, 2);
            email.Value = (string)User["Email"];
            string sPhone = (string)User["PhoneNumber"];
            phone.Value = sPhone[2].ToString() + sPhone.Substring(4, 7);
            city.Value = (string)User["City"];
        }
    }
}
