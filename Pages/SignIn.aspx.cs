using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SudokuWebsite.Pages 
{
    public partial class SignIn : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Session["activePage"] = "התחברות";

            if (IsPostBack)
            {
                DataRow User = SqlHelper.FindUser(username.Value);
                if (User == null || (string)User[3] != password.Value)
                    errorText.InnerText = "המשתמש לא קים.";
                else
                {
                    Session["isAdmin"] = (bool)User["IsAdmin"];
                    Session["signedIn"] = true;
                    Session["userName"] = username.Value;
                    Application["currentGuestsCount"] = (int)Application["currentGuestsCount"] - 1;
                    Application["currentLoggedInCount"] = (int)Application["currentLoggedInCount"] + 1;
                    Response.Redirect("Home.aspx");
                }
            }
        }
    }
}