<%@ Page Title="" Language="C#" MasterPageFile="~/NavigationBar.Master" AutoEventWireup="true" CodeBehind="BoardsGallery.aspx.cs" Inherits="SudokuWebsite.Pages.BoardsGallary" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../Scripts/SudokuLogic.js"></script>
    <link href="../StyleSheets/GallaryStyleSheet.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <br />
    <div class="grid-container" id="grid-container"></div>
    <script src="../Scripts/GenerateBoards.js"></script>
</asp:Content>
