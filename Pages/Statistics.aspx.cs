using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SudokuWebsite.Pages
{
    public partial class Statistics : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!(bool)Session["signedIn"] || !(bool)Session["isAdmin"])
            {
                Response.Redirect("SignIn.aspx");
            }
            Session["activePage"] = "סטטיסטיקות";
            currentVisitorsCount.InnerText = ((int)Application["currentVisitorsCount"]).ToString();
            currentLoggedInCount.InnerText = ((int)Application["currentLoggedInCount"]).ToString();
            currentGuestsCount.InnerText = ((int)Application["currentGuestsCount"]).ToString();
        }
    }
}