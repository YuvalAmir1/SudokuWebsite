<%@ Page Title="" Language="C#" MasterPageFile="~/NavigationBar.Master" AutoEventWireup="true" CodeBehind="SignIn.aspx.cs" Inherits="SudokuWebsite.Pages.SignIn" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="../StyleSheets/SignInStyleSheet%20.css" rel="stylesheet" />
    <script src="../Scripts/Validate.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="content">
        <h1> התחברות </h1>
        <label for="username"><b>שם משתמש:</b></label>
        <input type="text" placeholder="שם המשתמש שלך" name="username" id="username" ClientIDMode="static" runat="server">
        <br />
        <br />

        <label for="password"><b>סיסמה:</b></label>
        <input type="password" placeholder="הסיסמה שלך" name="password" id="password" ClientIDMode="static" runat="server">
        <br />
        <br />

        <input type="button" value="התחברות" id="submitButton"ClientIDMode="static"  onclick="validateInfo(false)"/>
        <input type="button" id="resetForm" ClientIDMode="static" value="איפוס" onclick="clearForm(false)"/>
        <br />
        <br />
        <div id="errorText" style="color: red; font-weight: bolder;" ClientIDMode="static" runat="server"></div>
    </div>
</asp:Content>
    