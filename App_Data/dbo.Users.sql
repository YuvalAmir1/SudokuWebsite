CREATE TABLE [dbo].[Users] (
    [Id]          INT           NOT NULL,
    [UserName]    VARCHAR (15)  NOT NULL,
    [FirstName]   VARCHAR (15)  NOT NULL,
    [LastName]    VARCHAR (15)  NOT NULL,
    [Gender]      TINYINT       NULL,
    [BirthDate]   DATE          NOT NULL,
    [Email]       VARCHAR (50)  NOT NULL,
    [Password]    VARCHAR (15)  NOT NULL,
    [PhoneNumber] VARCHAR (10)  NOT NULL,
    [City]        VARCHAR (15)  NULL,
    [SavedBoards] VARCHAR (MAX) NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
)