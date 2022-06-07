using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;

namespace SudokuWebsite
{
    public static class SqlHelper
    {
        public static string database = "Database.mdf";
        public static string table = "Users";
        public static string connectionString = $@"Data Source=(LocalDB)\MSSQLLocalDB;AttachDbFilename=|DataDirectory|\{database};Integrated Security=True";
        public static SqlConnection con = new SqlConnection(connectionString);

        public static void OpenConnection()
        {
            if (con.State == ConnectionState.Closed)
            {
                con.Open();
            }
        }

        public static void CloseConnection()
        {
            if (con.State == ConnectionState.Open)
            {
                con.Close();
            }
        }

        public static DataTable GetDataTable(string query)
        {
            OpenConnection();
            SqlCommand cmd = new SqlCommand(query, con);
            SqlDataAdapter da = new SqlDataAdapter(cmd);
            DataTable dt = new DataTable();
            da.Fill(dt);
            CloseConnection();
            return dt;
        }

        public static void ExecuteQuery(string query)
        {
            OpenConnection();
            SqlCommand cmd = new SqlCommand(query, con);
            cmd.ExecuteNonQuery();
            CloseConnection();
        }

        public static void Insert(string table, string[] collumns, string[] values)
        {
            string query = "INSERT INTO " + table + " (";
            for (int i = 0; i < collumns.Length; i++)
            {
                query += collumns[i];
                if (i != collumns.Length - 1)
                {
                    query += ", ";
                }
            }
            query += ") VALUES (";
            for (int i = 0; i < values.Length; i++)
            {
                query += "'" + values[i] + "'";
                if (i != values.Length - 1)
                {
                    query += ", ";
                }
            }
            query += ")";
            ExecuteQuery(query);
        }

        public static string GetDataTableHtml(DataTable dt)
        {
            string html = "<table class='UserTable' id='UserTable'>";
            html += "<thead>";
            html += "<tr>";
            for (int i = 0; i < dt.Columns.Count; i++)
            {
                html += "<th>" + dt.Columns[i].ColumnName + "</th>";
            }
            html += "</tr>";
            html += "</thead>";
            html += "<tbody>";
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                html += "<tr>";
                for (int j = 0; j < dt.Columns.Count; j++)
                {
                    html += "<td>" + dt.Rows[i][j].ToString() + "</td>";
                }
                html += "</tr>";
            }
            html += "</tbody>";
            html += "</table>";
            return html;
        }
    }
}