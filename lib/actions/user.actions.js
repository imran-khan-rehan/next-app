"use server";
import { revalidatePath } from "next/cache";
import prisma from "../prisma";
import { signIn } from "next-auth/react";
// 
export async function handleSignIn2(email, password) {
  if (!email || !password) {
    // Check if either email or password is missing
    return "error";
  }

  try {
    console.log("iam in signin so ", email, password);
    // const user = await prisma.$queryRaw`select * from user where email=${email}`;
    const user = await prisma.user.findMany({
      where: {
        email: email, // replace email with the actual email variable you want to search for
      },
    });
    console.log("returning object from get email is ", user);
    if (!user) {
      console.log('User with the provided email does not exist')
      return "error";
    }

    // const isPasswordCorrect = await verifyPassword(password, user.password);

    if (String(password) === user[0].password) {

      return user;
    } else {
      // console.log(" Password is incorrect",password,user,user[0].password)
      return "password";
    }
  } catch (error) {
    console.log('exceptiont')

    console.error("Error:", error);
    return "error";
  }
}


export async function getProfile(userId) {
  const user = await prisma.user.findMany({
    where: {
      "userId": parseInt(userId), // Ensure userId is converted to an integer
    },
    select: {
      profile: true,
    },
  });

  // console.log("profile is this ", user);
  return user;
}


export async function setProfile(userId) {
  const profile = await prisma.$queryRaw`
  update "user" set profile='completed' where "userId"=${parseInt(userId)}`;
  console.log("profile is seeted ", profile);
  // return profile;
};



export async function getPrograms() {
  const programs = await prisma.$queryRaw`
  select * from program`;
  // console.log("all programs are ", programs);
  return programs;
};


export async function getSubjectsWithProgId(programId) {
  const user = await prisma.$queryRaw`
  SELECT s.name, spj.*
FROM Subject s
JOIN Subject_Program_Join spj ON s."subId" = spj."subId"
WHERE spj."progId" =CAST(${programId} AS INTEGER )`;
  console.log("data of all subjects  ",user);
  await prisma.$disconnect();

  return user;
}
// export async function allSubjectsOFAllPrograms()
// {
//   const result =await prisma.$queryRaw`
//     SELECT p."progId", s.name
//       FROM Subject_Program_Join psj
//       JOIN Program p ON psj."progId" = p."progId"
//       JOIN Subject s ON psj."subId" = s."subId"
//   `
//   console.log("data of all subjects of all programs is ",result);
//   const programsWithSubjects = {};
//     result.forEach(row => {
//       const { progId, name } = row;
//       if (!programsWithSubjects[progId]) {
//         programsWithSubjects[progId] = [];
//       }
//       programsWithSubjects[progId].push(name);
//     });

//     console.log(programsWithSubjects);
//   return programsWithSubjects;
// }

export async function allSubjectsOFAllPrograms() {
  try {
    const results = await prisma.$queryRaw`
      SELECT p."progId", s."subId", s.name
      FROM Subject_Program_Join psj
      JOIN Program p ON psj."progId" = p."progId"
      JOIN Subject s ON psj."subId" = s."subId"
    `;

    const programsWithSubjects = {};
    results.forEach(row => {
      const { progId, subId, name } = row;
      if (!programsWithSubjects[progId]) {
        programsWithSubjects[progId] = [];
      }
      programsWithSubjects[progId].push({ name, subId, progId });
    });

    console.log("Data of all subjects of all programs is ", programsWithSubjects);
    return programsWithSubjects;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}





export async function storeUserSubjects(userId, subjects, progId) {
  try {
    console.log(userId, subjects, progId);
    const id = parseInt(userId, 10);
    for (let i = 0; i < subjects.length; i++) {
      const result = await prisma.$queryRaw`
        INSERT INTO UserSubjectProgramJoin ("userId", "subId", "progId")
        VALUES (${id}, ${subjects[i].subId}, ${parseInt(progId)})
        RETURNING *`; // Using RETURNING * to get inserted data if needed
      //console.log("Data inserted for subId:", subjects[i].subId, result);
    }
    // console.log("Data inserted successfully.");
    return "success"; // Return the inserted data
  } catch (error) {
    console.error("Error:", error);
    return "error";
  }
  finally {
    await prisma.$disconnect();
  }
}



export async function allSubjectsOfUser(userId) {
  const id = parseInt(userId);
  const subjectsForUser = await prisma.usersubjectprogramjoin.findMany({
    where: {
      "userId": id, // Replace with the actual userId you want to query
    },
  });
  var subjects = []
  for (var i = 0; i < subjectsForUser.length; i++) {
    const one = await prisma.subject.findUnique({
      where: {
        subId: subjectsForUser[i].subId,
      },
    })
    subjects.push(one);
  }
  
    await prisma.$disconnect();
  
  return subjects;
}
export async function allStatus() {
  const allstatus = await prisma.$queryRaw`select * from status`;
  const allpriorities = await prisma.$queryRaw`select * from Priority`;
  const alltypes = await prisma.$queryRaw`select * from type`;
  await prisma.$disconnect();

  return { allstatus, allpriorities, alltypes };
}


export async function allUser(userId) {
  try {
    const allUsers = await prisma.$queryRaw`SELECT * FROM "user" WHERE "userId" != ${parseInt(userId)}`;
    return allUsers;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
  finally{
    await prisma.$disconnect();

  }
}



export async function insertTask(title, description, created_at, statusId, typeId, priorityId, due_date, subId, userId) {
  try {
    const result = await prisma.task.create({
      data: {
        title,
        description,
        created_at: new Date(created_at), // Assuming created_at is a Date object or a valid date string
        statusId: parseInt(statusId),
        typeId: parseInt(typeId),
        priorityId: parseInt(priorityId),
        due_date: new Date(due_date), // Assuming due_date is a Date object or a valid date string
        subId: parseInt(subId),
        userId: parseInt(userId)
      }
    });
    // console.log("Task inserted:", result);
    return result;
  } catch (error) {
    console.error('Error inserting task:', error);
    throw error;
  }
  finally{
    await prisma.$disconnect();

  }
}



export async function updateTask(dd,title, description, created_at, statusId, typeId, priorityId, due_date, subId, userId, taskId) {
  try {
    const d=Date.parse(dd);
    console.log("data is selected fr update is",d);
    const result = await prisma.task.update({
      where: {
        taskId: parseInt(taskId)
      },
      data: {
        title: title,
        description: description,
        statusId: statusId,
        typeId: typeId,
        priorityId: priorityId,
        due_date: due_date,
        subId: subId,
        userId: parseInt(userId)
      }
    });

    console.log("Updated task:", result);
    return result;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
  finally{
    await prisma.$disconnect();

  }
}

export async function allTasksOfUser(userId) {
  const id = parseInt(userId);
  try {
    const alldata = await prisma.$queryRaw`
      SELECT 
        t."taskId",
        t.title,
        t.description,
        t.created_at,
        t.due_date,
        p.name AS pname,
        p.color AS pcolor,
        p."priorityId" AS pid,       
        s.name AS sname, 
        s.color AS scolor,
        s."statusId" AS sid,       
        sub.name AS subname,
        sub."subId" AS subId,       
        ty.name AS tname,
        ty."typeId" AS tid,
        u.name AS uname        
      FROM 
        task t
      JOIN 
        priority p ON t."priorityId" = p."priorityId"
      JOIN 
        status s ON t."statusId" = s."statusId"
      JOIN 
        subject sub ON t."subId" = sub."subId"
      JOIN 
        type ty ON t."typeId" = ty."typeId"
      JOIN
        "user" u ON u."userId" = t."userId"
      WHERE 
        t."userId" = ${id}`;
    //  console.log("all data is ",alldata);
    return alldata;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error; // Throw the error to handle it at a higher level
  }
  finally{
    await prisma.$disconnect();

  }
}

export async function subPrioStatType(subId, priorityId, statusId, typeId) {
  const sid = parseInt(subId);
  const pid = parseInt(priorityId);
  const stid = parseInt(statusId);
  const tid = parseInt(typeId);

  const subject = await prisma.$queryRaw`select * from subject where "subId"=${sid}`;
  const status = await prisma.$queryRaw`select * from status where "statusId"=${stid}`;
  const priority = await prisma.$queryRaw`select * from priority where "priorityId"=${pid}`;
  const type = await prisma.$queryRaw`select * from type where "typeId"=${tid}`;
  await prisma.$disconnect();

  return { subject, status, priority, type };
}


export async function allStatusPriority() {
  const status = await prisma.$queryRaw`select * from status`;
  const priority = await prisma.$queryRaw`select * from priority`;
  await prisma.$disconnect();

  return { status, priority };
}

export async function sendTask(senderId, receiverId, task) {
  if (task.taskId) {
    const result = await prisma.$queryRaw`
  INSERT INTO Notification ("senderStatus", "taskId", "receiverId", "senderId","receiverStatus")
  VALUES ('pending', ${task.taskId}, ${parseInt(receiverId)}, ${parseInt(senderId)},'pending')`;
    // console.log("notification inserted success");
    await prisma.$disconnect();

    return result;
  }
  else {
    await prisma.$disconnect();

    return null;
  }
}


export async function taskShareByMe(senderId) {
  try {
    const result = await prisma.$queryRaw`
      SELECT 
        n."notId",
        u.name AS "shareWith",
        t.title AS "title",
        t.due_date,
        p.name AS "pname",
        p.color AS "pcolor",
        s.name AS "subname",
        n."senderStatus"
      FROM 
        Notification n
      JOIN 
        Task t ON n."taskId" = t."taskId"
      JOIN 
        Priority p ON t."priorityId" = p."priorityId"
      JOIN 
        Subject s ON t."subId" = s."subId"
      JOIN 
        "user" u ON n."receiverId" = u."userId"
      WHERE 
        n."senderId" = ${parseInt(senderId)}`;


    return result;
  } catch (error) {
    console.error('Error fetching shared tasks:', error);
    throw error;
  }
  finally{
    await prisma.$disconnect();

  }
}


export async function taskShareWithMe(receiverId) {
  try {
    const result = await prisma.$queryRaw`
      SELECT 
        t."taskId",
        u.name AS "shareBy",
        t.title AS "title",
        t.due_date,
        s.name AS "subname",
        n."receiverStatus",
        n.clone,
        n."notId"
      FROM 
        Notification n
      JOIN 
        Task t ON n."taskId" = t."taskId"
      JOIN 
        Subject s ON t."subId" = s."subId"
      JOIN 
        "user" u ON n."senderId" = u."userId"
      WHERE 
        n."receiverId" = ${parseInt(receiverId)}`;

  //  console.log("Tasks with cloned property:", result);
    return result;
  } catch (error) {
    // Handle the error, for example, log it or throw an exception
    console.error('Error fetching shared tasks:', error);
    return null;
  }
  finally{
    await prisma.$disconnect();

  }
}



export async function makeClone(task2, userId, noteId) {
  console.log("iam in make cloned");
  try {
    var task=await prisma.$queryRaw`select * from task where "taskId"=${task2.taskId}`;
    console.log("task is to make clone is ",task);
    task=task[0];
    const result = await prisma.$queryRaw`
        INSERT INTO Task (title, description, "statusId", "typeId", "priorityId", due_date, "subId", "userId") 
        VALUES (${task.title}, ${task.description}, ${task.statusId}, ${task.typeId}, ${task.priorityId}, ${task.due_date}, ${task.subId}, ${parseInt(userId)})`;
    const r = await prisma.$executeRaw`
    UPDATE notification
    SET clone = 'cloned'
    WHERE "notId" = ${noteId}`;
    return result;
  } catch (error) {
    console.error('Error inserting task:', error);
    throw error;
  }
  finally{
    await prisma.$disconnect();

  }
}
export async function deleteNotification(task) {
  const result = await prisma.$executeRaw`UPDATE Notification SET "senderStatus"='viewed' WHERE "notId"=${task.notId}`;

  console.log("Task deleted successfully", result);
  await prisma.$disconnect();

  return result;
}


export async function deleteNotificationFromReceiver(task) {
  const result = prisma.$queryRaw`
  update Notification set "receiverStatus"='viewed' where "notId"=${task.notId}
  `;
  console.log("task deleted successs shared with me ", result);
  await prisma.$disconnect();

  return result;
}


export async function insertRemindTask(days, taskId) {
  try{
  const result = await prisma.$queryRaw`
    INSERT INTO reminder (days,status,"taskId")
VALUES (${parseInt(days)}, 'pending', ${parseInt(taskId)})
ON CONFLICT ("taskId")
DO UPDATE SET days = EXCLUDED.days, status = 'pending';
  `;
return result;
  }catch{
    return "error occur";
  }
}



export async function allReminder(userId) {
  try {
    const result = await prisma.$queryRaw`
      SELECT 
        r."remId",
        r.status,
        r.days,
        t.title AS "title",
        t.due_date,
        s.name AS "subname",
        st.name AS "sname",
        st.color AS "scolor",
        p.name AS "pname",
        p.color AS "pcolor"
      FROM 
        Reminder r
      JOIN 
        Task t ON r."taskId" = t."taskId"
      JOIN 
        Subject s ON t."subId" = s."subId"
      JOIN 
        Priority p ON t."priorityId" = p."priorityId"
      JOIN 
        Status st ON t."statusId" = st."statusId"
      WHERE 
        t."userId" = ${parseInt(userId)}`;

    // Logging for debugging purposes
    // console.log("Data selected from reminder:", result);

    return result;
  } catch (error) {
    console.error('Error fetching reminders:', error);
    throw error;
  }
  finally{
    await prisma.$disconnect();

  }
}

export async function deleteReminder(task) {
  const result = await prisma.$executeRaw`UPDATE Reminder SET status='viewed' WHERE "remId"=${task.remId}`;
  await prisma.$disconnect();

  // console.log("reminder deleted successfully", result);
  return result;
}