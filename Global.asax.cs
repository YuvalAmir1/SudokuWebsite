using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.SessionState;

namespace SudokuWebsite
{
    public class Global : System.Web.HttpApplication
    {
        protected void Application_Start(object sender, EventArgs e)
        {
            Application["currentVisitorsCount"] = 0;
            Application["currentLoggedInCount"] = 0;
            Application["currentGuestsCount"] = 0;
        }

        protected void Session_Start(object sender, EventArgs e)
        {
            Session["isAdmin"] = false;
            Session["signedIn"] = false;
            Session["userName"] = null;
            Application["currentVisitorsCount"] = (int)Application["currentVisitorsCount"] + 1;
            Application["currentGuestsCount"] = (int)Application["currentGuestsCount"] + 1;
        }

        protected void Session_End(object sender, EventArgs e)
        {
            if ((bool)Session["signedIn"]) Application["currentLoggedInCount"] = (int)Application["currentLoggedInCount"] - 1;
            else Application["currentGuestsCount"] = (int)Application["currentGuestsCount"] - 1;
            Application["currentVisitorsCount"] = (int)Application["currentVisitorsCount"] - 1;
        }

        protected void Application_End(object sender, EventArgs e)
        {
            Session.Clear();
            Session.Abandon();
        }
    }
}