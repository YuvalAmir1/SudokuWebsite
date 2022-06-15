<%@ Page Title="" Language="C#" MasterPageFile="~/NavigationBar.Master" AutoEventWireup="true" CodeBehind="Home.aspx.cs" Inherits="SudokuWebsite.Pages.Home" %>


<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="../StyleSheets/HomeStyleSheet.css" rel="stylesheet" />
    <script src="../Scripts/SudokuLogic.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="content">
        <h1>איך זה עובד? </h1>
        על מנת ליצור את הלוחות הללו, צריך קודם לבנות אלגוריטם שפותר לוחות.
            אלגוריתם הפתירה הוא אלגוריתם מסוג recursive bruteforce backtracking.
            הוא עובד בשלבים הבאים:
            
        <ol>
            <li>מתחילים במשבצת בפינה מימין למלא.</li>
            <li>מנסים את המספרים מ1 עד 9 עד שמוצאים מספר שניתן למקם במשבצת.</li>
            <li>אם מוצאים מספר תקין ממשיכים משבצת קדימה ואם לא מוצאים מספר תקין מוחקים את המשבצת הנוכחית, חוזרים למשבצת הקודמת וממשיכים מהמספר שעצרנו בו.</li>
            <li>אם לא הגענו לסוף הלוח חוזרים לשלב 2.</li>
        </ol>

        אם אתם רוצים לראות את האלגוריתם בפעולה נסו להתעסק בפותר האינטרקטיבי:
        <br />
        <br />

        <button type="button" id="new-board-button" onclick="newBoardButtonClick();">לוח אחר</button>
        <button type="button" id="solve-button" onclick="solveButtonClick();">פתור</button>
        <br />
        <br />
    </div>

    <div id="solver-container"></div>
    <div class="content">
        <h2>כמות הזמן בין מהלכים באלפי שניות:</h2>
        <p>
            <label for="ilegal-delay">אחרי מספר לא חוקי: </label>
            <input type="number" id="ilegal-delay" name="ilegal-delay" value="30" onkeyup="validateInput(this);" />
            <br />
            <br />
            <label for="found-delay">אחרי שמספר חוקי נמצא: </label>
            <input type="number" id="found-delay" name="found-delay" value="40" onkeyup="validateInput(this);" />
            <br />
            <br />
            <label for="stuck-delay">אחרי שנתקע: </label>
            <input type="number" id="stuck-delay" name="stuck-delay" value="45" onkeyup="validateInput(this);">
            <br />
            <br />
            <label for="remove-delay">אחרי מחיקה: </label>
            <input type="number" id="remove-delay" name="remove-delay" value="50" onkeyup="validateInput(this);">
        </p>
        <script src="../Scripts/DemoSolver.js"></script>
    </div>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
</asp:Content>
