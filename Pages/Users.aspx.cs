using System;
using System.Data;
using System.Web.UI.WebControls;

namespace SudokuWebsite.Pages
{
    public partial class Users : System.Web.UI.Page
    {

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!(bool)Session["signedIn"] || !(bool)Session["isAdmin"])
            {
                Response.Redirect("SignIn.aspx");
            }

            if (!IsPostBack)
            {
                Session["activePage"] = "משתמשים";
                Session["orderBy"] = "Id";
                Session["ascending"] = true;
                Session["filterTarget"] = "UserName";
                Session["filterLike"] = "";
                Session["Don'tCreate"] = false;
                Reset();
            }
        }

        private void BindGrid()
        {
            string query = $"SELECT IsAdmin, UserName, Password, FirstName, LastName, Gender, BirthDate, Email, PhoneNumber, " +
                $"City FROM Users WHERE {(string)Session["filterTarget"]} LIKE '%{(string)Session["filterLike"]}%' " +
                $"ORDER BY {(string)Session["orderBy"]} {((bool)Session["ascending"] ? "ASC" : "DESC")}";
            DataTable dataTable = SqlHelper.RetriveData(query);
            gridView.DataSource = dataTable;
            gridView.DataBind();

            foreach (GridViewRow row in gridView.Rows)
            {
                foreach (TableCell cell in row.Cells)
                {
                    cell.Attributes.CssStyle["text-align"] = "center";
                }
            }
        }

        protected void UpdateTargetSelected(object sender, EventArgs e)
        {
            string target = targetUpdating.Text;
            DataRow user = SqlHelper.FindUser(target);
            isAdminUpdating.Checked = (bool)user["IsAdmin"];
            usernameUpdating.Text = target;
            passwordUpdating.Text = (string)user["Password"];
            firstNameUpdating.Text = (string)user["FirstName"];
            lastNameUpdating.Text = (string)user["LastName"];
            genderUpdating.Text = (string)user["Gender"];
            birthDateUpdating.Text = (string)user["BirthDate"];
            emailUpdating.Text = (string)user["Email"];
            phoneUpdating.Text = (string)user["PhoneNumber"];
            cityUpdating.Text = (string)user["City"];
            targetUpdating.Items.Remove(new ListItem("", "unselected"));
            cancelUpdateButton.Visible = true;
            confirmUpdateButton.Visible = true;
            updating.Visible = true;
        }

        protected void CancelUpdate(object sender, EventArgs e)
        {
            cancelUpdateButton.Visible = false;
            confirmUpdateButton.Visible = false;
            updating.Visible = false;
            Reset();
        }

        protected void ConfirmUpdate(object sender, EventArgs e)
        {
            if (usernameUpdating.Text == targetUpdating.Text || !SqlHelper.UsernameCheck(usernameUpdating.Text))
            {
                SqlHelper.UpdateUser(targetUpdating.Text, new string[] { usernameUpdating.Text, passwordUpdating.Text, firstNameUpdating.Text, lastNameUpdating.Text,
                    genderUpdating.Text, birthDateUpdating.Text, emailUpdating.Text, phoneUpdating.Text, cityUpdating.Text }, isAdminUpdating.Checked);
                CancelUpdate(sender, e);
            }
        }

        protected void StartCreating(object sender, EventArgs e)
        {
            if ((bool)Session["Don'tCreate"])
                Session["Don'tCreate"] = false;
            else
            {
                startCreatingButton.Visible = false;
                confirmCreatingButton.Visible = true;
                cancelCreatingButton.Visible = true;
                creating.Visible = true;
            }
        }

        protected void CancelCreating(object sender, EventArgs e)
        {
            startCreatingButton.Visible = true;
            confirmCreatingButton.Visible = false;
            cancelCreatingButton.Visible = false;
            creating.Visible = false;
            isAdminCreating.Checked = false;
            usernameCreating.Text = "";
            passwordCreating.Text = "";
            firstNameCreating.Text = "";
            lastNameCreating.Text = "";
            genderCreating.Text = "";
            birthDateCreating.Text = "";
            emailCreating.Text = "";
            phoneCreating.Text = "";
            cityCreating.Text = "";
            Reset();
        }

        protected void ConfirmCreating(object sender, EventArgs e)
        {
            if (!SqlHelper.UsernameCheck(usernameCreating.Text))
            {
                string[] columns = new string[] { "UserName", "Password", "BirthDate", "Email", "PhoneNumber" };
                string[] nColumns = new string[] { "FirstName", "LastName", "Gender", "City" };
                string[] values = new string[] { usernameCreating.Text, passwordCreating.Text, birthDateCreating.Text, emailCreating.Text, phoneCreating.Text };
                string[] nValues = new string[] { firstNameCreating.Text, lastNameCreating.Text, genderCreating.Text, cityCreating.Text };

                SqlHelper.Insert(isAdminCreating.Checked, columns, nColumns, values, nValues);
                CancelCreating(sender, e);
            }
        }

        protected void DeletingTargetSelected(object sender, EventArgs e)
        {
            deleteButton.Visible = true;
        }

        protected void DeleteUser(object sender, EventArgs e)
        {
            string query = $"DELETE FROM Users WHERE UserName = '{targetDeleting.Text}'";
            SqlHelper.ExecuteQuery(query);
            deleteButton.Visible = false;
            Reset();
        }

        protected void Search(object sender, EventArgs e)
        {
            Session["filterTarget"] = searchTarget.SelectedValue;
            Session["filterLike"] = searchTerm.Text;
            BindGrid();
            Session["Don'tCreate"] = true;
        }

        protected void Order(object sender, EventArgs e)
        {
            Session["orderBy"] = orderBy.SelectedValue;
            Session["ascending"] = Convert.ToBoolean(orderDirection.SelectedValue);
            BindGrid();
        }

        private void Reset()
        {
            string query = $"SELECT IsAdmin, UserName, Password, FirstName, LastName, Gender, BirthDate, Email, PhoneNumber, City FROM Users ORDER BY {(string)Session["orderBy"]} {((bool)Session["ascending"] ? "ASC" : "DESC")}";
            DataTable dataTable = SqlHelper.RetriveData(query);
            targetUpdating.Items.Clear();
            targetDeleting.Items.Clear();
            ListItem unselected = new ListItem("", "unselected");
            unselected.Attributes.Add("hidden", "true");
            unselected.Attributes.Add("selected", "true");
            unselected.Attributes.Add("disabled", "true");
            targetUpdating.Items.Insert(0, unselected);
            targetDeleting.Items.Insert(0, unselected);
            for (int i = dataTable.Rows.Count - 1; i >= 0; i--)
            {
                DataRow row = dataTable.Rows[i];
                targetUpdating.Items.Insert(0, new ListItem(row["UserName"].ToString(), row["UserName"].ToString()));
                targetDeleting.Items.Insert(0, new ListItem(row["UserName"].ToString(), row["UserName"].ToString()));
            }
            targetUpdating.SelectedValue = unselected.Value;
            targetDeleting.SelectedValue = unselected.Value;

            BindGrid();
        }
    }
}
