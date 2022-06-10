CREATE TABLE [dbo].[Users] (
    [Id]          INT           IDENTITY (1, 1) NOT NULL,
    [IsAdmin]     BIT           DEFAULT ((0)) NOT NULL,
    [UserName]    VARCHAR (15)  NOT NULL,
    [Password]    VARCHAR (50)  NOT NULL,
    [FirstName]   NVARCHAR (15) NOT NULL,
    [LastName]    NVARCHAR (15) NOT NULL,
    [Gender]      NVARCHAR (4)  NULL,
    [BirthDate]   VARCHAR (10)  NULL,
    [Email]       VARCHAR (50)  NOT NULL,
    [PhoneNumber] VARCHAR (11)  NOT NULL,
    [City]        NVARCHAR (15) NULL,
    [SavedBoards] NVARCHAR(MAX) NULL, 
    PRIMARY KEY CLUSTERED ([Id] ASC)
);

