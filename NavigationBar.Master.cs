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
            AddTab("Home", "Home.aspx", home);
            AddTab("Sign In", "SignIn.aspx", signIn);
            AddTab("Boards", "BoardsGallery.aspx", boards);
            AddTab("User Page", "UserPage.aspx", userPage);
            AddTab("Users", "Users.aspx", users);
            AddTab("Statistics", "Stats.aspx", stats);

            string isAdmin = (bool)Session["isAdmin"] ? "admin" : "notAdmin";
            if ((bool)Session["signedIn"]) userName.InnerHtml = $"<a class='{isAdmin}' href='UserPage.aspx'> {Session["userName"]} </a>";
            else userName.InnerHtml = $"<a class='{isAdmin}'> Guest </a>";

            if ((bool)Session["signedIn"])
            {
                signIn.Visible = false;
                signOut.Visible = true;
                userPage.Visible = true;
            }
            else
            {
                signIn.Visible = true;
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