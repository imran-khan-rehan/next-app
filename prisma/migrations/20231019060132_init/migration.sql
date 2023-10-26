/*
  Warnings:

  - The primary key for the `program` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `progid` on the `program` table. All the data in the column will be lost.
  - The primary key for the `subject` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `subid` on the `subject` table. All the data in the column will be lost.
  - The primary key for the `subject_program_join` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `progid` on the `subject_program_join` table. All the data in the column will be lost.
  - You are about to drop the column `subid` on the `subject_program_join` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "subject_program_join" DROP CONSTRAINT "subject_program_join_progid_fkey";

-- DropForeignKey
ALTER TABLE "subject_program_join" DROP CONSTRAINT "subject_program_join_subid_fkey";

-- AlterTable
ALTER TABLE "program" DROP CONSTRAINT "program_pkey",
DROP COLUMN "progid",
ADD COLUMN     "progId" SERIAL NOT NULL,
ADD CONSTRAINT "program_pkey" PRIMARY KEY ("progId");

-- AlterTable
ALTER TABLE "subject" DROP CONSTRAINT "subject_pkey",
DROP COLUMN "subid",
ADD COLUMN     "subId" SERIAL NOT NULL,
ADD CONSTRAINT "subject_pkey" PRIMARY KEY ("subId");

-- AlterTable
ALTER TABLE "subject_program_join" DROP CONSTRAINT "subject_program_join_pkey",
DROP COLUMN "progid",
DROP COLUMN "subid",
ADD COLUMN     "progId" SERIAL NOT NULL,
ADD COLUMN     "subId" SERIAL NOT NULL,
ADD CONSTRAINT "subject_program_join_pkey" PRIMARY KEY ("subId", "progId");

-- AddForeignKey
ALTER TABLE "subject_program_join" ADD CONSTRAINT "subject_program_join_progid_fkey" FOREIGN KEY ("progId") REFERENCES "program"("progId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "subject_program_join" ADD CONSTRAINT "subject_program_join_subid_fkey" FOREIGN KEY ("subId") REFERENCES "subject"("subId") ON DELETE NO ACTION ON UPDATE NO ACTION;
