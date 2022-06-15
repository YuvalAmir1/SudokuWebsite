using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;

namespace SudokuWebsite
{
    public partial class NavigationBar : System.Web.UI.MasterPage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            AddTab("בית", "Home.aspx", home);
            AddTab("יצירת משתמש", "SignUp.aspx", signUp);
            AddTab("התחברות", "SignIn.aspx", signIn);
            AddTab("לוחות", "BoardsGallery.aspx", boards);
            AddTab("פרופיל", "UserPage.aspx", userPage);
            AddTab("משתמשים", "Users.aspx", users);
            AddTab("סטטיסטיקות", "Statistics.aspx", statistics);

            string isAdmin = (bool)Session["isAdmin"] ? "admin" : "notAdmin";
            userName.Attributes.Add("class", isAdmin);
            userName.InnerText = (bool)Session["signedIn"] ? (string)Session["username"] : "אורח";

            if ((bool)Session["signedIn"])
            {
                signIn.Visible = false;
                signUp.Visible = false;
                signOut.Visible = true;
                userPage.Visible = true;
                userName.Attributes.Add("href", "Pages/UserPage.aspx");
            }
            else
            {
                signIn.Visible = true;
                signUp.Visible = true;
                signOut.Visible = false;
                userPage.Visible = false;
                userName.Attributes.Remove("href");
            }

            if ((bool)Session["isAdmin"])
            {
                users.Visible = true;
                statistics.Visible = true;
            }
            else
            {
                users.Visible = false;
                statistics.Visible = false;
            }

            void AddTab(string pageName, string pageLink, HtmlContainerControl htmlContainer)
            {
                string isActive = (string)Session["activePage"] == pageName ? "active" : "notActive";
                htmlContainer.InnerHtml = $"<a class={isActive} href='{pageLink}'> {pageName} </a>";
            }
        }
        public void SignOutFunction(Object sender, EventArgs e)
        {
            Session["signedIn"] = false;
            Session["isAdmin"] = false;
            Application["currentLoggedInCount"] = (int)Application["currentLoggedInCount"] - 1;
            Application["currentGuestsCount"] = (int)Application["currentGuestsCount"] + 1;            
            Response.Redirect("SignIn.aspx");
        }
    }
}