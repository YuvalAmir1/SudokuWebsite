using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SudokuWebsite.Pages
{
    public partial class SignUp : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Session["activePage"] = "יצירת משתמש";

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
                    string sGender = gender.Value == "other" ? "" : gender.Value;
                    string sBirthDate = birthDate.Value;
                    if (sBirthDate != null && sBirthDate != "")
                        sBirthDate = $"{sBirthDate.Substring(8, 2)}/{sBirthDate.Substring(5, 2)}/{sBirthDate.Substring(0, 4)}";
                    string sEmail = email.Value;
                    string sPhone = $"05{phone.Value[0]}-{phone.Value.Substring(1, 7)}";
                    string sCity = city.Value;
                    string[] columns = new string[] { "UserName", "Password", "BirthDate", "Email", "PhoneNumber" };
                    string[] nColumns = new string[] { "FirstName", "LastName", "Gender", "City" };
                    string[] values = new string[] { sUsername, sPassword, sBirthDate, sEmail, sPhone };
                    string[] nValues = new string[] { sFirstName, sLastName, sGender, sCity };

                    SqlHelper.Insert(false, columns, nColumns, values, nValues);
                    Session["isAdmin"] = false;
                    Session["signedIn"] = true;
                    Session["username"] = sUsername;
                    Application["currentGuestsCount"] = (int)Application["currentGuestsCount"] - 1;
                    Application["currentLoggedInCount"] = (int)Application["currentLoggedInCount"] + 1;
                    Response.Redirect("Home.aspx");
                }
            }
        }
    }
}