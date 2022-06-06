using System;
using System.Collections.Generic;
using System.Collections;
using System.Globalization;
using System.Linq;
using System.Web;

namespace SudokuWebsite.App_Code
{
    public struct User
    {
        public int Id;
        public bool IsAdmin;
        public string UserName;
        public string FirstName;
        public string LastName;
        public string Gender;
        public string BirthDate;
        public string Email;
        public string Password;
        public int PhoneNumber;
        public string City;
        public string SavedBoards;

        public User(int id, bool isAdmin, string userName, string firstName, string lastName, string gender,
            int[] birthDate, string email, string password, int phoneNumber, string city)
        {
            Id = id;
            IsAdmin = isAdmin;
            UserName = userName;
            FirstName = firstName;
            LastName = lastName;
            Gender = gender;
            BirthDate = $"{birthDate[0]}/{birthDate[1]}/{birthDate[2]}";
            Email = email;
            Password = password;
            PhoneNumber = phoneNumber;
            City = city;
            SavedBoards = "";
        }
    }
}