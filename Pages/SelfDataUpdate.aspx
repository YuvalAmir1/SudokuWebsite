<%@ Page Title="" Language="C#" MasterPageFile="~/NavigationBar.Master" AutoEventWireup="true" CodeBehind="SelfDataUpdate.aspx.cs" Inherits="SudokuWebsite.Pages.SelfDataUpdate" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../Scripts/Validate.js"></script>
    <link href="../StyleSheets/UserPageStyleSheet.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="content">
        <h1>עדכון נתונים</h1>
        <label for="username">שם משתמש:</label>
        <input type="text" id="username" clientidmode="static" runat="server" />
        <br />
        <br />
        <label for="password">סיסמה:</label>
        <input type="text" id="password" clientidmode="static" runat="server" />
        <br />
        <br />
        <label for="firstName">שם פרטי:</label>
        <input type="text" id="firstName" clientidmode="static" runat="server" />
        <br />
        <br />
        <label for="lastName">שם משפחה:</label>
        <input type="text" id="lastName" clientidmode="static" runat="server" />
        <br />
        <br />
        <label for="gender">מגדר:</label>
        <select name="gender" id="gender" ClientIDMode="static" runat="server">
            <option value="גבר">גבר</option>
            <option value="אישה">אישה</option>
            <option value="other">מעדיף/ה לא לציין</option>
        </select>
        <br />
        <br />
        <label for="birthDate">תעריך לידה:</label>
        <input type="date" name="birthDate" id="birthDate" ClientIDMode="static" runat="server"/>
        <br />
        <br />
        <label for="email">דואר אלקטרוני:</label>
        <input type="email" placeholder="הדואר אלקטרוני שלך" name="email" id="email" ClientIDMode="static" runat="server">
        <br />
        <br />
        <label for="phoneNumber">מספר טלפון:</label>
        <input type="text" name="phone" id="phone" ClientIDMode="static" size="5" runat="server"> 05
        <br />
        <br />
        <label for="city">עיר:</label>
        <input type="text" placeholder="עיר המגורים שלך" name="city" id="city" ClientIDMode="static" runat="server">
        <br />
        <br />
        <input type="button" value="עדכון משתמש" id="submitButton" onclick="validateInfo(true)"/>
        <input type="button" id="resetForm" ClientIDMode="static" value="איפוס" onserverclick="ResetData" runat="server"/>
        <br />
        <br />
        <div id="errorText" ClientIDMode="static" style="color: red; font-weight: bolder;" runat="server"></div>
    </div>
</asp:Content>
