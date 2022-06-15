<%@ Page Title="" Language="C#" MasterPageFile="~/NavigationBar.Master" AutoEventWireup="true" CodeBehind="SignUp.aspx.cs" Inherits="SudokuWebsite.Pages.SignUp" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="../StyleSheets/SignUpStyleSheet.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="content">
        <h1>יצירת משתמש </h1>
        <label for="username"><b>שם משתמש:</b></label>
        <input type="text" placeholder="בחר\י שם משתמש" name="username" id="username" clientidmode="static" runat="server">
        <br />
        <br />

        <label for="password"><b>סיסמה:</b></label>
        <input type="password" placeholder="בחר\י סיסמה" name="password" id="password" clientidmode="static" runat="server">
        <br />
        <br />

        <label for="firstName"><b>שם פרטי:</b></label>
        <input type="text" placeholder="שמך הפרטי" name="firstName" id="firstName" clientidmode="static" runat="server">
        <br />
        <br />

        <label for="lastName"><b>שם משפחה:</b></label>
        <input type="text" placeholder="שם השפחה שלך" name="lastName" id="lastName" clientidmode="static" runat="server">
        <br />
        <br />

        <label for="gender"><b>מגדר:</b></label>
        <select name="gender" id="gender" clientidmode="static" runat="server">
            <option value="גבר">גבר</option>
            <option value="אישה">אישה</option>
            <option selected="selected" value="other">מעדיף/ה לא לציין</option>
        </select>
        <br />
        <br />

        <label for="email"><b>דואר אלקטרוני:</b></label>
        <input type="email" placeholder="הדואר אלקטרוני שלך" name="email" id="email" clientidmode="static" runat="server">
        <br />
        <br />

        <label for="phone"><b>טלפון:</b></label>
        <input type="text" name="phone" id="phone" clientidmode="static" size="5" runat="server">
        05
        <br />
        <br />

        <label for="city"><b>עיר מגורים <i>(ניתן להשאיר ריק)</i>:</b></label>
        <input type="text" placeholder="עיר המגורים שלך" name="city" id="city" clientidmode="static" runat="server">
        <br />
        <br />
        <label for="birthDate"><b>תעריך לידה <i>(ניתן להשאיר ריק)</i>:</b></label>
        <input type="date" name="birthDate" id="birthDate" clientidmode="static" runat="server" />
        <br />
        <br />

        <input type="button" value="צור מישתמש" id="submitButton" onclick="validateInfo(true)" />
        <input type="button" id="resetForm" clientidmode="static" value="איפוס" onclick="clearForm(true)" />
        <br />
        <br />
        <div id="errorText" clientidmode="static" style="color: red; font-weight: bolder;" runat="server"></div>
    </div>
    <script src="../Scripts/Validate.js"></script>
</asp:Content>
