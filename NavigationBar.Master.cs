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
            AddTab("משתמש", "UserPage.aspx", userPage);
            AddTab("משתמשים", "Users.aspx", users);
            AddTab("סטטיסטיקות", "Stats.aspx", stats);

            string isAdmin = (bool)Session["isAdmin"] ? "admin" : "notAdmin";
            if ((bool)Session["signedIn"]) userName.InnerHtml = $"<a class='{isAdmin}' href='UserPage.aspx'> {Session["userName"]} </a>";
            else userName.InnerHtml = $"<a class='{isAdmin}'> אורח </a>";

            if ((bool)Session["signedIn"])
            {
                signIn.Visible = false;
                signUp.Visible = false;
                signOut.Visible = true;
                userPage.Visible = true;
            }
            else
            {
                signIn.Visible = true;
                signUp.Visible = true;
                signOut.Visible = false;
                userPage.Visible = false;
            }

            if ((bool)Session["isAdmin"])
            {
                users.Visible = true;
                stats.Visible = true;
            }
            else
            {
                users.Visible = false;
                stats.Visible = false;
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

            // TO DO:
            // 1. decrease the total count of logged in users
            // 2. increase the total count of guests

            Response.Redirect("SignIn.aspx");
        }
    }
}