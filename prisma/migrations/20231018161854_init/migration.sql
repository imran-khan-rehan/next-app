-- CreateTable
CREATE TABLE "attachment" (
    "attId" INTEGER NOT NULL,
    "name" VARCHAR(255),
    "srcUrl" VARCHAR(255),
    "taskId" INTEGER,

    CONSTRAINT "attachment_pkey" PRIMARY KEY ("attId")
);

-- CreateTable
CREATE TABLE "notification" (
    "notId" SERIAL NOT NULL,
    "senderStatus" VARCHAR(255),
    "taskId" INTEGER,
    "receiverId" INTEGER,
    "senderId" INTEGER,
    "receiverStatus" VARCHAR(45),

    CONSTRAINT "notification_pkey" PRIMARY KEY ("notId")
);

-- CreateTable
CREATE TABLE "priority" (
    "priorityId" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "color" VARCHAR(45) NOT NULL,

    CONSTRAINT "priority_pkey" PRIMARY KEY ("priorityId")
);

-- CreateTable
CREATE TABLE "program" (
    "progId" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "program_pkey" PRIMARY KEY ("progId")
);

-- CreateTable
CREATE TABLE "reminder" (
    "remId" SERIAL NOT NULL,
    "days" INTEGER,
    "status" VARCHAR(255),
    "taskId" INTEGER,

    CONSTRAINT "reminder_pkey" PRIMARY KEY ("remId")
);

-- CreateTable
CREATE TABLE "status" (
    "statusId" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "color" VARCHAR(45) NOT NULL,

    CONSTRAINT "status_pkey" PRIMARY KEY ("statusId")
);

-- CreateTable
CREATE TABLE "subject" (
    "subId" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "subject_pkey" PRIMARY KEY ("subId")
);

-- CreateTable
CREATE TABLE "subject_program_join" (
    "subId" INTEGER NOT NULL,
    "progId" INTEGER NOT NULL,

    CONSTRAINT "subject_program_join_pkey" PRIMARY KEY ("subId","progId")
);

-- CreateTable
CREATE TABLE "task" (
    "taskId" SERIAL NOT NULL,
    "title" VARCHAR(255),
    "description" TEXT,
    "created_at" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "statusId" INTEGER,
    "typeId" INTEGER,
    "priorityId" INTEGER,
    "due_date" DATE,
    "subId" INTEGER,
    "userId" INTEGER,

    CONSTRAINT "task_pkey" PRIMARY KEY ("taskId")
);

-- CreateTable
CREATE TABLE "type" (
    "typeId" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "type_pkey" PRIMARY KEY ("typeId")
);

-- CreateTable
CREATE TABLE "user" (
    "userId" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "profile" VARCHAR(25) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "usersubjectprogramjoin" (
    "userId" INTEGER NOT NULL,
    "subId" INTEGER NOT NULL,
    "progId" INTEGER NOT NULL,

    CONSTRAINT "usersubjectprogramjoin_pkey" PRIMARY KEY ("userId","subId","progId")
);

-- CreateTable
CREATE TABLE "usubprog" (
    "userId" INTEGER NOT NULL,
    "subId" INTEGER NOT NULL,
    "progId" INTEGER NOT NULL,

    CONSTRAINT "usubprog_pkey" PRIMARY KEY ("subId","progId")
);

-- CreateIndex
CREATE INDEX "Attachment_TaskId_Index" ON "attachment"("taskId");

-- CreateIndex
CREATE INDEX "Notification_SenderId_Index" ON "notification"("senderId");

-- CreateIndex
CREATE INDEX "Notification_ReceiverId_Index" ON "notification"("receiverId");

-- CreateIndex
CREATE INDEX "Notification_TaskId_Index" ON "notification"("taskId");

-- CreateIndex
CREATE INDEX "Priority_PriorityId_Index" ON "priority"("priorityId");

-- CreateIndex
CREATE INDEX "Program_ProgId_Index" ON "program"("progId");

-- CreateIndex
CREATE INDEX "Reminder_TaskId_Index" ON "reminder"("taskId");

-- CreateIndex
CREATE INDEX "Status_StatusId_Index" ON "status"("statusId");

-- CreateIndex
CREATE INDEX "Subject_SubId_Index" ON "subject"("subId");

-- CreateIndex
CREATE INDEX "SubjectProgramJoin_ProgId_Index" ON "subject_program_join"("progId");

-- CreateIndex
CREATE INDEX "Task_SubId_Index" ON "task"("subId");

-- CreateIndex
CREATE INDEX "Task_UserId_Index" ON "task"("userId");

-- CreateIndex
CREATE INDEX "Task_PriorityId_Index" ON "task"("priorityId");

-- CreateIndex
CREATE INDEX "Task_StatusId_Index" ON "task"("statusId");

-- CreateIndex
CREATE INDEX "Task_TypeId_Index" ON "task"("typeId");

-- CreateIndex
CREATE INDEX "Type_TypeId_Index" ON "type"("typeId");

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_Index" ON "user"("email");

-- CreateIndex
CREATE INDEX "User_UserId_Index" ON "user"("userId");

-- CreateIndex
CREATE INDEX "UserSubjectProgramJoin_ProgId_Index" ON "usersubjectprogramjoin"("progId");

-- CreateIndex
CREATE INDEX "UserSubjectProgramJoin_SubId_Index" ON "usersubjectprogramjoin"("subId");
