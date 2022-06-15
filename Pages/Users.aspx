<%@ Page Title="" Language="C#" MasterPageFile="~/NavigationBar.Master" AutoEventWireup="true" CodeBehind="Users.aspx.cs" Inherits="SudokuWebsite.Pages.Users" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="../StyleSheets/UsersStyleSheet.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="controls">
        <b>עדכון משתמש: </b>
        <asp:DropDownList ID="targetUpdating" runat="server" ClientIDMode="Static" OnSelectedIndexChanged="UpdateTargetSelected" AutoPostBack="true">
        </asp:DropDownList>
        <asp:Button ID="cancelUpdateButton" Text="ביטול" Visible="false" CssClass="button" ClientIDMode="Static" OnClick="CancelUpdate" runat="server" />
        <asp:Button ID="confirmUpdateButton" Text="אישור" Visible="false" CssClass="button" ClientIDMode="Static" OnClick="ConfirmUpdate" runat="server" />
        <div id="updating" clientidmode="static" runat="server" visible="false">
            <label for="isAdminUpdating">מנהל?</label>
            <asp:CheckBox ID="isAdminUpdating" name="isAdminUpdating" runat="server" ClientIDMode="Static" />
            <label for="usernameUpdating">שם משתמש:</label>
            <asp:TextBox ID="usernameUpdating" CssClass="inputs" runat="server" ClientIDMode="Static" />
            <label for="passwordUpdating">סיסמה:</label>
            <asp:TextBox ID="passwordUpdating" CssClass="inputs" runat="server" ClientIDMode="Static" />
            <label for="firstNameUpdating">שם פרטי:</label>
            <asp:TextBox ID="firstNameUpdating" CssClass="inputs" runat="server" ClientIDMode="Static" />
            <label for="lastNameUpdating">שם משפחה:</label>
            <asp:TextBox ID="lastNameUpdating" CssClass="inputs" runat="server" ClientIDMode="Static" />
            <br />
            <label for="gendeUpdatingr">מגדר:</label>
            <asp:TextBox ID="genderUpdating" CssClass="inputs" runat="server" ClientIDMode="Static" />
            <label for="birthDateUpdating">תאריך לידה:</label>
            <asp:TextBox ID="birthDateUpdating" CssClass="inputs" runat="server" ClientIDMode="Static" />
            <label for="emailUpdating:">דואר אלקטרוני:</label>
            <asp:TextBox ID="emailUpdating" CssClass="inputs" runat="server" ClientIDMode="Static" />
            <label for="phoneUpdating">טלפון:</label>
            <asp:TextBox ID="phoneUpdating" CssClass="inputs" runat="server" ClientIDMode="Static" />
            <label for="cityUpdating">עיר:</label>
            <asp:TextBox ID="cityUpdating" CssClass="inputs" runat="server" ClientIDMode="Static" />
        </div>
        <br />
        <b style="margin-top: 4px;">הוספת משתמשים: </b>
        <asp:Button Style="margin-top: 4px;" ID="startCreatingButton" Text="צור משתמש" CssClass="button" ClientIDMode="Static" OnClick="StartCreating" runat="server" />
        <asp:Button Style="margin-top: 4px;" Visible="false" ID="confirmCreatingButton" Text="אישור" CssClass="button" ClientIDMode="Static" OnClick="ConfirmCreating" runat="server" />
        <asp:Button Style="margin-top: 4px;" Visible="false" ID="cancelCreatingButton" Text="ביטול" CssClass="button" ClientIDMode="Static" OnClick="CancelCreating" runat="server" />
        <div id="creating" clientidmode="static" runat="server" visible="false">
            <label for="isAdminCreating">מנהל?</label>
            <asp:CheckBox ID="isAdminCreating" name="isAdminUpdating" runat="server" ClientIDMode="Static" />
            <label for="usernameCreating">שם משתמש:</label>
            <asp:TextBox ID="usernameCreating" CssClass="inputs" runat="server" ClientIDMode="Static" />
            <label for="passwordCreating">סיסמה:</label>
            <asp:TextBox ID="passwordCreating" CssClass="inputs" runat="server" ClientIDMode="Static" />
            <label for="firstNameCreating">שם פרטי:</label>
            <asp:TextBox ID="firstNameCreating" CssClass="inputs" runat="server" ClientIDMode="Static" />
            <label for="lastNameCreating">שם משפחה:</label>
            <asp:TextBox ID="lastNameCreating" CssClass="inputs" runat="server" ClientIDMode="Static" />
            <br />
            <label for="genderCreating">מגדר:</label>
            <asp:TextBox ID="genderCreating" CssClass="inputs" runat="server" ClientIDMode="Static" />
            <label for="birthDateCreating">תאריך לידה:</label>
            <asp:TextBox ID="birthDateCreating" CssClass="inputs" runat="server" ClientIDMode="Static" />
            <label for="emailCreating:">דואר אלקטרוני:</label>
            <asp:TextBox ID="emailCreating" CssClass="inputs" runat="server" ClientIDMode="Static" />
            <label for="phoneCreating">טלפון:</label>
            <asp:TextBox ID="phoneCreating" CssClass="inputs" runat="server" ClientIDMode="Static" />
            <label for="cityCreating">עיר:</label>
            <asp:TextBox ID="cityCreating" CssClass="inputs" runat="server" ClientIDMode="Static" />
        </div>
        <br />
        <b>מחיקת משתמש: </b>
        <asp:DropDownList ID="targetDeleting" Style="margin-top: 4px;" runat="server" ClientIDMode="Static" OnSelectedIndexChanged="DeletingTargetSelected" AutoPostBack="true">
        </asp:DropDownList>
        <asp:Button Style="margin-top: 4px;" Visible="false" ID="deleteButton" Text="מחק משתמש" CssClass="button" ClientIDMode="Static" OnClick="DeleteUser" runat="server" />
        <br />
        <b>חיפוש: </b>
        <asp:DropDownList ID="searchTarget" Style="margin-top: 4px;" runat="server" OnSelectedIndexChanged="Search" AutoPostBack="true" ClientIDMode="Static">
            <asp:ListItem Text="שם משתמש" Value="UserName"></asp:ListItem>
            <asp:ListItem Text="סיסמה" Value="Password"></asp:ListItem>
            <asp:ListItem Text="שם פרטי" Value="FirstName"></asp:ListItem>
            <asp:ListItem Text="שם משפחה" Value="LastName"></asp:ListItem>
            <asp:ListItem Text="עיר" Value="City"></asp:ListItem>
        </asp:DropDownList>
        <asp:TextBox ID="searchTerm" Style="margin-top: 4px;" runat="server" ClientIDMode="Static" OnTextChanged="Search"></asp:TextBox>
        <br />
        <b>סדר על פי: </b>
        <asp:DropDownList ID="orderBy" Style="margin-top: 4px;" runat="server" OnSelectedIndexChanged="Order" AutoPostBack="true" ClientIDMode="Static">
            <asp:ListItem Text="סדר יצירת משתמשים" Value="Id"></asp:ListItem>
            <asp:ListItem Text="מנהל?" Value="IsAdmin"></asp:ListItem>
            <asp:ListItem Text="שם משתמש" Value="UserName"></asp:ListItem>
            <asp:ListItem Text="סיסמה" Value="Password"></asp:ListItem>
            <asp:ListItem Text="שם פרטי" Value="FirstName"></asp:ListItem>
            <asp:ListItem Text="שם משפחה" Value="LastName"></asp:ListItem>
            <asp:ListItem Text="מגדר" Value="Gender"></asp:ListItem>
            <asp:ListItem Text="עיר" Value="City"></asp:ListItem>
        </asp:DropDownList>

        <asp:DropDownList Id="orderDirection" Style="margin-top: 4px;" runat="server" OnSelectedIndexChanged="Order" AutoPostBack="true" ClientIDMode="Static">
            <asp:ListItem Text="עולה" Value="true"></asp:ListItem>
            <asp:ListItem Text="יורד" Value="false"></asp:ListItem>
        </asp:DropDownList>
    </div>


    <asp:GridView ID="gridView" ClientIDMode="static" runat="server" CellPadding="3" ForeColor="Black" GridLines="Vertical"
        BackColor="White" BorderColor="#999999" BorderStyle="Solid" BorderWidth="1px" AutoGenerateColumns="false">

        <AlternatingRowStyle BackColor="#CCCCCC" />
        <FooterStyle BackColor="#CCCCCC" />
        <HeaderStyle HorizontalAlign="Center" BackColor="#003B73" Font-Bold="True" ForeColor="White" />
        <PagerStyle BackColor="#999999" ForeColor="Black" HorizontalAlign="Center" />
        <SelectedRowStyle BackColor="#000099" Font-Bold="True" ForeColor="White" />
        <SortedAscendingCellStyle BackColor="#F1F1F1" />
        <SortedAscendingHeaderStyle BackColor="#808080" />
        <SortedDescendingCellStyle BackColor="#CAC9C9" />
        <SortedDescendingHeaderStyle BackColor="#383838" />

        <Columns>
            <asp:CheckBoxField DataField="IsAdmin" HeaderText="מנהל?" SortExpression="IsAdmin" />
            <asp:BoundField DataField="UserName" HeaderText="שם משתמש" SortExpression="UserName" />
            <asp:BoundField DataField="Password" HeaderText="סיסמה" SortExpression="Password" />
            <asp:BoundField DataField="FirstName" HeaderText="שם פרטי" SortExpression="FirstName" />
            <asp:BoundField DataField="LastName" HeaderText="שם משפחה" SortExpression="LastName" />
            <asp:BoundField DataField="Gender" HeaderText="מגדר" SortExpression="Gender" />
            <asp:BoundField DataField="BirthDate" HeaderText="תאריך לידה" SortExpression="BirthDate" />
            <asp:BoundField DataField="Email" HeaderText="דואר אלקטרוני" SortExpression="Email" />
            <asp:BoundField DataField="PhoneNumber" HeaderText="טלפון" SortExpression="PhoneNumber" />
            <asp:BoundField DataField="City" HeaderText="עיר" SortExpression="City" />
        </Columns>
    </asp:GridView>
    <script src="../Scripts/Users.js"></script>
</asp:Content>
