using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SudokuWebsite.Pages
{
    public partial class UserPage : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!(bool)Session["signedIn"])
                Response.Redirect("Home.aspx");
            else
            {
                Session["activePage"] = "משתמש";

                DataRow User = SqlHelper.FindUser((string)Session["username"]);
                greetings.InnerText = $"שלום {(string)User["FirstName"]}!";
                username.InnerText = (string)User["UserName"];
                password.InnerText = (string)User["Password"];
                firstName.InnerText = (string)User["FirstName"];
                lastName.InnerText = (string)User["LastName"];
                gender.InnerText = (string)User["Gender"];
                birthDate.InnerText = (string)User["BirthDate"];
                email.InnerText = (string)User["Email"];
                phoneNumber.InnerText = (string)User["PhoneNumber"];

                if ((string)User["SavedBoards"] != "")
                    savedBoards.InnerHtml = (string)User["SavedBoards"];
                else
                    savedBoardsLabel.Visible = false;
            }
        }

        public void ClearBoards(object sender, EventArgs e)
        {
            SqlHelper.ClearBoards((string)Session["username"]);
            savedBoards.InnerHtml = "";
        }
    }
}