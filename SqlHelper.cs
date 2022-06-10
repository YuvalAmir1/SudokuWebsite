using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Web.Services;


namespace SudokuWebsite
{
    public static class SqlHelper
    {
        public static string database = "Database.mdf";
        public static string table = "Users";
        public static string connectionString = @"Data Source=(LocalDB)\MSSQLLocalDB;AttachDbFilename=|DataDirectory|\Database.mdf;Integrated Security=True";
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
            cmd.Dispose();
            CloseConnection();
        }

        public static DataTable RetriveData(string query)
        {
            OpenConnection();
            SqlCommand cmd = new SqlCommand(query, con);
            SqlDataReader reader = cmd.ExecuteReader();
            DataTable output = new DataTable();
            output.Load(reader);
            CloseConnection();
            return output;
        }

        public static void Insert(bool isAdmin, string[] columns, string[] nCollumns, string[] values, string[] nValues)
        {
            string query = $"INSERT INTO {table} (isAdmin, ";
            for (int i = 0; i < columns.Length; i++)
            {
                query += columns[i] + ", ";
            }
            for (int i = 0; i < nCollumns.Length; i++)
            {
                query += nCollumns[i] + ", ";
            }
            query += $"SavedBoards) VALUES ({(isAdmin ? 1 : 0)}, ";
            for (int i = 0; i < values.Length; i++)
            {
                query += $"'{values[i]}', ";
            }
            for (int i = 0; i < nValues.Length; i++)
            {
                query += $"N'{nValues[i]}', ";
            }
            query += "'')";
            ExecuteQuery(query);
        }

        public static DataRow FindUser(string username)
        {
            DataTable data = RetriveData($"SELECT * FROM {table} WHERE UserName = '{username}'");
            if (data.Rows.Count == 0)
                return null;

            DataRow row = data.Rows[0];
            return row;
        }

        public static bool UsernameCheck(string username)
        {
            DataTable data = RetriveData($"SELECT * FROM {table} WHERE UserName = '{username}'");
            if (data.Rows.Count == 0)
                return false;
            return true;
        }

        public static void SaveBoard(string username, string boardData)
        {
            string query;
            DataRow User = FindUser(username);
            if ((string)User["SavedBoards"] == "")
                query = $"UPDATE {table} SET SavedBoards = '{boardData}' WHERE UserName = '{username}'";
            else
                query = $"UPDATE {table} SET SavedBoards = '{(string)User["SavedBoards"]}{boardData}' WHERE UserName = '{username}'";
            ExecuteQuery(query);
        }

        public static void UpdateUser(string username, string[] data)
        {
            string query = $"UPDATE {table} SET UserName = '{data[0]}', Password = '{data[1]}', FirstName = N'{data[2]}', LastName = N'{data[3]}', Gender = N'{data[4]}', BirthDate = '{data[5]}', Email = '{data[6]}', PhoneNumber = '{data[7]}', City = N'{data[8]}' WHERE UserName = '{username}'";
            ExecuteQuery(query);
        }

        public static void ClearBoards(string username)
        {
            string query = $"UPDATE {table} SET SavedBoards = '' WHERE UserName = '{username}'";
            ExecuteQuery(query);
        }
    }
}