using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SudokuWebsite.Pages
{
    public partial class BoardsGallary : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Session["activePage"] = "לוחות";
        }
    }
}