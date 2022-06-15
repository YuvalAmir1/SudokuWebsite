<%@ Page Title="" Language="C#" MasterPageFile="~/NavigationBar.Master" AutoEventWireup="true" CodeBehind="UserPage.aspx.cs" Inherits="SudokuWebsite.Pages.UserPage" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="../StyleSheets/GallaryStyleSheet.css" rel="stylesheet" />
    <link href="../StyleSheets/UserPageStyleSheet.css" rel="stylesheet" />
    <script src="../Scripts/SudokuLogic.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="content">
        <h1 id="greetings" clientidmode="static" runat="server"></h1>
        <label for="username">שם משתמש:</label>
        <span id="username" name="username" clientidmode="static" runat="server"></span>
        <br />
        <br />
        <label for="password">סיסמה:</label>
        <span id="password" name="password" clientidmode="static" runat="server"></span>
        <br />
        <br />
        <label for="firstName">שם פרטי:</label>
        <span id="firstName" name="password" clientidmode="static" runat="server"></span>
        <br />
        <br />
        <label for="lastName">שם משפחה:</label>
        <span id="lastName" name="lastName" clientidmode="static" runat="server"></span>
        <br />
        <br />
        <label for="gender">מגדר:</label>
        <span id="gender" name="gender" clientidmode="static" runat="server"></span>
        <br />
        <br />
        <label for="birthDate">תעריך לידה:</label>
        <span id="birthDate" name="birthDate" clientidmode="static" runat="server"></span>
        <br />
        <br />
        <label for="email">דואר אלקטרוני:</label>
        <span id="email" name="email" clientidmode="static" runat="server"></span>
        <br />
        <br />
        <label for="phoneNumber">מספר טלפון:</label>
        <span id="phoneNumber" name="phoneNumber" clientidmode="static" runat="server"></span>
        <br />  
        <br />
        <span id="city" name="city" clientidmode="static" runat="server"></span>
        <input type="button" onclick="location.href='SelfDataUpdate.aspx';" value="עדכן נתונים" />
        <br />
        <br />
        <label for="savedBoards" id="savedBoardsLabel" runat="server">לוחות שמורים: </label>
        <input type="button" id="boardsClearButton" onserverclick="ClearBoards" runat="server" value="מחק לוחות שמורים" />
    </div>
    <div id="savedBoards" class="grid-container" name="savedBoards" clientidmode="static" runat="server"></div>
</asp:Content>
