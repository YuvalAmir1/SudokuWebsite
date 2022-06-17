using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SudokuWebsite.Pages
{
    public partial class BoardSolving : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!(bool)Session["signedIn"])
                saveButton.Visible = false;
        }

        public void SaveBoard(object sender, EventArgs e)
        {
            string boardData = HiddenField.Value;
            SqlHelper.SaveBoard((string)Session["username"], boardData);
            saveButton.Visible = false;
        }
    }
}