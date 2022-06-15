<%@ Page Title="" Language="C#" MasterPageFile="~/NavigationBar.Master" AutoEventWireup="true" CodeBehind="Statistics.aspx.cs" Inherits="SudokuWebsite.Pages.Statistics" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
<link href="../StyleSheets/StatisticsStyleSheet.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <br />
    <table id="statistics">
        <tr>
            <th>מספר הגולשים באתר:</th>
            <td id="currentVisitorsCount" runat="server"></td>
        </tr>
        <tr>
            <th>מספר הגולשים המחוברים:</th>
            <td id="currentLoggedInCount" runat="server"></td>
        </tr>
        <tr>
            <th>מספר הגולשים הלא מחוברים:</th>
            <td id="currentGuestsCount" runat="server"></td>
        </tr>
    </table>
    <button type="submit">רענן נתונים</button>
</asp:Content>
