/*
  Warnings:

  - The primary key for the `program` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `progId` on the `program` table. All the data in the column will be lost.
  - The primary key for the `subject` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `subId` on the `subject` table. All the data in the column will be lost.
  - The primary key for the `subject_program_join` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `progId` on the `subject_program_join` table. All the data in the column will be lost.
  - You are about to drop the column `subId` on the `subject_program_join` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Program_ProgId_Index";

-- DropIndex
DROP INDEX "Subject_SubId_Index";

-- DropIndex
DROP INDEX "SubjectProgramJoin_ProgId_Index";

-- AlterTable
ALTER TABLE "program" DROP CONSTRAINT "program_pkey",
DROP COLUMN "progId",
ADD COLUMN     "progid" SERIAL NOT NULL,
ADD CONSTRAINT "program_pkey" PRIMARY KEY ("progid");

-- AlterTable
ALTER TABLE "subject" DROP CONSTRAINT "subject_pkey",
DROP COLUMN "subId",
ADD COLUMN     "subid" SERIAL NOT NULL,
ADD CONSTRAINT "subject_pkey" PRIMARY KEY ("subid");

-- AlterTable
ALTER TABLE "subject_program_join" DROP CONSTRAINT "subject_program_join_pkey",
DROP COLUMN "progId",
DROP COLUMN "subId",
ADD COLUMN     "progid" SERIAL NOT NULL,
ADD COLUMN     "subid" SERIAL NOT NULL,
ADD CONSTRAINT "subject_program_join_pkey" PRIMARY KEY ("subid", "progid");

-- AddForeignKey
ALTER TABLE "subject_program_join" ADD CONSTRAINT "subject_program_join_progid_fkey" FOREIGN KEY ("progid") REFERENCES "program"("progid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "subject_program_join" ADD CONSTRAINT "subject_program_join_subid_fkey" FOREIGN KEY ("subid") REFERENCES "subject"("subid") ON DELETE NO ACTION ON UPDATE NO ACTION;
