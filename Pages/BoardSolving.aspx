<%@ Page Title="" Language="C#" ValidateRequest="false" MasterPageFile="~/NavigationBar.Master" AutoEventWireup="true" CodeBehind="BoardSolving.aspx.cs" Inherits="SudokuWebsite.Pages.BoardSolving" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="../StyleSheets/SolvingStyleSheet.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="board"></div>
    <button type="button" id="saveButton" onserverclick="SaveBoard" runat="server">שמור ללוחות מועדפים</button>
    <input type="hidden" id="HiddenField" runat="server" clientidmode="static" />
    <script src="../Scripts/SudokuLogic.js"></script>
    <script src="../Scripts/BoardSolving.js"></script>
</asp:Content>
