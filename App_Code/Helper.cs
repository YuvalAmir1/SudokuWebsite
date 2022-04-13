using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;

namespace SudokuWebsite.App_Code
{
    public static class Helper
    {
        public const string databaseName = "Database.mdf";
        public const string tableName = "Users";
        public const string conString = @"Data Source=(LocalDB)\MSSQLLocalDB;AttachDbFilename=|DataDirectory|\" + databaseName + ";Integrated Security=True";

        public static DataSet RetriveTable(string SQLStr)
        {
            SqlConnection con = new SqlConnection(conString);
            SqlCommand cmd = new SqlCommand(SQLStr, con);
            SqlDataAdapter ad = new SqlDataAdapter(cmd);
            DataSet ds = new DataSet();

            ad.Fill(ds, tableName);
            return ds;
        }


        // Continue Here:
        public static string BuildUserTableHTML(DataTable dt)
        {
            string HTMLStr = "<table class='usersTable' align='center'>";
            foreach (DataColumn column in dt.Columns)
                HTMLStr += "<th>" + column.ColumnName + "</th>";

                HTMLStr += "</table>";
            return HTMLStr;
        }
    }
}