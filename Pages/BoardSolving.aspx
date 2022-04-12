<%@ Page Title="" Language="C#" MasterPageFile="~/NavigationBar.Master" AutoEventWireup="true" CodeBehind="BoardSolving.aspx.cs" Inherits="SudokuWebsite.Pages.BoardSolving" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
<link href="../StyleSheets/SolvingStyleSheet.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <br />
    <br />
        <div id="board"></div>
    <script src="../TypeScript/SudokuLogic.js"></script>
    <script src="../TypeScript/BoardSolving.js"></script>
</asp:Content>
