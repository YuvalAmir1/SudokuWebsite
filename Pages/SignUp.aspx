<%@ Page Title="" Language="C#" MasterPageFile="~/NavigationBar.Master" AutoEventWireup="true" CodeBehind="SignUp.aspx.cs" Inherits="SudokuWebsite.Pages.SignUp" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="../StyleSheets/SignUpStyleSheet.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="content">
        <h1>יצירת משתמש </h1>
        <label for="username"><b>שם משתמש:</b></label>
        <input type="text" placeholder="בחר\י שם משתמש" name="username" required>
        <br />
        <br />

        <label for="psw"><b>סיסמה:</b></label>
        <input type="password" placeholder="בחר\י סיסמה" name="psw" required>
        <br />
        <br />

        <label for="fName"><b>שם פרטי:</b></label>
        <input type="text" placeholder="שמך הפרטי" name="fName" required>
        <br />
        <br />

        <label for="lName"><b>שם משפחה:</b></label>
        <input type="text" placeholder="שם בהשפחה שלך" name="lName" required>
        <br />
        <br />

        <label for="gender"><b>מגדר <i>(ניתן להשאיר ריק)</i>:</b></label>
        <input type="text" placeholder="המגדר שלך" name="fName" required>
        <br />
        <br />

        <label for="email"><b>דואר אלקטרוני:</b></label>
        <input type="text" placeholder="הדואר אלקטרוני שלך" name="email" required>
        <br />
        <br />
    </div>
</asp:Content>
